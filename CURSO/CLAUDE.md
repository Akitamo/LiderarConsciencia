# Instrucciones para modificar contenido del curso

# Regla crítica
- No modificar directamente, proponer cambios primero
- Respetar estructura y nomenclatura existente

# Orientación pedagógica
- Cada módulo tiene función pedagógica (qué enseña) y narrativa (qué transforma)
- Progresión: de lo individual a lo relacional, de la teoría a la práctica
- Siempre conectar neurociencia → experiencia personal → aplicación al liderazgo
- Incluir preguntas de reflexión, no solo información

# Estilo de escritura
- Rigor científico con lenguaje accesible
- Evitar jerga académica innecesaria
- Usar ejemplos concretos y situaciones de liderazgo
- Tono: guía cercana, no conferencia magistral

# Nomenclatura de archivos
- Carpeta módulo: modulo-XX-nombre/
- Índice módulo: mXX-00-indice.md
- Sección teórica: mXX-NN-nombre.md
- Ejercicio: mXX-eNN-nombre.md
- Imagen: mXX-nombre.png
- Vídeo: mXX-vNN-nombre.mp4

# Frontmatter obligatorio
---
titulo: "Nombre de la sección"
modulo: 1
orden: 5
tags: [tema1, tema2]
ultima_actualizacion: "DD/MM/YYYY"
---

Nota: El campo `ultima_actualizacion` debe actualizarse cada vez que se modifica el contenido del fichero.

# Sistema de marcado

## Principio base
Sin tag = contenido teórico. Solo se marcan las excepciones.

## Regla de límites
Cada tag aplica al contenido inmediatamente siguiente hasta la próxima línea en blanco.

## Tags activos

| Categoría | Tag | Uso |
|-----------|-----|-----|
| Multimedia | #imagen | Fotografías, ilustraciones, diagramas, GIFs |
| Multimedia | #video | Vídeos |
| Didáctico | #metafora | Analogía desarrollada que re-explica concepto mediante imagen explorable |
| Didáctico | #ejemplo | Caso concreto desarrollado (contexto, acción, resultado) |
| Didáctico | #practica | Actividad experiencial con instrucciones |
| Didáctico | #pregunta | Pregunta reflexiva dirigida al lector |
| Didáctico | #cita | Cita textual extensa con atribución |

## Tags obsoletos (no usar)
- ~~#teoria~~ → contenido sin tag es teoría por defecto
- ~~#explicacion~~ → fusionado con contenido teórico
- ~~#gif~~ → usar #imagen
- ~~#ejercicio~~ → usar #practica

## Referencias académicas

Usar footnotes markdown [^n] para fuentes mencionadas:
- Autor con libro/artículo
- Estudios/experimentos con institución
- Modelos/frameworks con nombre propio

**Regla anti-invención:** Solo crear footnotes para fuentes explícitamente mencionadas en el texto original. NUNCA inventar datos bibliográficos.
