# _wip/ - Work In Progress

Borradores e ideas en desarrollo, organizados por dominio.

## Estructura

```
_wip/
├── ai/        # Borradores de prompts/hooks/skills → promueven a _ai/
├── curso/     # Ideas e investigación del curso
└── marketing/ # Ideas e investigación de marketing
```

## Flujo de trabajo

**Solo ai/** tiene flujo de promoción:
```
_wip/ai/ (borrador) → _wip/ai/ (pruebas) → _ai/ (validado)
```

**curso/ y marketing/** son espacios de ideas e investigación:
- El conocimiento se referencia desde otros ficheros, no se "promueve"
- Las ideas pueden evolucionar a tareas en `_TAREAS.md`

## Convenciones de nombrado

| Carpeta | Patrón | Ejemplo |
|---------|--------|---------|
| ai/ | Mismo que _ai/ | `reestructurar-modulo.md` |
| curso/ | `YYYY-MM-DD-tema.md` | `2026-01-07-modulo8-metaconsciencia.md` |
| marketing/ | `YYYY-MM-DD-tema.md` | `2026-01-07-campana-lanzamiento.md` |

## Frontmatter mínimo

```yaml
---
status: draft | testing | validated
created: YYYY-MM-DD
tags: [tipo, area]
---
```

---

*Carpeta temporal. Lo que funciona se mueve o referencia; lo que no, se descarta.*
