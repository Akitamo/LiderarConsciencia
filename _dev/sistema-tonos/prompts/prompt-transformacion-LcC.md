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
- **Predominantemente impersonal** en exposición de conceptos y mecanismos
- **Segunda persona** cuando se invita a observar experiencia propia o se presentan alternativas conductuales
- Puede aparecer tanto en #teoria como en #explicacion si sirve al flujo narrativo
- Criterio: ¿Mejora la conexión con la experiencia del lector sin perder rigor? Úsala

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

### Reglas para bloques #explicacion

**1. Detectar si existe en el original:**
- Puede tener tag `#explicacion` explícito
- O puede ser contenido funcional de explicación sin tag (detectar por: segunda persona, ejemplos aplicativos, invitación a observar, contenido que aparece después de #teoria)

**2. Evaluar si aporta valor:**

**SI el #explicacion solo resume #teoria sin añadir valor:**
→ **ELIMINAR completamente**
→ Documentar: "Sección X: Eliminado bloque #explicacion redundante (solo resumía teoría sin añadir perspectiva, ejemplos o aplicación)"

**Ejemplo de eliminación correcta:**
```
#teoria: [Explica interocepción, afecto, valencia, activación e impulso con detalle]
#explicacion: "El esquema completo opera así: Interocepción → Afecto → Valencia → Activación → Impulso"
```
→ ELIMINAR: Solo enumera lo ya explicado en #teoria

**SI el #explicacion aporta algo nuevo:**
→ **MANTENER y transformar** para que cumpla:
- **Integración**: Conecta conceptos o con experiencia (no repite, conecta)
- **Implicación**: Señala por qué importa en la práctica (no obvia, específica)
- **Apertura**: Invita a observación o pregunta reflexiva (no genérica, incisiva)

**Ejemplo de #explicacion que SÍ aporta valor:**
```
#teoria: [Explica amígdala y atención]
#explicacion: "La implicación práctica: el estado emocional no solo afecta cómo se interpreta la información, sino qué información llega siquiera a ser percibida. Una reunión abordada desde la ansiedad y una reunión abordada desde la curiosidad literalmente no son la misma reunión —el filtro emocional selecciona datos diferentes."
```
→ MANTENER: Añade implicación práctica específica y perspectiva nueva

**3. Cambios de tono permitidos al transformar:**
- Segunda persona selectiva (si el original usa impersonal)
- Eliminar redundancia con #teoria
- Mejorar transiciones y fluidez narrativa
- Formular preguntas más incisivas

**Test de valor mejorado**:
- ¿Puedo eliminar este #explicacion sin que el lector pierda información, perspectiva o conexión práctica?
- Si SÍ → eliminar y documentar
- Si NO → mantener y transformar

**Si el original NO tiene bloque #explicacion:**
- Verificar si existe contenido explicativo/aplicativo sin etiquetar (revisar todo el contenido después del bloque #teoria)
- Si existe contenido explicativo sin etiquetar y aporta valor: transformarlo
- Si NO existe ningún contenido explicativo: documentar en "Notas para revisión"
- NUNCA generar nuevo contenido #explicacion (violaría FONDO)

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

- Frontmatter YAML (preservar todos los campos existentes, añadir `ultima_actualizacion: "DD/MM/YYYY"` con fecha actual al final)
- Tags inline (#teoria, #explicacion, #imagen, etc.)
- Referencias a imágenes (rutas exactas)
- Estructura de encabezados H1/H2
- Datos científicos específicos

## Qué transformar

- Texto explicativo y narrativo
- Forma de presentar conceptos
- Transiciones entre secciones
- Conexión con experiencia del lector

## Criterio editorial: Valor vs Redundancia

### Principio fundamental: Eliminar redundancia, preservar valor

**Tu rol**: Editor inteligente que transforma tono Y optimiza contenido.

**Regla de oro**:
- Si algo aporta valor único (información, perspectiva, ejemplo, aplicación) → mantener
- Si algo repite lo ya dicho sin añadir valor → eliminar y documentar

### Test de valor (aplicar a cada párrafo)

Antes de mantener un contenido, pregúntate:

1. **¿Aporta información nueva?**
   - ✅ Mantener: datos, conceptos, mecanismos no mencionados en #teoria
   - ❌ Eliminar: resumen de lo ya explicado en #teoria

2. **¿Aporta perspectiva nueva?**
   - ✅ Mantener: conexión con experiencia, aplicación práctica, implicación no obvia
   - ❌ Eliminar: reformulación de lo mismo con otras palabras

3. **¿Aporta ejemplo/caso concreto?**
   - ✅ Mantener: casos históricos, estudios, anécdotas, situaciones específicas
   - ❌ Eliminar: solo si el mismo ejemplo ya apareció en #teoria

4. **¿Aporta invitación a observación?**
   - ✅ Mantener: preguntas reflexivas, invitaciones a reconocer en experiencia propia
   - ❌ Eliminar: instrucciones genéricas sin especificidad

### Patrones comunes de redundancia eliminable

**Patrón 1: Resumen mecánico**
```
#teoria: [Explica concepto A, B, C con detalle]
#explicacion: "En resumen: concepto A hace X, concepto B hace Y, concepto C hace Z"
```
→ **ELIMINAR**: Solo repite lo ya dicho. Documentar: "Eliminado resumen redundante de conceptos A, B, C"

**Patrón 2: Reformulación sin aporte**
```
#teoria: "La amígdala detecta amenazas y activa respuesta rápida"
#explicacion: "La amígdala es una estructura que identifica peligros y genera reacciones inmediatas"
```
→ **ELIMINAR**: Misma información con otras palabras. Documentar: "Eliminada reformulación redundante sobre amígdala"

**Patrón 3: Lista que repite estructura de #teoria**
```
#teoria: [Explica 5 componentes: Interocepción, Afecto, Valencia, Activación, Impulso]
#explicacion: "Los 5 componentes son: 1. Interocepción: [repite definición], 2. Afecto: [repite]..."
```
→ **ELIMINAR si solo repite**: Documentar: "Eliminada enumeración redundante de 5 componentes"
→ **MANTENER si añade**: Ejemplos concretos, conexión con experiencia, perspectiva nueva

**Patrón 4: Metáforas redundantes**
```
#teoria: "La interocepción funciona como un radar interno que monitorea el cuerpo"
#explicacion: "Podemos entender la interocepción como un radar interno que constantemente monitorea tu cuerpo"
```
→ **ELIMINAR**: Misma metáfora repetida. Documentar: "Eliminada repetición de metáfora 'radar interno'"

### Qué SÍ mantener (aunque parezca repetición)

**REGLA ESPECIAL - Protección absoluta para ejemplos y casos:**

Los ejemplos, casos históricos, historias y anécdotas del original **NUNCA** se eliminan, incluso si parecen redundantes conceptualmente.

**Razón pedagógica**: Cada ejemplo resuena con diferentes perfiles de estudiantes, ofrece múltiples perspectivas sobre el mismo concepto, y ancla emocionalmente el aprendizaje. La redundancia conceptual en ejemplos es pedagógicamente valiosa.

**Qué proteger siempre:**
- Casos históricos (Petrov, Enterprise, Cardella, etc.)
- Anécdotas personales o profesionales
- Experimentos o estudios mencionados como narrativa
- Escenarios hipotéticos ilustrativos
- Ejemplos con nombres propios (personas, empresas, lugares)

**Lo único permitido**: Mejorar el tono narrativo aplicando los 6 criterios de incisividad, manteniendo toda la información y extensión necesaria para el impacto emocional.

**Importante**: Esto NO se aplica a formulaciones teóricas repetidas, resúmenes redundantes en #explicacion, o listas enumerativas de conceptos (eso SÍ puede optimizarse).

---

**Contenido con valor único:**

1. **Aplicación práctica específica**
   - Aunque el mecanismo esté en #teoria, mostrar cómo se manifiesta en situaciones reales aporta
   - ✅ Mantener: "Esa tensión antes de una conversación difícil..."

2. **Integración entre conceptos**
   - Si #explicacion conecta dos conceptos de #teoria mostrando su relación
   - ✅ Mantener: "La interocepción alimenta el afecto de base, que a su vez determina la valencia..."

3. **Segunda persona + invitación a observar**
   - Si #explicacion traduce el concepto impersonal de #teoria a experiencia personal
   - ✅ Mantener: "Puedes notar cómo ese nudo en el estómago..."

### Casos y narrativa

**Revisión de historias/casos manteniendo o potenciando su tono narrativo:**
- La extensión debe servir a la función narrativa, no acortarse mecánicamente
- Si una historia de 8 líneas necesita esas líneas para tener impacto emocional → mantenlas
- Si puede ser más incisiva en 3 líneas sin perder fuerza → hazlo
- El criterio es: ¿la narrativa ancla el concepto con impacto? No: ¿es corta?

**Ejemplo de revisión (manteniendo extensión):**
> Original: "Durante la Guerra Fría, el oficial Stanislav Petrov recibió una alerta de un posible ataque nuclear de Estados Unidos. A pesar de la presión y la incertidumbre, Petrov confió en su intuición y decidió no tomar represalias, evitando una posible catástrofe. Los sensores indicaban cinco misiles entrantes..."
>
> Revisado (tono narrativo potenciado): "El oficial soviético Stanislav Petrov, durante la Guerra Fría, recibió una alerta de supuesto ataque nuclear estadounidense. Los sensores mostraban cinco misiles entrantes. El protocolo dictaba respuesta inmediata. A pesar de la presión extrema, Petrov confió en su evaluación —algo no encajaba— y decidió no ordenar represalias, evitando potencialmente una catástrofe global."

---

## Límite FONDO - Criterio general

**Principio rector**: No añadir información que requiera verificación externa.

**NO añadir (requiere verificación)**:
- Datos cuantitativos específicos (tiempos exactos, porcentajes, cifras)
  - ❌ Ejemplo: "en 250 milisegundos", "el 73% de los líderes"
- Detalles neuroanatómicos no mencionados en el original
  - ❌ Ejemplo: añadir "corteza prefrontal dorsolateral" si el original solo dice "cerebro"
- Afirmaciones factuales sobre evolución, historia o estudios no presentes
  - ❌ Ejemplo: "refinado durante millones de años" si no está en el original
- Referencias bibliográficas (autores, años, estudios) no presentes
  - ❌ Ejemplo: añadir "(Craig, 2009)" si el original no lo menciona

**SÍ permitido (FORMA - mejora transmisión sin añadir hechos)**:
- Términos técnicos ya establecidos en el texto original
  - ✅ Ejemplo: si el original menciona "amígdala", puedes usarla en reformulaciones
- Aproximaciones temporales vagas y universales
  - ✅ Ejemplo: "rápidamente", "en instantes", "antes de la consciencia"
- Reformulaciones incisivas de conceptos ya descritos
  - ✅ Ejemplo: transformar "el cerebro evalúa" en "el cerebro lo determina primero y nos informa después"
- Metáforas y analogías que iluminen conceptos presentes
  - ✅ Ejemplo: "opera como un clima emocional" para afecto de base

**Test decisivo**: ¿Necesitarías consultar una fuente externa para verificar esta afirmación? Si sí → no la añadas.

### Reglas operativas estrictas - Lista negra FONDO

Prohibiciones específicas que aplican a TODOS los módulos (no solo neurociencia):

**Cuantificaciones específicas:**
- ❌ Tiempos exactos: "en 200 milisegundos", "5 segundos", "tarda 3 minutos"
- ❌ Porcentajes: "el 73% de", "aumenta un 40%", "en el 65% de los casos"
- ❌ Cifras: "10 estudios demostraron", "más de 200 participantes", "3 factores clave"
- ✅ Permitido: aproximaciones vagas ("rápidamente", "la mayoría", "algunos estudios", "varios factores")

**Estructuras anatómicas (cualquier sistema):**
- ❌ Añadir anatomía cerebral no mencionada: "corteza prefrontal dorsolateral", "ganglios basales", "núcleo accumbens"
- ❌ Añadir anatomía corporal no mencionada: "nervio vago", "sistema simpático", "hipotálamo"
- ✅ Permitido: usar la misma estructura ya mencionada en reformulaciones ("la amígdala" si el original dice "amígdala")

**Referencias y autoría:**
- ❌ Añadir autor-año: "(Kahneman, 2011)", "según Lieberman et al.", "Craig (2009)"
- ❌ Añadir nombres de estudios no presentes: "el estudio de Stanford", "investigación de Harvard"
- ✅ Permitido: mantener y reformular referencias ya presentes en el original

**Datos históricos, evolutivos o culturales:**
- ❌ Afirmaciones temporales evolutivas: "hace millones de años", "desde el Pleistoceno", "refinado durante la evolución"
- ❌ Fechas o lugares históricos no presentes: "en 1995", "en Silicon Valley", "durante la Guerra Fría" (salvo si está en el original)
- ✅ Permitido: contexto histórico o cultural general ya establecido en el texto

**Conceptos técnicos de disciplinas específicas:**
- ❌ Añadir términos técnicos de psicología/gestión/filosofía no presentes: "disonancia cognitiva", "sesgo de confirmación", "fenomenología"
- ✅ Permitido: usar términos técnicos ya establecidos en el original

**Test operativo final**: ¿Podría un lector informado decir "esto es un dato verificable que no estaba en el original"? Si SÍ → no añadirlo, independientemente de cuán natural parezca en el contexto.

**IMPORTANTE - Cautela estilística**: El límite FONDO protege la integridad factual, NO requiere perder incisividad expresiva. Reformulaciones incisivas, síntesis contundentes y estructuras retóricas con punch son FORMA legítima —mejoran la transmisión sin añadir información verificable. Si una frase se vuelve más explicativa pero menos directa, se ha perdido FORMA innecesariamente. "Más cauto" no es mejor si el resultado es más plano.

---

## Incisividad narrativa en bloques #teoria

### Principio: Precisión con impacto

El tono LcC no es "más cauto = mejor". La precisión debe tener **fuerza expresiva**.

### Criterios para mantener punch

**1. Estructura de contraste (no solo / sino)**
- ✅ BIEN: "Las emociones no solo colorean la experiencia; determinan qué información ingresa al campo de la consciencia"
- ❌ PLANO: "Las emociones determinan qué información capta la atención"
- **Por qué**: El contraste (no solo X, sino Y) crea tensión y subraya la importancia

**2. Verbos precisos y contundentes**
- ✅ BIEN: "opera", "determina", "genera", "desencadena", "dispara", "activa"
- ❌ PLANO: "funciona como", "hace que", "permite que"
- **Por qué**: Verbos directos dan sensación de mecanismo activo, no descripción pasiva

**3. Metáforas técnicas sobre metáforas genéricas**
- ✅ BIEN: "autopista neural", "visión de túnel emocional", "filtro perceptivo"
- ❌ PLANO: "como un camino", "como un filtro"
- **Por qué**: Las metáforas técnicas suenan a experto que domina; las genéricas suenan a divulgación básica

**4. Construcciones sintácticas que crean énfasis**
- ✅ BIEN: "El cerebro anticipa. Predice. Actúa antes de que la consciencia registre el estímulo."
- ❌ PLANO: "El cerebro anticipa y predice, actuando antes de que la consciencia registre el estímulo"
- **Por qué**: Frases cortas separadas crean ritmo y énfasis

**5. Subordinadas que añaden profundidad sin perder velocidad**
- ✅ BIEN: "La amígdala —estructura clave en la detección de amenazas— activa la respuesta antes de la consciencia"
- ❌ PLANO: "La amígdala activa la respuesta"
- **Por qué**: Las aclaraciones entre guiones añaden capas sin perder velocidad

**6. Construcciones que marcan contraste temporal o conceptual**
- ✅ BIEN: "El cuerpo reacciona primero; la mente consciente lo justifica después"
- ❌ PLANO: "El cuerpo reacciona y la mente lo justifica"
- **Por qué**: El contraste temporal (primero/después) hace visible el mecanismo secuencial

### Test de incisividad

Antes de aceptar una reformulación, pregúntate:

1. **¿Perdí un contraste o tensión presente en el original?** → Recuperarlo
2. **¿Cambié un verbo activo por uno pasivo o genérico?** → Usar el más directo
3. **¿Suavicé una metáfora técnica por una más "amigable"?** → Recuperar la técnica
4. **¿El resultado suena más "cauto" pero menos directo?** → Revertir (cautela ≠ mejor)

### Ejemplo integrador

**Original (del fichero):**
> "La amígdala está involucrada en la detección de estímulos emocionales"

**Transformación PLANA (pierde punch):**
> "La amígdala detecta estímulos emocionales"

**Transformación INCISIVA (mantiene punch):**
> "La amígdala detecta estímulos emocionales antes de que la consciencia los registre"

**Por qué es mejor:** Añade la dimensión temporal ("antes de") que crea tensión y subraya el mecanismo automático. Usa verbo directo ("detecta") y añade contraste temporal.

---

**REGLA DE ORO**: Si una frase se vuelve "más segura" pero "más plana", has perdido FORMA innecesariamente. El límite FONDO protege contra inventar datos, NO contra ser incisivo con los datos que ya existen.

---

## Ejemplos de tono correcto

**Exposición de concepto**:
> "El afecto de base opera como un clima emocional de fondo: presente siempre, aunque rara vez consciente. Tiñe la percepción del momento —cómo se interpreta un comentario, cómo se evalúa una propuesta, qué opciones parecen viables."

**Transición a aplicación**:
> "Reconocer el afecto de base en el momento permite distinguir cuánto de una reacción proviene del análisis de la situación y cuánto del estado corporal transitorio. Esa tensión antes de una conversación difícil, esa irritabilidad residual de una mañana complicada —son datos, no ruido."

**Cierre de sección**:
> "Esta cadena —del cuerpo a la emoción, de la emoción a la atención, de la atención a la acción— opera continuamente. No se trata de eliminarla, sino de hacerla visible. Lo visible se puede gestionar."

---

## Checklist final antes de entregar

Verifica que el módulo transformado cumple con:

### Frontmatter:
- [ ] Campo `ultima_actualizacion` añadido/actualizado con fecha actual (formato DD/MM/YYYY)
- [ ] Todos los campos originales preservados sin modificar

### Fidelidad al original:
- [ ] **TODO el contenido del original se mantiene**
  - Ejemplos (todos, sin excepción)
  - Casos históricos y anécdotas
  - Analogías y metáforas
  - Ejercicios y listas
  - Referencias bibliográficas

### Calidad de transformación:
- [ ] **Historias y casos**: Revisados manteniendo o potenciando tono narrativo
  - Extensión al servicio del impacto, no mecánicamente reducida
  - Nombres propios y datos verificables mantenidos
  - Tensión dramática potenciada si sirve al concepto
- [ ] **Integración narrativa**: Casos/ejemplos integrados orgánicamente en flujo teórico
  - No se sienten como "paréntesis" sino como parte del argumento
  - Transiciones fluidas: teoría → caso → implicación
- [ ] **Voz experta narrativa**: Eliminados preámbulos ("Es importante...", "Imagina que...") sin perder fuerza narrativa

### Distribución de recursos (si están en el original, mejora; no inventes):
- [ ] **Preguntas reflexivas**: Transformadas para activar genuina memoria experiencial
  - Nunca consecutivas
  - Si el original no tiene, NO añadir nuevas

- [ ] **Cierres sintéticos**: Si el original permite formulación memorable, hacerlo
  - No forzar en todas las secciones
  - Ej: "Lo visible se puede gestionar."

### Cobertura estructural:
- [ ] **Bloques #explicacion**: Solo transformados si existen en el original
  - Si existe: debe integrar/implicar/abrir (no resumir)
  - Si no existe: documentar en notas, NO crear
- [ ] **Segunda persona**: Cuando invita a observar experiencia o presenta alternativas conductuales (puede aparecer en #teoria y #explicacion)
- [ ] **Transiciones**: Cada sección conecta con la anterior (causal/ampliación/aplicación)

### Límite FONDO:
- [ ] No se añadieron datos cuantitativos específicos (tiempos exactos, porcentajes)
- [ ] No se inventó neuroanatomía no mencionada en el original
- [ ] No se añadieron afirmaciones factuales sobre evolución/historia no presentes
- [ ] Referencias científicas coinciden con las del original (o se documentó en notas)

---

## Notas para revisión

Al final del documento transformado, incluir una sección `## Notas para revisión` con:

### 1. Contenido eliminado por redundancia
Lista breve de contenido eliminado porque no aportaba valor (resúmenes mecánicos, reformulaciones sin aporte, listas repetitivas).

**Formato**: "Sección X: Eliminado [tipo de contenido] porque [razón breve]"
**Ejemplos**:
- "Sección 1: Eliminada segunda enumeración de 5 componentes (redundante con explicación previa)"
- "Sección 4: Eliminado párrafo que reformulaba concepto de amígdala sin añadir información"

**Tono**: Informativo, sin alarma. El usuario debe poder leer y pensar "ok, bien hecho".

### 2. Ausencias estructurales detectadas
Secciones que carecen de bloques #explicacion o elementos esperados (solo si NO se eliminó por redundancia).

**Formato**: "Sección X carece de [elemento]"
**Tono**: Informativo, no crítico.

### 3. Referencias sugeridas
Conceptos que merecerían respaldo científico pero no lo tienen en el texto fuente.

**Formato**: "Concepto X podría reforzarse con referencia a estudios de [autor/tema]"
**Tono**: Sugerencia constructiva.

**IMPORTANTE**: Las notas son informativas, no tareas pendientes. El usuario debe poder leer y confiar en que las decisiones editoriales fueron correctas. Si eliminaste redundancia, fue la decisión correcta —solo comunícala claramente.

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
