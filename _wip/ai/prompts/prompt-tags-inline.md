# Prompt: Tags Inline — Marcado Estructural

## Objetivo

Aplicar sistema de marcado estructural con tags inline a archivos de contenido teórico del curso "Liderar con Consciencia".

**Principio:** NO se modifica la redacción. Solo se añade marcado.

### Ruta de trabajo

**NUNCA modificar directamente los archivos de producción en `CURSO/`.** Todo el trabajo se realiza sobre las copias en `_wip/curso/Perfeccionamiento Curso/`. Solo se promueven a `CURSO/` mediante el proceso formal de promoción.

---

## Sistema de marcado

### Regla de límites

Cada tag aplica al contenido inmediatamente siguiente hasta la próxima línea en blanco.

```markdown
#ejemplo
Este es el contenido del ejemplo que puede
ocupar varias líneas sin separación.

Aquí comienza teoría de nuevo (línea en blanco cerró el bloque).
```

**Excepción — tags de sección:** `#insight` y `#aux` pueden aparecer como sufijo de un encabezado (`## Dimensión experiencial #insight`). En ese caso, el tag aplica a todo el contenido bajo ese encabezado hasta el siguiente encabezado de igual o superior nivel.

### Reglas operativas generales

| Regla | Descripción |
|-------|-------------|
| **Posición** | Tag en línea propia, al inicio del bloque (o como sufijo de encabezado para tags de sección) |
| **Un bloque = un tag** | Cada bloque lleva un único tag |
| **No solapamiento** | Si un bloque cumple criterios de más de un tag, elegir el dominante. Usar los árboles de decisión |
| **Abstención** | Si hay duda sobre si cumple los criterios, NO marcar |
| **Sin tag = contenido teórico** | El texto teórico no se marca. Solo se marcan las excepciones |

---

## Catálogo de tags

### A — Tags de recursos multimedia

Marcan un bloque que contiene un recurso multimedia (imagen, video, etc.). El formato estándar es:

```markdown
#tag ![prefijo-mNN-TT-descriptor](assets/nombre.ext) Descripción pedagógica del recurso.
```

Variantes del mismo concepto usan sufijo `-vN`:
```markdown
#grafica ![graf-m01-05-jerarquia-v1](assets/graf-m01-05-jerarquia-v1.png) Opción 1: Jerarquía en texto.
#grafica ![graf-m01-05-jerarquia-v2](assets/graf-m01-05-jerarquia-v2.png) Opción 2: Jerarquía visual con colores.
```

---

#### #imagen

Fotografía, ilustración, portada de libro, viñeta, captura o imagen metafórica/representativa que acompaña visualmente al contenido **sin estructura analítica ni de presentación**.

**Marcar cuando:**
- Es una fotografía (real o stock), ilustración artística, viñeta humorística, portada de libro, o imagen metafórica
- Su función es evocar, representar, ambientar o ilustrar — no analizar datos ni esquematizar procesos
- No tiene estructura de datos (ejes, nodos, flujos, barras) ni layout de presentación (título + diseño integrado)
- Acompaña al texto como recurso visual de apoyo, no como explicación autónoma

**NO marcar:**
- Diagramas con estructura analítica (ejes, flechas, flujos, barras, nodos) → `#grafica`
- Composiciones cerradas tipo diapositiva con título y mensaje autónomo → `#ppt`
- Gráficos densos con múltiples secciones informativas que resumen un tema → `#infografia`
- GIFs animados → `#gif`

**Regla práctica:** Si la imagen tiene flechas, ejes, nodos o datos cuantitativos, no es `#imagen`. Si tiene título propio, layout de presentación y se entiende sola, tampoco. `#imagen` es para fotos, ilustraciones y representaciones sin estructura analítica.

---

#### #grafica

Representación visual esquemática que explica un aspecto específico del tema: diagramas de flujo, gráficos de datos, curvas, modelos de nodos, tablas visuales. Ilustra **un solo concepto o relación**, no un tema completo.

**Marcar cuando:**
- Es un diagrama, gráfico de datos, curva, modelo esquemático o tabla visual creado para explicar un concepto
- Tiene estructura visual analítica: ejes, flechas, nodos, barras, curvas, círculos concéntricos, flujos
- Ilustra un aspecto parcial del tema — necesita el texto circundante para contextualizarse
- Es autoexplicativa en cuanto al concepto que ilustra, pero no funciona como diapositiva autónoma

**NO marcar:**
- Composiciones completas tipo diapositiva con título, diseño cerrado y mensaje autónomo → `#ppt`
- Gráficos densos que sintetizan un tema completo con múltiples secciones → `#infografia`
- Fotografías, ilustraciones o imágenes sin estructura analítica → `#imagen`
- Tablas escritas en markdown puro (no son recursos multimedia, no llevan tag)

**Regla práctica:** "¿Podría proyectarse como diapositiva completa de una sección, con título y mensaje que se entiende solo?" Si sí → `#ppt`. Si es un diagrama parcial que necesita el texto para tener sentido completo → `#grafica`. Si sintetiza un tema entero con múltiples capas de información → `#infografia`.

---

#### #ppt

Imagen con composición visual completa tipo diapositiva: incluye título, mensaje y diseño gráfico integrado, de modo que **funciona como diapositiva autónoma** de una sección del tema.

**Marcar cuando:**
- Es una imagen con diseño integrado (título + contenido visual + mensaje) que funcionaría como diapositiva completa
- Tiene composición cerrada: se entiende por sí misma sin necesitar el texto del archivo markdown
- Incluye elementos de diseño deliberado: tipografía, iconografía, layout de presentación, fondo
- Resume o presenta visualmente el contenido de una sección completa

**NO marcar:**
- Diagramas parciales que solo ilustran un dato o relación específica → `#grafica`
- Fotografías o ilustraciones sin estructura de presentación → `#imagen`
- Infografías densas multipágina o con muchas secciones informativas → `#infografia`
- Capturas de pantalla o portadas de libros → `#imagen`

**Regla práctica:** "¿Tiene título propio, diseño cerrado y un mensaje que se entiende sin el texto que la rodea?" Si sí → `#ppt`. Si es un diagrama que explica un aspecto parcial y depende del contexto textual → `#grafica`. Si es una foto o ilustración suelta → `#imagen`.

---

#### #infografia

Gráfico complejo de alta densidad informativa que sintetiza o resume **un tema completo o sección extensa**, combinando múltiples elementos visuales (texto, iconos, datos, diagramas) en una única pieza de diseño.

**Marcar cuando:**
- Sintetiza un tema completo o una sección amplia en una única pieza visual densa
- Combina múltiples tipos de información: texto, iconos, datos, esquemas, relaciones
- Tiene densidad informativa alta: no es un simple diagrama de un solo concepto
- Funciona como pieza de repaso o resumen visual (típicamente aparece al final de un tema o en secciones `#aux`)

**NO marcar:**
- Diagramas que ilustran un solo aspecto o dato → `#grafica`
- Composiciones tipo diapositiva con un mensaje principal → `#ppt`
- Fotografías o ilustraciones sin estructura informativa densa → `#imagen`

**Regla práctica:** "¿Resume un tema completo con múltiples capas de información, o ilustra un solo concepto?" Si un solo concepto → `#grafica`. Si tema completo y denso → `#infografia`. Si tiene un mensaje central claro y diseño de presentación → `#ppt`.

---

#### #gif

Imagen animada en formato GIF que muestra movimiento, transición o secuencia temporal.

**Marcar cuando:**
- Es un archivo `.gif` que contiene animación
- La animación es relevante para la comprensión del concepto (no decorativa)
- Muestra una secuencia o transición que no se captura en una imagen estática

**NO marcar:**
- Archivos GIF estáticos (en la práctica son imágenes) → `#imagen`
- Videos completos en formato mp4/webm → `#video`

**Regla práctica:** GIF es imagen animada corta, sin audio, típicamente en bucle. Video es contenido más extenso en formato mp4 o similar.

---

#### #video

Contenido en formato video (mp4, webm, o enlace a plataforma de video).

**Marcar cuando:**
- Es un recurso de video en formato mp4, webm, o referencia a plataforma
- Tiene duración significativa (no un bucle de 2-3 segundos)
- Aporta contenido que requiere formato video: explicación, demostración, entrevista

**NO marcar:**
- GIFs animados cortos → `#gif`
- Imágenes estáticas extraídas de videos → `#imagen`
- Enlaces textuales a videos sin recurso embebido (esos van como referencia o footnote)

---

### Árbol de decisión: Recursos multimedia

```
¿Es un recurso visual/multimedia?
│
├─ ¿Es GIF animado? ─── SÍ ──→ #gif
├─ ¿Es video (mp4/webm)? ─── SÍ ──→ #video
│
├─ ¿Tiene estructura analítica (ejes, nodos, flujos, datos)?
│   ├─ SÍ → ¿Ilustra un solo concepto?
│   │         ├─ SÍ ──→ #grafica
│   │         └─ NO (resume tema completo, alta densidad) ──→ #infografia
│   │
│   └─ NO → ¿Tiene layout de presentación cerrado (título + diseño + mensaje autónomo)?
│             ├─ SÍ ──→ #ppt
│             └─ NO ──→ #imagen
```

---

### B — Tags de contenido didáctico

Marcan bloques de texto o actividad que cumplen una función pedagógica específica.

---

#### #metafora

Analogía o metáfora desarrollada que re-explica un concepto abstracto mediante una imagen concreta. Cubre tanto metáforas (A es B) como analogías (A es como B).

**Marcar cuando:**
- Ocupa un bloque diferenciado (no está incrustado en una frase)
- Tiene función didáctica: re-explica o ancla el concepto previo
- Ofrece un escenario o imagen que el lector puede "explorar"
- El desarrollo es de la imagen/escenario, no solo del concepto teórico. Si el párrafo menciona una imagen pero luego desarrolla el concepto sin expandir la metáfora con sus propios elementos, no marcar.

**NO marcar:**
- Metáforas lexicalizadas ("mecanismo", "cascada", "maquinaria", "pico de estrés", "ola emocional", "piloto automático", "cadena de reacciones")
- Comparaciones puntuales sin desarrollo ("como un río", "es como si...", "igual que...")
- Expresiones figuradas dentro de frases ("El cuerpo se convierte en una máquina")
- Imágenes aisladas sin desarrollo ("Pico tras pico, sin retorno")
- Imágenes que solo etiquetan el concepto: se menciona la metáfora pero el desarrollo posterior es del concepto teórico, no de la imagen

**Regla práctica:** Si quitar el fragmento deja un hueco didáctico notable (el lector pierde una forma de entender el concepto), probablemente merece marcado. Si el texto fluye igual sin él, no marcarlo.

---

#### #ejemplo

Caso concreto desarrollado que ilustra un concepto abstracto mediante una situación, escenario o dato específico. **El lector observa; no se le pide que actúe.**

**Marcar cuando:**
- Ocupa un bloque diferenciado (no está incrustado en una frase)
- Presenta un caso con desarrollo (contexto, acción, resultado — o al menos contexto + fenómeno)
- Ilustra claramente el concepto previo haciéndolo tangible
- Incluye experimentos científicos narrados con participantes, procedimiento y resultado

**NO marcar:**
- Enumeraciones ilustrativas incrustadas en el texto ("reuniones, tráfico, correos...", "conducir, reconocer caras...")
- Menciones nominales sin desarrollo ("el caso de Petrov", "en empresas pasa...")
- Listas de instancias sin narrativa ("situaciones como X, Y, Z")
- Actividades interactivas donde el participante hace algo → `#ejercicio`
- Preguntas reflexivas → `#insight`

**Regla práctica:** Si el fragmento responde a "¿cómo sería esto en la práctica?" con un caso concreto desarrollado donde el lector solo lee/observa, marcarlo. Si el lector debe actuar → `#ejercicio`. Si solo reflexiona → `#insight`.

---

#### #ejercicio

Actividad interactiva con instrucciones que el participante realiza individualmente durante la sesión. **El participante HACE algo concreto.**

**Marcar cuando:**
- Tiene instrucciones explícitas o implícitas de acción (responder, completar, rellenar, elegir, observar un resultado)
- Se apoya frecuentemente en un recurso visual con el que el participante interactúa (plantilla, estímulo, ejercicio tipo Stroop, cuestionario visual)
- Produce una experiencia directa o un resultado individual (no es solo leer y reflexionar)
- Requiere acción del participante: hacer, experimentar, completar

**NO marcar:**
- Preguntas reflexivas abiertas sobre la experiencia personal → `#insight`
- Prácticas experienciales grupales o meditaciones guiadas (esas tienen sus propios archivos en `Prácticas-entrenamiento/`)
- Ejemplos ilustrativos donde el lector solo lee → `#ejemplo`
- Imágenes explicativas sin componente de acción del participante → `#imagen` o `#grafica`

**Regla práctica:** "¿El participante HACE algo concreto (completa, responde, interactúa) o solo REFLEXIONA?" Si hace algo → `#ejercicio`. Si reflexiona → `#insight`. Si solo observa un caso → `#ejemplo`.

---

#### #cita

Cita textual extensa de un autor, investigador o fuente externa, con atribución explícita, que ocupa un bloque diferenciado.

**Marcar cuando:**
- Es una cita textual entre comillas de un autor o fuente identificada
- Tiene extensión suficiente para destacarse (más de una frase)
- Incluye atribución (autor, fuente, año)
- Ocupa un bloque diferenciado del texto teórico

**NO marcar:**
- Menciones breves integradas en el texto ("como dijo Selye...")
- Paráfrasis de ideas de autores
- Referencias a estudios sin cita textual → usar footnote `[^n]`
- Listas de referencias al final del documento (esas son estructura, no contenido)

---

#### #insight

Invitación a la reflexión experiencial donde se conecta el contenido del tema con la experiencia personal del participante, mediante preguntas abiertas o invitaciones introspectivas.

**Marcar cuando:**
- Invita a reflexión personal, no a acción concreta ni a aprendizaje de un concepto
- Formula preguntas abiertas que conectan el tema con la experiencia del participante
- Funciona como puente entre contenido teórico y vivencia personal
- No tiene respuesta única correcta

**NO marcar:**
- Actividades interactivas con instrucciones concretas de acción → `#ejercicio`
- Preguntas de comprensión sobre el contenido (son pedagógicas, no reflexivas)
- Preguntas retóricas integradas en el discurso teórico que el propio texto responde
- Títulos formulados como pregunta ("¿Qué es el estrés?")

**Uso a nivel sección:** `#insight` puede aparecer como sufijo de encabezado (`## Dimensión experiencial #insight`) cuando toda la sección bajo ese encabezado es contenido reflexivo. En ese caso no se repite el tag en cada elemento interno.

**Regla práctica:** "¿Se pide reflexionar internamente sobre la experiencia personal, o ejecutar algo concreto?" Si reflexión abierta sin producto tangible → `#insight`. Si hay acción con resultado → `#ejercicio`. Si son preguntas retóricas del discurso → sin tag.

---

### C — Tags de sección

Marcan secciones completas bajo un encabezado. Se usan como sufijo del encabezado.

---

#### #aux

Sección de material auxiliar o complementario que acompaña al tema pero **no forma parte del flujo principal de contenido**. Agrupa recursos adicionales: infografías de resumen, material de interés, recursos suplementarios.

**Marcar cuando:**
- Es material complementario que no forma parte del flujo narrativo/teórico principal
- Agrupa recursos adicionales: infografías de resumen, material de interés, enlaces, referencias expandidas
- Aparece típicamente al final del tema, después del contenido principal y las referencias
- Los recursos individuales dentro de la sección llevan su propio tag (`#infografia`, `#imagen`, etc.)

**NO marcar:**
- Recursos multimedia que forman parte del flujo narrativo principal (llevan su tag específico sin `#aux`)
- Secciones de referencias bibliográficas (son estructura estándar, no llevan tag)
- Secciones `#insight` (son reflexión, no material auxiliar)

**Formato:**
```markdown
## Material adicional del tema #aux

### Infografías del tema

#infografia ![infog-m00-03-lider-semilla-v1](assets/infog-m00-03-lider-semilla-v1.jpg) Opción 1: "Cultiva el Cambio".
#infografia ![infog-m00-03-lider-semilla-v2](assets/infog-m00-03-lider-semilla-v2.png) Opción 2: "De la Consciencia a la Acción".
```

---

### Árbol de decisión: Contenido didáctico

```
¿El bloque tiene función pedagógica especial?
│
├─ ¿El participante HACE algo concreto (completar, responder, interactuar)?
│   └─ SÍ ──→ #ejercicio
│
├─ ¿REFLEXIONA sobre su experiencia personal (preguntas abiertas)?
│   └─ SÍ ──→ #insight
│
├─ ¿LEE/OBSERVA un caso concreto que ilustra un concepto?
│   └─ SÍ ──→ #ejemplo
│
├─ ¿Es cita textual extensa de un autor, en bloque diferenciado?
│   └─ SÍ ──→ #cita
│
├─ ¿Es analogía/metáfora desarrollada que re-explica un concepto?
│   └─ SÍ ──→ #metafora
│
└─ ¿Es material complementario agrupado fuera del flujo principal?
    └─ SÍ ──→ #aux (como sufijo de encabezado de sección)
```

---

## Validación

### Recursos multimedia
- [ ] Cada recurso multimedia tiene su tag correcto según el árbol de decisión
- [ ] Rutas de archivos preservadas exactamente
- [ ] Descripciones pedagógicas preservadas
- [ ] Variantes marcadas con "Opción N:" y sufijo `-vN` en nombre de archivo

### Contenido didáctico
- [ ] `#metafora`: ¿Ocupa bloque diferenciado? ¿Re-explica mediante otro dominio? ¿No está en lista de exclusión?
- [ ] `#ejemplo`: ¿Caso desarrollado (no enumeración)? ¿Lector solo observa?
- [ ] `#ejercicio`: ¿Tiene instrucciones de acción? ¿Participante HACE algo?
- [ ] `#cita`: ¿Cita textual literal? ¿Extensión suficiente? ¿Con atribución?
- [ ] `#insight`: ¿Preguntas reflexivas personales? ¿No son retóricas del discurso?
- [ ] `#aux`: ¿Material complementario fuera del flujo principal?

### Regla general de abstención

**Si hay duda sobre si un recurso cumple los criterios, no marcarlo.** Es preferible omitir un recurso legítimo que marcar incorrectamente.
