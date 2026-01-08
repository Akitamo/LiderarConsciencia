---
id: prompt-reestructurar-modulo
version: 1.2
status: validated
created: 2026-01-05
updated: 2026-01-07
tags: [prompt, curso, pedagogia]
depends_on: []
---

# Reestructurar Módulo del Curso

## Propósito

Reorganizar el contenido de un módulo del curso para mejorar su estructura pedagógica, coherencia narrativa y flujo de aprendizaje.

## Cuándo usar

- Al revisar un módulo existente que necesita mejoras
- Después de añadir nuevo contenido a un módulo
- Cuando el feedback indica problemas de comprensión o flujo

## Contexto necesario

Antes de ejecutar este prompt, asegúrate de tener:

1. **Índice del módulo** (`mXX-00-indice.md`)
2. **Contenido de todas las secciones** del módulo
3. **Objetivos de aprendizaje** del módulo (si existen)
4. **Feedback previo** (si hay)

## Prompt

```
Actúa como un diseñador instruccional experto en educación de adultos y liderazgo.

Tu tarea es reestructurar el siguiente módulo del curso "Liderar con Consciencia" para optimizar:
1. Coherencia narrativa (hilo conductor claro)
2. Progresión pedagógica (de simple a complejo)
3. Balance teoría-práctica
4. Engagement del alumno

## Módulo a reestructurar

[PEGAR CONTENIDO DEL MÓDULO]

## Instrucciones

1. **Analiza** la estructura actual e identifica:
   - Fortalezas a mantener
   - Problemas de flujo o coherencia
   - Contenido redundante o fuera de lugar
   - Gaps pedagógicos

2. **Propón** una nueva estructura con:
   - Orden recomendado de secciones
   - Justificación de cada cambio
   - Nuevas conexiones entre conceptos
   - Sugerencias de transiciones

3. **Genera** el índice reestructurado en formato:

   ```markdown
   # Módulo X: [Nombre]

   ## Objetivos de aprendizaje
   - [Objetivo 1]
   - [Objetivo 2]

   ## Estructura propuesta

   ### Bloque 1: [Nombre del bloque]
   1. [Sección] - [Propósito]
   2. [Sección] - [Propósito]

   ### Bloque 2: ...
   ```

4. **Identifica** elementos a desarrollar o mejorar

## Restricciones

- NO eliminar contenido sin justificación explícita
- MANTENER la esencia y enfoque del módulo original
- PRIORIZAR claridad sobre exhaustividad
- RESPETAR las convenciones de nombrado del proyecto
```

## Output esperado

1. **Análisis** de la estructura actual (fortalezas y debilidades)
2. **Propuesta** de nueva estructura con justificación
3. **Índice reestructurado** en formato markdown
4. **Lista de mejoras** sugeridas

## Ejemplo de uso

**Input**: Contenido del Módulo 3 (Consciente de lo que pienso-siento)

**Output**:
```markdown
## Análisis

### Fortalezas
- Buena base teórica sobre conexión emoción-pensamiento
- Ejercicio de respiración bien estructurado

### Problemas identificados
- La sección de sesgos cognitivos aparece antes de introducir el concepto
- Falta transición entre teoría y práctica
- Dos secciones con contenido solapado

## Propuesta de reestructuración

### Cambios principales
1. Mover introducción a sesgos después de fundamentos
2. Fusionar secciones 3 y 5 (contenido redundante)
3. Añadir ejercicio de aplicación entre bloques

[... índice completo ...]
```

## Changelog

- **1.2** (2026-01-07): Añadido formato específico para índice
- **1.1** (2026-01-06): Incluidas restricciones de preservación
- **1.0** (2026-01-05): Versión inicial
