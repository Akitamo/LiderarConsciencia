# _history/ - Registro del Proyecto

Memoria persistente del proyecto: resúmenes automáticos de sesiones de trabajo.

## Estructura actual

```
_history/
└── sessions/      # Resúmenes automáticos de sesiones
```

---

## sessions/ - Resúmenes de Sesiones

Generados automáticamente por el hook `save-session.js` al cerrar Claude Code.

### Formato de nombrado

```
YYYY-MM-DD-HHMMSS-tema-extraido.md
```

Ejemplo: `2026-01-07-122242-mejoras-en-el-hook-de-registro.md`

### Estructura (generada automáticamente)

```markdown
---
date: ISO-8601
tags: [session]
---

# Sesión: Tema Principal

## Qué se trabajó
- [Punto 1]
- [Punto 2]

## Decisiones tomadas
- [Decisión 1]

## Archivos modificados
- [archivo1.md]

## Pendiente
- [ ] [Tarea pendiente]
```

---

## Uso del historial

### Para contexto
Antes de trabajar en un área, revisar sesiones recientes en `sessions/`.

### Para buscar
Usar búsqueda de Obsidian o grep:
- "¿Qué hicimos el día Y?" → buscar en sessions/

---

## Futuro: decisions/

Cuando se necesite documentar decisiones arquitectónicas importantes (ADRs), se creará la carpeta `decisions/`. Por ahora no existe.

---

*El historial es inmutable. No editar archivos antiguos; crear nuevos que referencien los anteriores si hay cambios.*
