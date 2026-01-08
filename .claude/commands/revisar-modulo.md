# Revisar Módulo

Realiza una revisión pedagógica completa de un módulo del curso.

## Argumentos

- `$ARGUMENTS`: Ruta al módulo (ej: `CURSO/M01-Fundamentos`)

## Acciones

1. **Cargar contexto**:
   - CURSO/README.md (filosofía y tono)
   - CURSO/CLAUDE.md (instrucciones)
   - _ai/examples/seccion-curso-modelo.md (referencia de calidad)

2. **Leer el módulo completo**:
   - Índice del módulo
   - Todas las secciones

3. **Evaluar cada sección** usando el Validation Loop:

   ### Level 1: Estructura
   - [ ] Tiene objetivo de aprendizaje claro
   - [ ] Incluye fundamentación científica
   - [ ] Contiene ejercicio práctico
   - [ ] Tiene resumen de ideas clave

   ### Level 2: Rigor científico
   - [ ] Afirmaciones clave tienen referencia
   - [ ] Referencias son verificables
   - [ ] No hay afirmaciones inventadas

   ### Level 3: Pedagogía
   - [ ] Progresión clara
   - [ ] Lenguaje accesible
   - [ ] Ejemplos aplicados al liderazgo

   ### Level 4: Coherencia
   - [ ] Conecta con módulo anterior
   - [ ] Prepara para módulo siguiente

4. **Generar reporte**:
   - Resumen del estado del módulo
   - Fortalezas identificadas
   - Áreas de mejora por sección
   - Prioridad de correcciones

## Uso

```
/revisar-modulo CURSO/M01-Fundamentos
```

## Output

Reporte estructurado con hallazgos y recomendaciones.
NO modifica archivos, solo analiza y reporta.
