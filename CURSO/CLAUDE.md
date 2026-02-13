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
- Carpeta módulo: `modulo-XX-nombre/`
- Índice módulo: `mXX-00-indice.md` (o `mXX-00-apertura.md`)
- Sección teórica: `mXX-NN-nombre.md`
- Síntesis: `mXX-sintesis.md`
- Práctica/entrenamiento: en subcarpeta `Prácticas-entrenamiento/`
- Recursos multimedia: en subcarpeta `assets/` con prefijo de tipo:
  - `img-mXX-TT-descriptor.ext` (fotografías, ilustraciones)
  - `graf-mXX-TT-descriptor.ext` (diagramas, gráficos)
  - `ppt-mXX-TT-descriptor.ext` (diapositivas)
  - `infog-mXX-TT-descriptor.ext` (infografías)
  - `gif-mXX-TT-descriptor.ext` (GIFs animados)
  - `vid-mXX-TT-descriptor.ext` (vídeos)
- Variantes: sufijo `-vN` (ej: `graf-m01-05-jerarquia-v1.png`, `-v2.png`)

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

**Excepción — tags de sección:** `#insight` y `#aux` pueden aparecer como sufijo de un encabezado (`## Dimensión experiencial #insight`). En ese caso, el tag aplica a todo el contenido bajo ese encabezado hasta el siguiente encabezado de igual o superior nivel.

## Formato de recursos multimedia

```markdown
#tag ![prefijo-mNN-TT-descriptor](assets/nombre.ext) Descripción pedagógica del recurso.
```

## Tags activos (14)

| Categoría | Tag | Uso |
|-----------|-----|-----|
| Multimedia | #imagen | Fotografías, ilustraciones, portadas de libro, viñetas — sin estructura analítica |
| Multimedia | #grafica | Diagramas, gráficos de datos, modelos esquemáticos — ilustra un solo concepto |
| Multimedia | #ppt | Composición tipo diapositiva con título, diseño cerrado y mensaje autónomo |
| Multimedia | #infografia | Gráfico denso que sintetiza un tema completo con múltiples capas de información |
| Multimedia | #gif | Imagen animada en formato GIF |
| Multimedia | #video | Contenido en formato video (mp4, webm) |
| Didáctico | #metafora | Analogía desarrollada que re-explica concepto mediante imagen explorable |
| Didáctico | #ejemplo | Caso concreto desarrollado (contexto, acción, resultado) — el lector observa |
| Didáctico | #practica | Actividad experiencial individual con instrucciones |
| Didáctico | #ejercicio | Dinámica grupal participativa (role playing, trabajo en grupos, dinámicas) |
| Didáctico | #entrenamiento | Práctica de entrenamiento meditativo del curso |
| Didáctico | #cita | Cita textual extensa con atribución |
| Didáctico | #insight | Preguntas para reflexión individual y posible debate |
| Sección | #aux | Material auxiliar/complementario fuera del flujo principal (sufijo de encabezado) |

### Multimedia — Descripciones detalladas

**#imagen** — Fotografía, ilustración, portada de libro, viñeta, captura o imagen metafórica/representativa que acompaña visualmente al contenido sin estructura analítica ni de presentación.
- Marcar: fotos (reales o stock), ilustraciones artísticas, viñetas, portadas de libro, imágenes metafóricas. Su función es evocar, representar o ambientar.
- NO marcar: diagramas con ejes/flechas/nodos → `#grafica`. Composiciones tipo diapositiva → `#ppt`. Gráficos densos multisección → `#infografia`. GIFs animados → `#gif`.
- Regla práctica: si tiene flechas, ejes, nodos o datos cuantitativos, no es `#imagen`. Si tiene título propio y se entiende sola, tampoco.

**#grafica** — Representación visual esquemática que explica un aspecto específico del tema: diagramas de flujo, gráficos de datos, curvas, modelos de nodos, tablas visuales. Ilustra un solo concepto o relación.
- Marcar: diagramas, gráficos de datos, curvas, modelos esquemáticos con estructura visual analítica (ejes, flechas, nodos, barras, flujos). Necesita el texto circundante para contextualizarse.
- NO marcar: composiciones completas tipo diapositiva → `#ppt`. Gráficos densos que sintetizan un tema completo → `#infografia`. Fotos/ilustraciones → `#imagen`. Tablas en markdown puro (no llevan tag).
- Regla práctica: "¿Podría proyectarse como diapositiva completa?" Sí → `#ppt`. "¿Resume un tema entero?" Sí → `#infografia`. Si es un diagrama parcial → `#grafica`.

**#ppt** — Imagen con composición visual completa tipo diapositiva: incluye título, mensaje y diseño gráfico integrado, de modo que funciona como diapositiva autónoma.
- Marcar: diseño integrado (título + contenido visual + mensaje) que se entiende por sí misma. Incluye tipografía, iconografía, layout de presentación.
- NO marcar: diagramas parciales → `#grafica`. Fotos/ilustraciones → `#imagen`. Infografías densas → `#infografia`.
- Regla práctica: "¿Tiene título propio, diseño cerrado y un mensaje que se entiende sin el texto que la rodea?" Sí → `#ppt`.

**#infografia** — Gráfico complejo de alta densidad informativa que sintetiza un tema completo o sección extensa, combinando múltiples elementos visuales (texto, iconos, datos, diagramas) en una única pieza.
- Marcar: sintetiza un tema completo en una pieza visual densa. Combina múltiples tipos de información. Funciona como pieza de repaso o resumen visual. Típicamente aparece al final de un tema o en secciones `#aux`.
- NO marcar: diagramas de un solo concepto → `#grafica`. Diapositivas con un mensaje principal → `#ppt`. Fotos/ilustraciones → `#imagen`.
- Regla práctica: "¿Resume un tema completo con múltiples capas, o ilustra un solo concepto?" Solo un concepto → `#grafica`. Tema completo y denso → `#infografia`.

**#gif** — Imagen animada en formato GIF que muestra movimiento, transición o secuencia temporal.
- Marcar: archivo `.gif` con animación relevante para la comprensión del concepto.
- NO marcar: GIFs estáticos → `#imagen`. Videos completos → `#video`.

**#video** — Contenido en formato video (mp4, webm, o enlace a plataforma).
- Marcar: recurso de video con duración significativa que aporta contenido (explicación, demostración, entrevista).
- NO marcar: GIFs animados cortos → `#gif`. Enlaces textuales a videos sin recurso embebido (van como referencia o footnote).

### Didáctico — Descripciones detalladas

**#metafora** — Analogía o metáfora desarrollada que re-explica un concepto abstracto mediante una imagen concreta explorable.
- Marcar: ocupa bloque diferenciado, tiene función didáctica (re-explica el concepto previo), ofrece un escenario que el lector puede "explorar". El desarrollo es de la imagen/escenario, no solo del concepto.
- NO marcar: metáforas lexicalizadas ("piloto automático", "cascada", "ola emocional"). Comparaciones puntuales ("como un río"). Expresiones figuradas dentro de frases. Imágenes que solo etiquetan el concepto sin desarrollar la metáfora.
- Regla práctica: si quitar el fragmento deja un hueco didáctico notable, probablemente merece marcado. Si el texto fluye igual sin él, no marcarlo.

**#ejemplo** — Caso concreto desarrollado que ilustra un concepto abstracto mediante una situación, escenario o dato específico. El lector observa; no se le pide que actúe.
- Marcar: bloque diferenciado con caso desarrollado (contexto + acción + resultado, o al menos contexto + fenómeno). Incluye experimentos científicos narrados.
- NO marcar: enumeraciones ilustrativas incrustadas ("reuniones, tráfico, correos..."). Menciones nominales sin desarrollo. Listas de instancias sin narrativa. Actividades donde el participante actúa → `#ejercicio` o `#practica`.

**#practica** — Actividad experiencial individual con instrucciones donde el participante realiza algo por su cuenta durante la sesión.
- Marcar: instrucciones explícitas de acción individual (responder, completar, observar un resultado). Se apoya frecuentemente en un recurso visual. Produce una experiencia directa o resultado individual.
- NO marcar: dinámicas grupales → `#ejercicio`. Prácticas meditativas → `#entrenamiento`. Preguntas reflexivas → `#insight`. Ejemplos donde el lector solo lee → `#ejemplo`.

**#ejercicio** — Dinámica grupal participativa donde los participantes trabajan juntos: role playing, trabajo en grupos, dinámicas de equipo, actividades colaborativas.
- Marcar: requiere interacción entre participantes. Incluye role playing, debates estructurados, dinámicas de equipo, ejercicios colaborativos.
- NO marcar: actividades individuales → `#practica`. Prácticas meditativas → `#entrenamiento`. Reflexiones personales → `#insight`.
- Regla práctica: "¿Necesita más de una persona para realizarse?" Sí → `#ejercicio`. No → `#practica`.

**#entrenamiento** — Práctica de entrenamiento meditativo del curso. Corresponde a las prácticas guiadas de atención, respiración, meditación y entrenamiento contemplativo que se encuentran en las carpetas `Prácticas-entrenamiento/`.
- Marcar: meditaciones guiadas, prácticas de atención plena, ejercicios contemplativos, entrenamientos de respiración consciente.
- NO marcar: actividades experienciales no meditativas → `#practica`. Dinámicas grupales → `#ejercicio`.

**#cita** — Cita textual extensa de un autor, investigador o fuente externa, con atribución explícita, que ocupa un bloque diferenciado.
- Marcar: cita textual entre comillas, extensión suficiente (más de una frase), con atribución (autor, fuente, año), en bloque diferenciado.
- NO marcar: menciones breves integradas en el texto ("como dijo Selye..."). Paráfrasis de ideas. Referencias a estudios sin cita textual → usar footnote `[^n]`.

**#insight** — Preguntas para reflexión individual y posible debate. Invitación a conectar el contenido del tema con la experiencia personal del participante.
- Marcar: preguntas abiertas que invitan a reflexión personal. Conectan el tema con la vivencia del participante. No tienen respuesta única correcta. Pueden derivar en debate grupal.
- NO marcar: actividades con instrucciones concretas → `#practica` o `#ejercicio`. Preguntas retóricas integradas en el discurso teórico que el propio texto responde. Títulos formulados como pregunta ("¿Qué es el estrés?").
- Uso a nivel sección: puede aparecer como sufijo de encabezado (`## Dimensión experiencial #insight`) cuando toda la sección es contenido reflexivo.

### Sección

**#aux** — Material auxiliar o complementario que acompaña al tema pero no forma parte del flujo principal de contenido. Se usa como sufijo de encabezado.
- Marcar: material complementario fuera del flujo narrativo. Agrupa recursos adicionales (infografías de resumen, material de interés). Aparece típicamente al final del tema. Los recursos individuales dentro llevan su propio tag (`#infografia`, `#imagen`, etc.).
- NO marcar: recursos multimedia del flujo principal (llevan su tag sin `#aux`). Secciones de referencias bibliográficas. Secciones `#insight`.
- Formato: `## Material adicional del tema #aux`

## Referencias académicas

Usar footnotes markdown [^n] para fuentes mencionadas:
- Autor con libro/artículo
- Estudios/experimentos con institución
- Modelos/frameworks con nombre propio

**Regla anti-invención:** Solo crear footnotes para fuentes explícitamente mencionadas en el texto original. NUNCA inventar datos bibliográficos.
