---
id: wf-revisar-seccion
version: 1.0
status: validated
created: 2026-01-07
updated: 2026-01-07
tags: [workflow, curso, revision]
estimated_time: 15-30min
skill: curso-revision-pedagogica
---

# Workflow: Revisar Sección del Curso

## Propósito

Evaluar y mejorar una sección específica del curso aplicando criterios pedagógicos consistentes.

## Prerrequisitos

- [ ] Acceso al archivo de la sección a revisar
- [ ] Conocimiento del módulo al que pertenece
- [ ] Contexto sobre el público objetivo

## Inputs

| Input | Descripción | Obligatorio |
|-------|-------------|-------------|
| Archivo de sección | El `.md` a revisar | Sí |
| Objetivo del módulo | Qué debe lograr el módulo | Recomendado |
| Feedback previo | Comentarios existentes | Opcional |

---

## Pasos

### Paso 1: Lectura y contexto

**Objetivo**: Entender la sección en su contexto

**Acciones**:
1. Leer la sección completa sin juzgar
2. Identificar:
   - ¿Cuál es el mensaje principal?
   - ¿Qué debe aprender el alumno?
   - ¿Dónde está en el flujo del módulo?
3. Revisar secciones anterior y posterior (si existen)

**Output**: Comprensión clara del propósito de la sección

**Verificación**:
- [ ] Puedo explicar el objetivo de la sección en una frase
- [ ] Entiendo su lugar en el módulo

---

### Paso 2: Evaluación por criterios

**Objetivo**: Analizar sistemáticamente la calidad

**Acciones**:

Evaluar cada criterio (1-5):

| Criterio | Preguntas guía | Puntuación |
|----------|----------------|------------|
| **Claridad** | ¿Se entiende a la primera lectura? ¿Hay jerga sin explicar? | /5 |
| **Estructura** | ¿Tiene inicio-desarrollo-cierre? ¿Los subtítulos ayudan? | /5 |
| **Coherencia** | ¿Conecta con lo anterior? ¿Prepara lo siguiente? | /5 |
| **Aplicabilidad** | ¿Hay ejercicio o reflexión? ¿Es accionable? | /5 |
| **Engagement** | ¿Hay ejemplos/metáforas? ¿Mantiene interés? | /5 |
| **Fundamento** | ¿Hay base científica? ¿Es creíble? | /5 |

**Output**: Tabla de puntuaciones con notas

**Verificación**:
- [ ] Todos los criterios evaluados
- [ ] Hay notas específicas para cada puntuación baja (<4)

---

### Paso 3: Identificar mejoras específicas

**Objetivo**: Listar cambios concretos y accionables

**Acciones**:
1. Para cada criterio con puntuación <4:
   - Identificar el problema específico
   - Proponer solución concreta
   - Estimar esfuerzo (bajo/medio/alto)

2. Clasificar mejoras:
   - **Quick wins**: Bajo esfuerzo, alto impacto
   - **Importantes**: Mayor esfuerzo, necesarias
   - **Nice to have**: Opcionales

**Output**: Lista priorizada de mejoras

**Formato**:
```markdown
## Mejoras identificadas

### Quick wins
- [ ] [Descripción] - Línea X
- [ ] [Descripción] - Párrafo Y

### Importantes
- [ ] [Descripción] - Requiere reescritura de...

### Nice to have
- [ ] [Descripción]
```

**Verificación**:
- [ ] Cada mejora es específica y localizable
- [ ] Hay al menos una mejora priorizada

---

### Paso 4: Generar propuesta

**Objetivo**: Crear versión mejorada o instrucciones claras

**Acciones**:

**Opción A** - Si los cambios son menores:
1. Listar los cambios exactos (qué cambiar por qué)
2. Indicar ubicación precisa

**Opción B** - Si requiere reescritura:
1. Generar sección completa revisada
2. Nombrar como `mXX-NN-nombre-DRAFT.md`
3. Marcar cambios con comentarios `<!-- CAMBIO: razón -->`

**Output**: Propuesta de cambios o archivo DRAFT

**Verificación**:
- [ ] Los cambios mantienen la voz del autor
- [ ] No se ha eliminado contenido sin justificación
- [ ] El archivo DRAFT sigue las convenciones de nombrado

---

### Paso 5: Documentar y entregar

**Objetivo**: Cerrar el proceso con entregable claro

**Acciones**:
1. Resumir hallazgos principales
2. Presentar propuesta al usuario
3. Preguntar si proceder con cambios

**Output**: Resumen ejecutivo + próximos pasos

**Formato de entrega**:
```markdown
## Resumen de revisión: [nombre sección]

**Puntuación global**: X/30

**Fortalezas**:
- [Fortaleza 1]
- [Fortaleza 2]

**Áreas de mejora**:
- [Área 1] (prioridad alta)
- [Área 2] (prioridad media)

**Propuesta**:
[Descripción de cambios propuestos]

**Siguiente paso recomendado**:
[ ] Aplicar quick wins
[ ] Revisar DRAFT generado
[ ] Discutir cambios mayores
```

---

## Output final

- Evaluación estructurada de la sección
- Lista priorizada de mejoras
- Propuesta concreta (cambios puntuales o DRAFT)
- Resumen ejecutivo para decisión

## Checklist de calidad

- [ ] Se evaluaron todos los criterios
- [ ] Las mejoras son específicas y accionables
- [ ] Se respetó el tono y estilo original
- [ ] El archivo DRAFT (si existe) sigue convenciones
- [ ] El usuario tiene información suficiente para decidir

## Problemas comunes

| Problema | Solución |
|----------|----------|
| Sección muy larga | Dividir evaluación por partes |
| Falta contexto del módulo | Solicitar índice del módulo |
| Cambios subjetivos | Justificar con criterios específicos |
| Usuario no acepta cambios | Documentar feedback, no insistir |

---

*Este workflow usa el skill `curso-revision-pedagogica` y el prompt `reestructurar-modulo.md` cuando aplica.*
