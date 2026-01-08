# PAI (Personal AI Infrastructure) - Análisis Técnico Exhaustivo
## Proyecto de Daniel Miessler

**Fecha de análisis:** 2026-01-07
**Repositorio:** https://github.com/danielmiessler/PAI
**Repositorio alternativo:** https://github.com/danielmiessler/Personal_AI_Infrastructure
**Documentación oficial:** https://danielmiessler.com/blog/personal-ai-infrastructure

---

## EXECUTIVE SUMMARY

PAI (Personal AI Infrastructure) es un sistema modular de código abierto diseñado para transformar agentes AI genéricos (como Claude Code) en asistentes personalizados con memoria persistente, habilidades especializadas y capacidades de auto-mejora.

**Características clave:**
- Sistema modular basado en "Packs" independientes
- Arquitectura de eventos mediante Hooks (TypeScript)
- Sistema de Skills con routing inteligente
- Historia automática y observabilidad en tiempo real
- Compatible con Claude Code, Cursor, Windsurf, OpenCode y otros

**Versión actual:** v2.0 (Diciembre 2025)
**Filosofía:** "Current State → Desired State via verifiable iteration"

---

## 1. ESTRUCTURA DEL REPOSITORIO

### 1.1 Jerarquía Principal

```
PAI/
├── .claude/                      # Configuración Claude Code
│   ├── hooks/                    # Scripts de eventos (TypeScript)
│   │   ├── capture-all-events.ts
│   │   ├── stop-hook.ts
│   │   ├── subagent-stop-hook.ts
│   │   ├── capture-session-summary.ts
│   │   ├── security-validator.ts
│   │   └── lib/                  # Librerías compartidas
│   │       ├── observability.ts
│   │       ├── metadata-extraction.ts
│   │       └── types.ts
│   ├── Skills/                   # Capacidades específicas de dominio
│   │   ├── CORE/                 # Skill fundamental (carga automática)
│   │   │   ├── SKILL.md
│   │   │   ├── CONSTITUTION.md
│   │   │   ├── SkillSystem.md
│   │   │   └── HookSystem.md
│   │   ├── prompting/
│   │   ├── research/
│   │   ├── fabric-patterns/
│   │   ├── web-scraping/
│   │   ├── chrome-devtools/
│   │   └── [custom-skills]/
│   ├── agents/                   # Definiciones de agentes
│   ├── Observability/            # Dashboard de monitoreo
│   │   └── manage.sh
│   └── settings.json             # Configuración de hooks
│
├── Packs/                        # Paquetes modulares instalables
│   ├── kai-core-install/
│   │   ├── README.md
│   │   ├── INSTALL.md
│   │   ├── VERIFY.md
│   │   └── src/
│   ├── kai-hook-system/
│   ├── kai-history-system/
│   ├── kai-voice-system/
│   ├── kai-art-skill/
│   ├── kai-prompting-skill/
│   ├── kai-agents-skill/
│   ├── kai-browser-skill/
│   └── kai-observability-server/
│
├── Bundles/                      # Colecciones curadas de Packs
│   └── Kai/
│       ├── install.ts            # Wizard de instalación
│       └── README.md
│
├── Tools/                        # Herramientas de desarrollo
│   └── PAIPackTemplate.md
│
├── history/                      # Sistema de memoria automático
│   ├── sessions/YYYY-MM/
│   ├── learnings/YYYY-MM/
│   ├── research/YYYY-MM/
│   ├── decisions/YYYY-MM/
│   ├── execution/
│   │   ├── features/YYYY-MM/
│   │   ├── bugs/YYYY-MM/
│   │   └── refactors/YYYY-MM/
│   └── raw-outputs/YYYY-MM/      # Logs JSONL de eventos
│
├── .env.example                  # Plantilla de variables de entorno
├── .gitignore
├── README.md
├── PACKS.md                      # Catálogo de packs
├── PLATFORM.md                   # Documentación de plataforma
└── setup.sh                      # Script de configuración inicial
```

### 1.2 Variable PAI_DIR

**La variable de entorno más importante del sistema.**

```bash
export PAI_DIR="$HOME/PAI"
```

- **Propósito:** Punto único de referencia para toda la instalación
- **Portabilidad:** Permite instalar PAI en cualquier ubicación
- **Uso:** Todos los scripts y hooks referencian `${PAI_DIR}` en lugar de rutas absolutas
- **Configuración:** Se establece en `.zshrc` o `.bashrc`

---

## 2. SISTEMA DE PACKS

### 2.1 Concepto

Los Packs son "paquetes de capacidades" modulares que se pueden instalar independientemente. Reemplazaron el enfoque monolítico de PAI v1.

**Analogía:** Como descargar habilidades en The Matrix.

### 2.2 Estructura Estándar de un Pack

```
pack-name/
├── README.md       # Visión general, arquitectura, problema que resuelve
├── INSTALL.md      # Instrucciones paso a paso de instalación
├── VERIFY.md       # Checklist de verificación obligatorio
└── src/            # Código fuente real (TS, YAML, Markdown, etc.)
    ├── hooks/
    ├── skills/
    ├── workflows/
    └── tools/
```

### 2.3 Catálogo Completo de Packs

**Orden de instalación recomendado (por dependencias):**

| # | Pack | Descripción | Dependencias |
|---|------|-------------|--------------|
| 1 | **kai-hook-system** | Arquitectura de hooks basada en eventos | Ninguna |
| 2 | **kai-history-system** | Sistema de seguimiento de contexto automático | kai-hook-system |
| 3 | **kai-core-install** | Pack fundamental con routing, identidad y tracking arquitectónico | kai-hook-system, kai-history-system |
| 4 | **kai-prompting-skill** | Sistema de meta-prompting | kai-core-install |
| 5 | **kai-voice-system** | Notificaciones de voz con ElevenLabs TTS | kai-hook-system, kai-core-install |
| 6 | **kai-agents-skill** | Composición dinámica de agentes | kai-core-install, (opcional) kai-voice-system |
| 7 | **kai-art-skill** | Creación de contenido visual (DALL-E, Flux, Gemini) | kai-core-install |
| 8 | **kai-browser-skill** | Automatización de navegador con Playwright | Bun + Playwright (standalone) |
| 9 | **kai-observability-server** | Monitoreo de agentes en tiempo real | kai-hook-system (opcional) |

### 2.4 Detalles de Packs Clave

#### kai-core-install

**Propósito:** Fundación del sistema PAI.

**Contenido:**
- Sistema de routing de skills con jerarquía de 5 capas
- Identidad del asistente (personalizable)
- Tracking de arquitectura
- Skill CORE (carga automática en SessionStart)

**Archivos clave:**
```
kai-core-install/src/
├── .claude/Skills/CORE/
│   ├── SKILL.md           # Definición principal
│   ├── CONSTITUTION.md    # Filosofía del sistema
│   ├── SkillSystem.md     # Guía de creación de skills
│   └── HookSystem.md      # Documentación de hooks
└── hooks/
    └── load-core-context.ts
```

#### kai-hook-system

**Propósito:** Sistema de eventos que intercepta operaciones de Claude Code.

**Hooks disponibles:**

| Hook | Cuándo se dispara | Usos comunes |
|------|-------------------|--------------|
| `SessionStart` | Al abrir Claude Code | Cargar contexto CORE, establecer identidad |
| `PreToolUse` | Antes de ejecutar comando | Validación de seguridad (bloqueo de `rm -rf`) |
| `PostToolUse` | Después de ejecutar comando | Logging, observabilidad, captura de salidas |
| `UserPromptSubmit` | Al enviar mensaje | Actualizar títulos de pestañas |
| `SessionEnd` | Al cerrar Claude Code | Captura de resumen de sesión |
| `Stop` | Al completar agente principal | Extracción de resultados, envío a TTS |
| `SubagentStop` | Al completar subagente | Routing de salidas, notificaciones de voz |

**Ejemplo de Hook (TypeScript):**

```typescript
// ~/.claude/hooks/security-validator.ts
export default async function() {
  // Recibe datos del evento vía stdin (JSON)
  const eventData = await readStdin();

  if (eventData.tool === 'bash') {
    const command = eventData.command;

    // Bloquear comandos peligrosos
    if (command.includes('rm -rf') || command.includes('sudo')) {
      console.error('BLOCKED: Unsafe command detected');
      process.exit(1); // Exit Code 1+ = BLOQUEAR
    }
  }

  process.exit(0); // Exit Code 0 = PERMITIR
}
```

**Registro en settings.json:**

```json
{
  "hooks": {
    "PreToolUse": "${PAI_DIR}/.claude/hooks/security-validator.ts",
    "SessionStart": "${PAI_DIR}/.claude/hooks/load-core-context.ts",
    "PostToolUse": "${PAI_DIR}/.claude/hooks/capture-all-events.ts"
  }
}
```

#### kai-history-system

**Propósito:** Memoria persistente para todo lo que ocurre en el sistema.

**Principio:** "Trabaja normalmente, la documentación se maneja sola."

**Estructura de directorios:**

```
$PAI_DIR/history/
├── sessions/2026-01/              # Resúmenes de sesiones
├── learnings/2026-01/             # Narrativas de resolución de problemas
├── research/2026-01/              # Reportes de investigación
├── decisions/2026-01/             # Decisiones arquitectónicas
├── execution/
│   ├── features/2026-01/          # Implementaciones de features
│   ├── bugs/2026-01/              # Correcciones de bugs
│   └── refactors/2026-01/         # Mejoras de código
└── raw-outputs/2026-01-07/        # Logs JSONL de eventos
    └── _all-events.jsonl
```

**Formato JSONL de eventos:**

```json
{"timestamp":"2026-01-07T10:30:45Z","event":"SessionStart","payload":{...}}
{"timestamp":"2026-01-07T10:31:12Z","event":"UserPromptSubmit","payload":{...}}
{"timestamp":"2026-01-07T10:31:15Z","event":"PreToolUse","tool":"bash","command":"ls -la"}
{"timestamp":"2026-01-07T10:31:16Z","event":"PostToolUse","tool":"bash","exitCode":0}
```

**Categorización automática:**
- El sistema detecta palabras clave en las respuestas
- Clasifica salidas como "learnings", "sessions", "research", etc.
- Las Skills pueden leer del historial para mejorar con el tiempo

#### kai-voice-system

**Propósito:** Notificaciones de voz diferenciadas por agente.

**Características:**
- Integración con ElevenLabs TTS API
- Cada tipo de agente tiene su propia voz
- Resúmenes automáticos enviados a TTS al completar tareas

**Configuración:**

```typescript
// Mapeo de agentes a voces
const VOICE_MAPPING = {
  'researcher': 'voice-id-scholarly',
  'coder': 'voice-id-technical',
  'writer': 'voice-id-creative',
  'analyst': 'voice-id-analytical'
};
```

**Flujo:**
1. Agente completa tarea → Dispara hook `Stop` o `SubagentStop`
2. Hook extrae resumen del resultado
3. Envía resumen + voice_id a servidor de voz
4. ElevenLabs sintetiza audio
5. Usuario escucha resultado

**Patrón "Swarm":**
- Múltiples agentes trabajando en paralelo
- Cada uno reporta resultados con su voz única
- Ejemplo: "Investiga estas 5 empresas AI en paralelo" → 5 voces reportando

#### kai-observability-server

**Propósito:** Dashboard en tiempo real de actividad del agente.

**Características:**
- WebSocket streaming de eventos
- Gráficos de pulso en vivo
- Líneas de tiempo de eventos
- Swim lanes para múltiples agentes
- Temas: Tokyo Night, Nord, Catppuccin

**Inicio:**

```bash
~/.claude/Observability/manage.sh start
```

**Ofuscación de seguridad:**
- Datos sensibles automáticamente ocultos en dashboard

#### kai-art-skill

**Propósito:** Generación de contenido visual con múltiples modelos.

**Modelos soportados:**
- DALL-E
- Flux
- Gemini Image Generation

**Capacidades:**
- Selección automática de modelo según tipo de imagen
- Gestión de aspect ratios y resoluciones
- Post-procesamiento (remoción de fondo, miniaturas)
- Estética visual consistente: "Tron + Anthropic + Excalidraw fusion"

**Flujo de routing:**

```
User: "create a diagram of the auth flow"
  ↓
SKILL.md → Routing basado en tipo de solicitud
  ↓
Workflow: TechnicalDiagrams.md
  ↓
Generate.ts CLI → Genera imagen
  ↓
Post-processing → Optimización
```

#### kai-browser-skill

**Propósito:** Automatización de navegador con Playwright.

**Ventaja:** 99% de ahorro de tokens vs MCP (Model Context Protocol)

**Características:**
- Code-first browser automation
- Screenshots automáticos
- Verificación de estado
- Patrones de testing web

---

## 3. SISTEMA DE SKILLS

### 3.1 Concepto

**Skills** = Contenedores de dominio que definen QUÉ sabe hacer el sistema.

**Diferencia con Workflows:**
- **Skills:** Definen capacidades y cuándo usarlas
- **Workflows:** Definen CÓMO ejecutar tareas paso a paso

### 3.2 Jerarquía de Routing (5 capas)

```
Capa 1: SKILL.md Frontmatter → System prompt (siempre cargado)
  ├─ name: nombre del skill
  ├─ description: resumen breve
  └─ USE WHEN: triggers de intención

Capa 2: SKILL.md Body → Contenido principal (al invocar)
  └─ workflow routing table

Capa 3: Context Files → Contexto específico (bajo demanda)
  ├─ CoreStack.md
  ├─ Contacts.md
  └─ [otros archivos de contexto]

Capa 4: Workflows/ → Procedimientos HOW-TO
  ├─ ResearchWorkflow.md
  ├─ ContentCreation.md
  └─ [procedimientos paso a paso]

Capa 5: Tools/ → CLI tools (código determinístico)
  ├─ research-tool.ts
  ├─ scraper.py
  └─ [programas ejecutables]
```

### 3.3 Tiers de Carga de Skills

| Tier | Nombre | Cuándo se carga | Costo de tokens |
|------|--------|-----------------|-----------------|
| **0** | CORE (Automático) | SessionStart | Medio |
| **1** | Frontmatter Only | System prompt (siempre) | Mínimo |
| **2** | Full Skill | Al invocar/disparar | Medio |
| **3** | Workflow | Al routing específico | Alto |

### 3.4 Ejemplo de SKILL.md

```markdown
---
name: Research
description: Multi-source investigation and synthesis
USE WHEN:
  - User requests investigation of topic
  - Need to gather information from multiple sources
  - Requires fact-checking or verification
dependencies:
  - web-scraping
  - fabric-patterns
API_KEYS:
  - ANTHROPIC_API_KEY
  - SERP_API_KEY
---

# Research Skill

## Workflow Routing

| User Intent | Workflow | Context Files |
|-------------|----------|---------------|
| Academic research | AcademicResearch.md | ResearchGuidelines.md |
| Competitive analysis | CompetitiveIntel.md | CompanyProfiles.md |
| Technical investigation | TechnicalDeepDive.md | TechStack.md |

## Capabilities

- Multi-source aggregation
- Citation management
- Bias detection
- Synthesis and summarization

## Tools

- `research-tool.ts` - Orchestrates multi-source queries
- `cite-extractor.py` - Extracts citation metadata
```

### 3.5 Catálogo de Skills Incluidos

```
${PAI_DIR}/skills/
├── prompting/           # Estándares de prompt engineering
├── create-skill/        # Framework de creación de skills
├── ffuf/                # Web fuzzing para pentesting
├── alex-hormozi-pitch/  # Framework de pitch $100M Offers
├── research/            # Investigación multi-fuente
├── web-scraping/        # Extracción de datos web
├── chrome-devtools/     # Automatización de navegador
├── fabric-patterns/     # Procesamiento de contenido
├── youtube-extraction/  # Extracción de transcripts de YouTube
├── ref-documentation/   # Búsqueda de docs técnicas
├── webapp-testing/      # Patrones de testing con Playwright
└── [custom-skills]/     # Tus skills personalizados
```

### 3.6 Sistema de Identidad (CORE Skill)

El Skill CORE define la "personalidad" del asistente.

**Componentes:**

```markdown
# .claude/Skills/CORE/CONSTITUTION.md

## My Identity
- Name: [Tu nombre preferido, ej: Kai]
- Role: Personal AI Assistant
- Tone: Professional yet conversational
- Expertise: [tus dominios]

## My Preferences
- Timezone: America/Los_Angeles
- Communication style: Direct, actionable
- Output format: Markdown with clear headers

## My Context
- Current projects: [lista]
- Key contacts: [lista]
- Tech stack: [lista]
```

**Valor:**
- Crea interacciones consistentes y predecibles
- El AI "sabe quién es" y cómo comunicarse
- Personalización profunda vs ChatGPT Custom GPTs estáticos

---

## 4. SISTEMA DE HOOKS

### 4.1 Arquitectura de Eventos

Los Hooks son **scripts TypeScript** que se ejecutan en momentos específicos del ciclo de vida de Claude Code.

**Modelo de ejecución:**

```
Evento dispara
  ↓
Claude Code ejecuta script TypeScript (vía Bun)
  ↓
Script recibe datos vía stdin (JSON)
  ↓
Script procesa lógica
  ↓
Script controla resultado vía exit code o stdout
```

### 4.2 Tipos de Hooks y Usos

#### SessionStart

**Cuándo:** Al abrir Claude Code

**Usos:**
- Cargar skill CORE
- Establecer contexto inicial
- Configurar identidad
- Inicializar dashboard de observabilidad

**Ejemplo:**

```typescript
// ~/.claude/hooks/session-start/load-core-context.ts
import { readFileSync } from 'fs';
import { join } from 'path';

export default async function() {
  const PAI_DIR = process.env.PAI_DIR!;

  // Cargar archivos CORE
  const constitution = readFileSync(
    join(PAI_DIR, '.claude/Skills/CORE/CONSTITUTION.md'),
    'utf-8'
  );
  const skillSystem = readFileSync(
    join(PAI_DIR, '.claude/Skills/CORE/SkillSystem.md'),
    'utf-8'
  );

  // Inyectar en contexto del sistema
  console.log(`Loading CORE context...`);
  console.log(constitution);
  console.log(skillSystem);
}
```

#### PreToolUse

**Cuándo:** Antes de ejecutar cualquier herramienta (bash, edit, etc.)

**Usos:**
- Validación de seguridad
- Rate limiting
- Logging preventivo
- Interceptación de comandos peligrosos

**Ejemplo de Validación de Seguridad:**

```typescript
// ~/.claude/hooks/pre-tool-use/security-validator.ts
import { readStdin } from '../lib/utils';

const UNSAFE_PATTERNS = [
  /rm\s+-rf/,
  /sudo\s+/,
  /dd\s+if=/,
  />\s*\/dev\/sd/,
  /chmod\s+777/
];

const SSRF_BLOCKED_IPS = [
  '127.0.0.1',
  'localhost',
  '0.0.0.0',
  '169.254.169.254', // AWS metadata
  /^10\./,           // Private network
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^192\.168\./
];

export default async function() {
  const event = await readStdin();

  if (event.tool === 'bash') {
    const cmd = event.input.command;

    // Check unsafe commands
    for (const pattern of UNSAFE_PATTERNS) {
      if (pattern.test(cmd)) {
        console.error(`🚫 BLOCKED: Unsafe command detected`);
        console.error(`Command: ${cmd}`);
        process.exit(1); // BLOCK
      }
    }
  }

  if (event.tool === 'fetch') {
    const url = event.input.url;

    // Check SSRF
    for (const pattern of SSRF_BLOCKED_IPS) {
      if (typeof pattern === 'string' && url.includes(pattern)) {
        console.error(`🚫 BLOCKED: SSRF attempt detected`);
        process.exit(1);
      }
    }
  }

  process.exit(0); // ALLOW
}
```

#### PostToolUse

**Cuándo:** Después de ejecutar herramienta

**Usos:**
- Logging de resultados
- Captura de salidas para historial
- Envío a observability dashboard
- Detección de errores y alertas

**Ejemplo:**

```typescript
// ~/.claude/hooks/post-tool-use/capture-output.ts
import { appendFileSync } from 'fs';
import { join } from 'path';
import { readStdin } from '../lib/utils';

export default async function() {
  const event = await readStdin();
  const PAI_DIR = process.env.PAI_DIR!;

  const logEntry = {
    timestamp: new Date().toISOString(),
    tool: event.tool,
    input: event.input,
    output: event.output,
    exitCode: event.exitCode,
    duration: event.duration
  };

  // Append to daily log
  const today = new Date().toISOString().split('T')[0];
  const logFile = join(
    PAI_DIR,
    `history/raw-outputs/${today}/_all-events.jsonl`
  );

  appendFileSync(logFile, JSON.stringify(logEntry) + '\n');

  // Send to observability dashboard
  if (process.env.OBSERVABILITY_ENABLED === 'true') {
    await sendToObservability(logEntry);
  }
}
```

#### Stop / SubagentStop

**Cuándo:** Al completar agente principal/subagente

**Usos:**
- Extracción de resúmenes
- Categorización de resultados (learning, research, session)
- Envío a sistema de voz
- Actualización de métricas

**Ejemplo:**

```typescript
// ~/.claude/hooks/stop/capture-session-summary.ts
import { readStdin, extractSummary, categorizeOutput } from '../lib/utils';
import { saveToHistory } from '../lib/history';

const LEARNING_KEYWORDS = [
  'learned', 'discovered', 'realized', 'insight',
  'problem solved', 'bug fixed', 'pattern identified'
];

const RESEARCH_KEYWORDS = [
  'investigation', 'analysis', 'findings', 'comparison',
  'evaluation', 'assessment', 'report'
];

export default async function() {
  const event = await readStdin();
  const output = event.output;

  // Extract summary
  const summary = await extractSummary(output);

  // Categorize
  const category = categorizeOutput(output, {
    learning: LEARNING_KEYWORDS,
    research: RESEARCH_KEYWORDS
  });

  // Save to appropriate history folder
  await saveToHistory({
    category,
    summary,
    fullOutput: output,
    timestamp: new Date(),
    agentType: event.agentType
  });

  // Send to voice system if enabled
  if (process.env.VOICE_ENABLED === 'true') {
    await sendToVoiceSystem({
      agentType: event.agentType,
      summary
    });
  }
}
```

### 4.3 Registro de Hooks en settings.json

```json
{
  "hooks": {
    "SessionStart": [
      "${PAI_DIR}/.claude/hooks/session-start/load-core-context.ts",
      "${PAI_DIR}/.claude/hooks/session-start/init-observability.ts"
    ],
    "PreToolUse": [
      "${PAI_DIR}/.claude/hooks/pre-tool-use/security-validator.ts",
      "${PAI_DIR}/.claude/hooks/pre-tool-use/rate-limiter.ts"
    ],
    "PostToolUse": [
      "${PAI_DIR}/.claude/hooks/post-tool-use/capture-all-events.ts",
      "${PAI_DIR}/.claude/hooks/post-tool-use/send-to-observability.ts"
    ],
    "Stop": [
      "${PAI_DIR}/.claude/hooks/stop/capture-session-summary.ts"
    ],
    "SubagentStop": [
      "${PAI_DIR}/.claude/hooks/subagent-stop/route-output.ts"
    ],
    "UserPromptSubmit": [
      "${PAI_DIR}/.claude/hooks/user-prompt/update-tab-title.ts"
    ],
    "SessionEnd": [
      "${PAI_DIR}/.claude/hooks/session-end/save-session.ts"
    ]
  }
}
```

### 4.4 Librería de Tipos (types.ts)

```typescript
// ~/.claude/hooks/lib/types.ts

export interface SessionStartEvent {
  type: 'SessionStart';
  timestamp: string;
  sessionId: string;
}

export interface PreToolUseEvent {
  type: 'PreToolUse';
  timestamp: string;
  tool: 'bash' | 'edit' | 'read' | 'fetch' | 'mcp';
  input: {
    command?: string;
    file_path?: string;
    url?: string;
    [key: string]: any;
  };
}

export interface PostToolUseEvent {
  type: 'PostToolUse';
  timestamp: string;
  tool: string;
  input: any;
  output: any;
  exitCode: number;
  duration: number;
  error?: string;
}

export interface StopEvent {
  type: 'Stop';
  timestamp: string;
  sessionId: string;
  agentType: string;
  output: string;
  tokensUsed: number;
}

export type HookEvent =
  | SessionStartEvent
  | PreToolUseEvent
  | PostToolUseEvent
  | StopEvent;
```

---

## 5. CONFIGURACIÓN

### 5.1 Variables de Entorno (.env)

**Ubicación:** `$PAI_DIR/.env`

**Principio:** "SINGLE SOURCE OF TRUTH para todas las API keys"

**Reglas de seguridad:**
- ❌ NUNCA commitear .env a git
- ❌ NUNCA almacenar API keys en otro lugar
- ✅ TODAS las packs leen de este ÚNICO archivo

**Ejemplo de .env:**

```bash
# Core AI Models
ANTHROPIC_API_KEY=your-api-key-here
OPENAI_API_KEY=sk-xxxxx
GOOGLE_API_KEY=xxxxx

# Voice System (ElevenLabs)
ELEVENLABS_API_KEY=xxxxx
DEFAULT_VOICE_ID=voice-scholarly

# Research Tools
SERP_API_KEY=xxxxx
BRAVE_SEARCH_API_KEY=xxxxx

# Visual Generation
FLUX_API_KEY=xxxxx
DALLE_API_KEY=xxxxx  # Puede ser igual que OPENAI_API_KEY

# Observability
OBSERVABILITY_ENABLED=true
OBSERVABILITY_PORT=3000

# Voice Notifications
VOICE_ENABLED=true
VOICE_SERVER_URL=http://localhost:3001

# Browser Automation
PLAYWRIGHT_HEADLESS=true

# History System
AUTO_CATEGORIZATION=true
LEARNING_KEYWORDS=learned,discovered,insight,problem solved

# PAI Paths
PAI_DIR=/Users/yourname/PAI
PAI_HOME=/Users/yourname
```

**Setup:**

```bash
# 1. Copiar plantilla
cp .env.example $PAI_DIR/.env

# 2. Editar y añadir keys
nano $PAI_DIR/.env

# 3. Reiniciar Claude Code para cargar
```

### 5.2 settings.json (Claude Code)

**Ubicación:** `~/.claude/settings.json` → symlink a `$PAI_DIR/.claude/settings.json`

**Propósito:** Configuración de Claude Code + registro de hooks

**Estructura completa:**

```json
{
  "name": "Kai",
  "timezone": "America/Los_Angeles",
  "language": "en",

  "hooks": {
    "SessionStart": [
      "${PAI_DIR}/.claude/hooks/session-start/load-core-context.ts",
      "${PAI_DIR}/.claude/hooks/session-start/init-observability.ts"
    ],
    "PreToolUse": [
      "${PAI_DIR}/.claude/hooks/pre-tool-use/security-validator.ts"
    ],
    "PostToolUse": [
      "${PAI_DIR}/.claude/hooks/post-tool-use/capture-all-events.ts"
    ],
    "Stop": [
      "${PAI_DIR}/.claude/hooks/stop/capture-session-summary.ts"
    ],
    "SubagentStop": [
      "${PAI_DIR}/.claude/hooks/subagent-stop/route-output.ts"
    ],
    "UserPromptSubmit": [
      "${PAI_DIR}/.claude/hooks/user-prompt/update-tab-title.ts"
    ],
    "SessionEnd": [
      "${PAI_DIR}/.claude/hooks/session-end/save-session.ts"
    ]
  },

  "skills": {
    "coreSkillPath": "${PAI_DIR}/.claude/Skills/CORE/SKILL.md",
    "skillsDirectory": "${PAI_DIR}/.claude/Skills",
    "autoLoadFrontmatter": true
  },

  "observability": {
    "enabled": true,
    "port": 3000,
    "theme": "tokyo-night"
  },

  "voice": {
    "enabled": true,
    "provider": "elevenlabs",
    "voiceMapping": {
      "researcher": "voice-id-scholarly",
      "coder": "voice-id-technical",
      "writer": "voice-id-creative"
    }
  },

  "history": {
    "enabled": true,
    "autoCategorization": true,
    "outputDirectory": "${PAI_DIR}/history"
  }
}
```

### 5.3 Setup Inicial (setup.sh)

**Ubicación:** `$PAI_DIR/setup.sh`

**Funciones:**
1. Detecta shell (.zshrc o .bashrc)
2. Establece variable PAI_DIR
3. Crea symlink de settings.json
4. Copia .env.example a .env
5. Crea estructura de directorios de historia
6. Instala dependencias (Bun)

**Ejemplo de uso:**

```bash
cd ~/PAI
chmod +x setup.sh
./setup.sh
```

---

## 6. BUNDLES

### 6.1 Concepto

**Bundle** = Colección curada de Packs diseñados para trabajar juntos como sistema armonioso.

**Diferencia con Packs:**
- **Pack:** Capacidad individual
- **Bundle:** Sistema completo pre-configurado

### 6.2 Kai Bundle (Flagship)

**Propósito:** Recrear la experiencia de PAI v1.0 "mirrored system" mediante packs modulares.

**Contenido:**

```
Bundles/Kai/
├── install.ts           # Wizard interactivo de instalación
├── README.md
└── config/
    ├── default-settings.json
    └── recommended-env.txt
```

**Packs incluidos:**
1. kai-core-install
2. kai-hook-system
3. kai-history-system
4. kai-prompting-skill
5. kai-voice-system
6. kai-agents-skill
7. kai-art-skill
8. kai-observability-server

**Instalación:**

```bash
cd $PAI_DIR/Bundles/Kai
bun run install.ts
```

**Proceso del Wizard:**

```
1. Detecta directorios de sistemas AI existentes
   - ~/.claude
   - ~/.cursor
   - ~/.windsurf

2. Crea backup de seguridad
   ~/.claude → ~/.claude-BACKUP-2026-01-07

3. Pregunta configuración:
   - ¿Nombre del asistente? (default: Kai)
   - ¿Timezone? (default: America/Los_Angeles)
   - ¿Habilitar notificaciones de voz? (Y/n)
   - ¿Habilitar observability dashboard? (Y/n)

4. Instala packs en orden correcto (respetando dependencias)

5. Configura settings.json

6. Copia .env.example → .env

7. Solicita API keys críticas (las demás opcionales)

8. Verifica instalación ejecutando VERIFY.md de cada pack

9. Muestra resumen de éxito
```

---

## 7. INSTALACIÓN

### 7.1 Requisitos Previos

**Software necesario:**
- **Bun** (JavaScript runtime): `brew install oven-sh/bun/bun`
- **Claude Code** u otro AI coding assistant compatible
- **Git**
- **Node.js** (opcional, Bun lo reemplaza)

**Plataformas soportadas:**
- ✅ **macOS:** Completamente soportado (plataforma primaria de desarrollo)
- ✅ **Linux:** Completamente testeado (Ubuntu/Debian, otras distros vía comunidad)
- ⏳ **Windows:** No soportado actualmente (contribuciones de comunidad bienvenidas)

**AI Assistants compatibles:**
- ✅ **Claude Code:** Soporte completo
- ✅ **OpenCode:** Soporte completo
- ⚠️ **Cursor:** Compatible (algunos puntos de integración requieren adaptación)
- ⚠️ **Windsurf:** Compatible (algunos puntos de integración requieren adaptación)
- ⚠️ **Cline:** Compatible
- ⚠️ **Aider:** Compatible
- ⚠️ **Continue:** Compatible

### 7.2 Instalación Rápida (Bundle Method)

**Recomendado para nuevos usuarios.**

```bash
# 1. Instalar Bun
brew install oven-sh/bun/bun

# 2. Clonar repositorio
git clone https://github.com/danielmiessler/PAI.git ~/PAI

# 3. Configurar PAI_DIR
echo 'export PAI_DIR="$HOME/PAI"' >> ~/.zshrc
source ~/.zshrc

# 4. Ejecutar wizard de Kai Bundle
cd $PAI_DIR/Bundles/Kai
bun run install.ts

# 5. Configurar API keys
nano $PAI_DIR/.env
# (Añadir tus API keys)

# 6. Reiniciar Claude Code
```

### 7.3 Instalación Manual (Pack-by-Pack)

**Para usuarios avanzados que quieren cherry-pick.**

```bash
# 1-3. Igual que instalación rápida

# 4. Instalar packs individuales en orden
cd $PAI_DIR/Packs/kai-hook-system
cat INSTALL.md
# Seguir instrucciones de instalación

cd $PAI_DIR/Packs/kai-history-system
cat INSTALL.md
# Seguir instrucciones

cd $PAI_DIR/Packs/kai-core-install
cat INSTALL.md
# Seguir instrucciones

# ... y así sucesivamente
```

### 7.4 Verificación Post-Instalación

**Ejecutar VERIFY.md de cada pack instalado:**

```bash
cd $PAI_DIR/Packs/kai-core-install
cat VERIFY.md

# Ejemplo de checklist:
# ✅ $PAI_DIR variable está configurada
# ✅ CORE skill se carga en SessionStart
# ✅ settings.json contiene hooks correctos
# ✅ .env tiene API keys necesarias
# ✅ Estructura de directorios existe
```

**Comandos de verificación rápida:**

```bash
# Verificar PAI_DIR
echo $PAI_DIR
# Debe mostrar: /Users/yourname/PAI (o tu ruta)

# Verificar estructura
ls -la $PAI_DIR/.claude/Skills/CORE
# Debe mostrar: SKILL.md, CONSTITUTION.md, etc.

# Verificar hooks registrados
cat ~/.claude/settings.json | grep hooks
# Debe mostrar rutas a hooks

# Probar observability
$PAI_DIR/.claude/Observability/manage.sh start
# Visitar http://localhost:3000
```

### 7.5 Actualización de PAI

```bash
cd $PAI_DIR
git pull origin main

# Si hay cambios en packs, re-ejecutar instalación específica
cd Packs/[pack-actualizado]
cat INSTALL.md
# Seguir instrucciones de actualización
```

---

## 8. CÓDIGO FUENTE - ANÁLISIS TÉCNICO

### 8.1 Lenguajes y Runtime

**Stack tecnológico:**
- **TypeScript:** Scripts de hooks, herramientas CLI
- **Python:** Skills de scraping, procesamiento de datos
- **Bash:** Scripts de setup e instalación
- **Markdown:** Definición de skills, workflows, documentación
- **YAML:** Configuración de metadatos (frontmatter)
- **JSONL:** Logs de eventos (history)

**Runtime principal:** **Bun**
- JavaScript/TypeScript runtime ultra-rápido
- Reemplaza Node.js en PAI
- Built-in TypeScript support
- Compatible con APIs de Node.js

### 8.2 Patrón de Detección de Plataforma (TypeScript)

**Usado en todos los scripts TypeScript:**

```typescript
if (process.platform === 'darwin') {
  // macOS-specific code
  const homePath = process.env.HOME;
  const claudePath = `${homePath}/.claude`;
} else if (process.platform === 'linux') {
  // Linux-specific code
  const homePath = process.env.HOME;
  const claudePath = `${homePath}/.claude`;
} else if (process.platform === 'win32') {
  // Windows-specific code (future)
  throw new Error('Windows not yet supported');
}
```

### 8.3 Estructura de Archivos TypeScript (Ejemplo Real)

**Archivo:** `hooks/capture-all-events.ts`

```typescript
#!/usr/bin/env bun

/**
 * Universal Event Capture Hook
 * Runs on all 7 hook events and appends to daily JSONL log
 */

import { appendFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

interface HookEvent {
  timestamp: string;
  event: string;
  payload: any;
}

async function readStdin(): Promise<any> {
  const chunks: Buffer[] = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  const data = Buffer.concat(chunks).toString('utf-8');
  return JSON.parse(data);
}

async function main() {
  const PAI_DIR = process.env.PAI_DIR;
  if (!PAI_DIR) {
    console.error('ERROR: PAI_DIR not set');
    process.exit(1);
  }

  // Read event data from stdin
  const eventData = await readStdin();

  // Determine event type from environment or event data
  const eventType = process.env.HOOK_EVENT_TYPE || eventData.type;

  // Create log entry
  const logEntry: HookEvent = {
    timestamp: new Date().toISOString(),
    event: eventType,
    payload: eventData
  };

  // Ensure output directory exists
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const yearMonth = today.substring(0, 7); // YYYY-MM
  const logDir = join(PAI_DIR, 'history', 'raw-outputs', yearMonth);

  if (!existsSync(logDir)) {
    mkdirSync(logDir, { recursive: true });
  }

  // Append to daily JSONL file
  const logFile = join(logDir, `${today}_all-events.jsonl`);
  appendFileSync(logFile, JSON.stringify(logEntry) + '\n');

  // Optional: Send to observability dashboard
  if (process.env.OBSERVABILITY_ENABLED === 'true') {
    await sendToObservability(logEntry);
  }
}

async function sendToObservability(event: HookEvent) {
  const url = process.env.OBSERVABILITY_URL || 'http://localhost:3000/events';

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    });
  } catch (err) {
    // Fail silently to avoid blocking hook execution
    console.error('Failed to send to observability:', err);
  }
}

main().catch(err => {
  console.error('Hook error:', err);
  process.exit(0); // Exit 0 to avoid blocking Claude Code
});
```

### 8.4 Ejemplo de Workflow (Markdown)

**Archivo:** `.claude/Skills/Research/Workflows/AcademicResearch.md`

```markdown
# Academic Research Workflow

## Purpose
Conduct rigorous academic investigation with proper citation management.

## Inputs
- Research topic/question
- Scope parameters (date range, disciplines, etc.)
- Output format preference

## Steps

### 1. DEFINE RESEARCH QUESTION
- Clarify specific question to answer
- Identify key terms and concepts
- Define inclusion/exclusion criteria

**Output:** Clear research question statement

### 2. IDENTIFY SOURCES
- Search academic databases (Google Scholar, PubMed, arXiv)
- Prioritize peer-reviewed journals
- Include seminal papers (highly cited)
- Check for recent meta-analyses

**Tools to use:**
- `research-tool.ts --mode=academic --sources=scholar,pubmed`

**Output:** List of 10-20 relevant papers

### 3. EXTRACT KEY INFORMATION
For each paper:
- Read abstract and conclusions
- Note methodology
- Extract key findings
- Identify limitations
- Record citation metadata

**Tools to use:**
- `cite-extractor.py --format=apa`

**Output:** Structured notes per paper

### 4. SYNTHESIZE FINDINGS
- Group papers by theme/approach
- Identify consensus viewpoints
- Note conflicting findings
- Assess strength of evidence

**Output:** Synthesis document with themes

### 5. ASSESS BIAS AND QUALITY
- Check for publication bias
- Note funding sources
- Assess sample sizes and methodology
- Identify gaps in literature

**Output:** Quality assessment notes

### 6. CREATE REPORT
Structure:
1. Introduction (research question)
2. Methodology (search strategy)
3. Findings (organized by theme)
4. Discussion (synthesis + gaps)
5. Conclusion (key insights)
6. References (full bibliography)

**Output:** Final research report

## Verification Checklist
- [ ] Research question clearly stated
- [ ] Minimum 10 sources consulted
- [ ] All sources properly cited
- [ ] Conflicting viewpoints acknowledged
- [ ] Limitations discussed
- [ ] Bibliography complete and formatted
```

### 8.5 Ejemplo de Tool (TypeScript CLI)

**Archivo:** `.claude/Skills/Research/Tools/research-tool.ts`

```typescript
#!/usr/bin/env bun

/**
 * Research Tool - Multi-source aggregation
 * Usage: research-tool.ts --query="AI safety" --sources=scholar,arxiv --limit=20
 */

import { parseArgs } from 'util';

interface ResearchSource {
  name: string;
  search: (query: string, limit: number) => Promise<Paper[]>;
}

interface Paper {
  title: string;
  authors: string[];
  abstract: string;
  year: number;
  url: string;
  citations: number;
  source: string;
}

const sources: Record<string, ResearchSource> = {
  scholar: {
    name: 'Google Scholar',
    search: async (query, limit) => {
      const API_KEY = process.env.SERP_API_KEY;
      const response = await fetch(
        `https://serpapi.com/search?engine=google_scholar&q=${encodeURIComponent(query)}&num=${limit}&api_key=${API_KEY}`
      );
      const data = await response.json();
      return data.organic_results.map((r: any) => ({
        title: r.title,
        authors: r.publication_info?.authors || [],
        abstract: r.snippet,
        year: parseInt(r.publication_info?.summary?.match(/\d{4}/)?.[0] || '0'),
        url: r.link,
        citations: r.inline_links?.cited_by?.total || 0,
        source: 'Google Scholar'
      }));
    }
  },

  arxiv: {
    name: 'arXiv',
    search: async (query, limit) => {
      const response = await fetch(
        `http://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}&max_results=${limit}`
      );
      const xml = await response.text();
      // Parse XML and extract papers
      // (Implementation omitted for brevity)
      return [];
    }
  }
};

async function main() {
  const { values } = parseArgs({
    args: process.argv.slice(2),
    options: {
      query: { type: 'string', short: 'q' },
      sources: { type: 'string', short: 's', default: 'scholar' },
      limit: { type: 'string', short: 'l', default: '10' }
    }
  });

  const query = values.query as string;
  const sourceNames = (values.sources as string).split(',');
  const limit = parseInt(values.limit as string);

  console.log(`Researching: "${query}"`);
  console.log(`Sources: ${sourceNames.join(', ')}`);
  console.log(`Limit: ${limit} per source\n`);

  const allPapers: Paper[] = [];

  for (const sourceName of sourceNames) {
    const source = sources[sourceName];
    if (!source) {
      console.error(`Unknown source: ${sourceName}`);
      continue;
    }

    console.log(`Searching ${source.name}...`);
    const papers = await source.search(query, limit);
    allPapers.push(...papers);
    console.log(`  Found ${papers.length} papers\n`);
  }

  // Sort by citations (most cited first)
  allPapers.sort((a, b) => b.citations - a.citations);

  // Output as JSON
  console.log(JSON.stringify(allPapers, null, 2));
}

main().catch(console.error);
```

### 8.6 Ejemplo de Pack INSTALL.md

**Archivo:** `Packs/kai-history-system/INSTALL.md`

```markdown
# kai-history-system Installation

## Prerequisites
- kai-hook-system must be installed first
- $PAI_DIR environment variable configured

## Installation Steps

### 1. Create History Directory Structure

```bash
mkdir -p $PAI_DIR/history/{sessions,learnings,research,decisions,execution/{features,bugs,refactors},raw-outputs}
```

### 2. Copy Hook Scripts

```bash
cp src/hooks/capture-all-events.ts $PAI_DIR/.claude/hooks/
cp src/hooks/stop-hook.ts $PAI_DIR/.claude/hooks/
cp src/hooks/subagent-stop-hook.ts $PAI_DIR/.claude/hooks/
cp src/hooks/capture-session-summary.ts $PAI_DIR/.claude/hooks/
```

### 3. Copy Utility Libraries

```bash
cp -r src/hooks/lib/* $PAI_DIR/.claude/hooks/lib/
```

### 4. Register Hooks in settings.json

Add to `~/.claude/settings.json`:

```json
{
  "hooks": {
    "SessionStart": ["${PAI_DIR}/.claude/hooks/capture-all-events.ts"],
    "UserPromptSubmit": ["${PAI_DIR}/.claude/hooks/capture-all-events.ts"],
    "PreToolUse": ["${PAI_DIR}/.claude/hooks/capture-all-events.ts"],
    "PostToolUse": ["${PAI_DIR}/.claude/hooks/capture-all-events.ts"],
    "SessionEnd": ["${PAI_DIR}/.claude/hooks/capture-session-summary.ts"],
    "Stop": ["${PAI_DIR}/.claude/hooks/stop-hook.ts"],
    "SubagentStop": ["${PAI_DIR}/.claude/hooks/subagent-stop-hook.ts"]
  }
}
```

### 5. Configure Environment Variables

Add to `$PAI_DIR/.env`:

```bash
# History System
AUTO_CATEGORIZATION=true
LEARNING_KEYWORDS=learned,discovered,insight,problem solved,bug fixed
RESEARCH_KEYWORDS=investigation,analysis,findings,comparison
```

### 6. Restart Claude Code

Close and reopen Claude Code to load the new hooks.

## Verification

Run verification checklist: `cat VERIFY.md`
```

### 8.7 Ejemplo de VERIFY.md

**Archivo:** `Packs/kai-history-system/VERIFY.md`

```markdown
# kai-history-system Verification Checklist

## Directory Structure
- [ ] `$PAI_DIR/history/sessions/` exists
- [ ] `$PAI_DIR/history/learnings/` exists
- [ ] `$PAI_DIR/history/research/` exists
- [ ] `$PAI_DIR/history/raw-outputs/` exists

## Hook Scripts
- [ ] `$PAI_DIR/.claude/hooks/capture-all-events.ts` exists
- [ ] `$PAI_DIR/.claude/hooks/stop-hook.ts` exists
- [ ] `$PAI_DIR/.claude/hooks/lib/utils.ts` exists

## settings.json Configuration
- [ ] All 7 hook events registered
- [ ] Paths use `${PAI_DIR}` variable

## Environment Variables
- [ ] `AUTO_CATEGORIZATION` set in .env
- [ ] Keywords configured

## Functional Tests

### Test 1: Event Capture
1. Open Claude Code
2. Execute any command (e.g., `ls`)
3. Check `$PAI_DIR/history/raw-outputs/YYYY-MM-DD/_all-events.jsonl`
4. Verify entry exists with `PostToolUse` event

**Expected result:**
```json
{"timestamp":"2026-01-07T10:30:45Z","event":"PostToolUse","payload":{...}}
```

### Test 2: Session Summary
1. Close Claude Code
2. Check `$PAI_DIR/history/sessions/YYYY-MM/`
3. Verify session summary file exists

**Expected result:** File like `2026-01-07-session-001.md`

### Test 3: Learning Categorization
1. Ask Claude Code: "I learned that TypeScript has better type inference in v5"
2. Complete session
3. Check `$PAI_DIR/history/learnings/YYYY-MM/`
4. Verify learning was captured

**Expected result:** File containing the learning

## Troubleshooting

### Events not captured
- Verify hooks are registered in settings.json
- Check `$PAI_DIR` is set correctly
- Ensure write permissions on history/ directory

### Categories not working
- Check `AUTO_CATEGORIZATION=true` in .env
- Verify keywords are configured
- Look for errors in Claude Code console
```

---

## 9. PAI VS FABRIC

### 9.1 Comparación Conceptual

| Aspecto | Fabric | PAI |
|---------|--------|-----|
| **Propósito** | QUÉ preguntar a la AI | CÓMO opera tu AI |
| **Tipo** | Colección de prompts (patterns) | Infraestructura de sistema AI |
| **Enfoque** | Crowdsourced prompts para tareas comunes | Sistema personalizado con memoria y contexto |
| **Uso principal** | Apply patterns a cualquier input | Build AI assistant personalizado |
| **Persistencia** | Sin memoria entre sesiones | Memoria persistente (history system) |
| **Personalización** | Patterns genéricos reutilizables | Totalmente personalizado a tu contexto |
| **Routing** | Manual (eliges qué pattern usar) | Automático (routing inteligente) |

### 9.2 Ejemplo Comparativo

**Tarea:** "Extrae insights clave de este artículo"

**Con Fabric:**
```bash
cat article.txt | fabric --pattern extract_wisdom
```
- Aplicas el pattern `extract_wisdom`
- Obtienes resultado
- No hay memoria de que lo hiciste
- Próxima vez debes recordar usar ese pattern

**Con PAI:**
```
User: "Research this article and extract key insights"
```
- PAI detecta intención → Activa Research Skill
- Research Skill ejecuta workflow apropiado
- Resultado guardado en `history/research/`
- Próxima solicitud similar → PAI recuerda contexto anterior
- Puede integrar Fabric patterns dentro de workflows

### 9.3 Integración

**PAI + Fabric = Mejor de ambos mundos**

```markdown
# .claude/Skills/ContentCreation/Workflows/BlogPost.md

## Step 3: Extract Key Points

Use Fabric pattern for initial extraction:

```bash
cat research.md | fabric --pattern extract_wisdom > key_points.md
```

Then enhance with PAI context about audience preferences and writing style.
```

---

## 10. ARQUITECTURA PAI vs KAI

### 10.1 Separación de Conceptos

**PAI (Public Repository):**
- Plantilla pública y sanitizada
- Infraestructura fundamental
- Packs genéricos reutilizables
- Sin información personal

**Kai (Private Instance):**
- Sistema de Daniel Miessler
- Altamente personalizado
- Información personal y contexto único
- O cualquier instancia privada de usuario

**Relación:**
```
PAI (template público)
  ↓
Usuario clona y personaliza
  ↓
"Mi Kai" (instancia privada del usuario)
```

### 10.2 De PAI v1 a v2

**PAI v1.x (Enfoque "Mirrored System"):**
- ❌ Sistema monolítico
- ❌ "Jenga tower" de dependencias interconectadas
- ❌ Cambiar una cosa rompía tres más
- ❌ Usuarios no podían adoptar partes sin entender el todo
- ❌ Actualizaciones eran pesadilla

**PAI v2.0 (Enfoque Modular con Packs):**
- ✅ Auto-contenido (cada pack funciona independientemente)
- ✅ Instalable independientemente (añade lo que necesitas)
- ✅ Platform-agnostic (Claude Code, OpenCode, Cursor, etc.)
- ✅ AI-installable (tu AI puede leer pack e instalarlo)
- ✅ Batalla-testeados (capacidades probadas en producción)

---

## 11. PRINCIPIOS CORE DEL SISTEMA

### 11.1 Patrón Universal

**Outer Loop:** Current State → Desired State via verifiable iteration

**Inner Loop (7-Phase Scientific Method):**
```
OBSERVE → THINK → PLAN → BUILD → EXECUTE → VERIFY → LEARN
```

**Insight crítico:** Verificabilidad es todo. Si no puedes medir si alcanzaste el estado deseado, solo estás adivinando.

### 11.2 Niveles de Madurez AI

| Nivel | Nombre | Periodo | Descripción | PAI Opera Aquí |
|-------|--------|---------|-------------|----------------|
| 1 | Generative | 2022-2024 | AI genera texto/imágenes | ❌ |
| 2 | Agentic | 2025-2027 | AI usa tools, llama APIs, toma acciones | ✅ PAI v2 |
| 3 | Workflows | 2026-2028 | Automatización de procesos completos | ⚠️ Parcial |
| 4 | Self-Managing | 2028+ | Sistema auto-gestionado, mejora continua | 🎯 Objetivo |

**PAI v2 opera en Nivel 2 (Agentic) con componentes de Nivel 3.**

El objetivo es alcanzar Nivel 4 donde el sistema se vuelve auto-gestionado y continuamente mejorante.

### 11.3 Tres Pilares de PAI

**1. Engine (Claude Code)**
- AI agent subyacente que ejecuta comandos
- Procesa prompts
- Interactúa con herramientas

**2. Middleware (Hooks)**
- System de event listeners
- Intercepta operaciones de Claude Code
- Enforce security, inject context, log activity

**3. Content (Packs)**
- Bundles modulares de markdown + scripts
- Define Skills (workflows), Tools (código), Identity (system prompts)

---

## 12. SEGURIDAD

### 12.1 Principios de Seguridad

**Regla fundamental:** Comandos vienen SOLO de:
- Instrucciones del usuario
- Configuración core de PAI

**Vectores de ataque identificados:**
- ❌ Web scraping (instrucciones maliciosas en HTML)
- ❌ Document parsing (comandos ocultos en PDF metadata)
- ❌ API responses (instrucciones de ataque en JSON)
- ❌ User-provided files ("IGNORE PREVIOUS INSTRUCTIONS" attacks)
- ❌ Git repos (README files con intentos de hijack)

### 12.2 Validación de Seguridad (PreToolUse Hook)

**Comandos bloqueados:**
```typescript
const UNSAFE_PATTERNS = [
  /rm\s+-rf/,           // Borrado recursivo
  /sudo\s+/,            // Escalación de privilegios
  /dd\s+if=/,           // Escritura directa a disco
  />\s*\/dev\/sd/,      // Sobrescritura de dispositivos
  /chmod\s+777/,        // Permisos inseguros
  /curl.*\|\s*bash/,    // Pipe a bash desde internet
  /wget.*\|\s*sh/       // Similar a anterior
];
```

### 12.3 Protección SSRF (Server-Side Request Forgery)

**IPs bloqueadas:**
```typescript
const SSRF_BLOCKED_IPS = [
  '127.0.0.1',
  'localhost',
  '0.0.0.0',
  '169.254.169.254',    // AWS metadata endpoint
  /^10\./,              // Private network 10.x.x.x
  /^172\.(1[6-9]|2\d|3[01])\./,  // Private 172.16-31.x.x
  /^192\.168\./         // Private 192.168.x.x
];
```

### 12.4 URL Validation

**Esquema permitido:**
- ✅ `http://`
- ✅ `https://`
- ❌ `file://`
- ❌ `ftp://`
- ❌ `gopher://`

**Character allowlisting:**
```typescript
const VALID_URL_REGEX = /^https?:\/\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]+$/;
```

### 12.5 Gestión de Secretos

**Reglas estrictas:**
- ❌ NUNCA commitear .env a git
- ❌ NUNCA almacenar API keys en pack files, configs o código
- ✅ TODA autenticación fluye a través de `$PAI_DIR/.env`
- ✅ UN archivo, UNA ubicación

**.gitignore asegura:**
```
.env
*.env
.env.local
.env.*.local
```

---

## 13. OBSERVABILIDAD

### 13.1 Dashboard en Tiempo Real

**Ubicación:** `.claude/Observability/`

**Características:**
- WebSocket streaming de toda actividad del agente
- Gráficos de pulso en vivo
- Event timelines
- Swim lanes para múltiples agentes
- Temas: Tokyo Night, Nord, Catppuccin

**Inicio:**
```bash
$PAI_DIR/.claude/Observability/manage.sh start
# Visita http://localhost:3000
```

### 13.2 Captura de Eventos

**Hook universal:** `capture-all-events.ts`

**Corre en 7 eventos:**
1. SessionStart
2. UserPromptSubmit
3. PreToolUse
4. PostToolUse
5. SessionEnd
6. Stop
7. SubagentStop

**Output:** JSONL entries en `history/raw-outputs/YYYY-MM-DD/_all-events.jsonl`

### 13.3 Visualización

**Ejemplo de dashboard:**
```
┌─────────────────────────────────────────────────┐
│ Kai Dashboard - Tokyo Night Theme               │
├─────────────────────────────────────────────────┤
│ Active Agents: 3                                │
│ ┌─ Researcher ───────────────────┐              │
│ │ Status: Active                 │              │
│ │ Task: Investigating AI trends  │              │
│ │ Progress: ████████░░ 80%       │              │
│ └────────────────────────────────┘              │
│ ┌─ Coder ────────────────────────┐              │
│ │ Status: Idle                   │              │
│ └────────────────────────────────┘              │
│ ┌─ Writer ───────────────────────┐              │
│ │ Status: Active                 │              │
│ │ Task: Drafting blog post       │              │
│ │ Progress: ███░░░░░░░ 30%       │              │
│ └────────────────────────────────┘              │
├─────────────────────────────────────────────────┤
│ Event Timeline (last 10)                        │
│ 10:45:23 │ PreToolUse  │ bash: ls -la          │
│ 10:45:24 │ PostToolUse │ Exit code: 0          │
│ 10:45:30 │ UserPrompt  │ "Research AI safety"  │
│ 10:45:31 │ PreToolUse  │ fetch: openai.com     │
│ ...                                             │
└─────────────────────────────────────────────────┘
```

---

## 14. CASOS DE USO AVANZADOS

### 14.1 Patrón "Swarm" (Agentes Paralelos)

**Escenario:** Investigar 5 empresas AI simultáneamente

**Comando:**
```
User: "Research these 5 AI companies in parallel: OpenAI, Anthropic, DeepMind, Cohere, Mistral"
```

**Proceso:**
1. PAI detecta intención de investigación paralela
2. Spawn 5 Researcher agents (subagents)
3. Cada uno investiga una empresa
4. Resultados vuelven conforme completan
5. Voice system anuncia cada resultado con voz única
6. History system captura todas las investigaciones

**Ventaja:**
- 5x más rápido que secuencial
- Cada agente especializado en su tarea
- Fácil identificar qué agente reporta (por voz)

### 14.2 Auto-Mejora del Sistema

**Flujo:**

```
1. Usuario trabaja en proyecto
   ↓
2. AI completa tareas → History system captura
   ↓
3. Patrones recurrentes identificados
   ↓
4. AI propone: "He notado que haces X frecuentemente.
   ¿Quiero crear un Skill para automatizar?"
   ↓
5. Usuario acepta → AI genera SKILL.md
   ↓
6. Nuevo skill disponible para futuras tareas
```

### 14.3 Integración con MCP (Model Context Protocol)

**Nota:** PAI prefiere code-first approach (como kai-browser-skill con Playwright)

**Razón:** 99% ahorro de tokens vs MCP

**Pero:** MCP integration posible para casos donde sea necesario

---

## 15. TROUBLESHOOTING COMÚN

### 15.1 Hooks No Se Ejecutan

**Síntomas:**
- CORE skill no carga en SessionStart
- Eventos no aparecen en history/raw-outputs/
- Observability dashboard vacío

**Diagnóstico:**
```bash
# Verificar PAI_DIR
echo $PAI_DIR

# Verificar settings.json
cat ~/.claude/settings.json | grep hooks

# Verificar permisos
ls -la $PAI_DIR/.claude/hooks/
```

**Soluciones:**
- Asegurar `$PAI_DIR` está configurado en shell rc file
- Verificar paths en settings.json usan `${PAI_DIR}`
- Dar permisos de ejecución: `chmod +x $PAI_DIR/.claude/hooks/*.ts`
- Reiniciar Claude Code

### 15.2 API Keys No Funcionan

**Síntomas:**
- Skills que requieren APIs fallan
- Errores de autenticación

**Diagnóstico:**
```bash
# Verificar .env existe
ls -la $PAI_DIR/.env

# Verificar contenido (sin mostrar keys)
grep -v "=" $PAI_DIR/.env | head
```

**Soluciones:**
- Copiar .env.example a .env
- Rellenar API keys correctas
- Reiniciar Claude Code para recargar env vars

### 15.3 History No Categoriza Correctamente

**Síntomas:**
- Todos outputs van a "sessions", no a "learnings" o "research"

**Diagnóstico:**
```bash
# Verificar configuración
grep AUTO_CATEGORIZATION $PAI_DIR/.env
grep LEARNING_KEYWORDS $PAI_DIR/.env
```

**Soluciones:**
- Asegurar `AUTO_CATEGORIZATION=true`
- Personalizar keywords a tu vocabulario
- Forzar categorización con palabras clave explícitas en prompts

---

## 16. ROADMAP Y FUTURO

### 16.1 Plataformas

**Estado actual:**
- ✅ macOS: Completamente soportado
- ✅ Linux: Completamente testeado
- ⏳ Windows: Contribuciones de comunidad bienvenidas

### 16.2 Nuevos Packs Planeados

(Basado en discusiones de comunidad, no confirmado oficialmente)

- kai-testing-framework
- kai-docs-generator
- kai-security-audit-skill
- kai-devops-skill
- kai-data-analysis-skill

### 16.3 Evolución a Nivel 4 AI Maturity

**Objetivo:** Sistema auto-gestionado

**Características futuras:**
- Auto-detección de gaps en capabilities
- Auto-generación de Skills para tareas recurrentes
- Auto-optimización de workflows
- Aprendizaje continuo sin intervención humana

---

## CONCLUSIÓN

PAI representa un cambio fundamental en cómo construimos sistemas AI personales:

**De:** AI genéricos sin memoria
**A:** Asistentes personalizados que aprenden y mejoran

**De:** Sistemas monolíticos difíciles de mantener
**A:** Arquitectura modular con packs independientes

**De:** Configuración manual repetitiva
**A:** Infraestructura automatizada con hooks

**Filosofía central:**
> "Trabaja normalmente. La infraestructura maneja la memoria, el contexto y la mejora continua."

---

## RECURSOS Y FUENTES

### Repositorios
- [GitHub - danielmiessler/PAI](https://github.com/danielmiessler/PAI)
- [GitHub - danielmiessler/Personal_AI_Infrastructure](https://github.com/danielmiessler/Personal_AI_Infrastructure)

### Documentación
- [Building a Personal AI Infrastructure (Blog Post)](https://danielmiessler.com/blog/personal-ai-infrastructure)
- [DeepWiki - PAI Documentation](https://deepwiki.com/danielmiessler/PAI)
- [Getting Started Guide](https://deepwiki.com/danielmiessler/PAI/3-kai-agent-system)

### Archivos Clave del Repositorio
- [PACKS.md](https://github.com/danielmiessler/Personal_AI_Infrastructure/blob/main/PACKS.md)
- [PLATFORM.md](https://github.com/danielmiessler/Personal_AI_Infrastructure/blob/main/PLATFORM.md)
- [kai-core-install Pack](https://github.com/danielmiessler/Personal_AI_Infrastructure/tree/main/Packs/kai-core-install)
- [kai-history-system Pack](https://github.com/danielmiessler/Personal_AI_Infrastructure/blob/main/Packs/kai-history-system.md)
- [PAI Pack Template](https://github.com/danielmiessler/Personal_AI_Infrastructure/blob/main/Tools/PAIPackTemplate.md)

### Comparaciones y Context
- [Is Opencode as Smart as Claude Code?](https://danielmiessler.com/blog/opencode-vs-claude-code)
- [How My Projects Fit Together](https://danielmiessler.com/blog/how-my-projects-fit-together)
- [Why I Created Fabric](https://danielmiessler.com/blog/fabric-origin-story)

---

**Documento generado:** 2026-01-07
**Análisis realizado por:** Claude (Sonnet 4.5)
**Para proyecto:** LiderarConsciencia AI Infrastructure Research
