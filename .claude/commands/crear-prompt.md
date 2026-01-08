# Crear Prompt

Crea un nuevo prompt siguiendo la estructura validada del proyecto.

## Argumentos

- `$ARGUMENTS`: Nombre del prompt (ej: `analizar-seccion`)

## Acciones

1. **Cargar referencias**:
   - _ai/examples/prompt-modelo.md (estructura a seguir)
   - _ai/CLAUDE.md (convenciones de nombrado)

2. **Solicitar información** al usuario:
   - Propósito del prompt
   - Cuándo debe usarse
   - Inputs necesarios
   - Output esperado

3. **Generar prompt** en `_wip/ai/prompts/`:
   - Usar estructura de prompt-modelo.md
   - Nombrar como `verbo-objeto.md`
   - Status: draft
   - Incluir ejemplo de uso

4. **Validation Loop**:

   ### Level 1: Estructura
   - [ ] Tiene todas las secciones del modelo
   - [ ] Frontmatter completo
   - [ ] Nombrado correcto (verbo-objeto.md)

   ### Level 2: Contenido
   - [ ] Propósito claro y específico
   - [ ] Inputs bien definidos
   - [ ] Prompt es atómico (una sola tarea)

   ### Level 3: Usabilidad
   - [ ] Ejemplo de uso incluido
   - [ ] Output esperado definido

5. **Confirmar creación**:
   - Mostrar ruta del archivo creado
   - Recordar flujo de promoción: _wip/ → _ai/

## Uso

```
/crear-prompt analizar-seccion
```

## Output

Nuevo prompt creado en `_wip/ai/prompts/[nombre].md`
Listo para probar antes de promover a `_ai/prompts/`
