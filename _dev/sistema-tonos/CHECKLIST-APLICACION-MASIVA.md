# Checklist de Aplicación Masiva - Prompt v9

## Propósito

Este checklist asegura la calidad durante la aplicación del prompt v9 a los 40-50 módulos del curso. Cada módulo transformado debe pasar esta verificación antes de considerarse completado.

---

## Pre-aplicación (antes de transformar)

### Verificación del módulo original

- [ ] **Archivo legible** sin errores de codificación
- [ ] **Estructura completa** (secciones, bloques #teoria/#explicacion presentes)
- [ ] **Conteo inicial documentado**:
  - Líneas totales: ______
  - Número de ejemplos/casos históricos: ______
  - Número de referencias bibliográficas: ______
  - Número de datos cuantitativos específicos: ______
  - Bloques #explicacion existentes: ______

### Preparación del entorno

- [ ] Prompt v9 actualizado (`prompts/prompt-transformacion-LcC.md`)
- [ ] Directorio `output/` preparado para nueva versión
- [ ] Backup del original confirmado (en `CURSO/`)

---

## Durante la transformación

### Aplicación del prompt

- [ ] Prompt v9 aplicado completo (sin modificaciones ad-hoc)
- [ ] Modelo LLM: _________________ (documentar para trazabilidad)
- [ ] Parámetros: temperatura/tokens si relevante

### Monitoreo de salida

- [ ] LLM completó sin errores de timeout
- [ ] Archivo generado con codificación UTF-8
- [ ] "Notas para revisión" presentes al final del documento

---

## Post-aplicación (validación de calidad)

### 1. Criterio: Incisividad narrativa (6 sub-criterios)

Verificar presencia de al menos 3 ejemplos de cada:

- [ ] **Estructuras de contraste** (no obstante, sin embargo, mientras que)
  - Ejemplos encontrados: _____ (mínimo 3)
- [ ] **Verbos precisos** (no genéricos: hacer/tener/ser → verbos de acción específicos)
  - Ejemplos encontrados: _____ (mínimo 3)
- [ ] **Metáforas técnicas** (solo si el contenido lo permite - neurociencia, sistemas)
  - Ejemplos encontrados: _____ (o N/A si no aplica al módulo)
- [ ] **Sintaxis dinámica** (subordinadas integradas, no solo frases simples)
  - Ejemplos encontrados: _____ (mínimo 3)
- [ ] **Subordinadas causales** (porque, puesto que, dado que)
  - Ejemplos encontrados: _____ (mínimo 3)
- [ ] **Contraste temporal** (antes/después, primero/luego)
  - Ejemplos encontrados: _____ (mínimo 2)

**Resultado criterio 1:** ☐ PASA / ☐ NO PASA

---

### 2. Criterio: Respeto a FONDO (5 categorías - lista negra)

Verificar ausencia de violaciones en las 5 categorías:

#### A. Cuantificaciones específicas
- [ ] **Sin tiempos exactos inventados** ("en 200 milisegundos", "5 segundos")
  - Violaciones encontradas: _____ (debe ser 0)
- [ ] **Sin porcentajes inventados** ("el 73% de", "aumenta un 40%")
  - Violaciones encontradas: _____ (debe ser 0)
- [ ] **Sin cifras inventadas** ("10 estudios demostraron", "más de 200 participantes")
  - Violaciones encontradas: _____ (debe ser 0)

#### B. Estructuras anatómicas
- [ ] **Sin anatomía cerebral añadida** no presente en original
  - Violaciones encontradas: _____ (debe ser 0)
- [ ] **Sin anatomía corporal añadida** no presente en original
  - Violaciones encontradas: _____ (debe ser 0)

#### C. Referencias y autoría
- [ ] **Sin autores inventados** (nombre, año)
  - Violaciones encontradas: _____ (debe ser 0)
- [ ] **Sin referencias bibliográficas añadidas**
  - Violaciones encontradas: _____ (debe ser 0)

#### D. Datos históricos, evolutivos o culturales
- [ ] **Sin afirmaciones evolutivas inventadas** ("refinado durante millones de años")
  - Violaciones encontadas: _____ (debe ser 0)
- [ ] **Sin datos históricos inventados** (fechas, eventos)
  - Violaciones encontradas: _____ (debe ser 0)

#### E. Conceptos técnicos de disciplinas específicas
- [ ] **Sin términos técnicos inventados** de psicología, neurociencia, management
  - Violaciones encontradas: _____ (debe ser 0)

**Resultado criterio 2:** ☐ PASA (0 violaciones) / ☐ NO PASA

---

### 3. Criterio: Preservación de ejemplos y casos (100%)

Conteo comparativo:

| Tipo de elemento | Original | v9 | Estado |
|------------------|----------|-----|--------|
| Ejemplos/casos históricos con nombre propio | ____ | ____ | ☐ OK / ☐ FALTA |
| Anécdotas/historias sin nombre propio | ____ | ____ | ☐ OK / ☐ FALTA |
| Definiciones de autores específicos | ____ | ____ | ☐ OK / ☐ FALTA |
| Analogías/metáforas del original | ____ | ____ | ☐ OK / ☐ FALTA |
| Ejercicios/prácticas propuestas | ____ | ____ | ☐ OK / ☐ FALTA |

**Lista de elementos que deben estar (extraídos del original):**

1. ___________________________________ ☐
2. ___________________________________ ☐
3. ___________________________________ ☐
4. ___________________________________ ☐
5. ___________________________________ ☐
(añadir filas según necesidad)

**Resultado criterio 3:** ☐ PASA (100% preservado) / ☐ NO PASA

---

### 4. Criterio: Bloques #explicacion valiosos

Para cada bloque #explicacion que existe en el original:

#### Sección 1: _________________
- [ ] Bloque #explicacion existe en original: ☐ SÍ / ☐ NO
- Si SÍ:
  - [ ] Transformado (no eliminado)
  - [ ] **Integra** (conecta con otros conceptos o experiencia): ☐ SÍ / ☐ NO
  - [ ] **Implica** (señala por qué importa): ☐ SÍ / ☐ NO
  - [ ] **Abre** (invita a observación/pregunta reflexiva): ☐ SÍ / ☐ NO
  - [ ] NO es mero resumen del #teoria: ☐ Confirmado

#### Sección 2: _________________
- [ ] Bloque #explicacion existe en original: ☐ SÍ / ☐ NO
- Si SÍ: (repetir verificación arriba)

#### Sección 3: _________________
(repetir estructura para todas las secciones)

**Secciones sin #explicacion documentadas en "Notas para revisión":** ☐ SÍ / ☐ N/A

**Resultado criterio 4:** ☐ PASA (todos valiosos) / ☐ NO PASA

---

### 5. Criterio: Eliminación inteligente de redundancia

- [ ] **Identificar si el original tiene redundancia real**:
  - ☐ SÍ tiene redundancia (resúmenes mecánicos, repeticiones conceptuales en formulaciones teóricas)
  - ☐ NO tiene redundancia significativa

- Si SÍ tiene redundancia:
  - [ ] Redundancia eliminada en v9: ☐ SÍ / ☐ Parcial / ☐ NO
  - [ ] Eliminación documentada en "Notas para revisión": ☐ SÍ
  - [ ] NO se eliminó contenido valioso (ejemplos, casos, aplicaciones): ☐ Confirmado

- Si NO tiene redundancia:
  - [ ] v9 NO elimina contenido sin justificación: ☐ Confirmado
  - [ ] Longitud similar o mayor justificadamente: ☐ SÍ

**Resultado criterio 5:** ☐ PASA / ☐ NO PASA

---

### 6. Criterio: Micro-aplicaciones conductuales (segunda persona flexible)

Verificar si el original presenta alternativas conductuales o invita a observar experiencia propia:

- [ ] **Original tiene micro-aplicaciones**: ☐ SÍ / ☐ NO

Si SÍ:
- [ ] v9 mantiene segunda persona en contextos apropiados:
  - "Puedes decidir..." ☐
  - "Podrías practicar..." ☐
  - "Cuando experimentas..." ☐
  - "Si sientes..." ☐

- [ ] v9 NO convierte indebidamente a impersonal alternativas conductuales

Si NO:
- [ ] v9 NO añade segunda persona donde no estaba (respeto a FORMA original)

**Ejemplos de segunda persona flexible encontrados:** _____ (al menos 2 si aplica)

**Resultado criterio 6:** ☐ PASA / ☐ NO PASA

---

## Resultado final del módulo

### Resumen de criterios

| Criterio | Resultado |
|----------|-----------|
| 1. Incisividad narrativa (6/6) | ☐ PASA / ☐ NO PASA |
| 2. Respeto a FONDO (0 violaciones) | ☐ PASA / ☐ NO PASA |
| 3. Preservación (100%) | ☐ PASA / ☐ NO PASA |
| 4. #explicacion valiosos | ☐ PASA / ☐ NO PASA |
| 5. Eliminación inteligente | ☐ PASA / ☐ NO PASA |
| 6. Micro-aplicaciones | ☐ PASA / ☐ NO PASA |

**Puntuación final:** ____/6

### Métrica de longitud

- Original: _____ líneas
- v9: _____ líneas
- Diferencia: _____ líneas (_____ %)
- Justificación si incremento >15%: _________________________________

### Decisión

- [ ] ✅ **APROBADO** - Módulo cumple 6/6 criterios → mover a producción
- [ ] ⚠️ **REVISAR** - Módulo cumple 5/6 criterios → identificar problema y regenerar
- [ ] ❌ **RECHAZAR** - Módulo cumple ≤4/6 criterios → revisar prompt o caso especial

### Notas adicionales

_________________________________________________________________

_________________________________________________________________

_________________________________________________________________

---

## Estrategia de aplicación en lotes

### Lote 1: Módulos de neurociencia/emociones (similares a m03-03)
- [ ] Módulo __________: ____/6
- [ ] Módulo __________: ____/6
- [ ] Módulo __________: ____/6
- [ ] Módulo __________: ____/6
- [ ] Módulo __________: ____/6

**Validación de lote:** ☐ Todos ≥5/6 → continuar / ☐ Problemas detectados → revisar

### Lote 2: Módulos prácticos/mindfulness (similares a m01-09)
- [ ] Módulo __________: ____/6
- [ ] Módulo __________: ____/6
- [ ] Módulo __________: ____/6
- [ ] Módulo __________: ____/6
- [ ] Módulo __________: ____/6

**Validación de lote:** ☐ Todos ≥5/6 → continuar / ☐ Problemas detectados → revisar

### Lote 3: Módulos relacionales/liderazgo (similares a m05-04)
- [ ] Módulo __________: ____/6
- [ ] Módulo __________: ____/6
- [ ] Módulo __________: ____/6
- [ ] Módulo __________: ____/6
- [ ] Módulo __________: ____/6

**Validación de lote:** ☐ Todos ≥5/6 → continuar / ☐ Problemas detectados → revisar

### Lotes subsiguientes
(repetir estructura hasta completar 40-50 módulos)

---

## Protocolo de resolución de problemas

Si un módulo NO PASA (≤4/6):

1. **Identificar criterio(s) fallido(s)** específicamente
2. **Diagnosticar causa**:
   - ¿Problema del prompt v9 (regla faltante/ambigua)?
   - ¿Caso especial del módulo (estructura atípica)?
   - ¿Error de aplicación (modelo, parámetros)?
3. **Decidir acción**:
   - Regenerar con mismo prompt (si fue error temporal)
   - Modificar prompt (si es problema sistemático)
   - Documentar caso especial (si es atípico)
4. **Validar solución** antes de continuar con siguiente lote

---

## Documentación obligatoria al finalizar aplicación masiva

- [ ] Tabla resumen: todos los módulos con puntuación ____/6
- [ ] Estadísticas:
  - Módulos con 6/6: _____ (____%)
  - Módulos con 5/6: _____ (____%)
  - Módulos con ≤4/6: _____ (____%)
- [ ] Problemas recurrentes identificados (si los hay)
- [ ] Casos especiales documentados
- [ ] Tiempo total de aplicación: _____
- [ ] Commit final con mensaje descriptivo completo

---

**Versión del checklist:** 1.0
**Compatible con:** Prompt v9 (validado en m03-03, m01-09, m05-04)
**Fecha de creación:** 2026-01-14
