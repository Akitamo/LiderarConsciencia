# Prompt: Transformación de Contenido - Tono LcC

## Principio rector

**"Claridad rigurosa con presencia humana"**

Tono de experto que domina la ciencia y la comparte con precisión, hablando con profesionales con experiencia. No paper académico ni coach motivacional.

---

## Los 5 pilares

### 1. Voz experta, no profesoral
- Ir directo al concepto sin preámbulos
- Evitar: "Es importante entender que...", "Como todos sabemos...", "Cabe destacar..."

### 2. Segunda persona selectiva
- **Impersonal** para conceptos y mecanismos
- **Tú** solo en aplicación práctica o invitación a observar

### 3. Ciencia como ancla, no exhibición
- Referencias solo cuando aporten (dato contraintuitivo, estudio emblemático)
- Integradas naturalmente, sin formato académico pesado

### 4. Liderazgo como contexto, no muletilla
- El lector ya sabe que está en un curso de liderazgo
- Solo mencionar cuando añada algo no obvio

### 5. Invitación a observación, no instrucción
- Verbos: "notar", "reconocer", "observar"
- Evitar: "Debes...", "Tienes que...", "Es fundamental que..."

---

## Recursos expresivos

**Criterio rector**: ¿Mejora la comprensión o fortalece un mensaje clave? Si no, sobra.

### Tres filtros
1. **Necesidad**: ¿El concepto es claro sin este recurso?
2. **Precisión**: ¿Ilumina exactamente lo que quiero sin asociaciones problemáticas?
3. **Economía**: ¿El valor justifica el espacio?

### Frecuencias máximas
| Recurso | Máximo |
|---------|--------|
| Metáfora | 1-2 por sección |
| Analogía | 1 por sección |
| Pregunta reflexiva | 1 por bloque, 2-3 por módulo, nunca consecutivas |
| Ejemplo vivencial | 1-2 por sección |
| Caso histórico/científico | 1-2 por módulo |
| Frase de cierre sintética | 2-3 por módulo |

---

## Arquitectura

### #teoria vs #explicacion

| Bloque | Estructura | Función |
|--------|------------|---------|
| #teoria | Concepto → Mecanismo → Fenómeno → Evidencia | Exponer con rigor |
| #explicacion | Integración → Implicación → Apertura | Conectar y abrir (NO resumir) |

**Test de redundancia**: Si #explicacion puede eliminarse sin perder información → reescribir.

### Transiciones
Cada sección inicia conectando con la anterior:
- **Causal**: "Este mecanismo tiene consecuencias..."
- **Ampliación**: "Un aspecto particular..."
- **Aplicación**: "En la práctica, esto se manifiesta..."

### Distribución
- **Cierres fuertes**: 2-3 por módulo, en secciones centrales
- **Evidencia**: al menos 1 referencia en secciones fundacionales

---

## Sintaxis

- Párrafos: 3-5 oraciones
- Densidad alta, sintaxis limpia
- Variación rítmica: frases cortas (impacto) + elaboradas (desarrollo)
- Evitar: "El hecho de que...", "En este sentido...", "Como se mencionó..."

---

## Qué preservar del original

- Frontmatter YAML (sin cambios)
- Tags inline (#teoria, #explicacion, #imagen, etc.)
- Referencias a imágenes (rutas exactas)
- Estructura de encabezados H1/H2
- Datos científicos específicos

## Qué transformar

- Texto explicativo y narrativo
- Forma de presentar conceptos
- Transiciones entre secciones
- Conexión con experiencia del lector

---

## Límites de la transformación

### Puede aportar el modelo (FORMA)
- Metáforas que iluminen conceptos presentes en el original
- Ejemplos vivenciales universales (sensaciones, situaciones reconocibles)
- Frases de cierre que sinteticen lo expuesto
- Preguntas reflexivas que inviten a reconocer lo explicado
- Analogías que hagan tangible lo abstracto

Estos recursos mejoran la transmisión del contenido, no añaden contenido nuevo.

### No puede inventar el modelo (FONDO)
- Datos o hallazgos científicos
- Referencias bibliográficas (autores, años, estudios)
- Mecanismos o procesos no descritos en el original
- Casos de estudio específicos
- Afirmaciones factuales nuevas

**Regla**: Si requiere verificación externa → no inventar. Si es recurso expresivo que hace más accesible algo ya presente → sí aportar.

**Nota**: El límite FONDO no implica cautela estilística. Reformulaciones incisivas, síntesis contundentes y estructuras retóricas con punch son FORMA —mejoran la transmisión sin añadir información verificable. Si una frase se vuelve más explicativa pero menos directa, se ha perdido FORMA innecesariamente.

---

## Ejemplos de tono correcto

**Exposición de concepto**:
> "El afecto de base opera como un clima emocional de fondo: presente siempre, aunque rara vez consciente. Tiñe la percepción del momento —cómo se interpreta un comentario, cómo se evalúa una propuesta, qué opciones parecen viables."

**Transición a aplicación**:
> "Reconocer el afecto de base en el momento permite distinguir cuánto de una reacción proviene del análisis de la situación y cuánto del estado corporal transitorio. Esa tensión antes de una conversación difícil, esa irritabilidad residual de una mañana complicada —son datos, no ruido."

**Cierre de sección**:
> "Esta cadena —del cuerpo a la emoción, de la emoción a la atención, de la atención a la acción— opera continuamente. No se trata de eliminarla, sino de hacerla visible. Lo visible se puede gestionar."

---

## Notas para revisión

Al final del documento transformado, incluir una sección `## Notas para revisión` con:

1. **Ausencias detectadas**: Secciones que podrían beneficiarse de contenido adicional no presente en el original
2. **Referencias sugeridas**: Conceptos que merecerían respaldo científico pero no lo tienen en el texto fuente
3. **Desequilibrios estructurales**: Secciones más breves de lo esperado o que carecen de bloques (#explicacion, etc.)

Estas notas son para revisión humana posterior. El modelo NO debe resolver estas ausencias inventando contenido.

---

## Tarea

Transforma el contenido aplicando estos principios:
1. Mantén la estructura y metadatos intactos
2. Aplica los 5 pilares del tono
3. Usa recursos expresivos solo cuando pasen los 3 filtros
4. Diferencia #teoria (exponer) de #explicacion (integrar, no resumir)
5. Inicia cada sección conectando con la anterior
6. Distribuye cierres fuertes (2-3/módulo) y evidencia estratégicamente
7. Genera texto limpio, denso, sin muletillas
8. Incluye al final `## Notas para revisión` con ausencias, referencias sugeridas y desequilibrios detectados
9. Mantén la incisividad: si el contenido permite una formulación directa y contundente, úsala —"más cauto" no es mejor si el resultado es más plano
