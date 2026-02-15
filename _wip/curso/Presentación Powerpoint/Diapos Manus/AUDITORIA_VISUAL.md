# Auditoría Visual — Presentaciones PPTX vs Design System Spec v1.0

**Fecha:** 2026-02-14
**Referencia:** `LIDERAR_Design_System_Spec.md` (basado en M07)
**Método:** Extracción de páginas PDF con PyMuPDF, comparación visual slide por slide

---

## 1. Resumen Ejecutivo

Las 11 presentaciones presentan **inconsistencias estructurales graves** que impiden una corrección parcial. No se trata de ajustes menores de color o tipografía, sino de **layouts completamente diferentes** entre módulos. Las presentaciones evolucionaron a lo largo de las sesiones con Manus AI, y solo M07 (la última generada) cumple el spec.

**Conclusión: Se requiere regeneración completa** de las slides estructurales (portada, separadores, claims, cierre, referencias) para M00-M06 y M01 bloques A-D. Las slides de contenido también varían significativamente en estructura de header.

---

## 2. Clasificación por Nivel de Divergencia

| Grupo | Módulos | Nivel | Descripción |
|-------|---------|-------|-------------|
| **A - Máxima divergencia** | M00, M01 (4 bloques) | Regenerar todo | Template completamente diferente: headers persistentes, page numbers, portada con foto/split, separadores verticales, imágenes rotas |
| **B - Alta divergencia** | M02, M03 | Regenerar todo | Template alternativo: portada con "PROGRAMA LCC", módulo oversized, sin Gracias/Referencias estándar, accent lines en posición incorrecta |
| **C - Divergencia media** | M04, M05 | Regenerar estructurales + ajustar contenido | Portada cercana pero centrada (M04) o sin logo/círculos (M05), sin Gracias/Referencias estándar |
| **D - Divergencia menor** | M06 | Ajustar Gracias + Referencias | Portada OK, contenido OK. Gracias en blanco (no coral), Referencias sin border-left coral |
| **E - Referencia** | M07 | OK | Cumple el spec (fue su fuente) |

---

## 3. Inconsistencias por Tipo de Slide Estructural

### 3.1 Portada (§2.1)

| Módulo | Alineación | Tag módulo | Círculos decorativos | Logo CSS | Accent line coral | Cita con border-left | Fondo |
|--------|-----------|------------|---------------------|----------|-------------------|---------------------|-------|
| M00 | Izquierda | "MÓDULO 0 - APERTURA" (badge) | No | No | No | Sí (subtítulo) | Foto |
| M01A | Izquierda | "MÓDULO 01" bajo logo | No (rotas) | Sí (top-left!) | No | Sí | Solid + imagen rota |
| M01B-D | N/A | Son separadores de bloque, no portadas | - | - | - | - | - |
| M02 | Izquierda | "PROGRAMA LCC" + "MÓDULO 02" oversized | No | No | No | Sí | Sólido/gradiente |
| M03 | Izquierda | "PROGRAMA LCC" + "MÓDULO 03" oversized | No | No | No | Sí | Sólido |
| M04 | **Centro** | "MÓDULO 04" coral centrado | No | Sí (bottom-right) | Sí (centrada) | Sí | Sólido |
| M05 | Izquierda | "MÓDULO 05" coral | No | No | Sí | Sí | Sólido |
| M06 | Izquierda | "MÓDULO 06" coral | Sí | Sí | Sí | Sí | Sólido |
| **M07** | **Izquierda** | **"MÓDULO 07" coral** | **Sí** | **Sí (bottom-right)** | **Sí** | **Sí** | **Sólido #1F3A3D** |

**Hallazgo clave:** Solo M06 y M07 tienen la portada correcta. M04 está cerca pero centrada. M00-M03, M01, M05 requieren regeneración total de la portada.

### 3.2 Separador de Tema (§2.2)

| Módulo | Layout | Número 180px coral | Barra vertical coral | Tag "TEMA" | Subtítulo | Círculos |
|--------|--------|-------------------|---------------------|------------|-----------|----------|
| M00 | **Vertical** (número arriba, título abajo) | Sí pero stacked | Accent line horizontal debajo | No | Sí | Rotas |
| M01B | **Vertical** (número arriba, título abajo) | Sí pero stacked | Accent line horizontal | No | Sí | Rotas |
| M02 | No identificado como separador estándar | - | - | - | - | - |
| M03 | Similar a M02 | - | - | - | - | - |
| M04 | No capturado en muestra | - | - | - | - | - |
| M05 | No capturado en muestra | - | - | - | - | - |
| M06 | No capturado en muestra (probablemente cercano a M07) | - | - | - | - | - |
| **M07** | **Horizontal** (número | título) | **Sí** | **Sí** | **Sí** | **Sí** | **Sí** |

**Hallazgo clave:** M00 y M01 usan layout vertical (número stacked sobre título) en vez del layout horizontal lado-a-lado del spec. M02/M03 no usan separadores estándar.

### 3.3 Slide de Cierre "Gracias" (§2.5)

| Módulo | Existe | "GRACIAS" coral 120px uppercase | Línea blanca | "Liderar con Consciencia" | URL | Contenido extra |
|--------|--------|-------------------------------|-------------|--------------------------|-----|-----------------|
| M00 | **No** | - | - | - | - | Usa cierre personalizado con "Las semillas..." |
| M01D | Sí | **Blanco**, title case, ~80px | No | Sí, en coral | Sí | Placeholder "LOGO" gris |
| M02 | **No** | - | - | - | - | Usa "La Semilla Echa Raíces" (bridge) |
| M03 | **Parcial** | "Gracias" pequeño al pie | No | No | No | Combinado con bridge "Próxima Parada" |
| M04 | **No** | - | - | - | - | Usa "Próxima Parada: Módulo 05" |
| M05 | Sí | **Blanco**, title case, ~100px | Sí (coral) | Sí | No | "MÓDULO 05 COMPLETADO" en coral |
| M06 | Sí | **Blanco**, title case, ~120px | Sí (coral) | Sí (arriba) | No | "Módulo 06: Consciente de lo que Quiero" |
| **M07** | **Sí** | **Coral #DC8060, UPPERCASE, 120px** | **Sí (blanca)** | **Sí** | **Sí** | **Ninguno** |

**Hallazgo clave:** NINGÚN módulo excepto M07 tiene "GRACIAS" en coral. Todos los que tienen la slide usan blanco. M00, M02, M03, M04 ni siquiera tienen la slide. M05 y M06 añaden texto específico del módulo (el spec dice que debe ser idéntica en todos).

### 3.4 Slide de Referencias (§2.6)

| Módulo | Existe | Tag "PARA PROFUNDIZAR" | Grid 2 columnas | Border-left coral por referencia | Título "Fuentes principales" |
|--------|--------|----------------------|----------------|-------------------------------|---------------------------|
| M00 | **No** | - | - | - | - |
| M01 | **No** | - | - | - | - |
| M02 | **No** | - | - | - | - |
| M03 | **No** | - | - | - | - |
| M04 | **No** | - | - | - | - |
| M05 | **No** | - | - | - | - |
| M06 | Sí | **"FUENTES"** (diferente) | Sí | **No** (bullets) | **"Referencias Bibliográficas"** |
| **M07** | **Sí** | **"PARA PROFUNDIZAR"** | **Sí** | **Sí** | **"Fuentes principales"** |

**Hallazgo clave:** Solo M06 y M07 tienen slide de referencias. M06 usa un formato diferente (bullets en vez de border-left, tag y título distintos). M00-M05 no la tienen en absoluto.

### 3.5 Contenido Estándar (§2.3)

| Módulo | Tag coral 16px uppercase | Título h2 mid-teal 42px | Header border-bottom | Insight box | Fondo cream |
|--------|------------------------|----------------------|---------------------|------------|------------|
| M00 | Sí | Sí (dark-teal, no mid) | **No** (visible) | No | Sí pero con header bar |
| M01 | Sí | Sí | Sí (parcial) | Sí (variado) | Sí |
| M02 | Parcial (accent line arriba) | Sí | **No** (accent line above) | Sí | Sí |
| M03 | Similar a M02 | Sí | **No** | Sí | Sí |
| M04 | Sí | Sí | Sí (parcial) | Sí | Sí |
| M05 | Sí | Sí | Sí | Sí | Sí |
| M06 | Sí | Sí | Sí (parcial) | Sí | Sí |
| **M07** | **Sí** | **Sí** | **Sí** | **Sí** | **Sí** |

---

## 4. Problemas Transversales

### 4.1 Imágenes Rotas
- **M00**: Múltiples `[IMAGEN: img-m00-...]` placeholders en dashed border
- **M01A**: `[IMAGEN: img-m01-00-cerebro-maquina.png]` en portada
- **M01B**: "Decorative Circles" como alt text (SVG no renderizado)
- **M02**: `[GRÁFICO: Triángulo de la Atención]` y `[IMAGEN: Líder con Raíces]` placeholders

**Causa:** Las presentaciones referencian imágenes que nunca se embebieron en el HTML/PPTX.

### 4.2 Elementos No Conformes al Spec
- **Page numbers**: Presentes en M00 y M01B (no definidos en el spec)
- **Header persistente**: "Liderar con Consciencia" con logo roto en M00 y M01B (no en spec)
- **Footer bar**: "Conexión con el Programa / Módulo 02" en M02 (no en spec)
- **Border-radius en tarjetas**: M00 (cards del mapa), M04 (card central), M03 (circle badges)
- **Emojis**: M07 page 8 usa emojis en comparación (permitido en spec para listas comparativas)

### 4.3 Coherencia de Paleta
La paleta de colores es **razonablemente consistente** entre módulos:
- Dark teal (#1F3A3D) para fondos oscuros: OK en todos
- Coral (#DC8060) para acentos: OK en todos
- Cream (#FDFCFB) para fondos claros: OK en todos (ligeras variaciones)
- Mid-teal para títulos: OK en todos

**La tipografía (Montserrat) es consistente en todos los módulos.** Los tokens de color están bien. El problema es de **layout y estructura**, no de paleta.

---

## 5. Conclusión y Recomendación para Fase 2

### El veredicto: Regeneración desde los guiones

Las inconsistencias son **estructurales, no cosméticas**. No se pueden resolver con scripts que ajusten propiedades CSS. Los módulos M00-M05 tienen layouts fundamentalmente diferentes para las slides estructurales (portada, separadores, cierres).

### Estrategia recomendada

1. **Regenerar las 6 slides estructurales** de cada módulo (portada, brecha/claim, mapa del módulo, síntesis, gracias, referencias) usando los arquetipos exactos del Design System Spec
2. **Preservar las slides de contenido** existentes donde el layout sea compatible (M04-M06 tienen contenido razonablemente alineado)
3. **Para M00-M03 y M01 bloques**: También regenerar las slides de contenido, ya que los headers tienen structure incompatible (accent line arriba, headers persistentes, page numbers)

### Herramienta: python-pptx desde guiones

Dado que:
- Los guiones ya existen en `Contenido diapositivas/guion-m*-claudecode.md`
- Las PPTX de Manus fueron generadas como conversión HTML→PPTX (estructura interna no estándar)
- Se necesita control preciso sobre layouts, colores y tipografía

**La opción más fiable es generar las PPTX desde cero con python-pptx**, implementando los 6 arquetipos y 9 componentes del Design System como funciones reutilizables, y alimentando el contenido desde los guiones.

### Volumen estimado

| Módulo | Slides totales (PDF) | Estructurales a regenerar | Contenido a evaluar |
|--------|---------------------|--------------------------|-------------------|
| M00 | 29 | 6+ | ~23 |
| M01A | 10 | 2 | ~8 |
| M01B | 16 | 2 | ~14 |
| M01C | 22 | 2 | ~20 |
| M01D | 6 | 3 | ~3 |
| M02 | 55 | 6+ | ~49 |
| M03 | 39 | 6+ | ~33 |
| M04 | 40 | 6 | ~34 |
| M05 | 39 | 6 | ~33 |
| M06 | 41 | 3 (Gracias+Refs+ajustes) | ~38 |
| **Total** | **337** | **~48** | **~255** |

---

## 6. Screenshots de Referencia

Todas las capturas están en `audit-screenshots/` con nomenclatura `{módulo}-page{NN}.png`.

### Slides de referencia (M07 = spec)
- `m07-page01.png` — Portada correcta
- `m07-page06.png` — Mapa del módulo (2x2 grid)
- `m07-page07.png` — Separador Tema 01 (horizontal con barra vertical)
- `m07-page42.png` — Gracias (coral, uppercase)
- `m07-page43.png` — Referencias (border-left coral, 2 columnas)

### Ejemplos de inconsistencias graves
- `m00-page01.png` — Portada con foto de fondo
- `m00-page03.png` — Separador vertical (vs horizontal en spec)
- `m01a-page01.png` — Portada split con imagen rota
- `m01d-page06.png` — Gracias en blanco con LOGO placeholder
- `m02-page01.png` — Portada "MÓDULO 02" oversized
- `m04-page01.png` — Portada centrada (vs izquierda en spec)
- `m06-page40.png` — Gracias en blanco (vs coral en spec)
