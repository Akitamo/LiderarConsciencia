# ADR-001: Arquitectura del Sistema de Extracción y Clasificación de Referencias Bibliográficas

**Estado:** Aprobado  
**Fecha:** 2026-01-10  
**Contexto:** Proyecto "Liderar con Consciencia"  
**Alcance:** Sistema automatizado para enriquecer módulos del curso con referencias académicas

---

## Resumen Ejecutivo

Este documento establece la arquitectura definitiva para el sistema de extracción y clasificación de referencias bibliográficas del proyecto "Liderar con Consciencia". Tras analizar múltiples propuestas arquitectónicas (6 documentos de análisis comparativo + 2 valoraciones adicionales), se ha optado por una **arquitectura híbrida de pipeline documental con orquestación programática**, donde Claude actúa como motor de transformación semántica dentro de un flujo controlado por código determinista.

La decisión clave es reconocer que este sistema es un **pipeline de procesamiento documental asistido por LLM**, no un sistema de agentes autónomos. Esta distinción fundamental determina toda la arquitectura.

---

## Índice

1. [Contexto y Problema](#1-contexto-y-problema)
2. [Diagnóstico: Pipeline vs Sistema Agéntico](#2-diagnóstico-pipeline-vs-sistema-agéntico)
3. [Análisis de Alternativas](#3-análisis-de-alternativas)
4. [Decisión Arquitectónica](#4-decisión-arquitectónica)
5. [Arquitectura Detallada](#5-arquitectura-detallada)
6. [Uso de Primitivas de Claude Code](#6-uso-de-primitivas-de-claude-code)
7. [Principios de Diseño](#7-principios-de-diseño)
8. [Plan de Ejecución](#8-plan-de-ejecución)
9. [Evolución Futura](#9-evolución-futura)
10. [Referencias](#10-referencias)

---

## 1. Contexto y Problema

### 1.1 Objetivo del Sistema

Desarrollar un sistema automatizado que:

1. **Extraiga** referencias bibliográficas de documentos PDF académicos
2. **Clasifique** cada referencia según su relevancia para los 7 módulos del curso
3. **Genere** archivos Markdown estructurados (`m0X-11-referencias-mindfulness.md`) con ~5 referencias seleccionadas por módulo
4. **Verifique** la calidad y consistencia del resultado

### 1.2 Documento Fuente del Piloto

- **Título:** "¿Qué sabemos del mindfulness?" (García Campayo & Demarzo, Kairós 2018)
- **Extensión:** 672 páginas, texto nativo (no OCR)
- **Bibliografía:** Centralizada desde página ~641
- **Formato de citas:** APA-like con variaciones
- **Estimación:** ~150-200 referencias bibliográficas

### 1.3 Problemas Identificados en el Parsing

| Problema | Descripción | Impacto |
|----------|-------------|---------|
| Saltos de línea intra-cita | Las citas se parten en múltiples líneas | Fragmentación de datos |
| Hifenación | Palabras cortadas con guión al final de línea | Tokens corruptos |
| Marcas de agua | Texto repetitivo superpuesto | Ruido en extracción |
| Citas entre páginas | Una cita comienza en una página y termina en otra | Pérdida de información |
| Variaciones de autor | "y cols.", "et al.", "& otros" | Inconsistencia en normalización |
| Formatos mixtos | APA, Chicago, variantes españolas | Parsing no uniforme |

### 1.4 Requisitos No Funcionales

| Requisito | Descripción |
|-----------|-------------|
| **Automatización** | Mínima intervención manual en el flujo normal |
| **Checkpoints** | Capacidad de reanudar desde cualquier fase sin reprocesar anteriores |
| **Reutilización** | Arquitectura aplicable a múltiples documentos fuente |
| **Prompts externalizados** | Instrucciones para Claude en archivos editables, no embebidas en código |
| **Verificabilidad** | Cada paso produce artefactos inspeccionables |
| **Compatibilidad** | Funcional en Windows 11 con Claude Code Max |

### 1.5 Los 7 Módulos del Curso

| Módulo | Nombre | Temáticas Clave |
|--------|--------|-----------------|
| M01 | Consciente de LO QUE SOY | Neurociencia, cerebro, atención, mindfulness básico |
| M02 | Consciente de CÓMO ESTOY | Interocepción, conexión cuerpo-mente, sensaciones |
| M03 | Consciente de LO QUE PIENSO-SIENTO | Emociones, regulación emocional, cognición |
| M04 | Consciente de LO QUE NECESITO | Estrés, burnout, resiliencia, autocuidado |
| M05 | Consciente de LO QUE NECESITAMOS | Liderazgo, empatía, compasión, comunicación |
| M06 | Consciente de LO QUE QUIERO | Propósito, toma de decisiones, atención sostenida |
| M07 | Consciente de LO QUE ESTÁ BIEN | Ética, valores, liderazgo consciente |

---

## 2. Diagnóstico: Pipeline vs Sistema Agéntico

### 2.1 La Distinción Fundamental

El análisis de las propuestas reveló una confusión conceptual persistente: tratar el problema como si requiriera un "sistema de agentes autónomos" cuando en realidad es un **pipeline de procesamiento documental**.

> "Lo que describes encaja más con un pipeline documental (ETL/ELT) asistido por LLM que con un sistema de agentes autónomos en sentido fuerte."

Esta distinción no es semántica; determina decisiones arquitectónicas críticas:

| Dimensión | Pipeline Documental | Sistema Agéntico |
|-----------|---------------------|------------------|
| **Flujo de control** | Predefinido y secuencial | Emergente y dinámico |
| **Rol del LLM** | Componente de transformación | Tomador de decisiones |
| **Control** | Determinista (código) | Probabilístico (modelo) |
| **Estado** | Checkpoints simples (archivos) | Grafos de estado complejos |
| **Debugging** | Inspeccionar archivos intermedios | Analizar trazas de razonamiento |
| **Reproducibilidad** | Alta | Variable |
| **Escalabilidad** | Trivial (iterar sobre archivos) | Compleja (coordinar agentes) |

### 2.2 Por Qué Este Problema Es un Pipeline

Nuestro flujo tiene características inequívocas de pipeline:

1. **Secuencia fija:** Extraer → Normalizar → Clasificar → Generar → Verificar
2. **Transformaciones definidas:** Cada paso tiene entrada y salida conocidas
3. **Sin decisiones de alto nivel:** El LLM no decide "qué hacer", solo "cómo transformar"
4. **Necesidad de reproducibilidad:** Queremos resultados consistentes
5. **Checkpoints críticos:** Debemos poder reanudar sin reprocesar

### 2.3 Implicaciones para la Arquitectura

Esta caracterización implica:

- **El control del flujo debe vivir fuera del LLM** (en código determinista)
- **El LLM es un "motor semántico"** invocado en pasos específicos
- **Las primitivas de Claude Code (Skills, Subagentes, Hooks) son herramientas de empaquetado**, no de control
- **La arquitectura debe optimizar para depuración e inspección**, no para autonomía

---

## 3. Análisis de Alternativas

Se evaluaron 8 documentos de análisis con diferentes propuestas arquitectónicas. A continuación se sintetizan las tres líneas principales y sus variantes.

### 3.1 Línea A: Skill Monolítica Orquestadora

**Propuesta:** Una única Skill de Claude Code que contiene las 4 fases secuenciales, con scripts auxiliares para tareas específicas.

**Estructura:**
```
.claude/skills/
└── bib-pipeline/
    └── SKILL.md  ← Contiene todo: extracción, clasificación, generación, verificación
```

**Ventajas:**
- Mínima coordinación externa
- Una sola "entrada" para el usuario
- Curva de aprendizaje suave dentro de Claude Code

**Riesgos:**
- Sesiones frágiles con documentos grandes (saturación de contexto)
- Compactaciones automáticas pueden perder información crítica
- Debugging difícil ("caja negra")
- El LLM puede "olvidar" instrucciones anteriores en conversaciones largas

**Veredicto:** ❌ No recomendada para este caso. La fragilidad ante documentos grandes y la dificultad de debugging la descalifican.

### 3.2 Línea B: Multi-Subagente por Fase

**Propuesta:** Un agente orquestador que delega a 4 subagentes especializados (Extractor, Clasificador, Generador, Verificador), con Skills compartidas para conocimiento común.

**Estructura:**
```
.claude/agents/
├── orquestador.md
├── extractor.md
├── clasificador.md
├── generador.md
└── verificador.md
.claude/skills/
└── citas-academicas/
    └── SKILL.md  ← Conocimiento compartido
```

**Ventajas:**
- Aislamiento de contexto por fase (cada subagente tiene ventana limpia)
- Modularidad elegante dentro del ecosistema Claude Code
- Potencial paralelismo en escenarios avanzados

**Riesgos:**
- Sobrecarga operativa significativa (cada subagente = nueva invocación API)
- Complejidad de coordinación (el orquestador debe pasar contexto explícitamente)
- Para flujo lineal, el aislamiento no aporta valor proporcional al coste
- Los subagentes no pueden invocar otros subagentes (sin anidamiento)

**Veredicto:** ⚠️ Válida pero sobredimensionada para el piloto. El flujo es lineal y el aislamiento de contexto no justifica la complejidad. Reservar para escenarios con múltiples PDFs en paralelo.

### 3.3 Línea C: Orquestación Programática Externa

**Propuesta:** Un script (Python/Bash) controla el flujo completo, invocando Claude en modo headless por fases, con checkpoints en archivos JSON/Markdown.

**Estructura:**
```
scripts/
└── run_pipeline.py  ← Control del flujo
_ai/prompts/
├── extract_refs.md
├── classify_refs.md
├── generate_module_md.md
└── verify.md
data/
├── work/          ← Checkpoints intermedios
└── output/        ← Resultados finales
```

**Ventajas:**
- **Determinismo total:** El flujo está en código, no en probabilidades
- **Checkpoints reales:** Si falla clasificación, no se repite extracción
- **Debugging trivial:** Cada fase produce archivos inspeccionables
- **Escalabilidad natural:** Procesar N documentos = iterar sobre N archivos
- **Independencia del LLM:** Podría cambiarse Claude por otro modelo sin rediseñar

**Riesgos:**
- Requiere escribir código (mitigable: Claude Code puede generarlo)
- Setup de entorno (dependencias Python para PDF)

**Veredicto:** ✅ Recomendada como base arquitectónica. Combina control determinista con capacidades semánticas del LLM.

### 3.4 Matriz Comparativa Consolidada

| Criterio | A: Skill Monolítica | B: Multi-Subagente | C: Orquestación Externa |
|----------|---------------------|---------------------|-------------------------|
| **Determinismo** | ★★☆☆☆ | ★★★☆☆ | ★★★★★ |
| **Checkpoints** | ★★☆☆☆ | ★★★☆☆ | ★★★★★ |
| **Debugging** | ★★☆☆☆ | ★★★☆☆ | ★★★★★ |
| **Escalabilidad** | ★★☆☆☆ | ★★★★☆ | ★★★★★ |
| **Simplicidad inicial** | ★★★★★ | ★★★☆☆ | ★★★★☆ |
| **Consumo de tokens** | ★★★☆☆ | ★★☆☆☆ | ★★★★★ |
| **Mantenibilidad** | ★★★☆☆ | ★★★★☆ | ★★★★★ |
| **Usa primitivas Claude Code** | ★★★★★ | ★★★★★ | ★★★☆☆ |

---

## 4. Decisión Arquitectónica

### 4.1 Arquitectura Elegida

**Arquitectura Híbrida: Pipeline de Orquestación Programática con Componentes Agénticos como Empaquetado**

Esta arquitectura:

1. **Ubica el control del flujo en código determinista** (Python)
2. **Usa Claude como motor de transformación semántica** en pasos específicos
3. **Emplea primitivas de Claude Code (Skills, Hooks) para ergonomía**, no para control
4. **Produce checkpoints inspeccionables** entre cada fase
5. **Separa claramente capas deterministas y semánticas**

### 4.2 Justificación de la Decisión

| Factor | Peso | Justificación |
|--------|------|---------------|
| **Reproducibilidad** | Alto | El curso requiere referencias verificables; no podemos tolerar variabilidad entre ejecuciones |
| **Debugging** | Alto | Con ~150 citas y 7 módulos, necesitamos poder inspeccionar dónde falló una clasificación |
| **Reutilización** | Alto | El sistema debe servir para múltiples documentos fuente |
| **Checkpoints** | Alto | Un PDF de 672 páginas puede fallar a mitad; re-procesar todo es inaceptable |
| **Complejidad** | Medio | El piloto debe ser simple; la sofisticación viene después |
| **Uso de Claude Code** | Bajo | Las primitivas son útiles pero no esenciales para el objetivo |

### 4.3 Lo que NO elegimos (y por qué)

| Opción Descartada | Razón |
|-------------------|-------|
| Skill monolítica | Fragilidad ante documentos grandes, debugging opaco |
| Multi-subagente como eje | Sobredimensionado para flujo lineal, coste operativo no justificado |
| Workflow declarativo puro | No existe oficialmente en Claude Code; los "workflows" son patrones, no primitivas |
| Claude Agent SDK | Prematuro; es para productización, no para piloto de validación |

---

## 5. Arquitectura Detallada

### 5.1 Vista General del Sistema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ORQUESTADOR (Python)                                │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  • Controla secuencia de fases                                        │  │
│  │  • Gestiona checkpoints JSON                                          │  │
│  │  • Invoca Claude en modo headless                                     │  │
│  │  • Maneja errores y reintentos                                        │  │
│  │  • Valida esquemas entre fases                                        │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PIPELINE DE 6 CAPAS                                      │
│                                                                             │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                    │
│   │   CAPA A    │    │   CAPA B    │    │   CAPA C    │                    │
│   │   Ingesta   │───▶│ Extracción  │───▶│Normalización│                    │
│   │   (Python)  │    │  (Claude)   │    │  (Python)   │                    │
│   └─────────────┘    └─────────────┘    └─────────────┘                    │
│         │                  │                  │                             │
│         ▼                  ▼                  ▼                             │
│   bibliography.txt   refs_raw.json     refs_norm.json                      │
│                            │                                                │
│                      [CHECKPOINT                                            │
│                       DE ORO]                                               │
│                                                                             │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                    │
│   │   CAPA D    │    │   CAPA E    │    │   CAPA F    │                    │
│   │Clasificación│───▶│ Generación  │───▶│Verificación │                    │
│   │  (Claude)   │    │  (Claude)   │    │  (Híbrido)  │                    │
│   └─────────────┘    └─────────────┘    └─────────────┘                    │
│         │                  │                  │                             │
│         ▼                  ▼                  ▼                             │
│  refs_classified.json  m01-...md         report.md                         │
│                        m02-...md                                            │
│                        ...                                                  │
│                        m07-...md                                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Descripción de las 6 Capas

#### CAPA A: Ingesta de PDF (Determinista)

**Función:** Extraer texto crudo de las páginas de bibliografía del PDF.

**Entrada:** 
- Archivo PDF fuente
- Configuración de rango de páginas (641-672)

**Proceso:**
1. Leer PDF con librería de extracción (pdfplumber recomendado)
2. Extraer texto de páginas especificadas
3. Limpiar ruido conocido (marcas de agua, encabezados repetitivos)
4. Recomponer líneas fragmentadas (heurísticas básicas)
5. Detectar y marcar saltos de página

**Salida:** `work/<doc_id>/bibliography.txt`

**Naturaleza:** 100% determinista, sin LLM.

#### CAPA B: Extracción de Referencias (Semántica)

**Función:** Parsear el texto de bibliografía en referencias estructuradas.

**Entrada:** 
- `bibliography.txt`
- Prompt de extracción (`_ai/prompts/extract_refs.md`)
- Schema JSON de referencia

**Proceso:**
1. Claude lee el texto de bibliografía
2. Identifica cada referencia individual
3. Extrae campos: autores, año, título, fuente, DOI, páginas
4. Preserva texto original de cada cita
5. Marca citas problemáticas con flags de calidad

**Salida:** `work/<doc_id>/refs_raw.json`

**Naturaleza:** Semántica (LLM). Este es el **"Checkpoint de Oro"**: una vez conseguido, todo lo demás es experimentación barata.

#### CAPA C: Normalización y Deduplicación (Determinista)

**Función:** Limpiar, normalizar y deduplicar las referencias extraídas.

**Entrada:** `refs_raw.json`

**Proceso:**
1. Normalizar títulos (lowercase, sin puntuación extra)
2. Normalizar nombres de autores (formato consistente)
3. Generar `ref_id` estable basado en contenido
4. Deduplicar por DOI (si existe) o por (título_norm + año + primer_autor)
5. Marcar duplicados encontrados

**Salida:** `work/<doc_id>/refs_norm.json`

**Naturaleza:** 100% determinista. Puede incluir llamada opcional a LLM para casos ambiguos.

#### CAPA D: Clasificación por Módulo (Semántica)

**Función:** Asignar cada referencia a uno o más módulos del curso.

**Entrada:**
- `refs_norm.json`
- Configuración de módulos (`_ai/config/modules.yaml`)
- Prompt de clasificación (`_ai/prompts/classify_refs.md`)

**Proceso:**
1. Claude evalúa cada referencia contra los 7 módulos
2. Asigna módulos relevantes (relación 1:N)
3. Calcula nivel de confianza por asignación
4. Identifica keywords detectados
5. Genera evidencia breve (frase justificativa)

**Salida:** `work/<doc_id>/refs_classified.json`

**Estructura de salida por referencia:**
```yaml
- ref_id: "ref_001"
  modulos_asignados:
    - modulo: "M01"
      confianza: 0.92
      keywords: ["neurociencia", "atención"]
      evidencia: "Estudio sobre correlatos neurales de la atención plena"
    - modulo: "M04"
      confianza: 0.67
      keywords: ["estrés"]
      evidencia: "Menciona reducción de cortisol"
```

**Naturaleza:** Semántica (LLM).

#### CAPA E: Selección y Generación de Markdown (Híbrida)

**Función:** Seleccionar las mejores referencias por módulo y generar archivos Markdown.

**Entrada:**
- `refs_classified.json`
- Template de módulo (`_ai/templates/modulo.md`)
- Reglas de selección (top N, umbral de confianza)

**Proceso:**
1. Por cada módulo, ordenar referencias por confianza
2. Seleccionar top 5 (configurable)
3. Aplicar criterios adicionales (diversidad de fuentes, recencia)
4. Generar Markdown con YAML frontmatter
5. Incluir sección "pendientes de revisión" si hay gaps

**Salida:** 
- `output/m01-11-referencias-mindfulness.md`
- `output/m02-11-referencias-mindfulness.md`
- ... (7 archivos)

**Naturaleza:** Híbrida. Selección puede ser reglas; generación usa LLM para prose.

#### CAPA F: Verificación (Determinista + Semántica Opcional)

**Función:** Validar calidad y consistencia del resultado final.

**Entrada:**
- `refs_classified.json`
- Archivos Markdown generados
- Schemas de validación

**Proceso:**
1. Validar esquemas JSON (estructura correcta)
2. Verificar campos obligatorios presentes
3. Contar referencias por módulo (alertar si < 5)
4. Detectar duplicados entre módulos
5. (Opcional) Self-check LLM: ¿las asignaciones tienen sentido?
6. Generar reporte de métricas

**Salida:** `output/report.md`

**Métricas del reporte:**
- Total referencias extraídas
- Total tras deduplicación
- Referencias por módulo
- % con confianza alta (>0.8)
- % marcados "needs_review"
- Duplicados entre módulos

**Naturaleza:** Principalmente determinista, con LLM opcional para validación semántica.

### 5.3 Flujo de Checkpoints

```
PDF Fuente
    │
    ▼
┌─────────────────────────────────────────────────┐
│ Checkpoint 0: bibliography.txt                  │
│ • Texto crudo de bibliografía                   │
│ • Permite re-ejecutar desde Capa B              │
└─────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────┐
│ Checkpoint 1: refs_raw.json [CHECKPOINT DE ORO] │
│ • Referencias parseadas                         │
│ • Activo más valioso del pipeline               │
│ • Permite experimentar clasificación sin coste  │
└─────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────┐
│ Checkpoint 2: refs_norm.json                    │
│ • Referencias normalizadas y deduplicadas       │
│ • Listas para clasificación                     │
└─────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────┐
│ Checkpoint 3: refs_classified.json              │
│ • Asignaciones a módulos con confianza          │
│ • Permite regenerar Markdown sin reclasificar   │
└─────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────┐
│ Checkpoint Final: m0X-...md + report.md         │
│ • Artefactos entregables                        │
│ • Integración con repositorio del curso         │
└─────────────────────────────────────────────────┘
```

### 5.4 Gestión de Estado del Pipeline

El orquestador mantiene un archivo de estado que permite reanudación:

```yaml
# work/<doc_id>/pipeline_state.yaml
pipeline_id: "mindfulness-book-2026-01"
documento_fuente: "que-sabemos-mindfulness.pdf"
created_at: "2026-01-10T10:00:00Z"
updated_at: "2026-01-10T14:30:00Z"

fases:
  ingesta:
    status: completed
    timestamp: "2026-01-10T10:15:00Z"
    output: "bibliography.txt"
    
  extraccion:
    status: completed
    timestamp: "2026-01-10T11:00:00Z"
    output: "refs_raw.json"
    stats:
      total_citas: 156
      
  normalizacion:
    status: completed
    timestamp: "2026-01-10T11:10:00Z"
    output: "refs_norm.json"
    stats:
      total_norm: 148
      duplicados_eliminados: 8
      
  clasificacion:
    status: in_progress
    timestamp: "2026-01-10T14:30:00Z"
    progress: 67/148
    
  generacion:
    status: pending
    
  verificacion:
    status: pending
```

---

## 6. Uso de Primitivas de Claude Code

### 6.1 Posicionamiento Estratégico

Las primitivas de Claude Code (CLAUDE.md, Skills, Subagentes, Hooks, Rules) son **herramientas de empaquetado y ergonomía**, no de control del flujo. Su rol en esta arquitectura:

| Primitiva | Rol en el Pipeline | Justificación |
|-----------|-------------------|---------------|
| **CLAUDE.md** | Instrucciones globales del proyecto | Define convenciones, no flujo |
| **Skills** | Empaquetar conocimiento de dominio | Formatos de cita, templates |
| **Subagentes** | NO usar en piloto | Reservar para escala futura |
| **Hooks** | Validación automática post-escritura | Quality gates en JSON |
| **Rules** | Restricciones contextuales | Opcionales |

### 6.2 CLAUDE.md del Proyecto

El archivo `CLAUDE.md` en la raíz define el contexto pero NO el flujo:

```markdown
# Proyecto: Liderar con Consciencia - Sistema de Referencias

## Contexto
Este proyecto implementa un pipeline de extracción y clasificación de
referencias bibliográficas para el curso "Liderar con Consciencia".

## Convenciones
- Los checkpoints se almacenan en `data/work/<doc_id>/`
- Los prompts están en `_ai/prompts/`
- La configuración de módulos está en `_ai/config/modules.yaml`
- Los schemas JSON están en `_ai/config/schemas/`

## Importante
- NO procesar el PDF completo; solo la sección de bibliografía
- Siempre validar JSON contra schema antes de continuar
- Preservar el texto original de cada cita para verificación
```

### 6.3 Skill de Conocimiento Bibliográfico (Opcional)

Si se decide usar Skills, serían para conocimiento de dominio, no para flujo:

**Ubicación:** `.claude/skills/citas-academicas/SKILL.md`

**Contenido:**
- Formatos de citas (APA, Chicago, IEEE)
- Patrones de normalización de autores
- Heurísticas para detectar campos faltantes
- NO incluye flujo ni orquestación

### 6.4 Hooks para Validación (Fase 2)

Cuando el pipeline esté estable, añadir hooks para quality gates:

```json
// .claude/settings.json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write",
      "pattern": "*.json",
      "hooks": [{
        "type": "command",
        "command": "python scripts/validate_schema.py $CLAUDE_FILE_PATHS"
      }]
    }]
  }
}
```

---

## 7. Principios de Diseño

### 7.1 Principios Fundamentales

#### P1: Reducir Tokens desde el Origen
No alimentar al LLM con el documento completo. Extraer solo la sección relevante (bibliografía) y trabajar sobre fragmentos procesables.

#### P2: Estructurar Temprano
La primera fase que produce datos estructurados (refs_raw.json) es crítica. Todo lo demás opera sobre esa estructura.

#### P3: Separar lo Determinista de lo Semántico
Las transformaciones que pueden hacerse con código (normalización, dedup, validación) NO deben delegarse al LLM.

#### P4: Idempotencia y Reanudación
Cada fase debe poder ejecutarse de forma independiente dado su input. Si falla clasificación, no repetir extracción.

#### P5: Artefactos Inspeccionables
Cada fase produce un archivo que un humano puede abrir y revisar. No hay estados ocultos en memoria.

### 7.2 Antipatrones a Evitar

| Antipattern | Por qué evitarlo |
|-------------|------------------|
| "Dame todo el PDF y extrae las citas" | Saturación de contexto, pérdida de información |
| Clasificación sin checkpoint previo | Si falla, hay que repetir todo |
| Confiar en memoria de conversación | Claude puede "olvidar" en sesiones largas |
| Validación solo al final | Los errores se propagan y amplifican |
| Prompts embebidos en código | Dificulta iteración y mantenimiento |

### 7.3 Criterios de Calidad

| Criterio | Métrica | Umbral |
|----------|---------|--------|
| Completitud de extracción | % citas con todos los campos | > 85% |
| Confianza de clasificación | % asignaciones con confianza > 0.7 | > 70% |
| Cobertura de módulos | Módulos con ≥ 5 referencias | 7/7 |
| Duplicados entre módulos | % referencias en > 1 módulo | < 30% (esperado) |

---

## 8. Plan de Ejecución

### 8.1 Fase 0: Setup (Una sola vez)

**Objetivo:** Preparar configuración y estructura.

**Entregables:**
- `_ai/config/modules.yaml` con M01-M07 y keywords
- `_ai/config/schemas/reference.schema.json`
- `_ai/config/schemas/classification.schema.json`
- Estructura de carpetas `data/work/`, `data/output/`

### 8.2 Fase 1: Ingesta Acotada

**Objetivo:** Obtener texto limpio de bibliografía.

**Input:** PDF "¿Qué sabemos del mindfulness?"
**Output:** `work/mindfulness-book/bibliography.txt`

**Criterio de éxito:** Texto legible, sin marcas de agua, con separadores de página identificados.

### 8.3 Fase 2: Extracción de Referencias

**Objetivo:** Parsear bibliografía a JSON estructurado.

**Input:** `bibliography.txt` + prompt de extracción
**Output:** `work/mindfulness-book/refs_raw.json`

**Validación:** 
- Schema JSON válido
- > 100 referencias extraídas (estimación)
- Campos autores, año, título presentes en > 85%

### 8.4 Fase 3: Normalización

**Objetivo:** Limpiar y deduplicar referencias.

**Input:** `refs_raw.json`
**Output:** `refs_norm.json`

**Validación:**
- Todos los ref_id son únicos
- Duplicados eliminados documentados

### 8.5 Fase 4: Clasificación

**Objetivo:** Asignar referencias a módulos.

**Input:** `refs_norm.json` + `modules.yaml` + prompt de clasificación
**Output:** `refs_classified.json`

**Validación:**
- Cada referencia tiene ≥ 1 módulo asignado
- Confianza y keywords presentes
- Evidencia (justificación) incluida

### 8.6 Fase 5: Generación de Markdown

**Objetivo:** Crear archivos por módulo.

**Input:** `refs_classified.json` + template
**Output:** `output/m01-11-referencias-mindfulness.md` ... `m07-...`

**Validación:**
- 7 archivos generados
- Cada archivo tiene ≥ 5 referencias (o sección "pendientes")
- YAML frontmatter válido

### 8.7 Fase 6: Verificación y Reporte

**Objetivo:** Validar calidad global.

**Input:** Todos los checkpoints
**Output:** `output/report.md`

**Contenido del reporte:**
- Métricas de extracción
- Distribución por módulo
- Referencias con baja confianza
- Duplicados entre módulos
- Recomendaciones de revisión manual

---

## 9. Evolución Futura

### 9.1 Cuándo Introducir Subagentes

Considerar subagentes cuando:
- Se procesen múltiples PDFs simultáneamente
- El volumen de citas supere capacidad de contexto único (> 200K tokens)
- Se requiera paralelismo real entre fases
- Diferentes fases necesiten políticas de herramientas distintas

### 9.2 Cuándo Migrar al Claude Agent SDK

El Claude Agent SDK es apropiado cuando:
- Los prompts, schemas y reglas estén estabilizados
- Se quiera convertir el pipeline en "producto" (CLI propia, servicio, UI)
- Se requiera integración con procesos continuos (ej: al añadir PDF, actualizar módulos)

Para el piloto, el SDK es prematuro. Es una fase 2/3.

### 9.3 Escalabilidad a Múltiples Documentos

La arquitectura permite escalar naturalmente:

```
for doc in documents:
    run_pipeline(doc)  # Cada doc tiene su carpeta work/<doc_id>/
```

Los checkpoints por documento permiten:
- Procesar en paralelo (si recursos lo permiten)
- Reanudar documentos individuales sin afectar otros
- Agregar clasificaciones de múltiples fuentes

---

## 10. Referencias

### 10.1 Documentos de Análisis Evaluados

1. **Claude v1 (Análisis_Claude-v1.md):** Propuesta de subagentes especializados con skills compartidas
2. **Claude v2 (Análisis_Claude-v2.md):** Patrones de orquestación externa con stream chaining
3. **ChatGPT v1 (ANÁLISIS_CHATGPT-v1.md):** Skill monolítica con progressive disclosure
4. **ChatGPT v2 (ANÁLISIS_CHATGPT-v2.md):** Orquestación Python pura
5. **Gemini v1 (Analisis_GEMINI-v1.md):** Arquitectura híbrida con WSL2
6. **Gemini v2 (Análisis_GEMINI-v2.md):** Skills + orquestación programática
7. **Valoración adicional 1:** Pipeline ETL vs sistema agéntico (Documento 3)
8. **Valoración adicional 2:** Checkpoint de Oro y arquitectura híbrida (Documento 4)

### 10.2 Fuentes Técnicas Citadas

- Anthropic Engineering Blog: "Multi-agent research system"
- Claude Code Docs: Agent Skills, Subagentes, Hooks
- Han Lee: "Claude Agent Skills: A First Principles Deep Dive"
- Claude Platform Docs: Agent SDK Overview

### 10.3 Herramientas Recomendadas

| Herramienta | Propósito | Alternativa |
|-------------|-----------|-------------|
| pdfplumber | Extracción de texto PDF | pymupdf4llm |
| Claude Code | Motor semántico | API directa |
| Python 3.10+ | Orquestación | PowerShell |
| JSON Schema | Validación de estructura | Pydantic |

---

## Anexo A: Glosario

| Término | Definición en este contexto |
|---------|----------------------------|
| **Checkpoint** | Archivo intermedio que permite reanudar el pipeline desde un punto específico |
| **Checkpoint de Oro** | El primer checkpoint con datos estructurados (refs_raw.json); activo más valioso |
| **Capa Determinista** | Fase del pipeline que usa código sin LLM |
| **Capa Semántica** | Fase del pipeline que requiere LLM para interpretación |
| **Orquestador** | Script que controla la secuencia de fases |
| **Skill** | Archivo que encapsula conocimiento de dominio para Claude |
| **Subagente** | Instancia separada de Claude con contexto aislado |

---

## Anexo B: Decisiones Pendientes

| Decisión | Opciones | Criterio para decidir |
|----------|----------|----------------------|
| Librería de PDF | pdfplumber vs pymupdf4llm | Probar ambas con 10 páginas |
| Umbral de confianza | 0.7 vs 0.8 | Evaluar distribución tras primera clasificación |
| Referencias por módulo | 5 vs 7 | Depende de disponibilidad de citas relevantes |
| Duplicados entre módulos | Permitir vs prohibir | Revisar casos reales en piloto |

---

*Documento generado como parte del proyecto "Liderar con Consciencia"*  
*Fecha de creación: 2026-01-10*  
*Versión: 1.0*
