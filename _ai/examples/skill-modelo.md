---
status: validated
created: 2026-01-08
version: 1.0
tags: [skill, ejemplo, ai-infra]
---

# Skill: [Dominio] - [Capacidad]

## USE WHEN

Activa este skill cuando el usuario:
- [Trigger 1: verbo + objeto]
- [Trigger 2: verbo + objeto]
- [Trigger 3: verbo + objeto]

## Conocimiento base

### Principios

- [Principio 1 del dominio]
- [Principio 2 del dominio]
- [Principio 3 del dominio]

### Criterios de calidad

| Criterio | Descripción |
|----------|-------------|
| [Criterio 1] | [Qué significa cumplirlo] |
| [Criterio 2] | [Qué significa cumplirlo] |

## Capacidades

Este skill puede:

1. **[Capacidad 1]**: [Descripción breve]
2. **[Capacidad 2]**: [Descripción breve]
3. **[Capacidad 3]**: [Descripción breve]

## Routing: Intención → Acción

| Intención del usuario | Workflow/Prompt a usar |
|-----------------------|------------------------|
| "Quiero [acción 1]" | `wf-[workflow].md` |
| "Necesito [acción 2]" | `wf-[workflow].md` |
| "Revisa [objeto]" | `prompts/[prompt].md` |
| "Crea [objeto]" | `wf-[workflow].md` |

## Contexto que debe cargar

- [Fichero 1]: [por qué es necesario]
- [Fichero 2]: [por qué es necesario]

## Restricciones

- NUNCA: [restricción crítica 1]
- NUNCA: [restricción crítica 2]
- SIEMPRE: [obligación 1]
- SIEMPRE: [obligación 2]

## Prompts relacionados

| Prompt | Uso |
|--------|-----|
| `[nombre-prompt].md` | [Cuándo usarlo] |

## Workflows relacionados

| Workflow | Uso |
|----------|-----|
| `wf-[nombre].md` | [Cuándo usarlo] |

---

## Validation Loop - Skill

### Level 1: Estructura
- [ ] Tiene USE WHEN con triggers claros
- [ ] Incluye conocimiento base
- [ ] Tiene tabla de routing
- [ ] Define restricciones

### Level 2: Completitud
- [ ] Cubre todas las intenciones del dominio
- [ ] Referencias a prompts/workflows existen
- [ ] Contexto a cargar está especificado

### Level 3: Coherencia
- [ ] No hay solapamiento con otros skills
- [ ] Restricciones son consistentes con el proyecto
