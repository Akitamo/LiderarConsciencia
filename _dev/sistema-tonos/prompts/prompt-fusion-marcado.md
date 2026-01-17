# Prompt: Fusión y Marcado Estructural

## Objetivo

Transformar archivos de contenido teórico del curso "Liderar con Consciencia" que ya tienen tono LcC aplicado:
1. Fusionar bloques #teoria y #explicacion en flujo continuo
2. Aplicar sistema de marcado estructural
3. Añadir referencias como footnotes

---

## Contexto de entrada

Los archivos a transformar:
- Tienen transformación tonal v9 aplicada
- Pueden contener bloques #teoria y #explicacion separados
- Contienen sección "Notas para revisión" a eliminar

**Principio:** NO se modifica la redacción. Solo se reorganiza estructura y añade marcado.

---

## Parte 1: Fusión de contenido

### Qué fusionar

Los archivos de entrada separan contenido en bloques #teoria (concepto) y #explicacion (desarrollo). Esta separación debe eliminarse, integrando ambos en un flujo narrativo continuo.

### Flujo de integración

| Origen | Función original | En el flujo fusionado |
|--------|------------------|----------------------|
| #teoria | Define el concepto, explica el mecanismo | Abre la sección: qué es, cómo funciona |
| #explicacion | Conecta con experiencia, muestra implicaciones | Continúa: por qué importa, cómo se vive |

**Secuencia narrativa:** Concepto → Mecanismo → Manifestación → Implicación práctica

### Cómo fusionar

1. Eliminar los tags #teoria y #explicacion
2. Colocar contenido de #explicacion tras el de #teoria
3. Verificar que la transición sea fluida (no requiere añadir texto)
4. El contenido fusionado queda sin tag (es teoría por defecto)

---

## Parte 2: Sistema de marcado

### Principio base

**Sin tag = teoría.** Todo contenido sin marcado explícito es contenido teórico.

Solo se marcan los elementos que NO son teoría: recursos didácticos, multimedia y preguntas.

### Regla de límites

Cada tag aplica al contenido inmediatamente siguiente hasta la próxima línea en blanco.

```markdown
#ejemplo
Este es el contenido del ejemplo que puede
ocupar varias líneas sin separación.

Aquí comienza teoría de nuevo (línea en blanco cerró el bloque).
```

### Reglas operativas generales

| Regla | Descripción |
|-------|-------------|
| **Posición** | Tag en línea propia, al inicio del bloque |
| **Un bloque = un tag** | Cada bloque lleva un único tag |
| **No solapamiento** | Si un bloque contiene metáfora y ejemplo, elegir el dominante: reencuadre conceptual → #metafora; caso concreto → #ejemplo |
| **Abstención** | Si hay duda sobre si cumple los criterios, NO marcar |

---

## Parte 3: Catálogo de tags

### Tags de recursos multimedia

| Tag | Contenido | Notas |
|-----|-----------|-------|
| #imagen | Fotografías, ilustraciones, diagramas, GIFs | Preservar ruta y descripción |
| #video | Vídeos | Preservar URL/ruta |

### Tags de recursos didácticos

#### #metafora

Analogía o metáfora desarrollada que re-explica un concepto abstracto mediante una imagen concreta. Cubre tanto metáforas (A es B) como analogías (A es como B); no se distingue entre ellas.

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
- Imágenes que solo etiquetan el concepto: cuando una metáfora se menciona pero el desarrollo posterior es del concepto teórico, no de la imagen (ej: "autopista de hábitos" seguido de explicación sobre automatismos, sin desarrollar elementos de la autopista como carriles, velocidad, salidas)

**Regla práctica:** Si quitar el fragmento deja un hueco didáctico notable (el lector pierde una forma de entender el concepto), probablemente merece marcado. Si el texto fluye igual sin él, no marcarlo.

---

#### #ejemplo

Caso concreto que ilustra el concepto teórico con desarrollo suficiente.

**Marcar cuando:**
- Ocupa un bloque diferenciado (no está incrustado en una frase)
- Presenta un caso con algún desarrollo (contexto, acción, resultado)
- Ilustra claramente el concepto previo
- **Incluye experimentos científicos narrados** con participantes, procedimiento y resultado

**NO marcar:**
- Enumeraciones ilustrativas ("reuniones, tráfico, correos...", "un proyecto, una competición, una presentación")
- Menciones nominales sin desarrollo ("el caso de Petrov", "en empresas pasa...")
- Listas de instancias sin narrativa ("situaciones como X, Y, Z")
- Instancias dentro de una frase

**Regla práctica:** Si el fragmento responde a "¿cómo sería esto en la práctica?" con un caso concreto desarrollado, marcarlo. Si solo menciona posibilidades sin desarrollarlas, no.

---

#### #practica

Actividad experiencial con instrucciones que el lector puede realizar.

**Marcar cuando:**
- Incluye pasos o instrucciones concretas
- Requiere acción del lector (hacer, observar, experimentar)
- Genera vivencia directa del concepto

**Ejemplos típicos de prácticas:**
- Ejercicio de los palillos (atención)
- Juegos de Sistema 1 vs Sistema 2
- Ejercicios de respiración consciente
- Tests de percepción selectiva

**NO es #practica:**
- Preguntas reflexivas sin actividad → usar #pregunta
- Ejemplos narrativos que solo se leen → usar #ejemplo
- Descripciones de lo que otros hacen (sin invitar al lector a hacerlo)

---

#### #pregunta

Pregunta reflexiva dirigida al lector.

**Marcar cuando:**
- Invita a reflexión personal
- Conecta el concepto con la experiencia del lector
- No tiene respuesta única correcta
- Está formulada como bloque independiente

**NO marcar:**
- Preguntas retóricas integradas en el discurso teórico
- Preguntas que el propio texto responde inmediatamente después
- Títulos formulados como pregunta ("¿Qué es el estrés?")
- Preguntas dentro de un párrafo que no buscan pausa reflexiva

---

#### #cita

Cita textual extensa de un autor con atribución.

**Marcar cuando:**
- Es una cita literal (no paráfrasis)
- Tiene extensión suficiente para destacarse (más de una frase)
- Incluye atribución (autor, fuente)

**NO marcar:**
- Menciones breves integradas en el texto ("como dijo Selye...")
- Paráfrasis de ideas de autores
- Referencias a estudios sin cita textual → usar footnote [^n]

**Relación con footnotes:** El tag #cita marca el formato del bloque. Si el contenido incluye información de fuente (autor, año, obra, publicación), aplicar además el Principio de footnotes de la Parte 4.

---

## Parte 4: Markdown nativo

### Jerarquía de títulos

| Nivel | Uso | Acción |
|-------|-----|--------|
| ## | Secciones principales | No modificar |
| ### | Subsecciones | No modificar |
| #### | Subdivisiones internas | Añadir donde haya agrupación lógica |

### Elementos de énfasis

| Elemento | Uso | Límite |
|----------|-----|--------|
| **negrita** | Ideas clave, conceptos centrales | 2-3 por sección |
| Listas | Enumeraciones, pasos, componentes | Sin límite |
| Tablas | Comparaciones entre conceptos | Donde mejore comprensión |

### Referencias y fuentes

Usar footnotes de markdown para cualquier fuente que soporte una afirmación: estudios, libros, informes, artículos, webs, autores, etc.

**En el texto:**
```markdown
La expresión facial influye en la experiencia emocional[^1].
```

**Al final de la sección o documento:**
```markdown
[^1]: Strack, Martin y Stepper (1988). Inhibiting and facilitating conditions of the human smile.
```

**Tipos de fuentes que requieren footnote:**

| Tipo | Ejemplo de formato |
|------|-------------------|
| Estudio académico | Kahneman, D. (2011). Thinking, Fast and Slow. |
| Libro | Goleman, D. (1995). Inteligencia Emocional. Kairós. |
| Informe/consultora | McKinsey Global Institute (2023). The State of AI in 2023. |
| Artículo web | Brené Brown. "The Power of Vulnerability". TED.com |
| Blog de referencia | Seth Godin. "The practice of shipping". seths.blog |
| Autor en redes | Adam Grant [@AdamMGrant]. Publicación en LinkedIn, 2024. |
| Think tank | World Economic Forum (2024). Future of Jobs Report. |
| Entrevista/podcast | Tim Ferriss Show, episodio 234: "Naval Ravikant". |
| Artículo de revista | TIME Magazine (2014). "The Mindful Revolution". |
| Mención de autor/teoría | Tallon-Baudry y Damasio. Teoría del Marco Subjetivo Neuronal. |
| Modelo/matriz/framework | The Wise Compassion Flywheel (Potential Project). Modelo de liderazgo compasivo. |
| Investigación institucional | Universidad de Londres. Estudio sobre ciclo cardíaco y percepción. |

**NO requiere footnote:**
- Conocimiento general del campo sin atribución específica
- Afirmaciones que el texto original no atribuye a nadie
- Conceptos establecidos sin autor identificable ("la respuesta de lucha o huida")

**Principio:** Si el texto original menciona una fuente, persona o entidad (incluyendo universidades, institutos, laboratorios) como respaldo de una afirmación, esa mención debe convertirse en footnote.

**Mención de autores:** Cuando el texto menciona autores por nombre asociados a una teoría o hallazgo (ej: "Teoría X (Autor A y Autor B)"), crear footnote aunque no aparezca año ni obra. Usar la información disponible.

**Regla anti-invención:** Solo crear footnotes para fuentes explícitamente mencionadas en el texto original. Si el texto menciona un autor o estudio sin datos completos, crear footnote con la información disponible. NUNCA inventar fuentes, completar datos bibliográficos no mencionados, ni añadir referencias que no estén en el texto original.

**Alcance:** Los criterios de footnotes aplican a TODO el contenido del documento, incluyendo descripciones de #imagen, #video y otros recursos multimedia. Si una descripción de imagen menciona autores con libros y años, esas fuentes deben tener footnotes.

**Numeración:** Los footnotes [^n] deben numerarse según el orden de aparición en el documento, de arriba a abajo. El primer footnote que aparezca en el texto será [^1], el segundo [^2], etc.

---

## Parte 5: Limpieza

Eliminar completamente:
- Sección "Notas para revisión"
- Tags #teoria y #explicacion
- Tags inline mal aplicados (#metafora o #ejemplo al final de frases)
- Cualquier comentario técnico de proceso

---

## Parte 6: Validación

Antes de finalizar, ejecutar auto-revisión:

### Estructura
- [ ] No quedan tags #teoria ni #explicacion
- [ ] No hay sección "Notas para revisión"
- [ ] Subtítulos añadidos usan #### (no ###)
- [ ] Frontmatter tiene fecha actualizada

### Recursos didácticos

**Para cada #metafora:**
- ¿Ocupa un bloque diferenciado? → Si no, eliminar tag
- ¿Re-explica el concepto mediante otro dominio? → Si no, eliminar tag
- ¿Está en la lista de exclusión? → Si sí, eliminar tag

**Para cada #ejemplo:**
- ¿Ocupa un bloque diferenciado? → Si no, eliminar tag
- ¿Es caso desarrollado (no enumeración)? → Si no, eliminar tag
- ¿Ilustra claramente el concepto previo? → Si no, eliminar tag

**Para cada #practica:**
- ¿Tiene instrucciones de actividad? → Si no, reclasificar
- ¿Requiere acción del lector? → Si no, considerar #ejemplo

**Para cada #pregunta:**
- ¿Invita a reflexión personal? → Si no, eliminar tag
- ¿Es pregunta retórica del discurso? → Si sí, eliminar tag

### Referencias
- [ ] Fuentes mencionadas en el texto usan footnotes [^n]
- [ ] Footnotes incluyen información suficiente para identificar la fuente
- [ ] No se han inventado fuentes ni completado datos no presentes en el original

### Multimedia
- [ ] Todas las imágenes preservadas con rutas exactas
- [ ] Descripciones de imagen mantenidas

### Regla general de abstención

**Si hay duda sobre si un recurso cumple los criterios, no marcarlo.** Es preferible omitir un recurso legítimo que marcar incorrectamente.

---

## Ejemplo de transformación

**Entrada:**
```markdown
## Eustrés y distrés

#teoria
No todo estrés es perjudicial. La distinción entre eustrés y distrés marca la diferencia.

El eustrés activa y energiza. Se asocia con retos percibidos como estimulantes.

El distrés desgasta y paraliza. Surge cuando las demandas superan la capacidad de respuesta.

#explicacion
El estrés no es solo respuesta a factores externos. Es experiencia filtrada por la percepción. La misma situación genera eustrés en quien se percibe capaz, y distrés en quien se percibe desbordado.

#imagen
![img](ruta/imagen.png) Descripción
```

**Salida:**
```markdown
## Eustrés y distrés

**No todo estrés es perjudicial.** La distinción entre eustrés y distrés marca la diferencia.

#### Eustrés: estrés positivo

El eustrés activa y energiza. Se asocia con retos percibidos como estimulantes.

#### Distrés: estrés negativo

El distrés desgasta y paraliza. Surge cuando las demandas superan la capacidad de respuesta.

#### El papel de la percepción

El estrés no es solo respuesta a factores externos. Es experiencia filtrada por la percepción. La misma situación genera eustrés en quien se percibe capaz, y distrés en quien se percibe desbordado.

#imagen
![img](ruta/imagen.png) Descripción
```

**Notas sobre la transformación:**
- Tags #teoria y #explicacion eliminados, contenido fusionado
- Añadidos subtítulos #### para estructurar conceptos
- Frase clave destacada en negrita (sin modificar redacción)
- No se marcó #ejemplo porque no hay caso desarrollado (solo conceptos)
- #imagen preservada con ruta y descripción

---

## Versión

v3.8 - 2026-01-16

### Historial
- v1: Fusión básica eliminando #teoria/#explicacion
- v2: Añadidos criterios para #metafora y #ejemplo con test de 3 condiciones
- v3: Sistema completo de marcado, footnotes para referencias, definición de #practica
- v3.1: Refinamiento de criterios, regla de abstención, regla anti-invención para footnotes
- v3.2: Criterio #metafora: desarrollo de imagen vs desarrollo de concepto
- v3.3: Alcance footnotes incluye descripciones multimedia
- v3.4: Artículo de revista en tabla de fuentes; relación #cita con footnotes
- v3.5: Numeración de footnotes según orden de aparición en documento
- v3.6: Experimentos científicos explícitos en #ejemplo; mención de autores sin año/obra genera footnote
- v3.7: Investigación institucional en tabla; Principio explícito sobre universidades/institutos
- v3.8: Modelos/matrices/frameworks en tabla de fuentes que requieren footnote
