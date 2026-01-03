````markdown
# PROMPT: Conversión PPT → Obsidian para curso "Liderar con Consciencia"

## CONTEXTO DEL PROYECTO

Estoy convirtiendo las presentaciones PowerPoint del curso "Liderar con Consciencia" a formato Markdown optimizado para Obsidian. El curso tiene varios módulos, cada uno con contenido sobre neurociencia, mindfulness y liderazgo consciente.

**Directorio base:** `C:\dev\projects\LiderarConsciencia\`
**Estructura por módulo:** Ya está creada la estructura por módulo en el directorio del proyecto 2. **No crear nuevo directorio sino incorporar en el directorio del módulo que le corresponda:** Listar directorios en el directorio base para identificar cual corresponde con el módulo del ppt subido.

**Herramientas:**
- `markitdown` para extraer texto y notas del orador
- `soffice` + `pdftoppm` para renderizar diapositivas e identificar imágenes visualmente

---

## FASE 1: ANÁLISIS Y PROPUESTA DE ESTRUCTURA

### Paso 1: Extracción de texto
```bash
python -m markitdown /mnt/user-data/uploads/archivo.pptx
````

### Paso 2: Conversión a imágenes para identificación visual

```bash
cp /mnt/user-data/uploads/archivo.pptx .
soffice --headless --convert-to pdf archivo.pptx
pdftoppm -jpeg -r 150 archivo.pdf slide-
```

### Paso 3: Identificar estructura del PPT

Cada diapositiva tiene:

- **Título del módulo** (aparece en pie/footer): "2- Consciente DE LO QUE SIENTO" → **IGNORAR**
- **Subtítulo temático** (encabezado principal de la diapositiva): "Los Sentidos" → **USAR PARA AGRUPAR**
- **Contenido**: texto, bullets, imágenes
- **Notas del orador**: aparecen bajo `### Notes:` en la extracción de markitdown

### Paso 4: Proponer estructura de archivos

Generar tabla con:

```
| Diaps | Título real del PPT | Archivo propuesto |
|-------|---------------------|-------------------|
| 3-5   | Los Sentidos | m02-01-los-sentidos.md |
| 6-8   | El Corazón y la Experiencia | m02-02-corazon-experiencia.md |
```

### Paso 5: ESPERAR VALIDACIÓN

**No proceder hasta que el usuario confirme la estructura propuesta.**

---

## CONTENIDO A EXCLUIR

Las siguientes diapositivas NO generan archivo ni contenido:

|Tipo|Ejemplo|Acción|
|---|---|---|
|**Portada del módulo**|"2- Consciente DE LO QUE SIENTO"|OMITIR completamente|
|**Recordatorio módulo anterior**|"En el módulo anterior vimos...", resumen de conceptos previos|OMITIR completamente|
|**Diapositiva solo con título**|Solo muestra el nombre del tema sin contenido|OMITIR|

---

## REGLAS DE AGRUPACIÓN

1. Cada **subtítulo temático diferente** = un archivo .md nuevo
2. Varias diapositivas consecutivas con **mismo subtítulo** = mismo archivo
3. Diapositivas de portada/título/recordatorio = OMITIR
4. Diapositivas solo con imagen o vídeo sin texto = incluir con sus tags correspondientes

---

## FASE 2: PROCESAMIENTO (tras validación)

### Para cada archivo MD:

1. Revisar las imágenes renderizadas de las diapositivas correspondientes
2. Extraer contenido de texto y notas del orador
3. Describir imágenes/vídeos basándose en lo que se VE
4. Crear archivo .md directamente en la ruta de salida del usuario
5. Informar al usuario con mensaje estandarizado
6. **ESPERAR CONFIRMACIÓN EXPLÍCITA** antes de continuar

### Mensaje tras crear archivo:

```
Creado `mXX-NN-nombre.md`. Valida en Obsidian.

Confirma para continuar con el siguiente submódulo.
```

**IMPORTANTE:**

- No crear múltiples archivos en una sola respuesta
- No mostrar contenido completo del archivo en pantalla (usuario valida en Obsidian)

---

## IDENTIFICACIÓN VISUAL DE IMÁGENES Y VÍDEOS

Las imágenes y vídeos se identifican **visualmente** a partir de las diapositivas renderizadas (slide-XX.jpg).

### Proceso:

1. Revisar cada imagen de diapositiva generada con pdftoppm
2. Identificar elementos visuales: fotografías, diagramas, gráficos, capturas, vídeos incrustados
3. Crear placeholder descriptivo basándose SOLO en lo que se VE
4. **NO inferir ni inventar** elementos que no estén visibles

### Para cada elemento visual:

- Describir tipo (fotografía, diagrama, ilustración, captura, portada libro, etc.)
- Describir elementos principales visibles
- Incluir texto visible relevante (títulos, etiquetas, citas)
- Indicar colores o disposición si es significativo

---

## NOMENCLATURA DE ARCHIVOS

`mXX-NN-nombre-del-subtitulo.md`

Donde:

- `mXX` = número de módulo (m01, m02, m03...)
- `NN` = número secuencial (01, 02, 03...) según orden de aparición
- `nombre-del-subtitulo` = subtítulo en minúsculas, sin tildes, guiones por espacios

---

## ESTRUCTURA DE CADA ARCHIVO

```markdown
---
id: mXX-NN
titulo: "Subtítulo exacto como aparece en el PPT"
modulo: X
orden: NN
tags: [tag1, tag2, tag3]
---

# Subtítulo exacto

#teoria
Texto literal de la diapositiva (bullets, párrafos, tal cual aparece).

#imagen
`[IMG: mXX-NN-nombre-descriptivo]` Descripción basada en lo que se VE en la diapositiva.

#explicacion
Notas del orador asociadas a esta diapositiva.

#video
`[VID: mXX-NN-nombre-descriptivo]` Descripción del vídeo visible en la diapositiva.
```

---

## ORDEN DENTRO DE CADA DIAPOSITIVA

1. `#teoria` + texto de la diapositiva (si hay texto)
2. `#imagen` + placeholder (si hay imagen)
3. `#video` + placeholder (si hay vídeo)
4. `#explicacion` + notas del orador (si hay - **OMITIR sección completa si no hay notas**)

---

## CUANDO HAY VARIAS DIAPOSITIVAS CON MISMO SUBTÍTULO

Concatenar contenido en orden de aparición:

```markdown
# Subtítulo

#teoria
Contenido diapositiva N...

#imagen
`[IMG: mXX-NN-descripcion-1]` Descripción de lo que se ve...

#explicacion
Notas diapositiva N...

#teoria
Contenido diapositiva N+1...

#imagen
`[IMG: mXX-NN-descripcion-2]` Descripción de lo que se ve...

#explicacion
Notas diapositiva N+1...
```

---

## TAGS INLINE

|Tag|Cuándo usar|
|---|---|
|`#teoria`|Antes de bloques de contenido conceptual|
|`#imagen`|Antes de placeholder de imagen|
|`#video`|Antes de placeholder de vídeo|
|`#explicacion`|Antes de notas del orador (OMITIR si no hay notas)|
|`#ejercicio`|Si el contenido es una actividad práctica|
|`#reflexion`|Si hay preguntas dirigidas al alumno|
|`#cita`|Si hay cita textual de un autor|

---

## FORMATO DE PLACEHOLDERS

### Imágenes:

```markdown
#imagen
`[IMG: mXX-NN-nombre-descriptivo]` Descripción basada en lo que se VE: tipo, elementos, colores, texto visible.
```

### Vídeos:

```markdown
#video
`[VID: mXX-NN-nombre-descriptivo]` Descripción del vídeo visible: indicador de vídeo, fotograma, contexto.
```

### Reglas de naming:

- Prefijo: `mXX-NN-` (módulo-submódulo)
- Nombre: descriptivo, minúsculas, guiones
- Ejemplos: `m01-03-cerebro-pelicula-recuerdos`, `m02-01-triangulo-atencion`

### Ejemplos de buenas descripciones:

```markdown
`[IMG: m01-01-vineta-evolucion]` Viñeta humorística de evolución mostrando reptil, mamífero, primate y humano en secuencia, todos pensando "COMER, SOBREVIVIR, REPRODUCIRSE" excepto el humano que piensa "¿...DE QUÉ IBA ESTO...?"

`[IMG: m01-06-tabla-comparativa]` Tabla comparativa Sistema 1 vs Sistema 2 con columnas: Velocidad, Esfuerzo, Base, Control, Precisión, Eficiencia.

`[VID: m01-04-ratatouille-anton-ego]` Fotograma de película Ratatouille mostrando al crítico Anton Ego probando el plato. Se ve icono de vídeo incrustado.
```

---

## TAGS DEL FRONTMATTER

Seleccionar según contenido del archivo:

`neurociencia`, `cerebro`, `evolucion`, `sentidos`, `percepcion`, `memoria`, `automatismos`, `emociones`, `atencion`, `mindfulness`, `meditacion`, `kahneman`, `sistema1`, `sistema2`, `sesgos`, `heuristicas`, `corteza-prefrontal`, `amigdala`, `hipocampo`, `dopamina`, `interocepcion`

---

## CHECKLIST DE VALIDACIÓN POR ARCHIVO

Antes de pasar al siguiente archivo, verificar:

- [ ] Frontmatter completo (id, titulo, modulo, orden, tags)
- [ ] Título coincide exactamente con subtítulo del PPT
- [ ] Texto literal de diapositivas bajo `#teoria`
- [ ] Notas del orador bajo `#explicacion` (solo si existen)
- [ ] Imágenes descritas basándose en lo que se VE
- [ ] Vídeos descritos basándose en lo que se VE
- [ ] Archivo guardado en directorio correcto
- [ ] No incluye portada ni recordatorios de módulos anteriores

---

## REGLAS ESTRICTAS

- ✅ Copiar texto LITERAL del PPT (no redactar, no corregir, no mejorar)
- ✅ Usar títulos REALES de las diapositivas (no inventar)
- ✅ Respetar estructura de bullets si existe
- ✅ Incluir notas del orador completas cuando existan
- ✅ Describir imágenes basándose SOLO en lo que se VE en la diapositiva
- ✅ Usar formato código inline para placeholders: `[IMG: ...]` `[VID: ...]`
- ✅ Crear archivo directamente en la ruta de salida del usuario
- ✅ Esperar validación del usuario después de CADA archivo
- ❌ NO mostrar contenido completo del archivo en pantalla (usuario valida en Obsidian)
- ❌ NO modificar ortografía ni estilo del original
- ❌ NO añadir contenido que no esté en el PPT
- ❌ NO crear archivos para diapositivas de portada
- ❌ NO incluir recordatorios/resúmenes de módulos anteriores
- ❌ NO usar comentarios HTML para placeholders
- ❌ NO crear varios archivos en una sola respuesta
- ❌ NO inventar imágenes que no se vean en el PPT

---

## FLUJO DE COMUNICACIÓN

1. Usuario sube PPT
2. Claude extrae texto con markitdown
3. Claude convierte a imágenes con soffice + pdftoppm
4. Claude propone tabla de estructura con títulos reales (excluyendo portada y recordatorios)
5. Usuario valida o ajusta
6. Claude crea archivo 1 directamente en ruta, informa con mensaje estandarizado
7. **Claude ESPERA** confirmación explícita del usuario (tras validar en Obsidian)
8. Usuario dice "ok" / "siguiente" → Claude crea archivo 2
9. Usuario indica corrección → Claude aplica, guarda y espera nueva confirmación
10. Repetir hasta completar módulo

---

## AL FINALIZAR EL MÓDULO

1. Crear archivo índice solo con frontmatter: `mXX-00-indice.md`

```markdown
---
id: mXX-00
titulo: "Índice Módulo X: Nombre del módulo"
modulo: X
orden: 00
tags: [indice, modulo-X]
---
```

2. Recordar al usuario: ejecutar template "Generar Indice Modulo" en Obsidian
    
3. Mostrar resumen de archivos creados:
    

```
| Archivo | Título | Diapositivas |
|---------|--------|--------------|
| mXX-01-xxx.md | Título 1 | 3-5 |
| mXX-02-xxx.md | Título 2 | 6-8 |
```

---

## INICIO DE SESIÓN

Cuando el usuario suba un archivo PPT, responder con:

1. **Confirmación:** "He recibido el PPT para el módulo X: [nombre]"
2. **Extracción:** Ejecutar markitdown + conversión a imágenes
3. **Propuesta:** Tabla con estructura de archivos (títulos reales + diapositivas + nombres archivo), indicando qué diapositivas se omiten
4. **Espera:** "¿Validamos esta estructura antes de proceder?"

