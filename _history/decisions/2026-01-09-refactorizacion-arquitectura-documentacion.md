---
id: 2026-01-09-001
status: accepted
created: 2026-01-09
tags: [decision, arquitectura, documentacion]
---

# Refactorización de Arquitectura de Documentación

## Contexto

Al revisar `ARQUITECTURA.md` se detectaron tres problemas:

1. **CLAUDE.md ignorados**: Los diagramas solo mostraban README, no CLAUDE.md
2. **Roles no formalizados**: No estaba claro qué iba en README vs CLAUDE.md
3. **Duplicación de información**: Catálogos y tablas repetidos en múltiples ficheros

Esto violaba el principio de Single Source of Truth y hacía el mantenimiento insostenible.

## Decisión

### Principios adoptados

| Principio | Descripción |
|-----------|-------------|
| Single Source of Truth | Cada información en un único punto canónico |
| README.md | Contexto: qué hay, para qué sirve, catálogos |
| CLAUDE.md | Instrucciones: convenciones, reglas, pautas |
| ARQUITECTURA.md | Mapa de relaciones, sin catálogos |

### Cambios aplicados

**`.claude/CLAUDE.md`**:
- Añadida regla crítica "Single Source of Truth"
- Fusionada convención de ficheros con "Contexto por dominio"
- Eliminada lista de comandos concretos (referencia a carpeta)

**`ARQUITECTURA.md`** (reducido 43%):
- Eliminadas secciones: "Flujo de Información", "Resumen de Responsabilidades", "Inventario de Archivos"
- Simplificadas secciones de elementos (solo función, referencia a catálogos)
- Actualizado diagrama para mostrar CLAUDE.md en _ai/
- Añadida tabla "Fuentes de Verdad" con excepciones declaradas

**`_wip/README.md`** (reducido 43%):
- Eliminadas convenciones duplicadas
- Añadida referencia a `_ai/CLAUDE.md`

## Fuentes de Verdad resultantes

| Área | Contexto | Instrucciones | Catálogos |
|------|----------|---------------|-----------|
| Global | `.claude/CLAUDE.md` | `.claude/CLAUDE.md` | `.claude/commands/` |
| AI | `_ai/README.md` | `_ai/CLAUDE.md` | `_ai/README.md` |
| WIP (ai/) | `_wip/README.md` | `_ai/CLAUDE.md` | — |
| WIP (curso/, marketing/) | `_wip/README.md` | `_wip/README.md` | — |
| Curso | `CURSO/README.md` | `CURSO/CLAUDE.md` | Índice del curso |

## Excepciones declaradas

- `_wip/`: Sin CLAUDE.md propio; `_wip/ai/` usa convenciones de `_ai/CLAUDE.md`, pero `_wip/curso/` y `_wip/marketing/` tienen convenciones propias en `_wip/README.md` (no son elementos IA)
- `_history/`: Sin CLAUDE.md (contenido auto-generado)
- `_templates/`: Solo Obsidian, no para Claude Code

## Consecuencias

- Mantenimiento simplificado: cada información en un único punto
- Al añadir elementos, actualizar solo el catálogo correspondiente
- Diagramas coherentes con la realidad del proyecto
