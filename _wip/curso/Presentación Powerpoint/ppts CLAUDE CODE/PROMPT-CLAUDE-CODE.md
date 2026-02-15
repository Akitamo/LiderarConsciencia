# Instrucciones para recrear M00 desde el template M04-PATRON

## Contexto

Tienes un template PPTX (`M04-PATRON.pptx`) con 20 slides que definen el sistema de diseño del programa "Liderar con Consciencia". Necesitas crear una nueva presentación (`M00-El-Momento-que-Nos-Convoca.pptx`) usando ese template como base, sustituyendo contenido según el mapeo definido en `M00-contenido-mapeado.md`.

## Archivos disponibles

- `M04-PATRON.pptx` — Template base con los layouts y estilos correctos
- `guia-patrones-slides.md` — Catálogo de 22 patrones con su función y componentes
- `M00-contenido-mapeado.md` — Las 30 slides del M00 con su contenido ya asignado a patrones
- `M00-El-Momento-que-Nos-Convoca.pptx` — El M00 original (solo como referencia de contenido y speaker notes)

## Sistema tipográfico estricto

| Nivel | Tamaño (hundredths) | pt | Función |
|-------|---------------------|-----|---------|
| N1 | sz="1000" | 10 | Etiqueta superior / categoría (bold, uppercase) |
| N2 | sz="2200" | 22 | Título principal (bold) |
| N3 | sz="1200" | 12 | Subtítulo, header sección, cita cierre |
| N4 | sz="900" | 9 | Cuerpo, descripciones |
| N5 | sz="800" | 8 | Texto secundario, fuentes |
| Decorativo | variable | >24 | Números grandes, stats — no normalizar |

## Método de trabajo

### Paso 1: Desempaquetar el template
```bash
python scripts/office/unpack.py M04-PATRON.pptx template-unpacked/
```

### Paso 2: Analizar los layouts del template
Examina los XMLs de las 20 slides del template. Identifica qué slide del template corresponde a cada patrón:
- Slide 1 del template = Patrón #1 (Portada)
- Slide 2 del template = Patrón #2 (Separador)  
- etc.

Necesitarás estudiar el XML de cada slide para entender la estructura de shapes, posiciones, colores y fondos.

### Paso 3: Construir el M00
Para cada slide del M00 (ver M00-contenido-mapeado.md):

1. **Identificar el patrón asignado** (ej: "Slide 5 → Patrón #8 Grid de ítems")
2. **Encontrar la slide del template** que implementa ese patrón
3. **Duplicar el XML** de esa slide del template
4. **Sustituir los textos** manteniendo toda la estructura XML (shapes, posiciones, colores, formatting)
5. **Ajustar el número de elementos** si es necesario (ej: si el patrón tiene 3 tarjetas pero el M00 necesita 4, duplicar una shape y ajustar posiciones)

### Paso 4: Patrones nuevos (no existentes en el template)
Para los patrones #18 (Cita), #19 (Stat), #20 (Reflexión) y #21 (Cierre), que NO existen como slide en el template:
- Crear la slide usando las shapes y estilos del template como referencia
- Respetar estrictamente la paleta de colores del template
- Usar los mismos fondos (oscuro para slides de respiración, claro para contenido)
- Mantener el catálogo tipográfico

### Paso 5: Speaker notes
Copiar las speaker notes del M00 original al nuevo M00. Las notes están en el archivo `M00-contenido-mapeado.md` NO incluye las notes completas, así que extráelas del M00 original desempaquetado (en `ppt/notesSlides/`).

### Paso 6: Empaquetar y validar
```bash
python scripts/office/pack.py output-unpacked/ M00-El-Momento-que-Nos-Convoca-v2.pptx --original M04-PATRON.pptx
```

## Reglas críticas

1. **No modificar los fondos, colores ni decoraciones** del template. Solo sustituir textos.
2. **Respetar el catálogo tipográfico** — nunca usar un sz que no sea 800, 900, 1000, 1200, 2200, o decorativo.
3. **Los placeholders de imagen** (texto tipo "[IMAGEN: nombre.png]") deben mantenerse como text boxes con ese texto. No intentar insertar imágenes.
4. **Cada slide debe tener solo los elementos que le corresponden** según su patrón. No arrastrar shapes sobrantes del template.
5. **Los fondos oscuros** se usan SOLO en: Portada (#1), Separadores (#2), Reflexión (#20), Transición (#22), Cierre (#21).
6. **Los fondos claros** (crema) se usan en todo el contenido.

## Verificación final

Después de generar el PPTX:
1. Convertir a PDF: `python scripts/office/soffice.py --headless --convert-to pdf output.pptx`
2. Generar thumbnails: `pdftoppm -jpeg -r 150 output.pdf slide`
3. Verificar visualmente que:
   - Las portadas y separadores tienen fondo oscuro
   - El contenido tiene fondo claro
   - La tipografía es consistente
   - No hay textos desbordados
   - Los placeholders de imagen están presentes
