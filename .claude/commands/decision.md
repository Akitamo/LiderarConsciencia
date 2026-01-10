# Registrar Decisión

Registra una decisión en el fichero diario. Incorporación directa sin preguntas.

## Argumentos

- `$ARGUMENTS`: Descripción de la decisión

## Acciones

1. **Verificar fichero del día** `_history/decisions/YYYY-MM-DD.md`:
   - Si NO existe → crearlo con cabecera del día
   - Si SÍ existe → leer decisiones previas del día

2. **Si hay decisiones previas del día**, evaluar si la nueva modifica o complementa alguna:
   - Modifica → añadir "Modifica: [título]"
   - Complementa → añadir "Complementa: [título]"

3. **Añadir la decisión** al final del fichero con timestamp [HH:MM]

4. **Confirmar** mostrando la decisión registrada

## Formato fichero nuevo

```markdown
---
date: YYYY-MM-DD
tags: [decisions]
---

# Decisiones del YYYY-MM-DD

### [HH:MM] Título

Descripción
```

## Uso

```
/decision Consolidar todas las decisiones en _history/decisions/
```
