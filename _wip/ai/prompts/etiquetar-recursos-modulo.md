# Prompt: Etiquetar Recursos de un Módulo

## Objetivo
Renombrar imágenes/videos/GIFs con nombres semánticos y actualizar referencias en archivos .md, añadiendo descripciones pedagógicas inline.

## Convención de Nomenclatura

### Estructura obligatoria de nombres

```
prefijo-mNN-TT-descriptor[-vN].ext
```

| Parte | Significado | Regla |
|-------|-------------|-------|
| `prefijo` | Tipo de recurso | Ver tabla de prefijos abajo |
| `mNN` | Módulo, siempre 2 dígitos | `m00-`, `m01-` (nunca `m0-`, `m1-`) |
| `TT` | Tema/topic del archivo, siempre 2 dígitos | `01-`, `08-`, `11-` (nunca omitir) |
| `descriptor` | Nombre descriptivo en minúsculas con guiones | Basado en lo que se VE en la imagen |
| `-vN` | Sufijo de variante (opcional) | `-v1`, `-v2` si hay varias opciones |
| `.ext` | Extensión del archivo | `.png`, `.jpg`, `.gif`, `.mp4` |

**Ejemplo completo**: `img-m01-08-red-atencion-ejecutiva.png`

### Prefijos por tipo
| Tipo | Prefijo | Ejemplo |
|------|---------|---------|
| Imagen | `img-` | `img-m01-01-cerebro-predictivo.png` |
| Video | `vid-` | `vid-m01-01-robot-fails.mp4` |
| GIF | `gif-` | `gif-m01-01-ver-con-cerebro.gif` |
| Infografía | `infog-` | `infog-m01-00-apertura.png` |
| Gráfica | `graf-` | `graf-m01-06-curva-atencion.png` |
| Diapositiva | `ppt-` | `ppt-m01-00-portada.png` |

### Reglas obligatorias
1. **Siempre topic number**: El número de tema (TT) es OBLIGATORIO. Corresponde al número del archivo .md donde aparece la imagen. Ej: imágenes en `m01-08-atencion-consciencia.md` usan `m01-08-`
2. **Siempre dos dígitos**: tanto módulo como topic: `m01-08-` (nunca `m1-8-`)
3. **Siempre minúsculas**: `gif-` (nunca `Gif-`)
4. **Sin espacios**: usar guiones `-`
5. **Nombre basado en contenido visual**: el descriptor DEBE describir lo que se VE en la imagen, NO lo que sugiere el texto circundante
6. **Re-normalización obligatoria**: imágenes que ya tienen nombre parcial pero no siguen la convención completa (ej: `img-m01-monje-escaner.png` sin topic number) DEBEN ser renombradas al estándar completo (ej: `img-m01-09-monje-escaner.png`)
7. **Carpeta única `assets/`**: TODAS las imágenes deben estar en `assets/`. Si hay referencias a `recursos/imagenes/`, mover primero a `assets/` y actualizar la referencia

### Variantes/Opciones del mismo concepto
Cuando hay imágenes que muestran el mismo concepto:

**Detección**: Lo que define una variante es el **CONCEPTO TEMÁTICO**, no el tipo de recurso ni el título exacto.

- **Cross-type**: Las variantes pueden tener distinto prefijo de tipo: una PPT y una imagen del mismo concepto siguen siendo variantes.
- **No requieren proximidad**: Las variantes pueden estar **dispersas** a lo largo de una sección, no necesariamente consecutivas. Buscar en TODA la sección.
- **Títulos diferentes, mismo concepto**: Imágenes con títulos distintos pueden ser variantes si ilustran el mismo concepto. Ej: "Adopción Corporativa Global", "Mindfulness en el entorno corporativo" y "Mindful Business Companies" son el mismo concepto (empresas que adoptan mindfulness) y deben ser variantes.
- **Test de agrupación**: Preguntar "¿Estas imágenes muestran lo mismo desde ángulos diferentes, o son conceptos genuinamente distintos?" Si la respuesta es "lo mismo", son variantes.

**Nomenclatura**:
- Añadir sufijo `-vN`: `-v1`, `-v2`, `-v3`...
- Ejemplo: `ppt-m00-01-cuatro-fuerzas-v1.png`, `graf-m00-01-cuatro-fuerzas-v2.png`

**Descripción en .md**:
- Iniciar con "Opción N:"
- Ejemplo: `Opción 1: Las 4 fuerzas en formato cuadrante con iconografía.`

## Formato Destino en Markdown

```markdown
#tipo ![prefijo-mNN-TT-descriptor](assets/prefijo-mNN-TT-descriptor.ext) Descripción pedagógica de 1-2 líneas.
```

**Ejemplos (nótese topic number obligatorio):**
```markdown
#imagen ![img-m00-01-convergencia-fuerzas](assets/img-m00-01-convergencia-fuerzas.png) Ilustración artística de cuatro corrientes convergiendo en un vórtice central, metáfora de la "tormenta perfecta".

#ppt ![ppt-m00-01-cuatro-fuerzas-v1](assets/ppt-m00-01-cuatro-fuerzas-v1.png) Opción 1: Las 4 fuerzas en formato cuadrante con iconografía y descripción breve.
#ppt ![ppt-m00-01-cuatro-fuerzas-v2](assets/ppt-m00-01-cuatro-fuerzas-v2.png) Opción 2: Las 4 fuerzas convergiendo hacia el líder en el centro.

#grafica ![graf-m01-08-red-atencion-ejecutiva](assets/graf-m01-08-red-atencion-ejecutiva.png) Diagrama de las redes atencionales mostrando la red ejecutiva y sus conexiones con la corteza prefrontal.
```

## Proceso por Fases

### Fase 0: Inventario
1. Buscar referencias a imágenes en los .md del módulo:
   ```
   Grep pattern: \!\[
   ```
2. Contar "Pasted image" pendientes
3. Identificar infografías con nomenclatura incorrecta (m0- → m00-)
4. Agrupar por archivo .md

### Fase 1-N: Procesamiento por archivo (orden: apertura → temas → síntesis)

**Para cada archivo .md:**

1. **Listar referencias**: Grep para encontrar todas las imágenes
2. **Visualizar imágenes**: Leer cada imagen para ver su contenido. **CRÍTICO: SIEMPRE leer/visualizar la imagen ANTES de proponer un nombre.** El nombre DEBE describir lo que se VE en la imagen, NO lo que el texto circundante sugiere. Nunca asignar nombres basándose solo en contexto textual.
3. **Agrupar por tema**: Antes de proponer nombres, agrupar TODAS las imágenes de cada sección por concepto temático. No limitarse a pares consecutivos; buscar coincidencias temáticas en toda la sección. Imágenes que ilustran el mismo tema general (ej: "adopción corporativa", "portadas de revistas") forman un grupo de variantes aunque estén separadas por varias líneas y tengan títulos diferentes.
4. **Detectar variantes**: Aplicar el test de agrupación a cada grupo temático (pueden ser cross-type y no consecutivas)
4. **Proponer nombres**: Tabla con:
   - Archivo actual
   - Tipo (#imagen, #ppt, #grafica, etc.)
   - Nombre propuesto (con -vN si es variante)
   - Descripción pedagógica (con "Opción N:" si es variante)
5. **Solicitar aprobación**: Mostrar tabla y esperar confirmación
6. **Ejecutar cambios**:
   - Renombrar archivos con `mv`
   - Actualizar referencias en .md con `Edit`
7. **Verificar**: Grep para confirmar 0 "Pasted image" restantes

### Checklist por imagen
- [ ] ¿Se visualizó la imagen antes de nombrarla?
- [ ] ¿Sigue el patrón completo `prefijo-mNN-TT-descriptor[-vN].ext`?
- [ ] ¿Topic number (TT) correcto según el archivo .md donde aparece?
- [ ] ¿Prefijo correcto según tipo?
- [ ] ¿Módulo y topic con dos dígitos (m01-08, nunca m1-8)?
- [ ] ¿El descriptor describe lo que se VE en la imagen?
- [ ] ¿Es variante de otra imagen? → Añadir `-vN` y "Opción N:"
- [ ] ¿La imagen está en `assets/` (no en `recursos/imagenes/`)?
- [ ] ¿Descripción pedagógica incluida?

## Salvaguardas

1. **NUNCA eliminar archivos** - Solo renombrar
2. **Leer archivo .md antes de editar** - El tool Edit lo requiere
3. **Máximo 10-15 imágenes por lote** - Para validación manejable
4. **Verificar referencias rotas** - Archivos que apuntan a rutas inexistentes
5. **Consolidar carpetas si hay duplicación** - Mover de `/recursos/imagenes` a `/assets`

## Manejo de Casos Especiales

### Referencias rotas
Si una imagen apunta a archivo inexistente:
- Opción A: Eliminar la referencia del .md
- Opción B: Marcar como `<!-- TODO: imagen faltante -->`
- Preguntar al usuario qué prefiere

### Duplicados entre carpetas
Si hay archivos en `/recursos/imagenes` y `/assets`:
1. Mover archivos de `/recursos/imagenes` a `/assets`
2. Actualizar referencias
3. Usuario elimina `/recursos/imagenes` manualmente después de verificar

### Infografías con nomenclatura parcial
Archivos como `m0-03infografia.jpg` o `m00-03infografiav2.png`:
- Normalizar a formato completo: `infog-m00-03-tema-v1.jpg`
- Si hay múltiples versiones, son variantes

## Ejemplo de Ejecución Completa

**Input usuario**: "Etiqueta los recursos del módulo 01"

**Proceso**:
1. Glob para encontrar archivos .md en el módulo
2. Grep en cada .md para encontrar referencias
3. Por cada archivo (empezando por apertura):
   - Visualizar imágenes
   - Proponer nombres en tabla
   - Esperar aprobación
   - Ejecutar renombrados
   - Actualizar .md
   - Verificar
4. Al finalizar: resumen de recursos procesados

**Output ejemplo**:
```
## MÓDULO 01 COMPLETADO

| Archivo | Recursos |
|---------|----------|
| m01-00-apertura.md | 12 |
| m01-01-cerebro.md | 18 |
| ... | ... |
| TOTAL | 85 |

Variantes aplicadas: X grupos
Verificación: 0 "Pasted image" restantes
```

## Notas Importantes

- El proceso es interactivo: siempre mostrar propuesta y esperar aprobación
- Agrupar variantes por concepto temático en toda la sección (no solo pares consecutivos)
- Las descripciones deben ser pedagógicas (qué enseña/ilustra la imagen)
- Mantener consistencia con el tono del curso (profesional, accesible)
