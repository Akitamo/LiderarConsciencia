# Contexto Base para Transformación de Contenido

## El Curso

"Liderar con Consciencia" es un programa formativo para ejecutivos y líderes que integra neurociencia, mindfulness y liderazgo ético.

**Premisa central:** La brecha entre saber qué hacer y poder hacerlo cuando importa se llama consciencia, y la consciencia se entrena.

## Audiencia

- Ejecutivos y mandos intermedios hispanohablantes
- Formación superior, orientación a resultados
- Familiaridad variable con neurociencia y mindfulness
- Buscan aplicabilidad práctica, no solo teoría
- Tiempo limitado, valoran la eficiencia

## Principios de Escritura

1. **Rigor científico**: Toda afirmación debe poder sostenerse con evidencia. No inventar datos.
2. **Accesibilidad**: Conceptos complejos explicados sin simplificar en exceso.
3. **Relevancia**: Conexión explícita con el ejercicio del liderazgo.
4. **Respeto al lector**: Sin condescendencia ni jerga innecesaria.

## Estructura a Preservar

Al transformar contenido, SIEMPRE mantener:

- **Frontmatter YAML** sin modificaciones:
  ```yaml
  ---
  id: mXX-XX
  titulo: "..."
  modulo: X
  orden: XX
  tags: [...]
  ---
  ```

- **Tags inline** en su posición original:
  - `#teoria` - contenido conceptual
  - `#explicacion` - desarrollo de conceptos
  - `#imagen` - referencia visual (no modificar la línea de imagen)
  - `#ejercicio` - práctica guiada
  - `#video`, `#gif`, `#cita`, `#referencia`

- **Referencias a imágenes** exactamente como están:
  ```markdown
  ![img-mXX-nombre](recursos/imagenes/img-mXX-nombre.png) Descripción
  ```

- **Estructura de encabezados** (H1, H2) sin cambiar jerarquía

## Qué Transformar

- El texto explicativo y narrativo
- La forma de presentar los conceptos
- Las transiciones entre secciones
- La conexión con la experiencia del lector-líder

## Qué NO Transformar

- Frontmatter YAML
- Tags inline (posición y nombre)
- Referencias a imágenes y sus rutas
- Datos científicos específicos (porcentajes, nombres de investigadores, etc.)
- Estructura de encabezados H1/H2
