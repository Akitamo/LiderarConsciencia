
# Arquitectura Multi-Agente: Liderar con Consciencia

![](assets/Pasted%20image%2020251227180030.png)

## 1. Resumen Ejecutivo

---

Este documento establece la arquitectura funcional de un sistema multi-agente diseñado para gestionar, enriquecer y distribuir el contenido del programa formativo "Liderar con Consciencia".

### 2. Contexto del Proyecto

---

### 2.1 Estructura del Curso

|Módulo|Nombre|Enfoque|
|---|---|---|
|M1|Consciente de LO QUE SOY|Neurociencia, sistemas de pensamiento, automatismos|
|M2|Consciente de CÓMO ESTOY|Interocepción, conexión cuerpo-mente|
|M3|Consciente de LO QUE PIENSO-SIENTO|Interconexión pensamiento-emoción|
|M4|Consciente de LO QUE NECESITO|Gestión del estrés, resiliencia|
|M5|Consciente de LO QUE NECESITAMOS|Liderazgo compasivo, comunicación|
|M6|Consciente de LO QUE QUIERO|Propósito, atención, decisiones|
|M7|Consciente de LO QUE ESTÁ BIEN|Liderazgo ético, impacto sistémico|

### 2.2 Tipologías de Contenido

|Tipología|Requisitos de evidencia|
|---|---|
|**Teoría**|Obligatorio: citas académicas o fuentes primarias|
|**Ideas principales**|Obligatorio: derivada de teoría con cita|
|**Investigación**|Obligatorio: referencia completa, DOI si disponible|
|**Metáforas**|Opcional: puede ser original|
|**Analogías**|Opcional: puede ser original|
|**Ejemplos reales**|Obligatorio: fuente verificable del caso|
|**Ejercicios Mindfulness**|Recomendado: base en protocolo validado|
|**Citas**|Obligatorio: atribución exacta verificada|
|**Vídeos**|Obligatorio: URL y verificación de disponibilidad|
|**Imágenes**|Obligatorio: fuente y licencia de uso|

---

## 3. Arquitectura Simplificada

### 3.1 Visión General

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                         EL DIRECTOR DE ORQUESTA                                 │
│  (Coordinación, routing, cola, escalado, coherencia, métricas)                 │
└────────────────────────────────────────────────────────────────────────────────┘
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         ▼                            ▼                            ▼
┌─────────────────┐        ┌─────────────────┐          ┌─────────────────┐
│ EL INVESTIGADOR │        │    CURACIÓN     │          │ EL ESTRATEGA    │
│ + EL CENTINELA  │        │  (Especializada)│          │   DE VALOR      │
│                 │        │                 │          │                 │
│ • Rastreo       │        │ • El Auditor    │          │ • Curso LMS     │
│ • Clasificación │───────▶│   Pedagógico    │─────────▶│ • Comunicación  │
│ • Deduplicación │        │ • El Arquitecto │          │ • Base RAG      │
│ • Depósito      │        │   de Contenido  │          │                 │
└─────────────────┘        └─────────────────┘          └─────────────────┘
         ▲                            │                            │
         │                            ▼                            ▼
         │                   ┌─────────────────┐          ┌─────────────────┐
         │                   │  EL GUARDIÁN    │          │   EL ESCUCHA    │
         │                   │DE LA EVIDENCIA  │          │                 │
         │                   │                 │          │                 │
         │                   │ • Evidence Pack │          │ • Telemetría    │
         │                   │ • Copyright     │          │ • Preguntas RAG │
         │                   │ • Claim Audit   │          │ • Engagement    │
         └───────────────────┴─────────────────┘          └─────────────────┘

```

### 3.2 Inventario de Agentes

|#|Agente|Tipo|Función|
|---|---|---|---|
|1|**El Director de Orquesta** _(Orquestador)_|Único|Coordinación global, routing, métricas, escalado|
|2|**El Investigador** _(Ingestor)_|Único|Rastreo + Clasificación + Deduplicación + Depósito|
|3|**El Auditor Pedagógico** _(Evaluador)_|Parametrizado (x7)|Evaluación especializada por módulo|
|4|**El Arquitecto de Contenido** _(Redactor)_|Parametrizado (x7)|Curación especializada por módulo|
|5|**El Guardián de la Evidencia** _(Verificador)_|Único|Evidence Pack + Copyright + Claim Audit|
|6|**El Estratega de Valor** _(Distribuidor)_|Único|Formateo y envío a LMS, Comms, RAG|
|7|**El Escucha** _(Analizador de Feedback)_|Único|Telemetría, patrones, backlog de mejoras|
|8|**El Centinela** _(Detector de Duplicados)_|Único|Embeddings + similitud semántica|

**Total: 8 agentes** (donde El Auditor Pedagógico y El Arquitecto de Contenido son parametrizados por módulo, no instancias separadas)

---

## 4. Agentes: Especificación Detallada

### 4.1 El Director de Orquesta _(Orquestador)_

### Rol

Cerebro central. Coordina todo el flujo, mantiene estado, gestiona cola, escala a humano, y asegura coherencia global.

### Funciones Integradas

|Función|Descripción|
|---|---|
|**Gestión de cola**|Prioriza tareas pendientes|
|**Routing**|Dirige contenido al Auditor Pedagógico/Arquitecto de Contenido del módulo correcto|
|**Resolución de conflictos**|Decide en ambigüedades o aplica protocolo multi-módulo|
|**Escalado humano**|Notifica cuando se requiere intervención|
|**Auditoría de coherencia**|Verifica consistencia entre módulos periódicamente|
|**Dashboard de métricas**|Genera reportes de actividad y calidad|

### Triggers de Escalado Humano

|Situación|Acción|
|---|---|
|Clasificación con confianza < 70%|Escalar|
|Evaluación en zona gris (40-60 puntos)|Escalar|
|Discrepancia entre Auditores Pedagógicos en multi-módulo|Escalar|
|El Guardián de la Evidencia rechaza por copyright|Escalar|
|Claim Audit detecta afirmación sin fuente primaria|Escalar|
|Contenido sensible (salud mental, claims médicos)|Escalar siempre|

---

### 4.2 El Investigador _(Ingestor)_

### Rol

Captura contenido externo, lo clasifica, verifica que no sea duplicado, y lo deposita en el repositorio.

### Subfunciones (ejecutadas secuencialmente)

```
[Fuente externa]
       │
       ▼
┌─────────────────┐
│ 1. RASTREO      │ Captura contenido + metadatos básicos
└────────┬────────┘
         ▼
┌─────────────────┐
│ 2. CLASIFICACIÓN│ Asigna módulo(s) + tipología + confianza
└────────┬────────┘
         ▼
┌─────────────────┐
│ 3. DEDUPLICACIÓN│ Consulta a El Centinela
└────────┬────────┘
         │
         ├── Si duplicado/muy similar → DESCARTAR (con log)
         │
         ▼
┌─────────────────┐
│ 4. DEPÓSITO     │ Almacena en repositorio con ID único
└─────────────────┘

```

### Fuentes Configuradas

|Categoría|Fuentes|Frecuencia|Política de uso|
|---|---|---|---|
|**Académicas (Tier 1)**|PubMed, Google Scholar, ResearchGate|Semanal|Cita obligatoria, no reproducir texto|
|**Divulgación rigurosa (Tier 2)**|HBR, Greater Good, [Mindful.org](http://mindful.org/)|Semanal|Paráfrasis permitida con atribución|
|**Libros**|Alertas Amazon/Goodreads|Mensual|Solo referencia, no reproducir|
|**Multimedia**|YouTube (canales verificados)|Semanal|Embed permitido si público|
|**Newsletters**|Potential Project, Mindful Leader|Según llegada|Inspiración, no reproducir|

### Criterios de Clasificación

**Por Módulo:**

|Módulo|Keywords primarios|Keywords secundarios|
|---|---|---|
|M1|cerebro, neurociencia, sistema 1/2, sesgos, Kahneman|automatismo, heurísticas, cognición|
|M2|interocepción, cuerpo, sensaciones, somático|respiración, HRV, nervio vago|
|M3|emoción, pensamiento, sentimiento, reactividad|regulación emocional, patrones|
|M4|estrés, burnout, resiliencia, cortisol|recuperación, autocuidado|
|M5|compasión, empatía, comunicación, equipo|escucha, relaciones, confianza|
|M6|propósito, decisión, atención, foco|distracción, intención, claridad|
|M7|ética, valores, integridad, servicio|coherencia, impacto, liderazgo servicial|

**Por Tipología:**

|Tipología|Indicadores|
|---|---|
|Teoría|Explica mecanismos, fundamenta, usa terminología técnica|
|Ideas principales|Afirmación concisa, insight, conclusión|
|Investigación|Cita estudio, incluye datos, referencia académica|
|Metáfora|Comparación figurativa, "como si", imagen mental|
|Analogía|Paralelo explicativo, "es similar a"|
|Ejemplo real|Caso concreto, empresa, situación nombrada|
|Ejercicio|Instrucciones paso a paso, práctica guiada|
|Cita|Frase textual con autor|
|Vídeo|URL de contenido audiovisual|
|Imagen|Archivo visual o URL de imagen|

### Output: Formato de Depósito

```yaml
---
id: M01-TEO-2024-0042
fecha_ingreso: 2024-12-27T10:30:00Z
estado: DEPOSITADO

# Clasificación
modulo_principal: 1
modulos_secundarios: [6]
confianza_modulo: 0.87
tipologia: teoria
confianza_tipologia: 0.92

# Fuente
fuente_tipo: academica_tier1
fuente_nombre: "Frontiers in Neuroscience"
fuente_url: "<https://doi.org/10.3389/fnins.2024.xxxxx>"
fuente_fecha: 2024-11-15
autor: "Smith, J., García, M."
licencia: "CC-BY-4.0"
uso_permitido: "cita_y_parafrasis"

# Deduplicación
similitud_max_existente: 0.34
id_mas_similar: "M01-TEO-2024-0028"
es_duplicado: false

# Contenido
titulo: "Neural mechanisms of attentional control in mindfulness"
resumen: |
  Estudio sobre cómo la práctica de mindfulness modifica
  los circuitos atencionales en la corteza prefrontal...
contenido_raw: |
  [Texto completo capturado]

# Trazabilidad de claims (a completar por El Guardián de la Evidencia)
claims: []
---

```

---

### 4.3 El Centinela _(Detector de Duplicados)_

### Rol

Evita procesar contenido redundante comparando semánticamente con el repositorio existente.

### Método

```
1. Generar embedding del contenido nuevo
2. Comparar con embeddings de contenido existente del mismo módulo
3. Calcular similitud coseno
4. Aplicar umbral:
   - Similitud > 0.85 → DUPLICADO (descartar)
   - Similitud 0.70-0.85 → SIMILAR (flag para Auditor Pedagógico)
   - Similitud < 0.70 → ÚNICO (proceder)

```

### Output

```yaml
similitud_max: 0.78
contenido_similar_id: "M01-TEO-2024-0028"
contenido_similar_titulo: "Attention and mindfulness training"
clasificacion: "SIMILAR"
recomendacion: "Evaluar si aporta perspectiva nueva vs contenido existente"

```

---

### 4.4 El Auditor Pedagógico _(Evaluador)_ - Parametrizado por Módulo

### Rol

Evalúa si el contenido nuevo aporta valor al módulo específico. Un único agente con 7 configuraciones de especialización.

### Configuración por Módulo

```yaml
auditor_pedagogico_config:
  M1:
    nombre: "Auditor Pedagógico - LO QUE SOY"
    dominio: "Neurociencia, sesgos cognitivos, sistemas de pensamiento"
    autores_referencia: ["Kahneman", "Tversky", "Damasio", "LeDoux"]
    gaps_conocidos:
      - "Neuroplasticidad en adultos mayores"
      - "Sesgos específicos de liderazgo"
    contenido_saturado:
      - "Sistema 1 vs Sistema 2 básico"
      - "Lista genérica de sesgos cognitivos"

  M2:
    nombre: "Auditor Pedagógico - CÓMO ESTOY"
    dominio: "Interocepción, consciencia corporal, señales somáticas"
    autores_referencia: ["Porges", "Craig", "Damasio", "Fogel"]
    gaps_conocidos:
      - "Interocepción y toma de decisiones"
      - "HRV como indicador de regulación"
    contenido_saturado:
      - "Definición básica de interocepción"

  # ... [M3 a M7 con estructura similar]

```

### Criterios de Evaluación

|Criterio|Peso|Descripción|
|---|---|---|
|**Novedad para el módulo**|25%|¿Cubre gap conocido o aporta perspectiva nueva?|
|**Calidad de fuente**|25%|Tier 1 (académica) > Tier 2 (divulgación) > Tier 3 (opinión)|
|**Relevancia directa**|20%|¿Aplicable a objetivos del módulo?|
|**Verificabilidad**|15%|¿Claims tienen fuente trazable?|
|**Complementariedad**|15%|¿Se integra bien con contenido existente?|

### Clasificación de Resultado

|Puntuación|Clasificación|Acción|
|---|---|---|
|80-100|EXCELENTE|Proceder a curación|
|60-79|BUENO|Proceder a curación|
|40-59|ZONA GRIS|Escalar a humano|
|20-39|BAJO VALOR|Descartar con justificación|
|0-19|IRRELEVANTE|Descartar|

### Output

```yaml
evaluacion:
  modulo: 1
  puntuacion: 76
  clasificacion: "BUENO"

  desglose:
    novedad: 18/25  # Cubre gap parcialmente
    calidad_fuente: 23/25  # Tier 1, peer-reviewed
    relevancia: 16/20  # Muy aplicable
    verificabilidad: 12/15  # Claims verificables
    complementariedad: 7/15  # Algo de solapamiento

  justificacion: |
    El estudio aporta evidencia reciente sobre modificación de circuitos
    atencionales, complementando el contenido existente de Malinowski (2013).
    Cubre parcialmente el gap identificado sobre neuroplasticidad.
    Solapamiento moderado con M01-TEO-2024-0028 pero perspectiva diferente.

  recomendacion: "PROCEDER"
  conexiones_sugeridas:
    - id: "M01-TEO-2024-0015"
      razon: "Ambos tratan circuitos prefrontales"
    - id: "M01-EJE-2024-0003"
      razon: "Este estudio valida científicamente ese ejercicio"

```

---

### 4.5 El Arquitecto de Contenido _(Redactor)_ - Parametrizado por Módulo

### Rol

Adapta el contenido aprobado al estilo específico del módulo. Un único agente con 7 configuraciones.

### Configuración por Módulo

```yaml
arquitecto_contenido_config:
  M1:
    nombre: "Arquitecto de Contenido - LO QUE SOY"
    tono: "Revelador, científico pero accesible"
    metaforas_preferidas:
      - "GPS interno"
      - "Piloto automático"
      - "Teatro mental"
      - "Arquitectura cerebral"
    metaforas_prohibidas:
      - "Cerebro reptiliano" # Simplificación incorrecta
    estructura_tipica:
      teoria: "Concepto → Mecanismo → Implicación para liderazgo"
      ejercicio: "Contexto → Instrucción → Reflexión"
    vocabulario_clave:
      - "automatismo"
      - "consciencia"
      - "neuroplasticidad"
      - "sesgo"
    evitar:
      - "Determinismo neural"
      - "Jerga neurocientífica no explicada"
      - "Simplificaciones excesivas"

  M5:
    nombre: "Arquitecto de Contenido - LO QUE NECESITAMOS"
    tono: "Cálido, orientado al otro, humanizador"
    metaforas_preferidas:
      - "Puentes relacionales"
      - "Refugio de lo cercano"
      - "Tejido del equipo"
    estructura_tipica:
      teoria: "Necesidad humana → Mecanismo → Aplicación relacional"
      ejercicio: "Situación relacional → Práctica → Impacto esperado"
    vocabulario_clave:
      - "compasión"
      - "escucha"
      - "presencia"
      - "humanidad compartida"
    evitar:
      - "Lenguaje transaccional"
      - "Compasión como debilidad"

  # ... [resto de módulos]

```

### Proceso de Redacción

```
1. Cargar configuración del módulo destino
2. Cargar contenido existente del módulo (contexto)
3. Adaptar contenido nuevo:
   a. Ajustar tono según configuración
   b. Integrar metáforas del módulo si aplica
   c. Estructurar según tipología
   d. Crear conexiones con contenido existente
   e. Mantener trazabilidad de claims
4. Generar propuesta de ubicación en el módulo
5. Si multi-módulo: crear variantes para cada módulo

```

### Output

```yaml
redaccion:
  modulo: 1
  tipologia: teoria

  contenido_original_id: "M01-TEO-2024-0042"

  titulo_propuesto: "Cómo el entrenamiento de la atención remodela tu cerebro"

  contenido_adaptado: |
    Cada vez que entrenas tu atención de forma deliberada, estás
    literalmente recableando tu arquitectura neural. Un estudio reciente
    en Frontiers in Neuroscience [1] demuestra que la práctica sostenida
    de mindfulness fortalece las conexiones en la corteza prefrontal,
    la región responsable de...

    [Continúa con el contenido adaptado al estilo del módulo]

  claims_con_fuente:
    - claim: "La práctica sostenida de mindfulness fortalece las conexiones en la corteza prefrontal"
      fuente_id: 1
      fuente_ref: "Smith & García (2024), Frontiers in Neuroscience"
      tipo_evidencia: "estudio_empirico"

  ubicacion_propuesta:
    seccion: "1.3 Neuroplasticidad consciente"
    posicion: "después de introducción a neuroplasticidad"
    justificacion: "Aporta evidencia reciente que refuerza el concepto"

  conexiones_internas:
    - target: "M01-TEO-2024-0015"
      tipo: "complementa"
      texto_enlace: "Como vimos en la sección anterior sobre circuitos atencionales..."

```

---

### 4.6 El Guardián de la Evidencia _(Verificador)_ - Gate de Calidad Obligatorio

### Rol

Valida evidencia, copyright y claims antes de aprobar contenido. **Ningún contenido pasa a APROBADO sin superar este gate.**

### Tres Checks Obligatorios

### Check 1: Evidence Pack

```yaml
evidence_pack:
  contenido_id: "M01-TEO-2024-0042"

  claims_verificados:
    - claim: "La práctica sostenida de mindfulness fortalece las conexiones en la corteza prefrontal"
      tiene_fuente: true
      fuente: "Smith & García (2024)"
      tipo_fuente: "peer_reviewed_journal"
      doi: "10.3389/fnins.2024.xxxxx"
      verificable: true
      nivel_evidencia: "estudio_empirico"  # Ver escala abajo

    - claim: "Estos cambios son detectables tras 8 semanas de práctica"
      tiene_fuente: true
      fuente: "Smith & García (2024)"
      verificable: true
      nivel_evidencia: "estudio_empirico"

  claims_sin_fuente: []

  claims_no_verificables: []

  resultado: "APROBADO"

```

**Escala de Nivel de Evidencia:**

|Nivel|Descripción|Aceptable para|
|---|---|---|
|**meta_analisis**|Meta-análisis o revisión sistemática|Cualquier claim|
|**estudio_empirico**|Estudio peer-reviewed|Cualquier claim|
|**revision_narrativa**|Revisión no sistemática|Claims generales|
|**libro_academico**|Libro de autor reconocido|Claims conceptuales|
|**divulgacion_rigurosa**|HBR, Greater Good, etc.|Ideas, no datos específicos|
|**opinion_experta**|Blog, charla, entrevista|Solo como perspectiva, no como evidencia|
|**sin_fuente**|No verificable|NO ACEPTABLE para claims factuales|

### Check 2: Copyright y Uso

```yaml
copyright_check:
  contenido_id: "M01-TEO-2024-0042"

  fuente_original:
    tipo: "articulo_academico"
    licencia: "CC-BY-4.0"
    permite_uso_comercial: true
    requiere_atribucion: true

  uso_en_contenido:
    texto_reproducido: 0  # palabras copiadas literalmente
    parafrasis: 245  # palabras parafraseadas
    solo_referencia: true  # ¿o reproduce contenido?

  verificacion:
    - regla: "No reproducir texto literal de fuentes protegidas"
      cumple: true
    - regla: "Atribución presente para todo contenido derivado"
      cumple: true
    - regla: "Uso dentro de términos de licencia"
      cumple: true

  resultado: "APROBADO"
  notas: "Licencia CC-BY permite uso con atribución correcta"

```

**Política de Copyright por Tipo de Fuente:**

|Tipo de Fuente|Reproducción literal|Paráfrasis|Solo referencia|
|---|---|---|---|
|Papers CC-BY|Hasta 100 palabras con cita|✅ Permitido|✅ Permitido|
|Papers copyright|❌ Prohibido|✅ Con atribución|✅ Permitido|
|Libros|❌ Prohibido|✅ Con atribución|✅ Permitido|
|HBR/similares|❌ Prohibido|✅ Con atribución|✅ Permitido|
|Contenido web CC|Según licencia específica|✅ Con atribución|✅ Permitido|
|Vídeos YouTube|❌ No transcribir|❌ No transcribir|✅ Embed si público|

### Check 3: Claim Audit

```yaml
claim_audit:
  contenido_id: "M01-TEO-2024-0042"

  claims_sensibles_detectados:
    - claim: "reduce la ansiedad en un 40%"
      tipo: "cuantitativo_salud"
      requiere: "fuente_primaria_obligatoria"
      tiene_fuente_primaria: true
      fuente: "Meta-análisis Hofmann et al. (2010)"
      resultado: "APROBADO"

    - claim: "activa la corteza prefrontal"
      tipo: "neurobiologico"
      requiere: "estudio_empirico"
      tiene_estudio: true
      resultado: "APROBADO"

  claims_problematicos: []

  resultado_global: "APROBADO"

```

**Claims que Requieren Verificación Especial:**

|Tipo de Claim|Requisito|Ejemplo|
|---|---|---|
|Cuantitativo (%)|Fuente primaria con dato exacto|"reduce estrés en 30%"|
|Neurobiológico|Estudio empírico|"activa la amígdala"|
|Salud mental|Meta-análisis o guía clínica|"trata la depresión"|
|Comparativo|Estudio que compare|"más efectivo que X"|
|Universal|Múltiples fuentes|"todos los humanos..."|
|Causal|Estudio experimental|"causa mejora en..."|

### Output Final de El Guardián de la Evidencia

```yaml
verificacion_final:
  contenido_id: "M01-TEO-2024-0042"

  checks:
    evidence_pack: "APROBADO"
    copyright: "APROBADO"
    claim_audit: "APROBADO"

  resultado_global: "APROBADO"

  # Si algún check falla:
  # resultado_global: "RECHAZADO" o "ESCALAR_HUMANO"
  # motivo: "Descripción del problema"
  # accion_requerida: "Qué debe hacerse para resolver"

```

---

### 4.7 El Estratega de Valor _(Distribuidor)_

### Rol

Formatea y envía contenido aprobado a los tres destinos: Curso LMS, Comunicaciones, Base RAG.

### Subfunciones

### Distribución a Curso LMS

```yaml
distribucion_lms:
  contenido_id: "M01-TEO-2024-0042"
  plataforma: "Continu"

  formato_salida:
    tipo: "leccion"
    modulo: "M1 - Consciente de LO QUE SOY"
    seccion: "1.3 Neuroplasticidad consciente"

    componentes:
      - tipo: "texto"
        contenido: "[Contenido adaptado]"
      - tipo: "referencia"
        texto: "Smith & García (2024). Neural mechanisms..."
        url: "<https://doi.org/>..."

    metadatos_lms:
      duracion_estimada: "8 min"
      objetivos: ["Comprender neuroplasticidad", "Conectar con práctica"]
      tags: ["neurociencia", "mindfulness", "evidencia"]

```

### Distribución a Comunicaciones

```yaml
distribucion_comms:
  contenido_id: "M01-TEO-2024-0042"

  piezas_generadas:
    - tipo: "pildora"
      canal: "email"
      titulo: "Tu cerebro puede cambiar (y tú puedes dirigirlo)"
      contenido: |
        ¿Sabías que cada vez que practicas atención consciente,
        estás literalmente recableando tu cerebro? Un estudio
        reciente demuestra que...
      longitud: 150 palabras
      cta: "Descubre más en el Módulo 1"
      fecha_sugerida: "2025-01-15"

    - tipo: "post_linkedin"
      contenido: |
        La neuroplasticidad no es solo un concepto. Es tu
        herramienta de liderazgo más poderosa...
      longitud: 200 palabras
      hashtags: ["#LiderazgoConsciente", "#Neurociencia"]

  regla_verificada: "Ningún claim nuevo no presente en curso"
  resultado: true

```

**Regla Crítica de Comunicaciones:**

> Ninguna pieza de marketing puede introducir una afirmación científica que no esté previamente aprobada como contenido del curso.

### Distribución a Base RAG

```yaml
distribucion_rag:
  contenido_id: "M01-TEO-2024-0042"

  chunks_generados:
    - chunk_id: "M01-TEO-2024-0042-C01"
      contenido: |
        La práctica sostenida de mindfulness fortalece las conexiones
        en la corteza prefrontal. Según Smith & García (2024), estos
        cambios son detectables tras 8 semanas de práctica regular.

      metadatos:
        modulo: 1
        modulo_nombre: "Consciente de LO QUE SOY"
        tipologia: "teoria"
        tema: "neuroplasticidad"
        keywords: ["corteza prefrontal", "mindfulness", "8 semanas"]

      preguntas_relacionadas:
        - "¿Cuánto tiempo tarda en cambiar el cerebro con mindfulness?"
        - "¿Qué partes del cerebro cambian con la meditación?"
        - "¿Hay evidencia científica de que mindfulness funciona?"

      fuentes:
        - "Smith & García (2024), Frontiers in Neuroscience"

      estilo_respuesta: "revelador, científico accesible"

```

---

### 4.8 El Escucha _(Analizador de Feedback)_

### Rol

Recoge telemetría de alumnos y uso del sistema para retroalimentar mejoras.

### Fuentes de Feedback

|Fuente|Datos|Frecuencia|
|---|---|---|
|**LMS (Continu)**|Completitud, tiempo en lección, re-lecturas, ratings|Diaria|
|**AI Coach (RAG)**|Preguntas frecuentes, queries sin respuesta satisfactoria|Diaria|
|**Encuestas**|NPS, feedback cualitativo por módulo|Post-módulo|
|**Soporte**|Tickets, dudas recurrentes|Continua|

### Análisis y Outputs

```yaml
feedback_analisis:
  periodo: "2025-01-01 a 2025-01-31"

  metricas_engagement:
    - modulo: 1
      completitud: 0.89
      tiempo_promedio: "45 min"
      rating_promedio: 4.6
      relacturas: 0.12  # 12% relee alguna sección
    - modulo: 4
      completitud: 0.72  # Más bajo
      tiempo_promedio: "38 min"
      rating_promedio: 4.2
      relacturas: 0.23  # Más alto → posible confusión

  preguntas_frecuentes_rag:
    - pregunta: "¿Cómo aplicar esto en reuniones?"
      frecuencia: 47
      modulos_relacionados: [5, 6]
      contenido_existente: "parcial"
      gap_identificado: "Falta ejemplo práctico de aplicación en reuniones"

    - pregunta: "¿Cuánto tiempo debo meditar?"
      frecuencia: 38
      modulos_relacionados: [1, 4]
      contenido_existente: "sí"
      problema: "Contenido existe pero no fácil de encontrar"

  queries_sin_respuesta:
    - query: "diferencia entre compasión y empatía en liderazgo"
      frecuencia: 12
      modulo_esperado: 5
      accion: "CREAR_CONTENIDO"

  backlog_mejoras_generado:
    - prioridad: 1
      tipo: "crear_contenido"
      descripcion: "Ejemplo práctico: mindfulness en reuniones"
      modulo_destino: 5
      tipologia: "ejemplo_real"

    - prioridad: 2
      tipo: "mejorar_findability"
      descripcion: "Hacer más visible recomendación de tiempo de práctica"
      modulo: 1
      contenido_existente_id: "M01-EJE-2024-0008"

    - prioridad: 3
      tipo: "crear_contenido"
      descripcion: "Diferenciar compasión vs empatía"
      modulo_destino: 5
      tipologia: "teoria"

```

### Integración con El Director de Orquesta

El backlog de mejoras generado se envía a El Director de Orquesta como **triggers de búsqueda activa**:

```yaml
trigger_busqueda:
  origen: "feedback_loop"
  prioridad: 1

  solicitud:
    tipo: "buscar_contenido_especifico"
    tema: "aplicación práctica de mindfulness en reuniones de trabajo"
    tipologia_deseada: "ejemplo_real"
    modulo_destino: 5

  criterios_aceptacion:
    - "Caso real de empresa (no hipotético)"
    - "Resultados medibles o testimoniales"
    - "Aplicable a contexto ejecutivo"

```

---

## 5. Flujo Completo del Sistema

### 5.1 Diagrama de Estados

```
                                    ┌─────────────────┐
                                    │   CAPTURADO     │
                                    └────────┬────────┘
                                             │
                                             ▼
                                    ┌─────────────────┐
                                    │  CLASIFICADO    │
                                    └────────┬────────┘
                                             │
                                             ▼
                                    ┌─────────────────┐
                              ┌─────│ DEDUPLICACIÓN   │─────┐
                              │     └─────────────────┘     │
                              │                             │
                         ÚNICO/SIMILAR                  DUPLICADO
                              │                             │
                              ▼                             ▼
                    ┌─────────────────┐           ┌─────────────────┐
                    │   DEPOSITADO    │           │   DESCARTADO    │
                    └────────┬────────┘           │   (duplicado)   │
                             │                    └─────────────────┘
                             ▼
                    ┌─────────────────┐
              ┌─────│   EVALUACIÓN    │─────┐
              │     └─────────────────┘     │
              │              │              │
          ALTO/BUENO     ZONA GRIS     BAJO/IRRELEVANTE
              │              │              │
              │              ▼              │
              │     ┌─────────────────┐     │
              │     │    ESCALADO     │     │
              │     │    HUMANO       │     │
              │     └────────┬────────┘     │
              │              │              │
              │         APROBADO/           │
              │         RECHAZADO           │
              │              │              │
              ▼              ▼              ▼
    ┌─────────────────┐             ┌─────────────────┐
    │    CURACIÓN     │             │   DESCARTADO    │
    │ (El Arquitecto) │             │ (bajo valor)    │
    └────────┬────────┘             └─────────────────┘
             │
             ▼
    ┌─────────────────┐
    │  VERIFICACIÓN   │◄──────────────────────────────┐
    │ (El Guardián)   │                               │
    └────────┬────────┘                               │
             │                                        │
    ┌────────┴────────┬───────────────┐               │
    │                 │               │               │
 APROBADO        RECHAZADO      ESCALAR_HUMANO       │
    │                 │               │               │
    │                 ▼               ▼               │
    │        ┌─────────────┐  ┌─────────────┐        │
    │        │ DESCARTADO  │  │  REVISIÓN   │────────┘
    │        │(verificación)│  │   HUMANA   │  (corregir y re-verificar)
    │        └─────────────┘  └─────────────┘
    │
    ▼
┌─────────────────┐
│    APROBADO     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  DISTRIBUCIÓN   │
│(El Estratega)   │
└────────┬────────┘
         │
    ┌────┴────┬──────────┐
    ▼         ▼          ▼
┌───────┐ ┌───────┐ ┌───────┐
│  LMS  │ │ Comms │ │  RAG  │
└───────┘ └───────┘ └───────┘
         │
         ▼
┌─────────────────┐
│   DISTRIBUIDO   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  EL ESCUCHA     │───────► [Backlog de mejoras]
│ (Feedback Loop) │                  │
└─────────────────┘                  │
                                     ▼
                            [Triggers de búsqueda]
                                     │
                                     ▼
                         [EL DIRECTOR DE ORQUESTA]
                                     │
                                     ▼
                              [Nueva captura...]

```

### 5.2 Protocolo Multi-Módulo

Cuando contenido aplica a más de un módulo:

```
1. CLASIFICACIÓN
   → Módulo principal: M4 (85% confianza)
   → Módulos secundarios: M6 (72%), M7 (65%)

2. EVALUACIÓN
   → Auditor Pedagógico M4 (líder): Evalúa primero
   → Si aprueba: Auditores Pedagógicos M6 y M7 evalúan para sus módulos
   → Consolidación:
     • Todos aprueban → Continuar para todos
     • Alguno rechaza → Continuar solo para los que aprueban
     • Líder rechaza → Descartar todo
     • Discrepancia significativa → Escalar

3. REDACCIÓN
   → Arquitecto de Contenido M4: Genera versión base
   → Arquitectos de Contenido M6 y M7: Adaptan a su estilo si aprobaron

4. VERIFICACIÓN
   → Una sola verificación (contenido es el mismo, solo varía estilo)

5. DISTRIBUCIÓN
   → Cada versión a su módulo correspondiente en LMS
   → Una entrada en RAG con metadatos de todos los módulos aplicables

```

---

## 6. Contrato Editorial

### 6.1 Glosario Oficial

Términos con definición canónica que todos los Arquitectos de Contenido deben usar consistentemente:

```yaml
glosario:
  consciencia:
    definicion: "Capacidad de darse cuenta de la experiencia presente con atención deliberada"
    modulo_dueño: M1
    sinonimos_permitidos: ["awareness", "darse cuenta"]
    sinonimos_prohibidos: ["conciencia" (sin s), "mente"]

  mindfulness:
    definicion: "Entrenamiento sistemático de la atención al momento presente sin juicio"
    modulo_dueño: M1
    sinonimos_permitidos: ["atención plena", "práctica contemplativa"]
    sinonimos_prohibidos: ["meditación" (solo como técnica, no como sinónimo)]

  interocepcion:
    definicion: "Capacidad de percibir señales internas del cuerpo"
    modulo_dueño: M2
    sinonimos_permitidos: ["consciencia corporal", "sensibilidad interna"]
    sinonimos_prohibidos: ["intuición" (concepto diferente)]

  sistema_1:
    definicion: "Modo de pensamiento rápido, automático, sin esfuerzo consciente"
    modulo_dueño: M1
    sinonimos_permitidos: ["pensamiento automático", "modo reactivo"]
    sinonimos_prohibidos: ["instinto" (impreciso), "inconsciente" (concepto diferente)]

  compasion:
    definicion: "Reconocimiento del sufrimiento con intención de aliviarlo"
    modulo_dueño: M5
    diferencia_de: "empatía (sentir con el otro, puede paralizar)"
    sinonimos_permitidos: ["cuidado activo"]
    sinonimos_prohibidos: ["lástima", "pena"]

  # ... [continuar con términos clave de cada módulo]

```

### 6.2 Estructura por Tipología

Requisitos estructurales que cada tipología debe cumplir:

```yaml
estructura_tipologia:
  teoria:
    componentes_obligatorios:
      - concepto_central: "Definición clara del concepto"
      - mecanismo: "Cómo funciona / por qué ocurre"
      - implicacion_liderazgo: "Conexión con la práctica del líder"
      - fuente: "Al menos una referencia verificable"
    longitud: "300-800 palabras"

  idea_principal:
    componentes_obligatorios:
      - afirmacion: "Frase concisa y memorable"
      - contexto: "De qué concepto/teoría deriva"
      - fuente: "Referencia de origen"
    longitud: "50-150 palabras"

  ejercicio_mindfulness:
    componentes_obligatorios:
      - objetivo: "Qué desarrolla este ejercicio"
      - preparacion: "Contexto/postura/momento"
      - instrucciones: "Pasos claros y secuenciales"
      - duracion: "Tiempo estimado"
      - variaciones: "Opcional: adaptaciones"
      - base_evidencia: "Protocolo de origen si aplica (MBSR, MBCT, etc.)"
    longitud: "200-500 palabras"

  ejemplo_real:
    componentes_obligatorios:
      - contexto: "Empresa/persona/situación"
      - situacion: "Qué ocurrió"
      - aplicacion: "Qué práctica/concepto se aplicó"
      - resultado: "Qué cambió"
      - fuente: "De dónde viene el caso"
    longitud: "150-400 palabras"

  metafora:
    componentes_obligatorios:
      - imagen: "La metáfora en sí"
      - concepto_ilustrado: "Qué explica"
      - desarrollo: "Opcional: extensión de la metáfora"
    longitud: "50-200 palabras"

  cita:
    componentes_obligatorios:
      - texto_exacto: "Frase literal verificada"
      - autor: "Nombre completo"
      - fuente: "Libro/artículo/charla con año"
      - contexto: "Opcional: por qué es relevante"
    verificacion: "Obligatorio verificar texto exacto"

```

### 6.3 Reglas de Coherencia Global

```yaml
reglas_coherencia:

  hilo_narrativo:
    descripcion: "El programa sigue una progresión de dentro hacia fuera"
    regla: |
      Contenido de módulos 1-3 debe enfocarse en el individuo.
      Contenido de módulos 4-6 debe conectar individuo con contexto.
      Contenido de módulo 7 debe trascender hacia impacto sistémico.
    verificacion: "El Director de Orquesta revisa en auditoría mensual"

  referencias_cruzadas:
    descripcion: "Módulos posteriores pueden referenciar anteriores, no al revés"
    regla: |
      M5 puede decir "como vimos en M1 sobre automatismos..."
      M1 NO debe decir "esto se aplicará en M5..."
    excepcion: "Introducción general del curso puede anticipar"

  tono_unificado:
    descripcion: "Variación de estilo pero consistencia de voz"
    regla: |
      Todos los módulos: cercano, riguroso, esperanzador, no sermoneador.
      Variación permitida: M1 más científico, M5 más cálido, M7 más inspirador.
    verificacion: "Auditoría trimestral de muestra cruzada"

  densidad_evidencia:
    descripcion: "Balance entre rigor y accesibilidad"
    regla: |
      Teoría: Mínimo 1 referencia por cada 300 palabras.
      Ejercicios: Referencia a protocolo validado si existe.
      Metáforas/Analogías: No requieren referencia pero no contradicen evidencia.

```

---

## 7. Métricas y Calibración

### 7.1 Set de Calibración

Para medir rendimiento real del sistema, se creará un set de calibración etiquetado manualmente:

```yaml
set_calibracion:
  creador: "Sergio (propietario)"
  fecha_creacion: "2025-01-XX"

  composicion:
    - modulo: 1
      piezas_etiquetadas: 20
      tipologias_cubiertas: [teoria, ejercicio, metafora, investigacion]
    - modulo: 2
      piezas_etiquetadas: 20
      # ... [repetir para cada módulo]

  total_piezas: 140

  etiquetas_por_pieza:
    - modulo_correcto: [1-7]
    - tipologia_correcta: [lista]
    - calidad_evaluacion: ["excelente", "bueno", "aceptable", "rechazar"]
    - claims_verificados: [lista de claims con fuente correcta]

```

### 7.2 Métricas Operativas

|Métrica|Definición|Objetivo|Medición|
|---|---|---|---|
|**Precisión clasificación módulo**|% de asignaciones correctas vs set calibración|> 85%|Semanal|
|**Precisión clasificación tipología**|% de asignaciones correctas vs set calibración|> 85%|Semanal|
|**Precisión evaluación**|% de acuerdo con etiqueta humana de calidad|> 80%|Semanal|
|**Tasa de escalado**|% de contenido que requiere intervención humana|10-20%|Semanal|
|**Tasa de aprobación post-verificación**|% que pasa gate de calidad|> 90%|Semanal|
|**Tasa de rechazo por copyright**|% rechazado por problemas de uso|< 5%|Mensual|
|**Tasa de claims sin fuente**|% de claims detectados sin verificar|< 2%|Semanal|
|**Tiempo de procesamiento**|Horas desde captura hasta aprobado|< 48h|Semanal|
|**Coherencia inter-módulo**|Score de auditoría de estilo|> 85%|Trimestral|

### 7.3 Test Automático Semanal

```yaml
test_semanal:
  nombre: "Quality Gate Test"
  frecuencia: "Domingos 00:00"

  tests:
    - nombre: "Clasificación módulo"
      metodo: "Ejecutar El Investigador sobre 20 piezas del set calibración"
      comparar_con: "Etiqueta humana"
      output: "Matriz de confusión módulo"

    - nombre: "Clasificación tipología"
      metodo: "Ejecutar El Investigador sobre mismas 20 piezas"
      comparar_con: "Etiqueta humana"
      output: "Matriz de confusión tipología"

    - nombre: "Evaluación"
      metodo: "Ejecutar Auditores Pedagógicos sobre 20 piezas pre-evaluadas"
      comparar_con: "Decisión humana (aprobar/rechazar)"
      output: "% acuerdo, falsos positivos, falsos negativos"

    - nombre: "Verificación de claims"
      metodo: "Ejecutar El Guardián de la Evidencia sobre 10 piezas con claims conocidos"
      comparar_con: "Claims etiquetados manualmente"
      output: "% claims detectados, % verificados correctamente"

  alertas:
    - condicion: "Precisión clasificación < 80%"
      accion: "Notificar para revisión de criterios"
    - condicion: "Tasa escalado > 30%"
      accion: "Notificar posible problema en umbrales"
    - condicion: "Claims sin fuente > 5%"
      accion: "Alerta crítica - revisar El Guardián de la Evidencia"

```

---

## 8. Implementación por Fases

### Fase 0: Preparación (Semanas 1-2)

|Tarea|Entregable|
|---|---|
|Estructurar repositorio GitHub|Carpetas por módulo con plantillas|
|Migrar contenido RAW existente|Contenido actual en formato estándar|
|Crear set de calibración inicial|50 piezas etiquetadas (mínimo)|
|Definir lista de fuentes Tier 1/2|Lista aprobada con políticas de uso|
|Completar glosario oficial|Términos clave de cada módulo|

### Fase 1: Core (Semanas 3-6)

|Componente|Funcionalidad|
|---|---|
|El Director de Orquesta (básico)|Cola de tareas, estados, escalado manual|
|El Investigador (manual)|Clasificación asistida, depósito con formato|
|El Centinela|Embeddings + comparación|
|El Guardián de la Evidencia (básico)|Checklist manual de evidence/copyright|

**Validación Fase 1:** Procesar 20 piezas manualmente con el flujo, medir tiempos y calidad.

### Fase 2: Especialización (Semanas 7-10)

|Componente|Funcionalidad|
|---|---|
|El Auditor Pedagógico M1 y M4|Evaluación automatizada para 2 módulos piloto|
|El Arquitecto de Contenido M1 y M4|Curación automatizada para 2 módulos piloto|
|El Guardián de la Evidencia (automatizado)|Evidence pack automático, claim detection|

**Validación Fase 2:** Comparar evaluación/redacción automática vs manual en 30 piezas.

### Fase 3: Escalado (Semanas 11-14)

|Componente|Funcionalidad|
|---|---|
|Auditores Pedagógicos M2, M3, M5, M6, M7|Extensión a todos los módulos|
|Arquitectos de Contenido M2, M3, M5, M6, M7|Extensión a todos los módulos|
|El Investigador (automático)|Rastreo programado de fuentes|

**Validación Fase 3:** Test completo con set de calibración, métricas operativas.

### Fase 4: Distribución (Semanas 15-18)

|Componente|Funcionalidad|
|---|---|
|El Estratega de Valor - LMS|Integración con Continu|
|El Estratega de Valor - Comms|Generación de píldoras/newsletter|
|El Estratega de Valor - RAG|Chunking y embeddings para AI Coach|

### Fase 5: Feedback Loop (Semanas 19-22)

|Componente|Funcionalidad|
|---|---|
|El Escucha|Telemetría de LMS y RAG|
|Integración con El Director de Orquesta|Triggers automáticos de búsqueda|
|Dashboard completo|Métricas, backlog, alertas|

---

## 9. Riesgos y Mitigaciones

|Riesgo|Probabilidad|Impacto|Mitigación|
|---|---|---|---|
|Claims sin fuente llegan a producción|Media|Alto|Gate de El Guardián de la Evidencia obligatorio, auditoría|
|Copyright violation|Media|Alto|Política explícita, check automático, solo paráfrasis|
|Divergencia de estilo entre módulos|Media|Medio|Contrato editorial, auditoría trimestral|
|Sobre-escalado a humano|Alta|Bajo|Ajustar umbrales progresivamente|
|Contenido duplicado procesado|Baja|Bajo|El Centinela antes de evaluar|
|Sistema optimiza cantidad vs calidad|Media|Alto|Métricas de calidad > métricas de volumen|
|Feedback loop no genera mejoras reales|Media|Medio|Revisión manual mensual de backlog|

---

## 10. Anexos

### Anexo A: Inventario Final de Agentes

|#|Agente|Instancias|Función|
|---|---|---|---|
|1|El Director de Orquesta _(Orquestador)_|1|Coordinación global|
|2|El Investigador _(Ingestor)_|1|Rastreo + Clasificación + Depósito|
|3|El Centinela _(Detector de Duplicados)_|1|Similitud semántica|
|4|El Auditor Pedagógico _(Evaluador)_|1 (parametrizado x7)|Evaluación por módulo|
|5|El Arquitecto de Contenido _(Redactor)_|1 (parametrizado x7)|Curación por módulo|
|6|El Guardián de la Evidencia _(Verificador)_|1|Gates de calidad|
|7|El Estratega de Valor _(Distribuidor)_|1|Envío a destinos|
|8|El Escucha _(Analizador de Feedback)_|1|Telemetría y mejoras|

### Anexo B: Checklist de Verificación Pre-Aprobación

```markdown
## Checklist Verificación - Contenido ID: ________

### Evidence Pack
- [ ] Todos los claims factuales tienen fuente identificada
- [ ] Fuentes son verificables (URL/DOI disponible)
- [ ] Nivel de evidencia apropiado para tipo de claim
- [ ] No hay claims cuantitativos sin dato exacto de fuente

### Copyright
- [ ] No hay texto reproducido literalmente (>50 palabras)
- [ ] Paráfrasis tiene atribución
- [ ] Uso dentro de términos de licencia de fuente
- [ ] Imágenes/vídeos tienen licencia verificada

### Claim Audit
- [ ] Claims neurobiológicos tienen estudio empírico
- [ ] Claims de salud tienen meta-análisis o guía clínica
- [ ] Claims cuantitativos tienen fuente primaria
- [ ] No hay claims universales sin múltiples fuentes

### Resultado
- [ ] APROBADO - Todos los checks OK
- [ ] RECHAZADO - Motivo: ________________
- [ ] ESCALAR - Motivo: ________________

```

### Anexo C: Plantilla de Contenido en Repositorio

```yaml
---
# === IDENTIFICACIÓN ===
id: "M01-TEO-2024-XXXX"
version: 1
fecha_creacion: "2024-12-27"
fecha_modificacion: "2024-12-27"
estado: "APROBADO"  # DEPOSITADO | EVALUADO | CURADO | APROBADO | DISTRIBUIDO

# === CLASIFICACIÓN ===
modulo_principal: 1
modulos_secundarios: []
tipologia: "teoria"
tema: "Neuroplasticidad y mindfulness"
keywords: ["neuroplasticidad", "corteza prefrontal", "mindfulness"]

# === FUENTE ===
fuente:
  tipo: "academica_tier1"
  nombre: "Frontiers in Neuroscience"
  autor: "Smith, J., García, M."
  fecha: "2024-11-15"
  url: "<https://doi.org/10.3389/fnins.2024.xxxxx>"
  licencia: "CC-BY-4.0"
  uso_permitido: "cita_y_parafrasis"

# === TRAZABILIDAD ===
claims:
  - texto: "La práctica sostenida de mindfulness fortalece las conexiones en la corteza prefrontal"
    fuente_ref: "Smith & García (2024), p. 5"
    tipo_evidencia: "estudio_empirico"
    verificado: true

  - texto: "Estos cambios son detectables tras 8 semanas de práctica"
    fuente_ref: "Smith & García (2024), p. 8"
    tipo_evidencia: "estudio_empirico"
    verificado: true

# === VERIFICACIÓN ===
verificacion:
  evidence_pack: "APROBADO"
  copyright: "APROBADO"
  claim_audit: "APROBADO"
  fecha: "2024-12-27"
  verificador: "sistema"

# === EVALUACIÓN ===
evaluacion:
  modulo: 1
  puntuacion: 76
  clasificacion: "BUENO"
  evaluador: "evaluador_m1"
  fecha: "2024-12-27"
  justificacion: |
    Aporta evidencia reciente sobre modificación de circuitos atencionales.

# === DISTRIBUCIÓN ===
distribucion:
  lms:
    publicado: true
    fecha: "2024-12-28"
    ubicacion: "M1 > 1.3 Neuroplasticidad"
  rag:
    indexado: true
    chunks: 3
  comms:
    pildora_generada: true
    fecha_programada: "2025-01-15"

---

# Cómo el entrenamiento de la atención remodela tu cerebro

Cada vez que entrenas tu atención de forma deliberada, estás literalmente
recableando tu arquitectura neural. Un estudio reciente en Frontiers in
Neuroscience [1] demuestra que la práctica sostenida de mindfulness
fortalece las conexiones en la corteza prefrontal, la región responsable
del control ejecutivo y la regulación emocional.

Lo más significativo: estos cambios son detectables tras apenas 8 semanas
de práctica regular [1]. No necesitas años de meditación para comenzar a
transformar tu cerebro. Cada sesión cuenta.

Para el líder, esto tiene una implicación directa: tu capacidad de mantener
el foco, regular tus reacciones y tomar decisiones conscientes no es fija.
Es entrenable. Y el entrenamiento funciona.

## Referencias

[1] Smith, J., & García, M. (2024). Neural mechanisms of attentional control
in mindfulness practitioners. *Frontiers in Neuroscience*, 18, xxxxx.
<https://doi.org/10.3389/fnins.2024.xxxxx>

```

---