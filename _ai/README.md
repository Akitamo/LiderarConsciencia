# Infraestructura IA

Sistema de agentes para asistir en la creación, mantenimiento y mejora del contenido del curso.

## Principios

- Empezar simple, escalar según necesidad
- El humano siempre valida antes de aplicar cambios
- Cada elemento con propósito claro y acotado

## Estructura

```
_ai/
├── prompts/     # Instrucciones reutilizables para tareas específicas
├── skills/      # Capacidades de dominio (qué sabe hacer el sistema)
├── workflows/   # Procedimientos paso a paso
├── hooks/       # Scripts de automatización
├── agents/      # Definiciones de agentes (futuro)
└── examples/    # Ejemplos modelo para garantizar calidad
```

## Instrucciones de desarrollo

Ver [CLAUDE.md](CLAUDE.md) para convenciones de nombrado, frontmatter y flujo de promoción.

---

## Catálogo de elementos

<!-- MANTENIMIENTO: Actualizar estas tablas al añadir/eliminar elementos -->

### Prompts

Instrucciones atómicas: **una tarea = un prompt**.

| Prompt | Descripción |
|--------|-------------|
| `session-summary.md` | Prompt para el hook de resumen de sesión |
| `Prompts-ppt-a-obsidian/Prompt reestructuracion pedagogica modulo.md` | Reestructurar ficheros de un módulo |
| `Prompts-ppt-a-obsidian/Prompt asociar imagen placeholder.md` | Asociar imágenes a contenido del curso |
| `Prompts-ppt-a-obsidian/Prompts extracción PPTs.md` | Extraer contenido de presentaciones PowerPoint |
| `Diseño y estilo visual/PROMPT ESTÁNDAR - INFOGRAFÍAS LIDERAR CON CONSCIENCIA.md` | Diseño de infografías |
| `Diseño y estilo visual/PROMPT ESTÁNDAR - FOLLETO LIDERAR CON CONSCIENCIA.md` | Diseño de folletos |

**Nombrado recomendado**: `verbo-objeto.md` (ej: `analizar-seccion.md`)

### Skills

Capacidades de dominio que definen **qué sabe hacer** el sistema.

| Skill | Dominio | Descripción |
|-------|---------|-------------|
| (ninguno aún) | - | - |

**Nombrado**: `dominio-capacidad.md`

### Workflows

Secuencias de pasos para completar tareas complejas.

| Workflow | Propósito |
|----------|-----------|
| (ninguno aún) | - |

**Nombrado**: `wf-proceso.md` (siempre prefijo `wf-`)

### Hooks

Scripts que se ejecutan automáticamente en respuesta a eventos de Claude Code.

| Hook | Evento | Descripción |
|------|--------|-------------|
| `save-session.js` | SessionEnd | Guarda resumen de sesión en `_history/sessions/` |

**Ubicación**: `_ai/hooks/*.js`
**Configuración**: `.claude/settings.local.json`

### Agents

**Estado**: Por desarrollar. Carpeta preparada para futuras implementaciones.

### Examples

Ejemplos modelo que sirven como "ancla de calidad" al crear nuevos elementos.

| Ejemplo | Descripción |
|---------|-------------|
| `prompt-modelo.md` | Estructura ideal de un prompt |
| `skill-modelo.md` | Estructura ideal de un skill |
| `workflow-modelo.md` | Estructura ideal de un workflow |
| `seccion-curso-modelo.md` | Sección de curso bien estructurada |

**Uso**: Al crear un nuevo elemento, leer primero el ejemplo correspondiente y seguir la misma estructura.

---

## Diferencia entre elementos

| Elemento | Define | Granularidad | Ejemplo |
|----------|--------|--------------|---------|
| **Prompt** | CÓMO pedir algo | Atómico | "Revisa esta sección..." |
| **Skill** | QUÉ sé hacer | Amplio (dominio) | "Sé revisar contenido pedagógico" |
| **Workflow** | PASOS para completar | Secuencia | "1. Leer → 2. Analizar → 3. Proponer" |

Un Skill puede referenciar múltiples Prompts y Workflows.

