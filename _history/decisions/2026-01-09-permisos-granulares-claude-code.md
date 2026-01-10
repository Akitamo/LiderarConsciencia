---
id: 2026-01-09-002
status: accepted
created: 2026-01-09
tags: [decision, permisos, claude-code]
---

# Permisos Granulares para Claude Code

## Contexto

Durante una sesión, Claude Code realizó modificaciones sin validación previa a pesar de que `CLAUDE.md` establece claramente:

> No modificar contenido sin validación previa

El problema: aunque las instrucciones estaban documentadas, no había mecanismo técnico que forzara su cumplimiento. Claude Code tenía permisos de `Edit` y `Write` sin restricciones.

## Decisión

Configurar permisos granulares en `.claude/settings.local.json` para que Claude Code:

1. **Pueda leer** todo el proyecto sin restricción
2. **Pueda editar/escribir libremente** solo en carpetas de trabajo (`_wip/`, `_history/`)
3. **Requiera autorización explícita** para modificar contenido validado

### Configuración aplicada

```json
"permissions": {
  "allow": [
    "Read",
    "Bash",
    "Edit(/_wip/**)",
    "Write(/_wip/**)",
    "Write(/_history/**)",
    "WebFetch(domain:*)",
    "mcp__*",
    "WebSearch"
  ]
}
```

### Matriz de permisos resultante

| Ubicación | Leer | Editar/Escribir |
|-----------|------|-----------------|
| `_wip/**` | Libre | Libre |
| `_history/**` | Libre | Libre (solo escribir) |
| `CURSO/**` | Libre | Requiere autorización |
| `_ai/**` | Libre | Requiere autorización |
| `.claude/**` | Libre | Requiere autorización |
| `ARQUITECTURA.md` | Libre | Requiere autorización |
| `_TAREAS.md` | Libre | Requiere autorización |
| Raíz del proyecto | Libre | Requiere autorización |

## Consecuencias

- **Doble barrera**: Instrucciones en CLAUDE.md + permisos técnicos
- **Flujo de trabajo**: Desarrollar en `_wip/`, promover solo con autorización
- **Prevención de errores**: Modificaciones accidentales bloqueadas por el sistema
- **Hook de sesión**: Sigue funcionando porque escribe en `_history/`

## Alternativas consideradas

1. **Solo reforzar instrucciones**: Descartada por no ser técnicamente enforced
2. **Denegar explícitamente carpetas**: Innecesario si solo se permite lo mínimo
3. **Hooks de pre-edición**: No existen en Claude Code actualmente
