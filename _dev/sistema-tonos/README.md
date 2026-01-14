# Sistema de Tonos del Curso

Sistema para aplicar consistentemente el "Tono LcC" (Liderar con Consciencia) a los módulos del curso educativo.

## Objetivo

Desarrollar un **prompt de producción** que pueda transformar los 40-50 módulos del curso cumpliendo 6 criterios simultáneos:

1. **Incisividad narrativa**: Claridad rigurosa con presencia humana (6 criterios: contraste, verbos precisos, metáforas técnicas, sintaxis dinámica, subordinadas causales, contraste temporal)
2. **Respeto a FONDO**: No inventar información verificable (5 categorías: cuantificaciones, anatomía, referencias, datos históricos/evolutivos, conceptos técnicos)
3. **Preservación de ejemplos**: Mantener todos los casos históricos y anécdotas (15/15)
4. **Bloques #explicacion valiosos**: Integrar/implicar/abrir, nunca solo resumir
5. **Eliminación inteligente de redundancia**: Optimizar resúmenes mecánicos sin perder valor
6. **Micro-aplicaciones conductuales**: Mantener alternativas accionables con segunda persona cuando presenta opciones conductuales

---

## Estado Actual

✅ **Prompt optimizado** (v9 validada - 6/6 criterios)

🎯 **Próximo paso**: Validar consistencia en 2-3 módulos adicionales antes de aplicación masiva

---

## Estructura del Proyecto

### Documentación fundacional

- **`guia-estilo-tonal-LcC.md`** (~784 líneas)
  - Manual de referencia para humanos
  - Explica los 5 pilares del tono LcC, recursos expresivos, arquitectura
  - Para aprender y consultar el estilo manualmente

- **`prompts/prompt-transformacion-LcC.md`** (~462 líneas)
  - Prompt operacional para LLMs
  - Versión condensada y ejecutable de la guía
  - Este es el artefacto en optimización iterativa

### Archivos de trabajo

- **`output/`**: Versiones transformadas del módulo de prueba
  - `m03-03-cadena-automatica-reaccion-tono-LcC-v5.md` (baseline)
  - `m03-03-cadena-automatica-reaccion-tono-LcC-v7.md` (intermedia)
  - `m03-03-cadena-automatica-reaccion-tono-LcC-v8.md` (intermedia - protección ejemplos)
  - `m03-03-cadena-automatica-reaccion-tono-LcC-v9.md` (actual - óptima)
  - `VALIDACION-v8-vs-v7-vs-v5.md` (comparación exhaustiva histórica)
  - `VALIDACION-v9-vs-v8.md` (validación v9)
  - `VALIDACION-EXHAUSTIVA-v9-vs-v8-v7-v5.md` (comparación exhaustiva completa)

- **Módulo de prueba**: `CURSO/modulo-03-consciente-de-lo-que-pienso-siento/m03-03-cadena-automatica-reaccion.md`
  - 226 líneas, 5 secciones, 15 ejemplos/casos
  - Estructura representativa para validar transformaciones

---

## Metodología de Trabajo

### Flujo de optimización

```
Problema detectado
  ↓
Diagnóstico: ¿qué causó el problema?
  ↓
Propuesta de cambio al prompt
  ↓
Aplicar prompt modificado al módulo de prueba
  ↓
Generar nueva versión (vN)
  ↓
Validación exhaustiva vN vs versiones anteriores
  ↓
Si pasa validación → INTEGRAR
Si no pasa → iterar
```

### Criterios de validación

Una nueva versión es válida SOLO si cumple los 6 criterios:

| Criterio | Método de verificación |
|----------|------------------------|
| **Incisividad** | ¿Mantiene 6/6 criterios: contraste, verbos precisos, metáforas técnicas, sintaxis dinámica, subordinadas causales, contraste temporal? |
| **FONDO** | ¿Inventa referencias, tiempos exactos, neuroanatomía no presente? Verificar 5 categorías: cuantificaciones, anatomía, referencias, datos históricos/evolutivos, conceptos técnicos |
| **Ejemplos** | Contar ejemplos: Original vs Nueva (debe ser N/N) - Verificar 15/15 |
| **#explicacion** | ¿Integra/implica/abre o solo resume? |
| **Redundancia** | ¿Elimina resúmenes mecánicos sin eliminar valor? |
| **Micro-aplicaciones** | ¿Mantiene alternativas conductuales con segunda persona cuando corresponde? |

---

## Reglas Críticas

### Antes de modificar el prompt

✅ Identificar problema específico con evidencia
✅ Proponer cambio quirúrgico (no rediseñar todo)
✅ Evaluar posibles efectos secundarios

### Después de modificar

✅ Generar nueva versión con módulo de prueba
✅ Comparar exhaustivamente con versiones anteriores
✅ Verificar que NO se pierden logros previos

### Documentación obligatoria

Cada versión generada debe incluir `## Notas para revisión`:
- **Contenido eliminado por redundancia**: Qué y por qué
- **Ausencias estructurales**: Bloques faltantes en original
- **Mejoras aplicadas**: Incisividad, narrativa, integración

---

## Relación Guía ↔ Prompt

- **Guía** (`guia-estilo-tonal-LcC.md`): El "por qué" y principios para humanos
- **Prompt** (`prompts/prompt-transformacion-LcC.md`): El "cómo" operacional para LLMs

**Regla**: No duplicar contenido. Si algo está operativamente en el prompt, la guía solo explica el principio.

---

## Historial de Evolución

### v5 (baseline)
- ✅ Incisividad narrativa alta
- ❌ Viola FONDO (inventa "millones de años", referencias falsas)
- ✅ Mantiene todos los ejemplos
- Puntuación: 2.6/6

### v7 (intermedia)
- ✅ Respeta FONDO estrictamente
- ✅ Incisividad narrativa (6/6 criterios)
- ❌ Elimina Jordan Cardella (criterio editorial demasiado agresivo)
- ✅ Bloques #explicacion valiosos
- ⚠️ Pérdida parcial de micro-aplicaciones
- Puntuación: 4.4/6

### v8 (intermedia - protección ejemplos)
- ✅ Respeta FONDO
- ✅ Incisividad narrativa (6/6 criterios)
- ✅ Todos los ejemplos (incluyendo Cardella recuperado)
- ✅ Bloques #explicacion valiosos
- ✅ Eliminación inteligente de redundancia
- ❌ Pierde micro-aplicaciones conductuales (regla rígida segunda persona)
- Puntuación: 5/6

### v9 (actual - óptima)
- ✅ Respeta FONDO + lista negra genérica aplicable a todos los módulos
- ✅ Incisividad narrativa (6/6 criterios)
- ✅ Todos los ejemplos (15/15)
- ✅ Bloques #explicacion valiosos
- ✅ Eliminación inteligente de redundancia
- ✅ **Micro-aplicaciones recuperadas** (segunda persona flexible)
- Puntuación: **6/6**

**Evolución: v5 (2.6/6) → v7 (4.4/6) → v8 (5/6) → v9 (6/6)**

---

## Próximos Pasos

1. Aplicar prompt optimizado a 2-3 módulos adicionales (validación de consistencia)
2. Crear checklist de pre-aplicación masiva
3. Aplicación masiva controlada en lotes de 5 módulos

---

## Antipatrones a Evitar

❌ Complejizar por complejizar (cambios sin problema concreto)
❌ Optimización prematura (aplicar a todos antes de validar consistencia)
❌ Validación superficial (solo comparar líneas)
❌ Pérdida de logros (nueva versión mejora A pero empeora B)
❌ Duplicación guía/prompt (repetir operativa en ambos archivos)
