---
id: skill-curso-revision-pedagogica
version: 1.0
status: validated
created: 2026-01-07
updated: 2026-01-07
tags: [skill, curso, pedagogia, core]

USE WHEN:
  - Usuario pide revisar contenido del curso
  - Se menciona mejorar estructura pedagógica
  - Se habla de calidad educativa o flujo de aprendizaje
  - Se pide feedback sobre una sección o módulo
---

# Skill: Revisión Pedagógica del Curso

## Descripción

Capacidad para analizar y mejorar el contenido educativo del curso "Liderar con Consciencia" aplicando principios de diseño instruccional, educación de adultos (andragogía) y neurociencia del aprendizaje.

## Conocimiento base

### Principios pedagógicos del curso
- **Enfoque experiencial**: Aprender haciendo, no solo leyendo
- **Círculos concéntricos**: Progresión del yo hacia el entorno
- **Neurociencia aplicada**: Cada concepto tiene base científica
- **Mindfulness transversal**: Práctica contemplativa como hilo conductor

### Estructura del curso
- 7 módulos con progresión intencional
- Cada módulo responde a una pregunta existencial
- Balance teoría (60%) - práctica (40%)
- Ejercicios con audios guiados

### Criterios de calidad
| Criterio | Indicador |
|----------|-----------|
| Claridad | Lenguaje accesible, sin jerga innecesaria |
| Coherencia | Hilo narrativo visible entre secciones |
| Aplicabilidad | Cada concepto tiene ejercicio asociado |
| Engagement | Uso de metáforas, ejemplos, preguntas |
| Profundidad | Fundamento científico sin abrumar |

## Capacidades

### Análisis
- Evaluar estructura de un módulo o sección
- Identificar gaps pedagógicos
- Detectar redundancias o inconsistencias
- Valorar balance teoría-práctica

### Mejora
- Proponer reestructuraciones
- Sugerir ejercicios complementarios
- Mejorar transiciones entre conceptos
- Simplificar explicaciones complejas

### Creación
- Diseñar nuevos ejercicios alineados al método
- Redactar introducciones y cierres de sección
- Crear preguntas de reflexión
- Proponer metáforas explicativas

## Workflows relacionados

| Intención del usuario | Workflow a usar |
|-----------------------|-----------------|
| "Revisa esta sección" | `wf-revisar-seccion.md` |
| "Mejora el módulo X" | `wf-reestructurar-modulo.md` |
| "Crea un ejercicio para..." | `wf-crear-ejercicio.md` |
| "¿Cómo está el flujo de...?" | Análisis directo (sin workflow) |

## Prompts relacionados

- `reestructurar-modulo.md` - Para reorganizar módulos
- `generar-ejercicio.md` - Para crear ejercicios (pendiente)
- `simplificar-seccion.md` - Para hacer contenido más accesible (pendiente)

## Archivos de contexto

Cargar bajo demanda según la tarea:
- `CURSO/00-indice-general-curso.md` - Visión global
- `CURSO/CLAUDE.md` - Nomenclatura y formato
- Módulo específico según contexto

## Restricciones

- **NO** inventar contenido científico sin base
- **NO** cambiar el tono (profesional pero cercano)
- **NO** eliminar contenido sin justificación
- **SIEMPRE** generar `-DRAFT` antes de aplicar cambios
- **RESPETAR** la estructura de círculos concéntricos

## Ejemplo de activación

**Usuario**: "El módulo 2 se siente desordenado, ¿puedes revisarlo?"

**Skill detecta**:
- Intención: revisar contenido del curso ✓
- Objeto: módulo específico ✓
- Acción: análisis y mejora ✓

**Respuesta**:
1. Solicitar acceso al contenido del módulo 2
2. Aplicar criterios de análisis
3. Generar reporte con fortalezas, problemas y propuestas
4. Ofrecer ejecutar `wf-reestructurar-modulo.md` si se acepta

---

*Este skill es "core" para el dominio del curso. Se carga cuando hay intención relacionada con contenido educativo.*
