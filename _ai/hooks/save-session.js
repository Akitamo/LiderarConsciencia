/**
 * Hook: save-session.js
 * Se ejecuta en SessionEnd para generar resumen inteligente de la sesión
 *
 * Estrategia: Resumen jerárquico en dos pasadas
 *   1. Dividir sesión en chunks y resumir cada uno con Haiku (barato)
 *   2. Consolidar mini-resúmenes con Sonnet (calidad)
 *
 * Requiere: ANTHROPIC_API_KEY como variable de entorno
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Configuración
const PROJECT_ROOT = process.env.CLAUDE_PROJECT_DIR || path.resolve(__dirname, '../..');
const PROMPT_FILE = path.join(PROJECT_ROOT, '_ai/prompts/session-summary.md');
const SESSIONS_DIR = path.join(PROJECT_ROOT, '_history/sessions');
const LOG_FILE = path.join(PROJECT_ROOT, '_history/hook-debug.log');
const ENV_FILE = path.join(PROJECT_ROOT, '.env');

// Modelos
const MODEL_FAST = 'claude-3-5-haiku-latest';
const MODEL_QUALITY = 'claude-sonnet-4-20250514';

// Configuración de chunking
const CHUNK_SIZE = 8000;        // Caracteres por chunk para mini-resumen
const MAX_CHUNKS = 20;          // Máximo de chunks a procesar
const CHUNK_OVERLAP = 500;      // Solapamiento entre chunks para contexto

// Cargar variables desde .env si existe
function loadEnvFile() {
  try {
    if (fs.existsSync(ENV_FILE)) {
      const content = fs.readFileSync(ENV_FILE, 'utf8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const [key, ...valueParts] = trimmed.split('=');
          const value = valueParts.join('=').replace(/^["']|["']$/g, '');
          if (key && value && !process.env[key]) {
            process.env[key] = value;
          }
        }
      }
    }
  } catch (e) {
    // Silenciar errores de lectura
  }
}

// Cargar .env al inicio
loadEnvFile();

function log(message) {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] ${message}\n`;
  console.log(message);
  try {
    fs.appendFileSync(LOG_FILE, logLine);
  } catch (e) {
    // Silenciar errores de logging
  }
}

async function readStdinJson() {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      terminal: false
    });

    let data = '';
    rl.on('line', (line) => {
      data += line;
    });

    rl.on('close', () => {
      if (!data.trim()) {
        reject(new Error('No se recibieron datos por stdin'));
        return;
      }
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        reject(new Error(`Error parseando JSON: ${e.message}. Datos: ${data.substring(0, 200)}`));
      }
    });

    // Timeout de seguridad
    setTimeout(() => {
      rl.close();
    }, 5000);
  });
}

/**
 * Parsea el transcript JSONL extrayendo contenido relevante
 * Mejora: captura tool calls, resultados, y estructura mejor los mensajes
 */
function readTranscript(transcriptPath) {
  if (!transcriptPath) {
    throw new Error('No se proporcionó transcript_path');
  }

  // Expandir ~ si es necesario
  const expandedPath = transcriptPath.replace(/^~/, process.env.HOME || process.env.USERPROFILE);

  if (!fs.existsSync(expandedPath)) {
    throw new Error(`Archivo de transcripción no encontrado: ${expandedPath}`);
  }

  const content = fs.readFileSync(expandedPath, 'utf8');
  const lines = content.split('\n').filter(line => line.trim());

  const messages = [];
  for (const line of lines) {
    try {
      const entry = JSON.parse(line);

      // Extraer contenido según el tipo de entrada
      if (entry.type === 'user') {
        const text = extractTextContent(entry.message);
        if (text) {
          messages.push({ role: 'user', content: text });
        }
      } else if (entry.type === 'assistant') {
        const text = extractTextContent(entry.message);
        if (text) {
          messages.push({ role: 'assistant', content: text });
        }
      } else if (entry.type === 'tool_use') {
        // Capturar herramientas usadas (importante para contexto)
        const toolName = entry.name || entry.tool || 'tool';
        messages.push({
          role: 'tool',
          content: `[Herramienta: ${toolName}]`
        });
      } else if (entry.type === 'tool_result' && entry.content) {
        // Solo capturar resultados cortos o errores
        const resultText = typeof entry.content === 'string'
          ? entry.content
          : JSON.stringify(entry.content);
        if (resultText.length < 500 || resultText.toLowerCase().includes('error')) {
          messages.push({
            role: 'tool_result',
            content: resultText.substring(0, 500)
          });
        }
      }
    } catch (e) {
      // Ignorar líneas que no son JSON válido
    }
  }

  return messages;
}

/**
 * Extrae texto de diferentes formatos de mensaje
 */
function extractTextContent(message) {
  if (!message) return '';

  if (typeof message === 'string') {
    return message;
  }

  if (Array.isArray(message)) {
    return message
      .filter(part => part.type === 'text')
      .map(part => part.text || '')
      .join('\n');
  }

  if (message.text) {
    return message.text;
  }

  if (message.content) {
    return extractTextContent(message.content);
  }

  return '';
}

/**
 * Divide los mensajes en chunks con solapamiento
 */
function chunkMessages(messages) {
  const chunks = [];
  let currentChunk = [];
  let currentSize = 0;

  for (const msg of messages) {
    const msgText = `[${msg.role}]: ${msg.content}\n`;
    const msgSize = msgText.length;

    if (currentSize + msgSize > CHUNK_SIZE && currentChunk.length > 0) {
      chunks.push(currentChunk);

      // Mantener últimos mensajes para solapamiento
      const overlap = [];
      let overlapSize = 0;
      for (let i = currentChunk.length - 1; i >= 0 && overlapSize < CHUNK_OVERLAP; i--) {
        overlap.unshift(currentChunk[i]);
        overlapSize += currentChunk[i].content.length;
      }

      currentChunk = overlap;
      currentSize = overlapSize;

      if (chunks.length >= MAX_CHUNKS) {
        log(`Alcanzado límite de ${MAX_CHUNKS} chunks`);
        break;
      }
    }

    currentChunk.push(msg);
    currentSize += msgSize;
  }

  // Añadir último chunk si tiene contenido
  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }

  return chunks;
}

/**
 * Formatea un chunk para enviar al modelo
 */
function formatChunk(messages) {
  return messages
    .map(m => `**${m.role}**: ${m.content}`)
    .join('\n\n');
}

/**
 * Llama a la API de Claude
 */
async function callClaude(prompt, context, model, maxTokens = 1024) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY no configurada');
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: model,
      max_tokens: maxTokens,
      messages: [{
        role: 'user',
        content: `${prompt}\n\n${context}`
      }]
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

/**
 * Primera pasada: genera mini-resúmenes de cada chunk con Haiku
 */
async function generateChunkSummaries(chunks) {
  const summaries = [];

  const chunkPrompt = `Resume este fragmento de una sesión de trabajo de programación.
Extrae SOLO:
- Qué se estaba haciendo (tarea/objetivo)
- Decisiones tomadas
- Problemas encontrados (si los hay)
- Resultados o avances

Sé muy conciso (3-5 puntos máximo). No incluyas saludos ni contexto general.`;

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const chunkText = formatChunk(chunk);

    log(`Procesando chunk ${i + 1}/${chunks.length} (${chunkText.length} chars)...`);

    try {
      const summary = await callClaude(
        chunkPrompt,
        `## Fragmento ${i + 1} de ${chunks.length}:\n${chunkText}`,
        MODEL_FAST,
        512
      );
      summaries.push(`### Parte ${i + 1}\n${summary}`);
    } catch (err) {
      log(`Error en chunk ${i + 1}: ${err.message}`);
      summaries.push(`### Parte ${i + 1}\n[Error al procesar]`);
    }

    // Pequeña pausa para no saturar la API
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  return summaries;
}

/**
 * Segunda pasada: consolida mini-resúmenes con Sonnet
 */
async function consolidateSummaries(chunkSummaries, finalPrompt) {
  const consolidationPrompt = `${finalPrompt}

IMPORTANTE:
- Consolida los mini-resúmenes en UN SOLO resumen estructurado
- Elimina redundancias entre partes
- Mantén solo lo más relevante
- Sigue EXACTAMENTE el formato especificado en las instrucciones`;

  const context = `## Mini-resúmenes de la sesión:\n\n${chunkSummaries.join('\n\n')}`;

  return await callClaude(consolidationPrompt, context, MODEL_QUALITY, 2048);
}

function getPromptFromFile() {
  try {
    const content = fs.readFileSync(PROMPT_FILE, 'utf8');
    // Extraer solo la parte de instrucciones (después del frontmatter)
    const parts = content.split('---');
    if (parts.length >= 3) {
      return parts.slice(2).join('---').trim();
    }
    return content;
  } catch (err) {
    log(`Error leyendo prompt: ${err.message}`);
    return 'Genera un resumen breve de esta sesión de trabajo.';
  }
}

function generateFilename(summary) {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const time = now.toTimeString().split(' ')[0].replace(/:/g, '');

  // Intentar extraer tema del resumen
  const topicMatch = summary.match(/# Sesión: ([^-\n]+)/);
  let topic = topicMatch ? topicMatch[1].trim() : 'sesion';

  // Limpiar para nombre de archivo
  topic = topic.toLowerCase()
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 40);

  return `${date}-${time}-${topic}.md`;
}

async function main() {
  log('=== Inicio hook save-session (v2 - jerárquico) ===');

  try {
    // Asegurar que existe el directorio de logs
    const historyDir = path.dirname(LOG_FILE);
    if (!fs.existsSync(historyDir)) {
      fs.mkdirSync(historyDir, { recursive: true });
    }

    // Leer metadatos de la sesión desde stdin
    log('Leyendo datos de stdin...');
    const hookInput = await readStdinJson();
    log(`Datos recibidos: session_id=${hookInput.session_id}, reason=${hookInput.reason}`);

    // Leer transcripción desde el archivo JSONL
    log(`Leyendo transcripción desde: ${hookInput.transcript_path}`);
    const messages = readTranscript(hookInput.transcript_path);
    log(`Mensajes encontrados: ${messages.length}`);

    if (messages.length < 3) {
      log('Sesión muy corta (menos de 3 mensajes), no se genera resumen.');
      process.exit(0);
    }

    // Leer prompt desde archivo
    const finalPrompt = getPromptFromFile();

    let summary;

    // Decidir estrategia según tamaño
    const totalChars = messages.reduce((acc, m) => acc + m.content.length, 0);
    log(`Total caracteres en sesión: ${totalChars}`);

    if (totalChars < CHUNK_SIZE * 1.5) {
      // Sesión corta: una sola pasada con Sonnet
      log('Sesión corta - usando estrategia de pasada única con Sonnet');
      const context = formatChunk(messages);
      summary = await callClaude(finalPrompt, `## Contexto de la sesión:\n${context}`, MODEL_QUALITY, 2048);
    } else {
      // Sesión larga: estrategia jerárquica
      log('Sesión larga - usando estrategia jerárquica (Haiku + Sonnet)');

      // Paso 1: Dividir en chunks
      const chunks = chunkMessages(messages);
      log(`Sesión dividida en ${chunks.length} chunks`);

      // Paso 2: Mini-resúmenes con Haiku
      log('Generando mini-resúmenes con Haiku...');
      const chunkSummaries = await generateChunkSummaries(chunks);
      log(`Mini-resúmenes generados: ${chunkSummaries.length}`);

      // Paso 3: Consolidar con Sonnet
      log('Consolidando con Sonnet...');
      summary = await consolidateSummaries(chunkSummaries, finalPrompt);
    }

    log('Resumen final generado correctamente');

    // Crear directorio si no existe
    if (!fs.existsSync(SESSIONS_DIR)) {
      fs.mkdirSync(SESSIONS_DIR, { recursive: true });
    }

    // Generar nombre de archivo y guardar
    const filename = generateFilename(summary);
    const filepath = path.join(SESSIONS_DIR, filename);

    // Añadir frontmatter
    const now = new Date();
    const fullContent = `---
date: ${now.toISOString()}
tags: [session]
messages: ${messages.length}
strategy: ${totalChars < CHUNK_SIZE * 1.5 ? 'single-pass' : 'hierarchical'}
---

${summary}
`;

    fs.writeFileSync(filepath, fullContent, 'utf8');
    log(`Resumen guardado en: ${filepath}`);
    log('=== Fin hook save-session (OK) ===');

  } catch (err) {
    log(`ERROR: ${err.message}`);
    log('=== Fin hook save-session (ERROR) ===');
    process.exit(1);
  }
}

main();
