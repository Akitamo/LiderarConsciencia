# _history/ - Registro del Proyecto

Memoria persistente del proyecto: sesiones de trabajo y decisiones.

## Estructura

```
_history/
├── sessions/      # Resúmenes automáticos de sesiones
└── decisions/     # Decisiones del proyecto (diarias + ADRs)
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

## decisions/ - Decisiones del Proyecto

Registro de decisiones: tanto diarias (rápidas) como arquitectónicas (ADRs).

### Formato de nombrado

- **Decisiones diarias**: `YYYY-MM-DD.md` (un fichero por día)
- **ADRs existentes**: `YYYY-MM-DD-nombre-decision.md`

### Cómo registrar

Usar el comando `/decision`:
```
/decision Descripción de la decisión tomada
```

El comando:
1. Crea el fichero del día si no existe
2. Revisa decisiones previas del día por si modifica/complementa alguna
3. Añade la decisión con timestamp

### Estructura de fichero diario

```markdown
---
date: YYYY-MM-DD
tags: [decisions]
---

# Decisiones del YYYY-MM-DD

### [HH:MM] Título

Descripción de la decisión
```

---

*El historial es inmutable. No editar archivos antiguos; crear nuevos que referencien los anteriores si hay cambios.*
