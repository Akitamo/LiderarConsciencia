---
id: arquitectura-sistema
version: 2.0
status: accepted
created: 2026-01-07
updated: 2026-01-11
tags: [documentacion, arquitectura]
---

# Arquitectura del Sistema

Mapa visual de la estructura del proyecto. Para detalle de cada área, consultar su README.md.

---

## Vista General

```
        ┌─────────────┐
        │  README.md  │  ← Capa 0: Punto de entrada (humanos + contexto general)
        └──────┬──────┘
               │
               ▼
        ┌─────────────────────┐
        │  .claude/CLAUDE.md  │  ← Capa 1: Siempre cargado (reglas para Claude)
        │   (Visión global)   │
        └──────────┬──────────┘
                   │
      ┌────────────┼────────────┐
      │            │            │
      ▼            │            ▼
┌────────────────┐ │  ┌──────────────────┐
│.claude/commands│ │  │   ARQUITECTURA   │
│ (invocables)   │ │  │                  │
└────────────────┘ │  └──────────────────┘
                   │
                   │ referencia a
                   ▼
  ┌────────┬───────┼───────┬────────┬────────┐
  │        │       │       │        │        │
  ▼        ▼       ▼       ▼        ▼        ▼
┌──────┐ ┌──────┐ ┌──────┐ ┌────┐ ┌─────┐ ┌────────┐
│ _ai/ │ │_wip/ │ │_dev/ │ │_his│ │CURSO│ │Market- │
│README│ │README│ │README│ │tory│ │ /   │ │  ing/  │
│CLAUDE│ │      │ │CLAUDE│ │    │ │READ │ │        │
└──┬───┘ └──┬───┘ └──┬───┘ └─┬──┘ └──┬──┘ └───┬────┘
   │        │        │       │       │        │
   ▼        ▼        ▼       ▼       ▼        ▼
┌──────┐ ┌──────┐ ┌──────┐ ┌─────┐ ┌─────┐ ┌───────┐
│prompt│ │ ai/  │ │proyec│ │sess-│ │7 mó-│ │Ideas  │
│skills│ │curso/│ │tos   │ │ions │ │dulos│ │inicial│
│workfl│ │marke-│ │specs │ │deci-│ │conte│ │Identi-│
│exampl│ │ting/ │ │scripts│ │sions│ │nido │ │dad    │
└──────┘ └──────┘ └──────┘ └─────┘ └─────┘ └───────┘
```

---

## Jerarquía de Contexto (3 Capas)

| Capa | Archivo | Cuándo se carga | Tamaño objetivo |
|------|---------|-----------------|-----------------|
| 1 | `.claude/CLAUDE.md` | Siempre | ~60-100 líneas |
| 2 | `*/README.md` + `*/CLAUDE.md` | Al trabajar en esa área | ~50-100 líneas |
| 3 | Elemento específico (prompt/skill/workflow) | Al usarlo | Variable |

---

## Fuentes de Verdad (Single Source of Truth)

| Área | Contexto (README) | Instrucciones (CLAUDE) | Catálogos |
|------|-------------------|------------------------|-----------|
| **Global** | `README.md` | `.claude/CLAUDE.md` | `.claude/commands/` |
| **AI validado** | `_ai/README.md` | `_ai/CLAUDE.md` | `_ai/README.md` |
| **WIP** | `_wip/README.md` | `_ai/CLAUDE.md` (compartido) | — |
| **Desarrollo** | `_dev/README.md` | `_dev/CLAUDE.md` | `_dev/[proyecto]/PLAN.md` |
| **Historial** | `_history/README.md` | — | — |
| **Curso** | `CURSO/README.md` | `CURSO/CLAUDE.md` | `CURSO/00-indice-general-curso.md` |
| **Marketing** | `Marketing/README.md` | — | `Marketing/Identidad visual/brand-guidelines.md` (estilos) |
| **Obsidian** | — | — | `_templates/` |

**Excepciones**:
- `_wip/`: Sin CLAUDE.md propio; `_wip/ai/` usa `_ai/CLAUDE.md`
- `_history/`: Sin CLAUDE.md (contenido automático)
- `Marketing/`: Sin CLAUDE.md (en desarrollo)
- `_templates/`: Solo Obsidian, no Claude Code

---

*Mapa de arquitectura. El detalle de cada área está en su README.md.*
