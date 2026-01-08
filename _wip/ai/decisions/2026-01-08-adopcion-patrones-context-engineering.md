---
id: adopcion-patrones-context-engineering
status: accepted
created: 2026-01-08
tags: [decision, arquitectura, ai-infra]
---

# Decisión: Adopción selectiva de patrones de Context Engineering

## Contexto

Se analizaron dos frameworks de referencia para desarrollo asistido por IA:

| Framework | Autor | Enfoque |
|-----------|-------|---------|
| [context-engineering-intro](https://github.com/coleam00/context-engineering-intro) | Cole Medin | Framework base con PRPs |
| [PRPs-agentic-eng](https://github.com/Wirasm/PRPs-agentic-eng) | Rasmus Widing | Versión extendida para producción |

**Objetivo del análisis**: Evaluar qué elementos adoptar para mejorar la operativización de nuestra arquitectura IA.

## Evaluación

### Diferencia fundamental de dominios

| Aspecto | Frameworks analizados | Nuestro proyecto |
|---------|----------------------|------------------|
| **Dominio** | Desarrollo de código | Contenido educativo |
| **Pipeline** | Requisitos → PRP → Código → Tests | Investigación → Contenido → Revisión pedagógica |
| **Validación** | Tests automatizados | Criterios pedagógicos + humano |

### Veredicto sobre nuestra arquitectura

**Fortalezas (mantener sin cambios):**
- Sistema de 3 capas (Global → Área → Elemento)
- Distinción Skill/Workflow/Prompt (más sofisticada que PRPs)
- Flujo _wip/ → _ai/ (maduración de elementos)
- CLAUDE.md minimalista

**Carencias identificadas:**
- Sin comandos invocables
- Sin ejemplos ancla de calidad
- Sin validación estructurada
- Confusión sobre `_templates/` (Obsidian vs IA)

### Elementos adoptados de los frameworks

| Concepto original | Adaptación implementada |
|-------------------|------------------------|
| `.claude/commands/` | Comandos: `/prime-curso`, `/revisar-modulo`, `/crear-prompt` |
| `examples/` (ejemplos ancla) | `_ai/examples/` con modelos de prompt, skill, workflow, sección |
| `INITIAL.md` (intake estructurado) | `_ai/plantillas/SOLICITUD.md` |
| Validation Loops | Checklists de validación por niveles en ejemplos |

### Elementos NO adoptados

| Concepto | Razón de exclusión |
|----------|-------------------|
| PRPs completos | Diseñados para código, no contenido |
| `_tech/` separado | Complejidad prematura (sin roadmap de desarrollo técnico) |
| Tests automatizados | No aplicable a contenido pedagógico |
| PRP Runner (CI/CD) | No hay código que automatizar |

## Decisiones adoptadas

### 1. Mantener arquitectura de contenido sin transformación
La arquitectura actual es superior para gestión de contenido educativo.

### 2. Añadir operativización progresiva
- **Comandos**: Interfaz de usuario para invocar capacidades
- **Ejemplos**: Anclas de calidad para consistencia
- **Plantillas**: Solicitudes estructuradas
- **Validación**: Checklists por niveles

### 3. Clarificar `_templates/` como exclusivo de Obsidian
Evita confusión futura. Plantillas IA van en `_ai/plantillas/`.

### 4. Dejar puerta abierta para dominio TECH
**Trigger**: Primera tarea de desarrollo de código complejo (Coach IA/RAG/plataforma).
**Acción futura**: Crear `_tech/` con subset PRP simplificado.

## Implementación realizada

```
Ficheros creados:
├── .claude/commands/
│   ├── prime-curso.md
│   ├── revisar-modulo.md
│   └── crear-prompt.md
├── _ai/examples/
│   ├── prompt-modelo.md
│   ├── skill-modelo.md
│   ├── workflow-modelo.md
│   └── seccion-curso-modelo.md
└── _ai/plantillas/
    └── SOLICITUD.md

Ficheros actualizados:
├── ARQUITECTURA.md (v1.1)
├── _ai/README.md
├── _ai/CLAUDE.md
└── .claude/CLAUDE.md
```

## Referencias

- Análisis completo: `_wip/ai/investigacion/Arquitectura-context-engineering/`
- Repositorio Cole Medin: https://github.com/coleam00/context-engineering-intro
- Repositorio Wirasm: https://github.com/Wirasm/PRPs-agentic-eng
