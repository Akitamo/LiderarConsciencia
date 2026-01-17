# Guía de Coordinación - Aplicación Masiva Prompt v9

---

## ⚠️ IMPORTANTE: Este NO es el prompt de transformación

**El prompt v9 está en:**
```
_dev/sistema-tonos/prompts/prompt-transformacion-LcC.md
```

**SIEMPRE pasar el prompt v9 COMPLETO al Task agent**

Este documento es solo una **guía de coordinación** para aplicar el proceso módulo por módulo.

---

## Proceso por Módulo

### 1. Preparación

```bash
# Explorar estructura del módulo
Task agent (Explore) → identificar archivos a transformar

# EXCLUIR siempre:
- Archivos índice (mXX-00-indice.md)
- Archivos de prácticas (subdirectorios, ejercicios)
```

**Preparar plantilla reporte:**
- Crear: `_dev/sistema-tonos/output/REPORTE-MODULO-XX.md`

---

### 2. Transformación (archivo por archivo)

**Por cada archivo a transformar:**

```javascript
// Llamada Task agent
subagent_type: "general-purpose"
model: "opus"  // CRÍTICO: Claude Opus 4.5
description: "Transformar [nombre archivo] con prompt v9"
prompt: `
Lee el prompt v9 completo:
_dev/sistema-tonos/prompts/prompt-transformacion-LcC.md

Lee el archivo original:
CURSO/modulo-XX-nombre/mXX-NN-archivo.md

Aplica el prompt v9 completo al archivo.

Genera el archivo transformado en:
CURSO/modulo-XX-nombre/mXX-NN-archivo-v1.md

IMPORTANTE:
- Preservar frontmatter (id, titulo, modulo, orden, tags)
- Añadir/actualizar: ultima_actualizacion: "DD/MM/YYYY"
- Incluir "Notas para revisión" al final
`
```

**Validar resultado** → ver sección "6 Criterios de Validación" abajo

**Documentar en tabla:**
| Archivo | Líneas orig | Líneas v1 | C1 | C2 | C3 | C4 | C5 | C6 | Total | Decisión |
|---------|-------------|-----------|----|----|----|----|----|----|-------|----------|
| mXX-NN  | ___         | ___       | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 6/6   | ✅ APROBADO |

---

### 3. Organización en Sub-lotes (recomendado)

Dividir archivos del módulo en grupos de 3-5 por temática similar.

**Checkpoint al finalizar cada sub-lote:**
- ¿Todos los archivos del sub-lote tienen ≥5/6?
- SI → continuar al siguiente sub-lote
- NO → PARAR, diagnosticar problema

---

### 4. Comparación Modular (post-transformación completa)

**Coherencia narrativa:**
- Leer secuencialmente todos los archivos -v1 del módulo
- Verificar: transiciones entre archivos, progresión pedagógica, tono consistente

**Métricas globales:**
- Total archivos transformados
- Archivos por puntuación (6/6, 5/6, ≤4/6)
- Incremento promedio de líneas
- Preservación (ejemplos, referencias)

**Generar reporte:**
- Completar `_dev/sistema-tonos/output/REPORTE-MODULO-XX.md`
- Incluir: resumen ejecutivo, tabla detallada, análisis por sub-lote, coherencia, métricas, decisión final

---

## 6 Criterios de Validación (Post-Transformación)

### C1: Incisividad narrativa
- ☐ Presencia de contraste (no obstante, sin embargo, mientras que)
- ☐ Verbos precisos (no genéricos)
- ☐ Sintaxis dinámica (subordinadas integradas)
- ☐ Al menos 3 ejemplos de cada sub-criterio

### C2: Respeto a FONDO (0 violaciones)
- ☐ Sin cuantificaciones inventadas (tiempos, porcentajes, cifras)
- ☐ Sin anatomía añadida
- ☐ Sin referencias/autores inventados
- ☐ Sin datos históricos/evolutivos inventados
- ☐ Sin conceptos técnicos inventados

### C3: Preservación 100%
- ☐ Todos los ejemplos/casos presentes
- ☐ Todas las referencias bibliográficas presentes
- ☐ Todos los ejercicios/prácticas presentes
- ☐ Todas las imágenes/recursos presentes

### C4: Bloques #explicacion valiosos
- ☐ Integran (conectan conceptos)
- ☐ Implican (señalan por qué importa)
- ☐ Abren (invitan a observación/reflexión)
- ☐ NO son mero resumen del #teoria

### C5: Eliminación inteligente de redundancia
- ☐ Redundancia genuina eliminada (si existía)
- ☐ Contenido valioso preservado

### C6: Micro-aplicaciones conductuales
- ☐ Segunda persona solo si estaba en original
- ☐ No convertir indebidamente a impersonal

**Puntuación:**
- 6/6 → ✅ APROBADO (ideal)
- 5/6 → ✅ APROBADO (aceptable, documentar cuál falla)
- ≤4/6 → ❌ RECHAZAR (diagnosticar, regenerar)

---

## 🚨 Señales de Alarma - PARAR Inmediatamente

### Violación FONDO (1+ archivo)
**Ejemplos:**
- "En aproximadamente 200 milisegundos..." (tiempo inventado)
- "El 73% de los líderes..." (porcentaje inventado)
- "Según estudios de la Universidad de..." (referencia inventada)

**Acción:** RECHAZAR archivo, informar usuario, NO continuar hasta resolver

---

### Pérdida de ejemplos (1+ archivo)
**Ejemplos:**
- Caso histórico ausente
- Ejercicio práctico eliminado
- Referencia bibliográfica perdida

**Acción:** RECHAZAR archivo, regenerar con verificación explícita

---

### Fallo sistemático (3+ archivos consecutivos ≤4/6)
**Señal:** Problema del proceso (prompt, modelo, contenido)

**Acción:** PARAR aplicación, diagnosticar causa raíz, escalar al usuario

---

## Criterio de Éxito por Módulo

### ✅ APROBADO
- ≥89% archivos con 5/6 o mejor
- Coherencia narrativa preservada
- 0 violaciones FONDO sistemáticas
- Preservación 100%

### ⚠️ REVISAR
- 1-2 archivos con 4/6
- Identificar problema específico
- Proponer regeneración
- Esperar decisión usuario

### ❌ NO APTO
- 3+ archivos ≤4/6
- Coherencia narrativa rota
- Violaciones FONDO recurrentes
- PARAR, NO continuar con otros módulos

---

## Ubicaciones Críticas

**Prompt v9 (SIEMPRE usar completo):**
```
_dev/sistema-tonos/prompts/prompt-transformacion-LcC.md
```

**Checklist detallado (6 criterios):**
```
_dev/sistema-tonos/CHECKLIST-APLICACION-MASIVA.md
```

**Módulos a transformar:**
```
CURSO/modulo-02-consciente-de-lo-que-creo/
CURSO/modulo-03-consciente-de-lo-que-siento/
CURSO/modulo-04-consciente-de-mi-cuerpo/
CURSO/modulo-05-consciente-de-mi-relacion-con-otros/
CURSO/modulo-06-transformando-cultura/
CURSO/modulo-07-liderazgo-consciente/
```

**Output:**
- Archivos transformados: `CURSO/modulo-XX-nombre/mXX-NN-archivo-v1.md`
- Reportes: `_dev/sistema-tonos/output/REPORTE-MODULO-XX.md`

---

## Modelo y Parámetros

**Modelo obligatorio:** Claude Opus 4.5 (`model="opus"`)

**Razón:** Mejor preservación de contenido científico, menor riesgo de inventar datos

---

## Nomenclatura

- Original: `mXX-NN-nombre-descriptivo.md`
- Transformado: `mXX-NN-nombre-descriptivo-v1.md`

El sufijo `-v1` indica versión del archivo transformado (aunque internamente use prompt v9).

---

**Versión:** 1.0
**Fecha:** 15/01/2026
**Basado en:** Módulo-01 (9/9 archivos, 6/6 criterios)
