---
id: arquitectura-sistema
version: 1.1
status: accepted
created: 2026-01-07
updated: 2026-01-08
tags: [documentacion, arquitectura, ai-infra]
---

# Arquitectura del Sistema: Función, Alcance y Relaciones

Este documento describe la función de cada archivo del sistema, su alcance y las relaciones entre ellos.

---

## Vista General

```
                    ┌─────────────────────┐
                    │  .claude/CLAUDE.md  │  ← Capa 1: Siempre cargado
                    │   (Visión global)   │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                │                ▼
     ┌────────────────┐        │       ┌──────────────────┐
     │.claude/commands│        │       │   ARQUITECTURA   │
     │ (invocables)   │        │       │                  │
     └────────────────┘        │       └──────────────────┘
                               │
                               │ referencia a
                               ▼
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ▼                      ▼                      ▼
   ┌─────────┐           ┌──────────┐           ┌───────────┐
   │  _ai/   │           │  _wip/   │           │ _history/ │
   │ README  │           │ README   │           │  README   │
   └────┬────┘           └────┬─────┘           └─────┬─────┘
        │                     │                       │
        │ contiene            │ borradores            │ registra
        ▼                     ▼                       ▼
   ┌─────────┐           ┌─────────┐           ┌───────────┐
   │ prompts │ ──────▶   │  ai/    │           │ sessions  │
   │ skills  │  valida   │ curso/  │           │           │
   │workflows│ ◀──────   │marketing│           │           │
   │examples │           └─────────┘           └───────────┘
   │plantilla│
   └─────────┘
```

---

## Jerarquía de Contexto (3 Capas)

| Capa | Archivo | Cuándo se carga | Tamaño objetivo |
|------|---------|-----------------|-----------------|
| 1 | `.claude/CLAUDE.md` | Siempre | ~60-100 líneas |
| 2 | `*/README.md` + `*/CLAUDE.md` | Al trabajar en esa área | ~50-100 líneas |
| 3 | Elemento específico (prompt/skill/workflow) | Al usarlo | Variable |

---

## 1. CAPA DE CONTEXTO GLOBAL

### `.claude/CLAUDE.md`

| Aspecto | Descripción |
|---------|-------------|
| **Función** | Proporcionar contexto mínimo esencial que Claude siempre necesita |
| **Alcance** | Todo el proyecto - visión de alto nivel |
| **Tamaño** | Máximo 100 líneas (actualmente ~60) |
| **Se carga** | Automáticamente en cada sesión |

**Contiene**:
- Qué es el proyecto (1 línea)
- Reglas críticas (3-4 puntos)
- Estructura de carpetas (lista)
- Referencias a contexto por dominio

**Relaciones**:
```
CLAUDE.md
    │
    ├──▶ Referencia a: _ai/README.md (infra IA)
    ├──▶ Referencia a: CURSO/README.md (contexto curso)
    └──▶ Referencia a: ARQUITECTURA.md (relaciones)
```

---

### `.claude/commands/*.md`

| Aspecto | Descripción |
|---------|-------------|
| **Función** | Comandos invocables por el usuario con `/nombre` |
| **Alcance** | Interfaz de usuario para activar skills y workflows |
| **Se carga** | Cuando el usuario invoca el comando |

**Comandos disponibles**:
- `/revisar-modulo` → Revisión pedagógica de un módulo
- `/crear-prompt` → Crear nuevo prompt siguiendo estructura
- `/prime-curso` → Cargar contexto completo del curso

**Relaciones**:
```
.claude/commands/
    │
    ├──▶ Invoca: _ai/skills/ y _ai/workflows/
    ├──▶ Usa ejemplos de: _ai/examples/
    └──◀ Documentado en: ARQUITECTURA.md
```

---

## 2. CAPA DE ÁREA

### `_ai/README.md`

| Aspecto | Descripción |
|---------|-------------|
| **Función** | Explicar qué hay en `_ai/` y cómo usar sus elementos |
| **Alcance** | Solo la carpeta `_ai/` y sus subcarpetas |
| **Se carga** | Al trabajar con infraestructura IA validada |

**Contiene**:
- Principios de la infraestructura IA
- Estructura de subcarpetas
- Catálogo de elementos (prompts, skills, workflows, hooks, agents)
- Diferencia entre tipos de elementos
- Referencias a ejemplos modelo y plantillas

**Relaciones**:
```
_ai/README.md
    │
    ├──▶ Define estructura para: prompts/, skills/, workflows/, hooks/, agents/
    ├──▶ Define recursos de apoyo: examples/, plantillas/
    ├──▶ Referencia flujo desde: _wip/
    └──▶ Referenciado por: CLAUDE.md
```

---

### `_wip/README.md`

| Aspecto | Descripción |
|---------|-------------|
| **Función** | Explicar el espacio de trabajo para elementos en desarrollo |
| **Alcance** | Solo la carpeta `_wip/` - borradores e ideas |
| **Se carga** | Al crear o iterar elementos nuevos |

**Contiene**:
- Estructura de subcarpetas: `ai/`, `curso/`, `marketing/`
- Estados posibles (draft, testing, validated)
- Flujo de promoción: `_wip/ai/` → `_ai/` (cuando validados)
- Convenciones de nombrado por dominio

**Relaciones**:
```
_wip/README.md
    │
    ├──▶ _wip/ai/ fluye hacia: _ai/ (cuando validado)
    ├──▶ _wip/curso/ y _wip/marketing/: ideas e investigación
    └──▶ Ideas pueden evolucionar a tareas en _TAREAS.md
```

---

### `_history/README.md`

| Aspecto | Descripción |
|---------|-------------|
| **Función** | Explicar el sistema de registro de sesiones |
| **Alcance** | Resúmenes automáticos de sesiones de trabajo |
| **Se carga** | Al buscar contexto histórico |

**Contiene**:
- Formato de nombrado de sesiones
- Estructura del resumen generado
- Cómo usar el historial para contexto

**Relaciones**:
```
_history/README.md
    │
    ├──▶ sessions/ generadas por: _ai/hooks/save-session.js
    └──▶ Consultable desde: cualquier parte del proyecto
```

---

## 3. CAPA DE ELEMENTOS

### Relación entre Prompt, Skill y Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   SKILL                                                     │
│   "Qué sé hacer"                                            │
│   ┌─────────────────────────────────────────────────────┐   │
│   │ curso-revision-pedagogica.md                        │   │
│   │                                                     │   │
│   │  • Define: capacidades, conocimiento, criterios     │   │
│   │  • Detecta: intención del usuario (USE WHEN)        │   │
│   │  • Delega a: workflows y prompts específicos        │   │
│   │                                                     │   │
│   └──────────────────┬──────────────────────────────────┘   │
│                      │                                      │
│                      │ "Para esta intención, usa..."        │
│                      ▼                                      │
│   WORKFLOW                          PROMPT                  │
│   "Cómo lo hago"                    "Qué le pido"           │
│   ┌─────────────────────┐          ┌─────────────────────┐  │
│   │ wf-revisar-seccion  │          │ reestructurar-modulo│  │
│   │                     │          │                     │  │
│   │ • Pasos ordenados   │          │ • Instrucción única │  │
│   │ • Verificaciones    │          │ • Input → Output    │  │
│   │ • Puede usar prompts│──────────│ • Reutilizable      │  │
│   │                     │          │                     │  │
│   └─────────────────────┘          └─────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Resumen de diferencias**:

| Elemento | Define | Granularidad | Ejemplo |
|----------|--------|--------------|---------|
| **Skill** | QUÉ sé hacer (capacidad) | Amplio - dominio completo | "Sé revisar contenido pedagógico" |
| **Prompt** | CÓMO pedir algo (instrucción) | Atómico - una tarea | "Revisa esta sección..." |
| **Workflow** | PASOS para completar (proceso) | Medio - secuencia | "1. Leer → 2. Analizar → 3. Proponer" |

---

### `_ai/prompts/*.md`

| Aspecto | Descripción |
|---------|-------------|
| **Función** | Instrucción reutilizable para una tarea específica |
| **Alcance** | Una sola tarea concreta |
| **Granularidad** | Atómico - hace una cosa bien |

**Contiene**:
- Propósito y cuándo usar
- Contexto necesario (inputs)
- El prompt en sí (copiar y pegar)
- Output esperado
- Ejemplo de uso
- Changelog

**Relaciones**:
```
prompts/*.md
    │
    ├──◀ Usado por: skills (referenciado en capacidades)
    ├──◀ Invocado desde: workflows (en pasos específicos)
    └──▶ Requiere input: definido en "Contexto necesario"
```

---

### `_ai/skills/*.md`

| Aspecto | Descripción |
|---------|-------------|
| **Función** | Definir expertise en un dominio completo |
| **Alcance** | Todo lo relacionado con un área de conocimiento |
| **Granularidad** | Amplio - orquesta múltiples acciones |

**Contiene**:
- `USE WHEN`: triggers de activación
- Conocimiento base (principios, criterios)
- Capacidades (qué puede hacer)
- Tabla de routing: intención → workflow
- Prompts relacionados
- Restricciones

**Relaciones**:
```
skills/*.md
    │
    ├──▶ Detecta intención y delega a: workflows/*.md
    ├──▶ Usa prompts como herramientas: prompts/*.md
    ├──▶ Carga contexto de: archivos del proyecto
    └──◀ Activado cuando: intención coincide con USE WHEN
```

---

### `_ai/workflows/*.md`

| Aspecto | Descripción |
|---------|-------------|
| **Función** | Guía paso a paso para completar una tarea compleja |
| **Alcance** | Un proceso específico con inicio y fin |
| **Granularidad** | Medio - secuencia de pasos verificables |

**Contiene**:
- Prerrequisitos e inputs
- Pasos numerados con:
  - Objetivo del paso
  - Acciones concretas
  - Output del paso
  - Verificación
- Output final esperado
- Checklist de calidad
- Problemas comunes y soluciones

**Relaciones**:
```
workflows/*.md
    │
    ├──◀ Invocado por: skills (según intención)
    ├──▶ Puede usar: prompts/*.md (en pasos específicos)
    ├──▶ Genera output que va a: _wip/ o carpeta destino
    └──▶ Referencia: skill para criterios de evaluación
```

---

### `_ai/examples/*.md`

| Aspecto | Descripción |
|---------|-------------|
| **Función** | Ejemplos modelo de elementos bien estructurados |
| **Alcance** | Referencia para crear nuevos elementos con calidad consistente |
| **Se carga** | Al crear nuevos prompts, skills, workflows o contenido |

**Ejemplos disponibles**:
- `prompt-modelo.md` → Estructura ideal de un prompt
- `skill-modelo.md` → Estructura ideal de un skill
- `workflow-modelo.md` → Estructura ideal de un workflow
- `seccion-curso-modelo.md` → Sección de curso bien estructurada

**Relaciones**:
```
_ai/examples/
    │
    ├──◀ Referenciado por: .claude/commands/ (como patrón a seguir)
    ├──◀ Usado en: creación de nuevos elementos
    └──▶ Sigue estructura de: _ai/CLAUDE.md
```

---

### `_ai/plantillas/*.md`

| Aspecto | Descripción |
|---------|-------------|
| **Función** | Plantillas para solicitar trabajo a Claude Code |
| **Alcance** | Estructurar peticiones de contenido o elementos IA |
| **Se carga** | Al iniciar una solicitud estructurada |

**Plantillas disponibles**:
- `SOLICITUD.md` → Template para pedir nuevo contenido/funcionalidad

**Relaciones**:
```
_ai/plantillas/
    │
    ├──▶ Input para: skills y workflows
    └──◀ Inspirado en: INITIAL.md de frameworks PRP (Context Engineering)
```

---

## 4. CAPA DE SOPORTE

### `_ai/hooks/*.js`

| Aspecto | Descripción |
|---------|-------------|
| **Función** | Scripts de automatización |
| **Alcance** | Responden a eventos de Claude Code |
| **Documentación** | En `_ai/README.md` (sección Hooks) |

### `_ai/agents/` (futuro)

| Aspecto | Descripción |
|---------|-------------|
| **Función** | Definiciones de agentes especializados |
| **Estado** | Por desarrollar |
| **Documentación** | En `_ai/README.md` (sección Agents) |

---

### `_templates/*.md` (Obsidian Templater)

| Aspecto | Descripción |
|---------|-------------|
| **Función** | Plantillas de Obsidian Templater para generar contenido |
| **Alcance** | Uso EXCLUSIVO dentro de Obsidian |
| **Nota** | NO usar desde Claude Code. Para plantillas IA ver `_ai/plantillas/` |

**Plantillas disponibles** (solo Obsidian):
- `Generar Indice Curso.md` → genera índices del curso
- `Generar Indice Modulo.md` → genera índices de módulo
- `Nueva Seccion.md` → genera secciones del curso

---

## Flujo de Información Completo

```
Usuario hace petición
        │
        ▼
┌───────────────────┐
│ CLAUDE.md cargado│  (siempre)
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│ ¿Qué área toca?   │
└────────┬──────────┘
         │
    ┌────┴────┬─────────────┐
    ▼         ▼             ▼
  _ai/      _wip/       _history/
 README     README       README
    │         │             │
    ▼         │             │
┌─────────┐   │             │
│ SKILL   │◀──┘             │
│detecta  │                 │
│intención│                 │
└────┬────┘                 │
     │                      │
     ▼                      │
┌─────────┐                 │
│WORKFLOW │                 │
│ pasos   │                 │
└────┬────┘                 │
     │                      │
     ▼                      │
┌─────────┐                 │
│ PROMPT  │                 │
│ejecuta  │                 │
└────┬────┘                 │
     │                      │
     ▼                      ▼
  Output ──────────────▶ Sesión
                       documentada
```

---

## Resumen de Responsabilidades

| Archivo | Responsabilidad única |
|---------|----------------------|
| `CLAUDE.md` | Orientar a Claude sobre el proyecto |
| `.claude/commands/` | Interfaz de usuario para invocar capacidades |
| `_ai/README.md` | Explicar qué hay validado y cómo usarlo |
| `_ai/examples/` | Ejemplos modelo para garantizar calidad |
| `_ai/plantillas/` | Estructurar solicitudes a Claude Code |
| `_wip/README.md` | Gestionar el flujo de trabajo en progreso |
| `_history/README.md` | Preservar memoria del proyecto |
| `prompts/*.md` | Una instrucción = una tarea |
| `skills/*.md` | Un dominio = múltiples capacidades |
| `workflows/*.md` | Un proceso = pasos verificables |
| `_templates/*.md` | Plantillas Obsidian (NO para Claude Code) |

---

## Inventario de Archivos de Documentación

| Archivo | Tipo | Función |
|---------|------|---------|
| `.claude/CLAUDE.md` | Instrucciones | Visión global del proyecto |
| `.claude/commands/*.md` | Comandos | Interfaz invocable por usuario |
| `ARQUITECTURA.md` | Documentación | Relaciones entre ficheros y flujos |
| `_ai/README.md` | README | Guía de infraestructura IA (catálogos incluidos) |
| `_ai/CLAUDE.md` | Instrucciones | Convenciones para desarrollar elementos IA |
| `_ai/examples/*.md` | Ejemplos | Modelos de referencia para crear elementos |
| `_ai/plantillas/*.md` | Plantillas | Templates para solicitudes a Claude Code |
| `CURSO/README.md` | README | Contexto del curso (filosofía, tono) |
| `CURSO/CLAUDE.md` | Instrucciones | Convenciones para modificar contenido |
| `_wip/README.md` | README | Guía de work in progress |
| `_history/README.md` | README | Sistema de registro |
| `_templates/*.md` | Obsidian | Plantillas Templater (NO para Claude Code) |
| `_TAREAS.md` | Backlog | Tareas del proyecto |

---

*Este documento define la arquitectura del sistema de documentación del proyecto.*
