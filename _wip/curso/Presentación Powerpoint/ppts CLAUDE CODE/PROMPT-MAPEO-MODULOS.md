# Prompt: Mapeo de slides al catálogo de patrones

## Tu rol

Eres un asistente especializado en diseño de presentaciones educativas. Tu tarea es analizar una presentación PPTX existente y mapear cada una de sus slides al catálogo de patrones definido en `guia-patrones-slides.md`, generando un archivo de contenido mapeado que servirá como input para la recreación de la presentación.

## Archivos que necesitas

Todo está en: `C:\dev\projects\LiderarConsciencia\_wip\curso\Presentación Powerpoint\ppts CLAUDE CODE\`

1. **guia-patrones-slides.md** — El catálogo de 22 patrones con su función y componentes. LÉELO COMPLETO antes de empezar.
2. **M04-PATRON.pptx** — El template de referencia visual (por si necesitas ver cómo se implementan los patrones).
3. **Los PPTX de los módulos a mapear** — Están en esa misma carpeta (M01 a M07). Procesa el que el usuario te indique, o todos si te lo pide.

El archivo de salida (`MXX-contenido-mapeado.md`) también debe guardarse en esa misma carpeta.

## Instrucciones

### Paso 1: Extraer el contenido
Extrae todo el contenido textual del PPTX (usa markitdown o herramienta equivalente). Necesitas ver el texto de cada slide. No extraigas speaker notes.

### Paso 2: Convertir a imágenes para análisis visual
Convierte el PPTX a PDF y luego a imágenes para poder analizar visualmente la estructura de cada slide:
```bash
python scripts/office/soffice.py --headless --convert-to pdf archivo.pptx
pdftoppm -jpeg -r 120 archivo.pdf slide
```

### Paso 3: Mapear cada slide

Para cada slide, decide:

1. **¿Qué patrón del catálogo le corresponde?** — Basándote en la FUNCIÓN de la slide (no en su contenido). Pregúntate: ¿esta slide presenta un contraste? ¿un proceso secuencial? ¿un dato de impacto? ¿una cita? La función determina el patrón.

2. **¿Necesita adaptación?** — Si el patrón tiene 3 tarjetas pero la slide necesita 4, anótalo como "adaptado a 4 tarjetas". Si el layout necesita 2 columnas pero la slide tiene 5 ítems en lista, el patrón Grid (#8) o Proceso (#4) pueden servir.

3. **¿No encaja en ningún patrón?** — Si una slide tiene una estructura que NO corresponde a ninguno de los 22 patrones actuales, márcala como:
   ```
   ## SLIDE X → NUEVO PATRÓN PROPUESTO: [nombre descriptivo]
   **Función:** [qué función cumple]
   **Componentes:** [qué elementos tiene]
   **Justificación:** [por qué no encaja en los existentes]
   ```

### Paso 4: Extraer el contenido estructurado

Para cada slide, documenta TODOS los textos organizados según los componentes del patrón asignado. NO incluyas speaker notes. Usa este formato:

```
## SLIDE [número] → Patrón #[número] ([nombre del patrón])
- Etiqueta: "[texto de la etiqueta N1]"
- Título: "[texto del título N2]"
- [componente según el patrón]: "[texto]"
- Cita: "[texto de la cita de cierre]"
- Placeholder imagen: [IMAGEN: nombre-archivo.png] (si tiene placeholder)
```

## Reglas de decisión para el mapeo

### Prioridad: función sobre apariencia
- Una slide con dos columnas podría ser Contraste dual (#3), Comparativa paralela (#7) o Visual central + bloques (#10). Lo que decide es si OPONE (→ #3), COMPARA EN DETALLE (→ #7) o EXPLICA DOS FACETAS de un visual (→ #10).

### Patrones frecuentes por tipo de contenido
| Contenido de la slide | Patrón probable |
|---|---|
| Título del módulo + cita | #1 Portada |
| Número + título de sección | #2 Separador |
| Dos listas enfrentadas (sí/no, antes/después) | #3 Contraste dual |
| Fases, pasos, etapas numeradas | #4 Proceso secuencial |
| Tabla + estadística destacada | #5 Tabla + dato |
| Pregunta retórica + diagrama (fondo oscuro) | #6 Impacto/Provocación |
| Dos columnas con filas detalladas | #7 Comparativa paralela |
| Múltiples ítems con icono + descripción | #8 Grid de ítems |
| Gráfica/diagrama + explicación debajo | #9 Gráfica + análisis |
| Imagen central + dos bloques laterales | #10 Visual central |
| Filas de causa → efecto | #11 Causa-efecto |
| Estudio con referencia + gráfica + hallazgo | #12 Estudio/Evidencia |
| Filas de transformación (estado A → estado B) | #13 Transformación |
| Pasos de una práctica guiada | #14 Instrucción guiada |
| 3-4 tarjetas con ideas clave | #15 Tarjetas síntesis |
| Principio o valor central con contraste | #16 Principio/Manifiesto |
| Timeline o roadmap del programa | #17 Roadmap |
| Cita de un autor con referencia | #18 Cita de autor |
| Número grande + descripción (dato de impacto) | #19 Stat destacado |
| Pregunta directa al participante | #20 Reflexión/Pregunta |
| "Gracias" + datos de contacto | #21 Cierre |
| "Próxima parada" + siguiente módulo | #22 Transición |

### Adaptaciones frecuentes
- **3 → 4 tarjetas:** Anotar "adaptado a 4 tarjetas" (el template tiene 3, hay que duplicar una shape)
- **Stats variante:** El patrón #19 tiene variante "multi-stat" para 3-4 cifras en grid
- **Slides densas:** Si una slide del original tiene demasiado contenido para un solo patrón, propón dividirla en 2 slides

### Lo que NO debes hacer
- No fuerces un patrón si no encaja. Mejor propón uno nuevo.
- No simplifiques ni edites el contenido. Extráelo tal cual.
- No asumas que el orden de slides es correcto. Si detectas que el flujo narrativo mejoraría reordenando, anótalo como observación al final.

## Formato del archivo de salida

El archivo debe llamarse `MXX-contenido-mapeado.md` donde XX es el número del módulo.

Estructura:
```markdown
# MXX — [Título del módulo]
## Contenido mapeado a patrones del template

Fuente: M04-PATRON.pptx (template base)
Referencia: guia-patrones-slides.md

---

## SLIDE 1 → Patrón #[n] ([nombre])
[contenido estructurado]

## SLIDE 2 → Patrón #[n] ([nombre])
[contenido estructurado]

[...]

---

## Observaciones
- [Cualquier nota sobre slides que no encajan, propuestas de reordenación, o patrones nuevos necesarios]
- [Número total de slides mapeadas]
- [Patrones del catálogo no utilizados en este módulo]
- [Patrones nuevos propuestos, si los hay]
```

## Ejemplo de mapeo (extracto)

```markdown
## SLIDE 5 → Patrón #8 (Grid de ítems) — adaptado a 4 columnas
- Etiqueta: "DIAGNÓSTICO"
- Título: "Cuatro fuerzas convergentes"
- Columna 1: Header "Fragmentación digital" · Texto "La atención profunda ha desaparecido." · Stat "47s de atención sostenida"
- Columna 2: Header "Crisis de legitimidad" · Texto "Desconfianza estructural en el liderazgo." · Stat "7 de cada 10 desconfían"
- Cita: "Lo nuevo no es cada fuerza. Lo nuevo es su convergencia."
```

## Cuando termines

Presenta un resumen con:
1. Número total de slides del módulo
2. Distribución de patrones usados (cuántas veces se usa cada uno)
3. Patrones nuevos propuestos (si los hay)
4. Slides que pueden dar problemas en la recreación (por densidad de contenido, número de elementos distinto al template, etc.)
