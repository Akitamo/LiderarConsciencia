# Prompt: Reestructuración pedagógica módulo

> Versión: 2.5
> Fecha: 2025-01-05
> Uso: Nueva sesión de Claude con acceso a filesystem (Desktop Commander)

---

## CONTEXTO DEL PROYECTO

Estás trabajando en el proyecto "Liderar con Consciencia", un curso de liderazgo basado en mindfulness y neurociencia. El curso tiene 7 módulos progresivos que van de la autoconciencia individual hacia el liderazgo ético:

1. Consciente de lo que soy (neurociencia, automatismos, atención)
2. Consciente de cómo estoy (interocepción, señales corporales)
3. Consciente de lo que pienso-siento (conexión pensamiento-emoción)
4. Consciente de lo que necesito (estrés, resiliencia, autocuidado)
5. Consciente de lo que necesitamos (relaciones, compasión, comunicación)
6. Consciente de lo que quiero (propósito, decisiones, atención sostenida)
7. Consciente de lo que está bien (ética, coherencia, impacto)

El contenido ya está extraído en ficheros .md pero necesita mejor estructura interna (títulos, secciones, jerarquía) sin modificar el contenido.

Ruta del proyecto: `C:\dev\projects\LiderarConsciencia`
Módulo a trabajar: Indicado en el prompt del chat

---

## ALCANCE DEL TRABAJO

- **Ficheros a procesar**: Solo los .md del directorio principal del módulo
- **Ficheros índice** (tipo `m0X-00-indice.md`): 
  - Excluir del proceso de reestructuración
  - NO modificar los enlaces (se generan automáticamente con Templater)
  - SÍ se puede añadir un gráfico visual de la secuencia pedagógica al final (tarea de cierre)
- **Excluir por defecto**: Subcarpetas como `Prácticas-entrenamiento`, `recursos`, etc.
- Si hay subcarpetas relevantes a incluir, se indicará explícitamente en el prompt del chat

---

## OBJETIVO

Reestructurar pedagógicamente los ficheros .md del módulo, mejorando la organización interna de cada fichero SIN modificar el contenido.

---

## REGLAS ESTRICTAS

1. **NO modificar contenido**: Solo reorganizar y añadir estructura (títulos, secciones, separadores)
2. **NO eliminar nada**: Todo el contenido original debe preservarse, incluidas duplicidades
3. **NO cambiar etiquetas/tags**: 
   - Mantener frontmatter YAML exacto
   - Mantener hashtags inline exactamente donde están
   - Preservar el mismo NÚMERO de tags por bloque de contenido
4. **NO renombrar ficheros originales**
5. **NO mover contenido entre ficheros** (salvo autorización explícita)
6. **Crear ficheros -DRAFT**: Cada fichero reestructurado se guarda como `nombre-original-DRAFT.md` en la MISMA carpeta
7. **Reorganización interna**: Por defecto, mantener el orden original. Si reorganizar bloques DENTRO del mismo fichero mejora la coherencia pedagógica, proponer el cambio y ESPERAR AUTORIZACIÓN antes de aplicarlo
8. **NO crear ficheros sin validación previa** de la estructura propuesta
9. **NO asumir que las subcarpetas están incluidas** salvo indicación explícita
10. **NO modificar los enlaces del fichero índice**

---

## ERRORES FRECUENTES A EVITAR

Antes de proponer cualquier estructura, verificar que NO se comete ninguno de estos errores:

**1. Títulos sin valor pedagógico**
- ❌ "Introducción al tema" / "Introducción al módulo"
- ❌ "Conceptos básicos" / "Marco teórico"
- ❌ "Recursos adicionales" / "Para profundizar"
- ✅ Títulos que comuniquen qué aprenderá el alumno

**2. Títulos que repiten el encabezado principal**
- ❌ `# Comunicación consciente` → `## La comunicación consciente`
- ❌ `# Autoestima y autocompasión` → `## Sobre la autoestima`
- ✅ Si el # ya nombra el tema, el ## debe aportar un ángulo específico

**3. Títulos desconectados del contenido real**
- Antes de proponer un título, verificar que el contenido del fichero realmente cubre ese tema
- ❌ Proponer "Cuando el líder depende de la aprobación" si el contenido solo tiene referencias académicas
- ✅ Leer el contenido → extraer el tema real → nombrar con precisión

**4. Secciones sin secuencia pedagógica**
- Las secciones ## de un fichero deben formar una PROGRESIÓN lógica
- Patrones válidos: Problema → Mecanismo → Solución / Concepto → Evidencia → Aplicación
- ❌ Tres secciones inconexas que podrían ir en cualquier orden
- ✅ Antes de proponer, verificar: "¿Tiene sentido que la sección 2 venga después de la 1?"

**5. Secciones contenedoras vacías**
- ❌ `## Comprendiendo el tema` con subsecciones ### que tienen el contenido real
- ✅ Si las ### son bloques principales, deben ser ##

**Regla de oro:** Cuando propongas una estructura, pregúntate: "¿Este título ayuda al alumno a saber qué va a aprender, y refleja fielmente el contenido que hay?"

---

## TRATAMIENTO DE CONTENIDO DUPLICADO

- Si se detecta contenido duplicado dentro de un fichero, **mantenerlo tal cual**
- NO eliminar, fusionar ni modificar duplicidades
- La duplicidad puede ser entre bloques distintos O dentro de un mismo bloque
- En ambos casos: preservar, reportar en diagnóstico, NO actuar sin autorización explícita

---

## COHERENCIA DE SECCIONES

- Cada sección ## debe contener al menos UN bloque de texto (#teoria, #explicacion, #cita o similar)
- **NO crear secciones que contengan únicamente imágenes, vídeos o ejercicios sin contexto textual**
- Si un grupo de recursos multimedia no tiene texto asociado, integrarlo en la sección temática más cercana

### Excepciones permitidas
- **Recursos visuales autoexplicativos**: Si las imágenes son diagramas técnicos, modelos teóricos o gráficos con texto integrado (ej: modelo de Gross, forest plots, infografías), pueden formar sección propia. Reportar en propuesta para validación.
- **Secciones de cierre con vídeo/ejercicio**: Si el recurso es un cierre práctico del tema y tiene descripción en alt-text, puede formar sección breve.

---

## INTEGRACIÓN DE RECURSOS MULTIMEDIA

- Los ejercicios, imágenes y vídeos deben **integrarse dentro de las secciones temáticas** donde conceptualmente correspondan
- **NO** dejarlos como bloque separado al final del fichero
- Cada recurso debe estar junto al contenido teórico que ilustra o complementa

---

## PATRONES PEDAGÓGICOS PARA REORGANIZACIÓN

Cuando el orden original del contenido NO sigue un flujo lógico, proponer reorganización aplicando uno de estos patrones:

| Patrón | Flujo | Cuándo usar |
|--------|-------|-------------|
| **Concepto → Evidencia → Aplicación** | Qué es → Prueba científica → Cómo usarlo | Cuando el original empieza con estudios antes de explicar el concepto |
| **Problema → Mecanismo → Solución** | Dolor → Por qué ocurre → Remedio | Para temas que abordan dificultades (estrés, burnout, etc.) |
| **General → Específico → Implicaciones** | Panorama amplio → Detalle → Consecuencias | Para temas con datos epidemiológicos o evidencia múltiple |

**Proceso**: Si el contenido original no sigue un flujo pedagógico coherente, proponer el patrón aplicable y ESPERAR AUTORIZACIÓN antes de reorganizar.

---

## FORMATO VISUAL

- Usar `---` (línea horizontal) como separador entre secciones de nivel 2 (##)
- Dejar línea en blanco antes y después del separador

### Jerarquía de títulos
- `#` Nivel 1: Título principal del fichero (solo uno por fichero, ya existe)
- `##` Nivel 2: Secciones temáticas principales (las que se añaden)
- `###` Nivel 3: Subsecciones si el contenido lo requiere

### Títulos con valor pedagógico
- Los títulos de sección ## deben tener SENTIDO PEDAGÓGICO para el alumno
- Evitar títulos meramente descriptivos del tipo de contenido ("Referencias", "Imágenes", "Teoría")
- Preferir títulos que comuniquen el concepto o aprendizaje ("La ínsula como centro integrador", "El cuerpo como anclaje")

### Títulos genéricos vs específicos
- Preferir títulos **GENÉRICOS** que permitan añadir contenido en el futuro
- ❌ "El estudio de Davidson (2003)" → demasiado específico, limita expansión
- ✅ "Evidencia científica" o "Bases neurocientíficas" → permite añadir más estudios
- **Excepción**: Si el contenido es único e irrepetible (ej: cita de Aristóteles, modelo de Gross), el título puede ser específico

### Principio "menos es más"
- Preferir MENOS secciones bien cohesionadas a MUCHAS secciones fragmentadas
- Si dos bloques temáticos forman un cierre o progresión natural, considerar mantenerlos juntos
- Regla práctica: si una sección tendría menos de 3-4 párrafos, evaluar si debe fusionarse con otra

### Ficheros breves
- Si un fichero tiene **menos de 3 bloques de contenido**, evaluar si realmente necesita secciones ##
- Un fichero de apertura/introducción puede quedarse sin reestructurar si ya es coherente
- Reportar en diagnóstico: "Fichero breve, no requiere secciones adicionales"

### Elementos a preservar exactos
- Frontmatter YAML existente (entre `---`) → no tocar
- Hashtags inline existentes → mantener donde están
- Links a imágenes (rutas relativas) → preservar exactos
- Links internos entre ficheros → preservar exactos

### Presentación de propuestas de estructura

Al proponer la estructura de un fichero en Fase 2, usar este formato:

```
# Título del fichero (ya existe, se mantiene)

## Nombre sección propuesta 1
   ├── #tag1 (descripción breve del bloque)
   ├── #imagen (nombre-imagen)
   └── #explicacion (tema que cubre)

---

## Nombre sección propuesta 2
   └── ...
```

Esto muestra claramente:
- El título # existente (nivel 1)
- Las secciones ## que se añadirán (nivel 2)
- Qué bloques con qué tags irán dentro de cada sección

---

## FLUJO DE TRABAJO EN DOS FASES

### ═══════════════════════════════════════════════════════════
### FASE 1: DIAGNÓSTICO GLOBAL (sin crear ningún fichero)
### ═══════════════════════════════════════════════════════════

#### Paso 1.1: Lectura completa
- Lee TODOS los ficheros .md del módulo (solo directorio principal, no subcarpetas)
- Excluir ficheros índice (m0X-00-indice.md)
- No crear nada todavía

#### Paso 1.2: Generar MAPA DEL MÓDULO
Presenta un análisis estructurado:

**A) Inventario de ficheros**
Lista de ficheros con descripción breve de qué cubre cada uno

**B) Secuencia pedagógica actual**
Cómo fluye el contenido de un fichero a otro (el "viaje" del alumno)

**C) Diagnóstico por fichero**
Para cada fichero:
- Estado actual (bien estructurado / necesita trabajo / problemático / breve-sin cambios)
- Problemas detectados (contenido suelto, falta jerarquía, orden ilógico, etc.)
- Propuesta de secciones (índice tentativo)
- Si se propone reorganización interna, indicar qué patrón pedagógico se aplicaría

**D) Observaciones globales**
- Redundancias detectadas entre ficheros (solo reportar, no actuar)
- Huecos de contenido
- Sugerencias de mejora (sin implementar)

#### Paso 1.3: ESPERAR VALIDACIÓN
- PARA completamente
- Espera feedback sobre el mapa y las propuestas de secciones
- Puede haber ajustes, aclaraciones o aprobación global

### ═══════════════════════════════════════════════════════════
### FASE 2: EJECUCIÓN (solo tras aprobar Fase 1)
### ═══════════════════════════════════════════════════════════

Para cada fichero, en orden, seguir este ciclo:

#### Paso 2.1: Propuesta específica del fichero
- Mostrar exactamente qué cambios estructurales se van a aplicar a ESTE fichero
- Usar el formato de presentación de estructura (ver sección FORMATO VISUAL)
- Indicar las secciones, subsecciones y dónde queda cada bloque de contenido con sus tags
- Si hay reorganización interna, indicar claramente qué se mueve y por qué
- ESPERAR VALIDACIÓN antes de crear nada

#### Paso 2.2: Crear -DRAFT
- Solo tras validación del paso anterior
- Genera el fichero con sufijo -DRAFT en la misma carpeta
- Confirma creación con resumen compacto:

```
Fichero creado: `ruta-completa-DRAFT.md`

Estructura aplicada:
# Título
## Sección 1
   └── #tags incluidos
---
## Sección 2
   └── #tags incluidos
```

#### Paso 2.3: Confirmar y continuar
- Preguntar: "¿Correcto? ¿Pasamos a [siguiente fichero]?"
- Con "ok" o confirmación simple, pasar al siguiente fichero
- Si hay correcciones, aplicarlas antes de continuar

---

## CIERRE DEL MÓDULO

Al completar todos los ficheros, generar resumen:

| Fichero | Secciones ## | Reorganizado |
|---------|--------------|--------------|
| nombre-DRAFT.md | N | Sí/No |
| ... | ... | ... |

**Total**: X secciones añadidas al módulo.

Próximos pasos sugeridos:
1. Revisar DRAFTs en Obsidian
2. Si correctos, reemplazar originales
3. Indicar si continuar con siguiente módulo
4. Opcional: Añadir gráfico visual de secuencia pedagógica al índice

---

## GRÁFICO DE SECUENCIA PEDAGÓGICA (para índice)

Al cerrar el módulo, se añade un diagrama ASCII al final del fichero índice (sin modificar los enlaces existentes).

### Formato estándar (ASCII art - compatible con cualquier plataforma)

```
FASE 1                    FASE 2                         FASE 3
┌──────────────────┐    ┌──────────────────────────┐    ┌──────────────────────────┐
│ 01. Título       │    │ 03. Título               │    │ 05. Título               │
│     Descripción  │    │     Descripción          │    │     Descripción          │
│     breve        │ →  │                          │ →  │                          │
│                  │    │ 04. Título               │    │ 06. Título               │
│ 02. Título       │    │     Descripción          │    │     Descripción          │
└──────────────────┘    └──────────────────────────┘    └──────────────────────────┘

Viaje del alumno: FASE1 (descripción) → FASE2 (descripción) → FASE3 (descripción)
```

### Reglas del gráfico
- Usar cajas ASCII con `┌ ─ ┐ │ └ ┘` 
- Flechas con `→` entre fases
- Agrupar en fases/columnas temáticas
- Cada fichero: número + título + descripción breve (1-2 líneas)
- Al final: línea "Viaje del alumno:" resumiendo la progresión
- **NO usar Mermaid** → problemas de compatibilidad entre plataformas

Ver módulos 01, 02, 03 y 04 como referencia de formato.

---

## INICIO

Tienes acceso a mi filesystem mediante las herramientas de Desktop Commander.

**Empieza por la FASE 1**: lee todos los ficheros del módulo indicado (excluyendo índice) y genera el MAPA DEL MÓDULO.
