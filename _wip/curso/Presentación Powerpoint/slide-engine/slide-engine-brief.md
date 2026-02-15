# LIDERAR CON CONSCIENCIA — Slide Engine
## Brief de Implementación para Claude Code

**Fecha:** 14 de febrero de 2026  
**Proyecto:** Motor de generación de presentaciones PPTX  
**Prueba piloto:** Módulo 00 — "El Momento que Nos Convoca"

---

## 1. CONTEXTO

### 1.1 ¿Qué existe hoy?

Sergio tiene un curso de 8 módulos (M00–M07) con presentaciones generadas por **Manus** (IA que produce HTML y exporta a PPTX/PDF). Los archivos están en:

```
C:\dev\projects\LiderarConsciencia\_wip\curso\Presentación Powerpoint\Diapos Manus\
```

También existe una **plantilla PPTX de marca** creada previamente por Claude, en:

```
C:\dev\projects\LiderarConsciencia\Marketing\Identidad visual\Plantilla_powerpoint.pptx
```

Y un **Manual de Identidad Visual** completo en:

```
C:\dev\projects\LiderarConsciencia\Marketing\Identidad visual\brand-guidelines.md
```

### 1.2 Problema con Manus

Las slides generadas por Manus tienen dos problemas estructurales:

1. **No son editables en PowerPoint**: Cada diapositiva usa una imagen JPEG de fondo (2560×1440px) sobre la cual se posicionan AutoShapes con texto. Los fondos de color, círculos decorativos, etc. están "aplanados" en la imagen. No hay slide masters ni layouts.

2. **Inconsistencia entre módulos**: Cada sesión de Manus "reinterpreta" el estilo. Las portadas, separadores, headers, insight boxes y componentes varían entre módulos en alineación, tamaño, capitalización, opacidad de elementos decorativos y estructura de tarjetas.

### 1.3 Decisión de diseño

Sergio ha decidido que la **referencia canónica de estilo NO es el M07 de Manus**, sino la **Plantilla_powerpoint.pptx** de la identidad visual de marca. Esta plantilla:

- Fue generada con PptxGenJS (shapes nativos, 100% editable)
- Usa el logo oficial como PNG incrustado (no CSS circles como Manus)
- Aplica los círculos decorativos de 7 anillos de la identidad visual (como PNGs)
- Tiene placeholders de imagen bien definidos
- Incluye paginación consistente
- Sigue fielmente el brand-guidelines.md

Los fondos deben ser **recreados programáticamente** con shapes (no imágenes renderizadas), y los iconos deben ser **vectoriales profesionales** (react-icons renderizados a PNG).

---

## 2. ANÁLISIS COMPARATIVO: PLANTILLA vs. MANUS

### 2.1 Elementos donde la Plantilla es SUPERIOR

| Aspecto | Plantilla | Manus (M07) |
|---|---|---|
| **Logo** | PNG del logo oficial (anillos con gradiente) incrustado esquina sup-izq | Logo CSS improvisado con OVALs en esquina inf-der |
| **Círculos decorativos** | PNG de los 7 anillos oficiales (brand-guidelines §8) | 3 circles CSS con opacidades inconsistentes |
| **Editabilidad** | 100% shapes nativos | Fondo = imagen JPEG aplanada |
| **Header de marca** | Logo + "Liderar con Consciencia" (lockup) en todas las slides de contenido | Varía (a veces ausente, a veces redundante) |
| **Paginación** | "X / N" consistente en esquina inf-der | Inconsistente (a veces presente, a veces no) |
| **Placeholders de imagen** | Bien definidos con instrucciones | Sin sistema de placeholders |
| **Tipografía** | Montserrat aplicada correctamente | Montserrat pero con tamaños variables |
| **Paleta de colores** | Exacta al brand-guidelines | Mayormente correcta pero con desviaciones |

### 2.2 Elementos donde Manus aporta MEJORAS a incorporar

| Aspecto | Manus (M07) | Qué incorporar |
|---|---|---|
| **Insight box** | Barra inferior full-width con fondo mid-teal | La plantilla no tiene este componente. Incorporarlo |
| **Separadores de tema** | Número grande + barra vertical coral | La plantilla los tiene similares. Mantener estilo plantilla |
| **Claims/impacto** | Slide oscura centrada | La plantilla no tiene este tipo. Incorporar versión adaptada |
| **Grid de datos (evidence)** | 2×2 con border-left coral + número grande + desc + fuente | La plantilla ya tiene esto, bien ejecutado |
| **Quote card** | Barra izquierda coral + comillas + italic | La plantilla ya tiene esto |
| **Comparison columns** | Dos columnas con fondos diferenciados | La plantilla ya tiene esto con warm-bg vs off-white |
| **Síntesis numerada** | Items con número grande coral + título + descripción | La plantilla tiene items numerados con círculos mid-teal |

### 2.3 Conclusión del análisis

**La plantilla PPTX existente es una base excelente** que ya resuelve el 80% del problema. Lo que falta es:

1. **Catálogo completo de arquetipos de slide**: La plantilla tiene 25 slides de ejemplo, pero no cubre todos los tipos necesarios (falta claim/impacto oscuro, transición entre bloques, slide de reflexión/pausa).

2. **Un motor programático (Slide Engine)** que permita a Claude Code generar presentaciones completas pasándole el contenido de cada módulo.

3. **Manus Design System Spec** tiene elementos útiles que complementan la plantilla (reglas de alternancia de fondos, estructura narrativa obligatoria, protocolo de auditoría).

---

## 3. ARQUITECTURA DEL SLIDE ENGINE

### 3.1 Stack

- **PptxGenJS** (Node.js): Generación nativa PPTX
- **react-icons + sharp**: Iconos vectoriales → PNG base64
- Script modular en JavaScript

### 3.2 Estructura de archivos

```
C:\dev\projects\LiderarConsciencia\_wip\slide-engine\
├── engine.js              # Motor principal — funciones públicas por tipo de slide
├── tokens.js              # Design tokens (colores, tipografía, espaciado)
├── icons.js               # react-icons → base64 PNG utility
├── components.js          # Componentes reutilizables (insight-box, quote-card, etc.)
├── assets/                # PNGs extraídos de la plantilla (logo, círculos decorativos)
│   ├── logo-light.png     # Logo para slides claras
│   ├── logo-dark.png      # Logo para slides oscuras  
│   ├── circulos-deco.png  # Círculos decorativos 7 anillos
│   └── quote-mark.png     # Comillas decorativas
├── generate-m00.js        # Script de generación del M00 (piloto)
├── output/                # Carpeta de salida
└── README.md
```

### 3.3 Fuentes de referencia que Claude Code DEBE leer antes de implementar

1. **`brand-guidelines.md`** — `C:\dev\projects\LiderarConsciencia\Marketing\Identidad visual\brand-guidelines.md`  
   → Fuente de verdad para colores, tipografía, logo, círculos decorativos

2. **`Plantilla_powerpoint.pptx`** — `C:\dev\projects\LiderarConsciencia\Marketing\Identidad visual\Plantilla_powerpoint.pptx`  
   → Referencia visual canónica. Extraer PNGs de assets (logo, círculos). Replicar posicionamiento y proporciones.

3. **`LIDERAR_Design_System_Spec.md`** — `C:\dev\projects\LiderarConsciencia\_wip\curso\Presentación Powerpoint\Diapos Manus\LIDERAR_Design_System_Spec.md`  
   → Referencia complementaria para reglas de composición (§4), estructura narrativa (§4.1), y checklist de auditoría (§5). Los tokens de diseño (§1) y arquetipos (§2) de este documento se SUBORDINAN a la plantilla y al brand-guidelines cuando haya conflicto.

4. **`M00-ppt-El-Momento-que-Nos-Convoca.pptx`** — `C:\dev\projects\LiderarConsciencia\_wip\curso\Presentación Powerpoint\Diapos Manus\M00-ppt-El-Momento-que-Nos-Convoca.pptx`  
   → Contenido del módulo piloto (29 slides). Extraer textos, datos, citas, notas del presentador.

### 3.4 Design Tokens (resumen ejecutivo)

Extraídos del brand-guidelines.md. Sin `#`, formato PptxGenJS.

**Colores:**
```javascript
const COLORS = {
  // Principales
  darkTeal: "1A3A40",      // Primary Dark — Fondo slides oscuras
  midTeal: "2A5058",       // Primary — Títulos h2, insight-box
  lightTeal: "487878",     // Primary Light — Headers secundarios
  coral: "DC8060",         // Accent — Tags, highlights, números, CTAs
  coralDark: "B86848",     // Accent Dark
  coralLight: "F0A080",    // Accent Light
  
  // Fondos
  cream: "FDFCFB",         // Background — Fondo slides claras
  bgAlt: "F9F7F5",         // Background Alt
  offWhite: "F2F7F7",      // Primary Subtle — Fondo tarjetas
  warmBg: "FDF6F3",        // Accent Muted — Fondo tarjetas acento
  white: "FFFFFF",
  
  // Texto
  textPrimary: "2A3A3A",   // Títulos, texto principal
  textSecondary: "5A6A6A", // Cuerpo, descripciones
  textMuted: "8A9696",     // Labels, terciario
  
  // Bordes
  border: "E8E4E0",        // Líneas separadoras
  primaryMuted: "E0EBEB",  // Fondos badges, cards primary
  
  // Textos en slides oscuras
  textLight: "E0EBEB",     // Texto claro
  textDimmed: "A8B0A8",    // Texto apagado
};

// Colores de módulos (sistema de 7)
const MODULE_COLORS = {
  M1: "DC8060", M2: "C48870", M3: "A89080", M4: "889088",
  M5: "688888", M6: "487878", M7: "2A5058"
};
```

**Tipografía:**
```javascript
const FONT = "Montserrat";  // Fallback: "Arial"
```

**Tamaños (en pt para PptxGenJS):**

| Elemento | Tamaño pt | Bold | Extras |
|---|---|---|---|
| Tag/overline (slides claras) | 11 | 700 | uppercase, charSpacing: 1.5, color coral |
| Título h2 (slides claras) | 28 | 700 | color midTeal |
| Body text | 13–14 | 400 | color textSecondary |
| Body small | 11–12 | 400 | color textMuted |
| Portada: tag módulo | 14 | 600 | uppercase, charSpacing: 3 |
| Portada: título h1 | 48 | 700 | color white |
| Portada: cita | 16 | 400 italic | color textLight |
| Separador: número | 72 | 700 | color coral |
| Separador: título | 40 | 700 | color white |
| Separador: subtítulo | 16 | 300 | color textLight |
| Dato impacto: número | 48 | 700 | color coral |
| Dato impacto: descripción | 16 | 400 | — |
| Quote: texto | 18 | 400 italic | color midTeal |
| Quote: autor | 13 | 700 | color coral |
| Claim: concepto | 48 | 700 | color coral, uppercase |
| Claim: definición | 18 | 300 | color white |
| Paginación | 9 | 400 | color textMuted |

### 3.5 Catálogo de arquetipos de slide

Basado en la fusión de la plantilla + Manus Design System, estos son todos los tipos de slide necesarios:

#### TIPO 1 — Portada del Módulo (fondo oscuro)
- **Referencia:** Plantilla slide 1
- **Layout:** Split ~60/40. Izquierda: logo lockup + badge módulo + título + cita. Derecha: zona de imagen hero (placeholder o imagen real) con fondo semi-transparente oscuro
- **Elementos:** Logo PNG (variante dark) esquina sup-izq. Círculos decorativos PNG abajo-izq y arriba-der (opacity 0.1). Badge "MÓDULO X · NOMBRE" con fondo semi-transparente. Título grande blanco. Cita en italic light.
- **Nota paginación:** Sin paginación en portada.

#### TIPO 2 — Hoja de Ruta / Mapa del Módulo (fondo claro)
- **Referencia:** Plantilla slide 2
- **Layout:** Header (logo lockup + tag + título) + grid de 3-4 tarjetas (module cards)
- **Tarjetas:** Fondo white, borde border. Primera tarjeta con borde izquierdo coral (activa). Número coral grande + título bold + descripción secondary.
- **Círculos decorativos** arriba-der (opacity 0.08)

#### TIPO 3 — Separador de Tema (fondo oscuro)
- **Referencia:** Plantilla slide 3
- **Layout:** Logo lockup (variante dark) sup-izq. Número grande coral (72pt). Título blanco grande (40pt). Subtítulo light. Línea coral debajo. Círculos decorativos der (opacity bajo).
- **Paginación:** Sí, en esquina inf-der, color textDimmed.

#### TIPO 4 — Contenido Estándar (fondo claro)
- **Referencia:** Plantilla slides 4, 5, 6
- **Layout:** Logo lockup sup-izq. Tag coral uppercase + título h2 midTeal. Contenido debajo (configurable). Paginación inf-der.
- **Variantes de contenido:**
  - Texto + placeholder imagen derecha (split 55/45)
  - Texto en dos columnas con separador vertical
  - Texto solo (full width)

#### TIPO 5 — Dato Impacto / Estadística (fondo claro u oscuro)
- **Referencia:** Plantilla slide 7
- **Layout para versión oscura:** Logo lockup dark. Número enorme coral centrado. Descripción debajo. Fuente en small muted. Placeholder imagen lateral.
- **Layout para versión clara:** Logo lockup. Tag + título. Número coral grande con descripción.

#### TIPO 6 — Evidence Grid / Datos en Grid (fondo claro)
- **Referencia:** Plantilla slide 8
- **Layout:** Logo lockup. Tag + título. Grid 2×2 de tarjetas: cada una con borde izquierdo coral, número grande coral, descripción, fuente en italic muted.

#### TIPO 7 — Cita / Quote (fondo claro)
- **Referencia:** Plantilla slide 9
- **Layout:** Logo lockup. Card grande centrada con fondo white, borde izquierdo coral (6px). Comillas decorativas coral. Texto italic 18pt. Autor en bold coral. Círculos decorativos abajo-der.

#### TIPO 8 — Secuencia / Proceso (fondo claro)
- **Referencia:** Plantilla slide 10
- **Layout:** Logo lockup. Badge "PASO X DE N" + tag + título. 3 columnas con icono + título + descripción.

#### TIPO 9 — Comparativa (fondo claro)
- **Referencia:** Plantilla slide 11
- **Layout:** Logo lockup. Tag + título. Dos columnas: izquierda con fondo warmBg (lo "viejo") y derecha con fondo offWhite/primaryMuted (lo "nuevo"). Flecha coral entre columnas.

#### TIPO 10 — Gráfico / Chart (fondo claro)
- **Referencia:** Plantilla slide 12
- **Layout:** Logo lockup. Tag + título. Chart (bar, line, etc.) con colores de la paleta. Fuente en small muted.

#### TIPO 11 — Reflexión / Pausa (fondo con imagen o claro)
- **Referencia:** Plantilla slides 13, 16
- **Layout:** Fondo con placeholder de imagen a pantalla completa (o fondo dark-teal). Tag "REFLEXIÓN". Pregunta grande centrada. Subtexto invitacional.

#### TIPO 12 — Resumen y Cierre (fondo oscuro con círculos)
- **Referencia:** Plantilla slide 14
- **Layout:** Logo lockup dark. Tag + título "Ideas clave del módulo". Items numerados (1, 2, 3) con círculos midTeal + texto. Bloque de siguiente módulo. Datos de contacto. Círculos decorativos.

#### TIPO 13 — Práctica / Meditación (fondo claro)
- **Referencia:** Plantilla slide 15
- **Layout:** Logo lockup. Badge "PRÁCTICA" con fondo coral. Título + subtítulo. Círculo grande con icono reloj + duración. Pasos numerados con círculos midTeal.

#### TIPO 14 — Debriefing (fondo claro)
- **Referencia:** Plantilla slide 17
- **Layout:** Logo lockup. Tag + título. 3 columnas: "¿Qué observé?", "¿Qué sentí?", "¿Qué descubrí?" con icono + espacio para compartir.

#### TIPO 15 — Recorrido de 7 módulos (fondo claro)
- **Referencia:** Plantilla slide 18
- **Layout:** Logo lockup. Tag + título. Timeline horizontal con 8 puntos (M0–M7) usando los colores de módulo (§2.6 del brand-guidelines). 3 fases indicadas debajo.

#### TIPO 16 — Modelo / Diagrama (fondo claro)
- **Referencia:** Plantilla slide 19
- **Layout:** Logo lockup. Tag + título. Diagrama de flujo con 3 bloques + flechas. Insight-box inferior.

#### TIPO 17 — Caso / Storytelling (fondo claro)
- **Referencia:** Plantilla slide 20
- **Layout:** Logo lockup. Tag + título. 3 columnas: Situación, Acción, Resultado. Cada una con icono + texto.

#### TIPO 18 — Principios / Lista con iconos (fondo claro)
- **Referencia:** Plantilla slide 21
- **Layout:** Logo lockup. Tag + título. Lista vertical de 4-5 items: icono en contenedor cuadrado + título bold + descripción. Círculos decorativos der.

#### TIPO 19 — Transición entre bloques (fondo oscuro)
- **Referencia:** Plantilla slide 23
- **Layout:** Logo lockup dark. Cita grande con barra izquierda coral. Badge "Siguiente bloque" con número y título. Círculos decorativos.

#### TIPO 20 — Agenda (fondo claro)
- **Referencia:** Plantilla slide 24
- **Layout:** Logo lockup. Tag + título. Grid de filas: hora, duración, nombre, tipo (en badge). Iconos por tipo.

#### TIPO 21 — Recursos / Referencias (fondo claro)
- **Referencia:** Plantilla slide 25
- **Layout:** Logo lockup. Tag + título. 2 columnas de referencias con icono libro/paper. QR code placeholder.

#### TIPO 22 — Claim / Impacto (fondo oscuro) — NUEVO, de Manus
- **No existe en plantilla, incorporar del Manus Design System §2.4**
- **Layout:** Fondo dark-teal. Tag light centrado. Concepto grande coral uppercase centrado. Líneas coral superior e inferior. Definición blanca centrada. Subtexto italic dimmed.
- **Uso:** Slides de alto impacto emocional, revelaciones, manifiestos.

#### TIPO 23 — Insight Box (componente, no slide completa)
- **De Manus Design System §3.1**
- Barra full-width en la parte inferior de cualquier slide de contenido
- Fondo midTeal, texto blanco, palabra clave en coral bold
- Se puede añadir a cualquier slide de TIPO 4, 6, 8, 9, 18

### 3.6 Reglas de composición (del Manus Design System §4)

**Estructura narrativa de cada módulo:**

| Posición | Tipo de slide | Fondo |
|---|---|---|
| 1 | Portada (TIPO 1) | Oscuro |
| 2 | Contexto / Recapitulación (TIPO 4) | Claro |
| 3 | La Brecha / Claim (TIPO 22) | Oscuro |
| 4 | Tesis Central (TIPO 4) | Claro |
| 5 | Mapa del Módulo (TIPO 2) | Claro |
| 6–N | Temas (cada uno empieza con Separador TIPO 3) | Alternado |
| N+1 | Síntesis (TIPO 12) | Oscuro |
| N+2 | Práctica (TIPO 13) | Claro |
| N+3 | Recursos (TIPO 21) | Claro |

**Alternancia:** Nunca más de 3 slides consecutivas del mismo fondo. Separadores y claims siempre oscuros. Contenido siempre claro.

**Densidad:** Máximo 4 puntos principales por slide. Si un concepto necesita más, dividir en 2 slides.

---

## 4. IMPLEMENTACIÓN — INSTRUCCIONES PARA CLAUDE CODE

### 4.1 Paso 1: Extracción de assets

Extraer del `Plantilla_powerpoint.pptx`:
- Las imágenes PNG incrustadas (logo light, logo dark, círculos decorativos, comillas, iconos)
- Guardarlas en `slide-engine/assets/`

Estas PNGs se usarán como `addImage({ data: base64... })` en PptxGenJS.

### 4.2 Paso 2: Implementar tokens.js

Design tokens extraídos de este documento (§3.4).

### 4.3 Paso 3: Implementar icons.js

Utilidad de react-icons → PNG base64. Mapeo mínimo para M00:

| Concepto | Icono sugerido (Heroicons/react-icons) |
|---|---|
| Fragmentación digital | `HiDeviceMobile` |
| Crisis de legitimidad | `HiShieldExclamation` |
| Irrupción IA | `HiChip` |
| Agotamiento | `HiFire` |
| Desconexión | `HiEyeOff` |
| Cinismo | `HiEmojiSad` |
| Agotamiento (respuesta) | `HiLightningBolt` |
| Foco | `HiEye` |
| Discernimiento | `HiLightBulb` |
| Espacio interior | `HiHeart` |
| Humanidad | `HiUserGroup` |
| Reloj / práctica | `HiClock` |
| Check | `HiCheckCircle` |
| X / no | `HiXCircle` |
| Flecha / proceso | `HiArrowRight` |
| Libro / referencia | `HiBookOpen` |
| Semilla / crecimiento | `HiSparkles` |

### 4.4 Paso 4: Implementar engine.js

Funciones públicas para cada tipo de slide (§3.5). Cada función recibe `pres` (instancia PptxGenJS) y un objeto de datos.

### 4.5 Paso 5: Implementar generate-m00.js

Script que:
1. Lee el contenido del M00 (29 slides del PPTX de Manus, ya extraído como texto en este documento — ver Anexo A)
2. Mapea cada slide al tipo correspondiente
3. Llama a las funciones del engine
4. Genera el PPTX final

### 4.6 Paso 6: QA visual

1. Convertir PPTX → PDF → imágenes
2. Inspeccionar visualmente cada slide
3. Comparar con la plantilla de referencia
4. Corregir y re-verificar

---

## 5. CONTENIDO DEL M00 — ESTRUCTURA DE SLIDES

El M00 tiene 29 slides en Manus. Propongo condensar a ~25 slides eliminando redundancias, siguiendo la estructura de la plantilla.

| # | Tipo | Tag | Título | Contenido clave |
|---|---|---|---|---|
| 1 | TIPO 1 Portada | MÓDULO 0 · APERTURA | El Momento que Nos Convoca | Cita: "La consciencia se entrena, no se enseña" |
| 2 | TIPO 2 Hoja Ruta | HOJA DE RUTA | Estructura del módulo | 4 bloques: Diagnóstico, Transición, Compromiso, Mapa |
| 3 | TIPO 3 Separador | 01 | Diagnóstico | "¿Qué está pasando que hace liderar tan difícil?" |
| 4 | TIPO 4 Contenido+img | APERTURA | ¿Qué significa liderar con consciencia? | Texto intro + placeholder imagen |
| 5 | TIPO 8 Secuencia | DIAGNÓSTICO | Cuatro fuerzas convergentes | 4 cards: Fragmentación, Legitimidad, IA, Agotamiento con iconos y datos |
| 6 | TIPO 5 Dato (oscuro) | — | 47 seg | Atención sostenida. Gloria Mark, UC Irvine (2023) |
| 7 | TIPO 6 Evidence | EVIDENCIA | Fragmentación Digital | Grid 2×2: 47seg, 25min, 6x, 39% |
| 8 | TIPO 5 Dato (oscuro) | — | 70% | Varianza compromiso equipo = líder directo. Gallup 2025 |
| 9 | TIPO 6 Evidence | EPIDEMIA | Agotamiento global | Grid 2×2: 82%, 41%, 58%, OMS quote |
| 10 | TIPO 4 Contenido | SISTEMA | No son cuatro problemas. Es un sistema | Ciclo retroalimentación con flechas/pasos + insight box |
| 11 | TIPO 7 Quote | — | Byung-Chul Han | "Ahora uno se explota a sí mismo..." La sociedad del cansancio (2010) |
| 12 | TIPO 3 Separador | 02 | La tentación de la impotencia | "¿Qué hacemos con la sensación de que no podemos hacer nada?" |
| 13 | TIPO 8 Secuencia | RESPUESTAS NATURALES | Cuando el problema parece más grande que nosotros | 3 columns: Desconexión, Cinismo, Agotamiento |
| 14 | TIPO 9 Comparativa | PATRÓN COMÚN | Nos separan de nuestros propios actos | Quién eres vs Cómo lideras + insight |
| 15 | TIPO 11 Reflexión | REFLEXIÓN | ¿Cuál de las tres respuestas reconoces más en ti? | Pausa honestidad. 3 opciones |
| 16 | TIPO 3 Separador | 03 | El líder semilla | "¿Qué tipo de líder puedo ser en medio de esta tormenta?" |
| 17 | TIPO 18 Principios | METÁFORA | La naturaleza de la semilla | 4 items: No elige el clima, Echa raíces, Transforma entorno, Crea condiciones |
| 18 | TIPO 9 Comparativa | DEFINICIÓN | Lo que define al líder semilla | Lo que NO vs Lo que SÍ lo define |
| 19 | TIPO 18 Principios | NUEVAS CAPACIDADES | Lo que la tormenta exige | 5 items: Discernimiento, Foco, Lectura presente, Espacio interior, Humanidad |
| 20 | TIPO 22 Claim | — | La presencia no es solo ética. Es eficacia. | 3 puntos: Ve más, Escucha mejor, Decide con precisión |
| 21 | TIPO 11 Reflexión | — | ¿Estás dispuesto a trabajar en ti mismo? | "Un sí tentativo es suficiente" |
| 22 | TIPO 3 Separador | 04 | El mapa del viaje | "¿Qué voy a aprender y cómo se conecta todo?" |
| 23 | TIPO 15 Recorrido | RECORRIDO | El viaje de 7 módulos | Timeline M0–M7 con 3 fases y colores de módulo |
| 24 | TIPO 4 Contenido | ARCO | La semilla y sus capacidades | 7 items: M1-Presencia, M2-Estabilidad... M7-Integridad |
| 25 | TIPO 12 Resumen | RESUMEN Y CIERRE | Ideas clave del módulo | 4 ideas + "Siguiente: M1" + contacto |
| 26 | TIPO 13 Práctica | PRÁCTICA | Meditación de intención | ~5min. Pasos de la meditación |
| 27 | TIPO 21 Recursos | RECURSOS | Para profundizar | Referencias bibliográficas |

**Notas del presentador:** Incluir las speaker notes de Manus (ya extraídas) en cada slide.

---

## 6. ENTREGABLES ESPERADOS

1. **`slide-engine/`** — Carpeta completa con el motor, listo para ejecutar
2. **`output/M00-El-Momento-que-Nos-Convoca.pptx`** — Presentación generada del M00
3. **QA visual** — Capturas de cada slide verificadas
4. **README.md** — Instrucciones de uso para generar otros módulos

---

## ANEXO A: CONTENIDO COMPLETO DEL M00

El contenido textual completo de las 29 slides del M00 de Manus (incluyendo speaker notes) ha sido extraído y está disponible para Claude Code ejecutando:

```bash
python -m markitdown "C:\dev\projects\LiderarConsciencia\_wip\curso\Presentación Powerpoint\Diapos Manus\M00-ppt-El-Momento-que-Nos-Convoca.pptx"
```

Claude Code debe leer este contenido y mapearlo a la estructura de 27 slides propuesta en §5.

---

## ANEXO B: PRIORIDAD DE FUENTES (en caso de conflicto)

1. **brand-guidelines.md** — Máxima autoridad para colores, tipografía, logo, identidad
2. **Plantilla_powerpoint.pptx** — Referencia visual canónica para layout y posicionamiento
3. **LIDERAR_Design_System_Spec.md** — Complementario para reglas de composición y tipos de slide que no existen en la plantilla
4. **Este documento** — Decisiones de implementación y mapeo de contenido

---

*Documento generado el 14 de febrero de 2026*
*Versión 1.0 — Brief de implementación para Claude Code*
