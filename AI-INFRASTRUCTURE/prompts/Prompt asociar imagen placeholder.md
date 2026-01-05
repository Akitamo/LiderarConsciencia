# Vincular imágenes a placeholders en módulo del curso "Liderar con Consciencia"

## Ubicación del módulo
C:\dev\projects\LiderarConsciencia\modulo-XX-nombre-del-modulo\

## Carpeta de imágenes
recursos\imagenes\

---

## ESTRATEGIA DE EJECUCIÓN POR FASES (OBLIGATORIO)

**CRÍTICO:** Este proceso DEBE ejecutarse por fases para evitar agotar la ventana de contexto. NO intentes procesar todo el módulo de una vez.

### FASE 0: Inventario inicial (SIN visualizar imágenes)

1. **Listar archivos .md** del módulo con conteo de placeholders `[IMG: ...]` en cada uno
2. **Listar imágenes disponibles** en recursos\imagenes\ (solo nombres de archivo, SIN visualizar)
3. **Proponer agrupación en fases** de máximo 8-10 placeholders cada una
4. **ESPERAR VALIDACIÓN** antes de continuar

### FASES DE EJECUCIÓN (una por una, secuencialmente)

Para cada fase:
1. Leer los archivos .md correspondientes a esa fase
2. Visualizar imágenes candidatas en lotes de 3-5 máximo (no todas a la vez)
3. Presentar tabla de correspondencias para esa fase
4. **ESPERAR VALIDACIÓN** 
5. Ejecutar renombrados de imágenes + ediciones en markdown
6. Mostrar resumen de progreso acumulado
7. **ESPERAR CONFIRMACIÓN** para pasar a siguiente fase

---

## PROCESO DETALLADO

### 1. Identificar placeholders
Lee los archivos .md del módulo y extrae todos los placeholders con formato:
```
`[IMG: nombre-placeholder]` Descripción de la imagen
```

### 2. Identificar imágenes disponibles
Lista las imágenes en recursos\imagenes\ (pueden tener nombres genéricos como "Pasted image...", nombres descriptivos tipo "01_concepto_imagen.png", o cualquier otro formato)

### 3. Hacer matching visual
Visualiza cada imagen (en lotes de 3-5) y compárala con las descripciones de los placeholders para encontrar correspondencias.

**Optimización:** Si el nombre del archivo es suficientemente descriptivo para hacer match (ej: "explosion_nuclear.jpg" → placeholder que describe explosión), proponer el match sin necesidad de visualizar.

### 4. Presentar tabla de correspondencias
ANTES de ejecutar ningún cambio, mostrar tabla con:
- Imagen actual → Nuevo nombre propuesto → Placeholder que corresponde
- Placeholders sin imagen encontrada
- Imágenes sin placeholder correspondiente

### 5. Esperar validación antes de ejecutar

---

## MANEJO DE PLACEHOLDERS COMPUESTOS

Algunos placeholders describen composiciones de múltiples imágenes que en realidad son archivos separados. Cuando detectes esto:

**Opción A (preferida por defecto):** Dividir en entradas #imagen separadas
- Crear una entrada #imagen independiente por cada archivo de imagen
- Adaptar las descripciones para que sean individuales

**Opción B:** Mantener placeholder indicando imagen faltante
- Solo si las imágenes separadas no tienen sentido individualmente
- O si realmente se necesita una composición que no existe

**Ejemplo de división (Opción A):**

ANTES (1 placeholder compuesto):
```markdown
#imagen
`[IMG: m04-02-comparativa-respuestas]` Comparativa de dos gráficos: Izquierda - (A) Adaptive Stress Response con foto de león. Derecha - (B) Chronic Stress Response con foto de persona agobiada.
```

DESPUÉS (2 imágenes separadas):
```markdown
#imagen
![img-m04-respuesta-adaptativa](recursos/imagenes/img-m04-respuesta-adaptativa.jpeg) (A) Adaptive Stress Response: Gráfico mostrando ciclo Normal state → Event → Arousal → Action to resolve → Extreme relaxation → Normal state.

#imagen
![img-m04-respuesta-cronica](recursos/imagenes/img-m04-respuesta-cronica.jpeg) (B) Chronic Stress Response: Gráfico mostrando Normal state → Anticipated or perceived event → Arousal → Sustained arousal leading to exhaustion → No ability to resolve event.
```

---

## CONVENCIONES DE NOMBRADO DE ARCHIVOS DE IMAGEN

- **Formato:** `img-mXX-nombre-descriptivo.extension`
  - `img-` = prefijo fijo para identificar claramente que es una imagen
  - `mXX` = número del módulo (m01, m02, m03, etc.)
  - `nombre-descriptivo` = descripción breve en kebab-case
  - Mantener la extensión original del archivo (.png, .jpg, .jpeg, etc.)
  
- **NO incluir número de submódulo** (para evitar renombrar si cambia la estructura del módulo)

---

## FORMATO DEL MARKDOWN RESULTANTE
```markdown
#imagen
![img-mXX-nombre](recursos/imagenes/img-mXX-nombre.png) Descripción completa de la imagen en la misma línea
```

**Reglas:**
- El tag `#imagen` en línea propia (para etiquetado en Obsidian)
- Imagen y descripción en la MISMA línea (inline), no separadas
- La descripción va inmediatamente después del enlace de imagen
- Sin asteriscos, negritas ni formato adicional en la descripción

---

## EJEMPLO COMPLETO DE TRANSFORMACIÓN

**ANTES:**
```markdown
#imagen
`[IMG: m01-01-vineta-evolucion]` Viñeta humorística de evolución mostrando la progresión desde un reptil primitivo hasta un humano moderno sentado frente a un ordenador, ilustrando irónicamente cómo hemos "evolucionado" hacia el sedentarismo.
```

**DESPUÉS:**
```markdown
#imagen
![img-m01-vineta-evolucion](recursos/imagenes/img-m01-vineta-evolucion.png) Viñeta humorística de evolución mostrando la progresión desde un reptil primitivo hasta un humano moderno sentado frente a un ordenador, ilustrando irónicamente cómo hemos "evolucionado" hacia el sedentarismo.
```

---

## ACCIONES A REALIZAR (tras validación de cada fase)

1. **Renombrar** las imágenes en la carpeta recursos/imagenes/ según la convención
2. **Actualizar** los placeholders en los archivos .md con el nuevo formato
3. **Mantener** los placeholders sin match en su formato original `[IMG: ...]` para identificar imágenes faltantes que debo proporcionar

---

## REGISTRO DE PROGRESO (obligatorio al final de cada fase)

Mostrar tabla de progreso acumulado:

| Fase | Archivo(s) | Placeholders | Imágenes vinculadas | Estado |
|------|------------|--------------|---------------------|--------|
| 0    | Inventario | — | — | ✅ |
| 1    | m04-01, m04-05, m04-06 | 5 | 6 | ✅ |
| 2    | m04-02 | 8 | 11 | ✅ |
| 3    | m04-03 | 4 | 7 | ⏳ Pendiente |
| 4    | m04-04 | 6 | ? | ⏳ Pendiente |

**Incluir también:**
- Lista de placeholders pendientes (sin imagen encontrada)
- Lista de imágenes sin usar (por si corresponden a otro archivo o son descartables)

---

## RESUMEN DE PUNTOS CRÍTICOS

1. **NUNCA procesar todo de golpe** → Dividir en fases de máx 8-10 placeholders
2. **SIEMPRE hacer inventario primero** → Fase 0 sin visualizar imágenes
3. **SIEMPRE esperar validación** → Antes de ejecutar cambios Y antes de pasar a siguiente fase
4. **Visualizar en lotes pequeños** → Máximo 3-5 imágenes por lote
5. **Placeholders compuestos** → Dividir en entradas separadas (Opción A por defecto)
6. **Registrar progreso** → Tabla actualizada al final de cada fase