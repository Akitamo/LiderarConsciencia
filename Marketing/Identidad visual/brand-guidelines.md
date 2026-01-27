# Manual de Identidad Visual
## Liderar con Consciencia

> **Propósito de este documento**: Servir como guía de referencia para mantener consistencia visual en todos los materiales de la marca. Usar como contexto/prompt en herramientas de IA para generar páginas web, presentaciones, documentos y cualquier material visual.

---

## 1. ESENCIA DE MARCA

### 1.1 Concepto Central
**"La consciencia se entrena, no se enseña"**

La identidad visual representa el viaje de expansión de la consciencia desde el interior (la semilla) hacia el exterior (el impacto). Los 7 módulos del programa se visualizan como círculos concéntricos que se expanden como ondas desde un núcleo central.

### 1.2 Metáfora Visual Principal
**Ondas de consciencia expandiéndose desde una semilla radiante**
- Centro coral con gradiente = la semilla de cambio, el punto de partida interior con energía propia
- Círculos en transición coral → índigo = los niveles de consciencia que se expanden
- Grosor decreciente hacia el exterior = mayor definición en el núcleo, expansión sutil hacia fuera
- Opacidad creciente hacia el centro = mayor claridad cuanto más profundo
- Círculo exterior punteado = expansión continua, sin límite fijo

### 1.3 Sistema de 7 Módulos y su Representación Visual

El programa tiene **7 módulos** que se representan con **7 colores** en transición coral → índigo. Este sistema de 7 colores es **permanente e inalterable** y se usa en:

- **Iconos de módulo**: Cada módulo tiene su color específico (M1=coral, M2=rosa coral... M7=índigo)
- **Círculos decorativos**: 7 anillos que representan los 7 módulos completos
- **Cualquier elemento** que represente la progresión del curso

### 1.4 Logo: Síntesis Visual (4 anillos)

El logo usa **4 anillos** (no 7) como síntesis visual optimizada para reconocimiento:

| Elemento | Anillos | Colores utilizados | Propósito |
|----------|---------|-------------------|----------|
| **Logo** | 4 + semilla | M2, M4, M5, M7 | Síntesis memorable, legibilidad a tamaños pequeños |
| **Círculos decorativos** | 7 + semilla | M1-M7 completo | Representación completa de los 7 módulos |
| **Iconos de módulo** | N/A | M1-M7 individual | Cada módulo su color específico |

> ⚠️ **Importante**: La simplificación del logo a 4 anillos es una decisión de diseño para optimizar legibilidad. **NO afecta** al sistema de 7 módulos ni a los colores de iconos, que siempre mantienen los 7 colores completos.

### 1.5 Palabras Clave de Diseño
`Consciencia` · `Expansión` · `Profundidad` · `Calidez` · `Claridad` · `Profesional` · `Humano` · `Contemporáneo`

---

## 2. PALETA DE COLORES

### 2.1 Colores Principales

#### Índigo (Principal)
| Uso | Nombre | HEX | RGB |
|-----|--------|-----|-----|
| Textos destacados, bordes activos | Primary | `#4338CA` | 67, 56, 202 |
| Hover, énfasis fuerte | Primary Dark | `#3730A3` | 55, 48, 163 |
| Iconos, elementos secundarios | Primary Light | `#6366F1` | 99, 102, 241 |
| Fondos suaves, badges | Primary Muted | `#E0E7FF` | 224, 231, 255 |
| Fondos muy sutiles | Primary Subtle | `#EEF2FF` | 238, 242, 255 |

#### Coral/Terracota (Acento)
| Uso | Nombre | HEX | RGB |
|-----|--------|-----|-----|
| CTAs principales, semilla | Accent | `#E07A5F` | 224, 122, 95 |
| Hover en CTAs, gradiente semilla | Accent Dark | `#C85A42` | 200, 90, 66 |
| Detalles decorativos, gradiente semilla | Accent Light | `#F4A990` | 244, 169, 144 |
| Fondos de cards destacadas | Accent Muted | `#FEF2F0` | 254, 242, 240 |

### 2.2 Neutros Cálidos

| Uso | Nombre | HEX | RGB |
|-----|--------|-----|-----|
| Fondos de cards, elementos | White | `#FFFFFF` | 255, 255, 255 |
| Fondo principal páginas | Background | `#FDFCFB` | 253, 252, 251 |
| Fondo alternativo/secciones | Background Alt | `#F9F7F5` | 249, 247, 245 |
| Bordes, separadores | Border | `#E8E4E0` | 232, 228, 224 |

### 2.3 Textos

| Uso | Nombre | HEX | RGB |
|-----|--------|-----|-----|
| Títulos, texto principal | Text Primary | `#1E1B2E` | 30, 27, 46 |
| Párrafos, texto secundario | Text Secondary | `#524D5F` | 82, 77, 95 |
| Etiquetas, texto terciario | Text Muted | `#8C8697` | 140, 134, 151 |

### 2.4 Gradiente de la Semilla

La semilla central del logo utiliza un gradiente radial que aporta calidez y profundidad:

```css
radialGradient id="seedRadiant" cx="50%" cy="50%" r="50%"
  stop offset="0%"   → #F4A990 (Accent Light)
  stop offset="50%"  → #E07A5F (Accent)
  stop offset="100%" → #C85A42 (Accent Dark)
```

### 2.5 Reglas de Uso de Color

**UI General (cards, botones, textos, fondos, navegación):**
- **Índigo**: Elementos de interfaz, navegación, fondos de contenedores de iconos (M1-M6)
- **Coral**: CTAs principales, highlights, fondos de contenedores de iconos (M7)
- **Ratio recomendado**: 70% neutros, 25% índigo, 5% coral

**Logo y elementos decorativos:**
- Usan la transición de colores coral → índigo (ver sección 2.6)
- La semilla siempre usa el gradiente radial

**Nunca:**
- Usar coral para texto largo
- Usar índigo sobre fondos oscuros sin ajustar opacidad
- Usar colores de transición (blend) en UI general

### 2.6 Colores de Transición — Sistema de 7 Módulos

La paleta de transición coral → índigo representa los **7 módulos del programa** y se mantiene íntegra para iconos de módulo, círculos decorativos y cualquier elemento que represente la progresión del curso.

| Módulo | Nombre | HEX | RGB |
|--------|--------|-----|-----|
| M1 | Coral (inicio) | `#E07A5F` | 224, 122, 95 |
| M2 | Rosa coral | `#C46B78` | 196, 107, 120 |
| M3 | Rosa violeta | `#A85D91` | 168, 93, 145 |
| M4 | Violeta | `#8B50AA` | 139, 80, 170 |
| M5 | Violeta índigo | `#6E44C0` | 110, 68, 192 |
| M6 | Primary Light | `#6366F1` | 99, 102, 241 |
| M7 | Índigo (fin) | `#4338CA` | 67, 56, 202 |

**Uso según elemento:**

| Elemento | Colores utilizados | Notas |
|----------|-------------------|-------|
| **Iconos de módulo** | M1, M2, M3, M4, M5, M6, M7 | Cada icono usa su color específico |
| **Círculos decorativos** | M1, M2, M3, M4, M5, M6, M7 | 7 anillos = 7 módulos completos |
| **Logo (4 anillos)** | M2, M4, M5, M7 | Síntesis visual (omite M3 y M6) |
| **Semilla del logo** | Gradiente §2.4 | No usa color plano, usa gradiente radial |

**Importante**: 
- Los 7 colores de módulo son **permanentes** y se usan siempre que se representen los módulos
- El logo simplifica a 4 anillos por legibilidad, pero esto **no afecta** al sistema de 7 módulos
- En UI general solo se usan índigo (#4338CA) + coral (#E07A5F), NO los colores intermedios

---

## 3. TIPOGRAFÍA

### 3.1 Familias Tipográficas

| Contexto | Fuente Principal | Fallback |
|----------|------------------|----------|
| Web / Kajabi | Outfit | Montserrat, -apple-system, sans-serif |
| PowerPoint / Word | Montserrat | Arial |
| Documentos PDF | Montserrat | Helvetica Neue |

**Google Fonts**: `https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800`

### 3.2 Escala Tipográfica

| Elemento | Tamaño | Peso | Line-height | Letter-spacing |
|----------|--------|------|-------------|----------------|
| H1 (Hero) | 52px | 700 | 1.1 | -0.03em |
| H2 (Sección) | 38px | 700 | 1.2 | -0.02em |
| H3 (Subsección) | 28px | 700 | 1.3 | -0.02em |
| H4 (Card title) | 17-24px | 700 | 1.4 | -0.01em |
| Body Large | 18-19px | 400 | 1.7-1.8 | 0 |
| Body | 15-16px | 400 | 1.65 | 0 |
| Small / Caption | 12-13px | 500-600 | 1.5 | 0 |
| Overline | 11-14px | 600-700 | 1.4 | 0.08-0.12em |

### 3.3 Estilos de Texto Especiales

**Overline (etiquetas de sección)**:
```
font-size: 14px
font-weight: 600
text-transform: uppercase
letter-spacing: 0.1em
color: Accent (#E07A5F)
```

**Cita destacada**:
```
font-size: 18px
font-weight: 500
line-height: 1.65
color: Text Primary
+ barra lateral izquierda 4px en Accent
```

---

## 4. ESPACIADO Y LAYOUT

### 4.1 Sistema de Espaciado (8px base)

| Token | Valor | Uso |
|-------|-------|-----|
| xs | 4px | Separación mínima entre elementos inline |
| sm | 8px | Padding interno mínimo |
| md | 16px | Separación entre elementos relacionados |
| lg | 24px | Padding de cards pequeñas |
| xl | 32px | Separación entre grupos |
| 2xl | 48px | Padding de secciones, margins laterales |
| 3xl | 64px | Separación entre secciones |
| 4xl | 80px | Padding vertical de secciones principales |

### 4.2 Contenedores

| Tipo | Max-width | Uso |
|------|-----------|-----|
| Narrow | 580-620px | Texto centrado, citas, CTAs |
| Content | 780px | Contenido de lectura, artículos |
| Standard | 900-1000px | Secciones con cards, grids |
| Wide | 1200px | Headers, footers |

### 4.3 Border Radius

| Elemento | Radius |
|----------|--------|
| Botones pequeños | 12px |
| Botones grandes, inputs | 14px |
| Cards, contenedores | 16-20px |
| Iconos en contenedor | 12-16px |
| Badges, pills | 9999px (full) |

---

## 5. LOGO Y SÍMBOLO

### 5.1 Construcción del Logo

El logo representa **ondas de consciencia expandiéndose desde una semilla radiante central**.

**Estructura (4 anillos + semilla con gradiente)**:

| Elemento | Radio | Grosor | Color | Opacidad | Estilo |
|----------|-------|--------|-------|----------|--------|
| Anillo 4 (exterior) | 22 | 0.8px | `#4338CA` | 0.4 | Punteado `2.5 1.5` |
| Anillo 3 | 18 | 1.4px | `#6E44C0` | 0.55 | Sólido |
| Anillo 2 | 14.5 | 1.8px | `#8B50AA` | 0.7 | Sólido |
| Anillo 1 (interno) | 11 | 2.5px | `#C46B78` | 0.85 | Sólido |
| Semilla | 6.5 | — | Gradiente radial | 1.0 | Relleno |
| Highlight | 2.8 | — | `#FFFFFF` | 0.45 | Relleno, offset -0.8,-0.8 |

**Gradiente de la semilla**:
```svg
<radialGradient id="seedRadiant" cx="50%" cy="50%" r="50%">
  <stop offset="0%" stop-color="#F4A990"/>
  <stop offset="50%" stop-color="#E07A5F"/>
  <stop offset="100%" stop-color="#C85A42"/>
</radialGradient>
```

**Progresión de grosores**: El trazo aumenta hacia el centro (0.8 → 1.4 → 1.8 → 2.5px), creando mayor definición y peso visual en el núcleo.

**ViewBox**: 48×48

### 5.2 Variantes

#### Variante Light (fondos claros)
```svg
<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="seedRadiant" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#F4A990"/>
      <stop offset="50%" stop-color="#E07A5F"/>
      <stop offset="100%" stop-color="#C85A42"/>
    </radialGradient>
  </defs>
  <circle cx="24" cy="24" r="22" stroke="#4338CA" stroke-width="0.8" stroke-dasharray="2.5 1.5" opacity="0.4" fill="none"/>
  <circle cx="24" cy="24" r="18" stroke="#6E44C0" stroke-width="1.4" opacity="0.55" fill="none"/>
  <circle cx="24" cy="24" r="14.5" stroke="#8B50AA" stroke-width="1.8" opacity="0.7" fill="none"/>
  <circle cx="24" cy="24" r="11" stroke="#C46B78" stroke-width="2.5" opacity="0.85" fill="none"/>
  <circle cx="24" cy="24" r="6.5" fill="url(#seedRadiant)"/>
  <circle cx="23.2" cy="23.2" r="2.8" fill="white" opacity="0.45"/>
</svg>
```

#### Variante Dark (fondos oscuros)
Colores más luminosos para mantener contraste:

| Elemento | Color Light | Color Dark |
|----------|-------------|------------|
| Anillo 4 (exterior) | `#4338CA` | `#FFFFFF` opacity 0.25 |
| Anillo 3 | `#6E44C0` | `#818CF8` |
| Anillo 2 | `#8B50AA` | `#A78BFA` |
| Anillo 1 | `#C46B78` | `#E879A9` |
| Semilla | Gradiente | Mismo gradiente |
| Highlight | opacity 0.45 | opacity 0.55 |

```svg
<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="seedRadiantDark" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#F4A990"/>
      <stop offset="50%" stop-color="#E07A5F"/>
      <stop offset="100%" stop-color="#C85A42"/>
    </radialGradient>
  </defs>
  <circle cx="24" cy="24" r="22" stroke="white" stroke-width="0.8" stroke-dasharray="2.5 1.5" opacity="0.25" fill="none"/>
  <circle cx="24" cy="24" r="18" stroke="#818CF8" stroke-width="1.4" opacity="0.6" fill="none"/>
  <circle cx="24" cy="24" r="14.5" stroke="#A78BFA" stroke-width="1.8" opacity="0.75" fill="none"/>
  <circle cx="24" cy="24" r="11" stroke="#E879A9" stroke-width="2.5" opacity="0.9" fill="none"/>
  <circle cx="24" cy="24" r="6.5" fill="url(#seedRadiantDark)"/>
  <circle cx="23.2" cy="23.2" r="2.8" fill="white" opacity="0.55"/>
</svg>
```

### 5.3 Favicon

Versión simplificada optimizada para tamaños pequeños (16-32px):

**Estructura (3 anillos + semilla)**:

| Elemento | Radio | Grosor | Color | Opacidad |
|----------|-------|--------|-------|----------|
| Anillo exterior | 21 | 1.5px | `#4338CA` | 0.5 |
| Anillo medio | 14 | 2px | `#8B50AA` | 0.7 |
| Anillo interno | 8 | 3px | `#C46B78` | 0.9 |
| Semilla | 4.5 | — | Gradiente | 1.0 |
| Highlight | 1.8 | — | `#FFFFFF` | 0.5 |

**Diferencias con logo principal**:
- 3 anillos en lugar de 4 (mejor legibilidad)
- Sin exterior punteado (sólido)
- Trazos más gruesos proporcionalmente
- Opacidades más altas

```svg
<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="seedFavicon" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#F4A990"/>
      <stop offset="50%" stop-color="#E07A5F"/>
      <stop offset="100%" stop-color="#C85A42"/>
    </radialGradient>
  </defs>
  <circle cx="24" cy="24" r="21" stroke="#4338CA" stroke-width="1.5" opacity="0.5" fill="none"/>
  <circle cx="24" cy="24" r="14" stroke="#8B50AA" stroke-width="2" opacity="0.7" fill="none"/>
  <circle cx="24" cy="24" r="8" stroke="#C46B78" stroke-width="3" opacity="0.9" fill="none"/>
  <circle cx="24" cy="24" r="4.5" fill="url(#seedFavicon)"/>
  <circle cx="23.3" cy="23.3" r="1.8" fill="white" opacity="0.5"/>
</svg>
```

### 5.4 Tamaños y Exportación

| Formato | Tamaños | Uso |
|---------|---------|-----|
| SVG | Vectorial | Web, documentos editables |
| PNG @1x | 48, 64, 128, 256px | Web estándar |
| PNG @2x | 96, 128, 256, 512px | Retina/HiDPI |
| ICO | 16, 32, 48px | Favicon navegador |
| PNG favicon | 180px | Apple Touch Icon |
| PNG favicon | 512px | PWA / Android |

**Tamaños mínimos**:
- Digital: 32px mínimo
- Impreso: 15mm mínimo

### 5.5 Área de Protección
Espacio libre alrededor = 25% del tamaño del logo en todos los lados.

### 5.6 Lockup (Logo + Texto)

**Variante horizontal**:
```
[Logo 44px] [gap 16px] [Texto]
                        "Liderar con Consciencia" - 18px, weight 700, Text Primary
```

**Variante horizontal con tagline**:
```
[Logo 44px] [gap 16px] [Texto vertical]
                        "Liderar con Consciencia" - 17px, weight 700, Text Primary
                        "La teoría inspira, la consciencia transforma" - 12px, weight 400, Text Muted
```

**Variante vertical (stacked)**:
```
        [Logo 56px]
        [gap 12px]
"Liderar con Consciencia" - 16px, weight 700, Text Primary, centrado
```

---

## 6. ICONOGRAFÍA DE MÓDULOS

### 6.1 Sistema de 7 Iconos

Cada módulo tiene un icono único que representa su esencia:

| Módulo | Nombre | Icono | Descripción |
|--------|--------|-------|-------------|
| M1 | Lo que soy | Cerebro/bombilla | GPS interno del líder |
| M2 | Cómo estoy | Cuerpo con pulso | Radar corporal |
| M3 | Lo que pienso-siento | Corazón-mente | Espacio de elección |
| M4 | Lo que necesito | Escudo con check | Resiliencia consciente |
| M5 | Lo que necesitamos | Personas conectadas | Liderazgo relacional |
| M6 | Lo que quiero | Brújula | La brújula interior |
| M7 | Lo que está bien | Estrella/semilla | Semilla de cambio |

### 6.2 Colores de Iconos por Módulo

Cada icono usa su color específico de la transición coral → índigo. **Los 7 colores se mantienen siempre** independientemente de que el logo use solo 4 anillos.

| Módulo | Fase | Color del icono | HEX |
|--------|------|-----------------|-----|
| M1 | Fundación | Coral | `#E07A5F` |
| M2 | Fundación | Rosa coral | `#C46B78` |
| M3 | Fundación | Rosa violeta | `#A85D91` |
| M4 | Aplicación | Violeta | `#8B50AA` |
| M5 | Aplicación | Violeta índigo | `#6E44C0` |
| M6 | Aplicación | Primary Light | `#6366F1` |
| M7 | Trascendencia | Índigo | `#4338CA` |

**Estado inactivo**: Text Muted (`#8C8697`) para todos los módulos.

> ⚠️ **Nota**: El logo usa 4 anillos (M2, M4, M5, M7) como síntesis visual, pero esto NO afecta a los iconos de módulo, que siempre usan los 7 colores completos.

### 6.3 Contenedores de Iconos

**Estado normal**:
```
width/height: 56-64px
background: White o Background Alt
border: 2px solid Border (#E8E4E0)
border-radius: 14-16px
```

**Estado activo**:
```
background: Primary Muted (#E0E7FF) o Accent Muted (#FEF2F0) para M7
border: 2px solid Primary (#4338CA) o Accent (#E07A5F) para M7
box-shadow: 0 4px 12px rgba(0,0,0,0.1)
```

---

## 7. COMPONENTES UI

### 7.1 Botones

**Primario (CTA principal)**:
```
padding: 16px 32px
background: Accent (#E07A5F)
color: White
border-radius: 14px
font-size: 15px
font-weight: 600
box-shadow: 0 4px 14px rgba(224, 122, 95, 0.4)
hover: transform translateY(-1px)
```

**Secundario**:
```
padding: 16px 32px
background: transparent
color: Text Primary
border: 2px solid Border (#E8E4E0)
border-radius: 14px
```

**Terciario (texto)**:
```
padding: 10px 20px
background: Primary (#4338CA)
color: White
border-radius: 12px
font-size: 14px
```

### 7.2 Cards

**Default**:
```
background: White
border: 1px solid Border (#E8E4E0)
border-radius: 20px
padding: 28px
```

**Elevated**:
```
background: White
box-shadow: 0 4px 24px rgba(30, 27, 46, 0.08)
border-radius: 20px
padding: 28px
```

**Accent (destacada)**:
```
background: Accent Muted (#FEF2F0)
border: 1px solid rgba(224, 122, 95, 0.2)
border-radius: 20px
padding: 28px
```

**Primary (contenido módulos)**:
```
background: Primary Subtle (#EEF2FF)
border: 1px solid rgba(67, 56, 202, 0.15)
border-radius: 20px
padding: 28-40px
```

### 7.3 Badges

**Primary**:
```
padding: 6px 14px
background: Primary Muted (#E0E7FF)
color: Primary (#4338CA)
border: 1px solid rgba(99, 102, 241, 0.25)
border-radius: 9999px
font-size: 13px
font-weight: 600
```

**Accent**:
```
padding: 6px 14px
background: Accent Muted (#FEF2F0)
color: Accent Dark (#C85A42)
border: 1px solid rgba(224, 122, 95, 0.25)
border-radius: 9999px
```

### 7.4 Citas Destacadas

```
Card Elevated + barra lateral izquierda:
  - width: 4px
  - background: Accent (#E07A5F)
  - border-radius en esquinas izquierdas
  
Texto:
  - font-size: 18px
  - font-weight: 500
  - line-height: 1.65
  - Frase destacada en Accent con font-weight 600
```

---

## 8. ELEMENTOS DECORATIVOS

### 8.1 Círculos Concéntricos (7 niveles)

A diferencia del logo (4 anillos), los círculos decorativos representan los **7 módulos completos** del programa.

> **¿Por qué 7 anillos en decorativos y 4 en el logo?**
> - **Logo (4 anillos)**: Optimizado para reconocimiento instantáneo y legibilidad a tamaños pequeños. Es una *síntesis visual* de la marca.
> - **Decorativos (7 anillos)**: Representación completa de los 7 módulos del programa. Se usan como fondos difuminados donde el detalle importa menos que el simbolismo.
> - **Ambos comparten**: La misma paleta de transición, el gradiente de semilla, y la metáfora de expansión de consciencia.

**Estructura (viewBox 160×160)**:

| Anillo | Radio | Grosor | Color | Opacidad | Estilo |
|--------|-------|--------|-------|----------|--------|
| 7 (exterior) | 75 | 0.8px | `#4338CA` | 0.25 | Punteado `2.5 1.5` |
| 6 | 62 | 1.0px | `#6366F1` | 0.3 | Sólido |
| 5 | 52 | 1.2px | `#6E44C0` | 0.4 | Sólido |
| 4 | 42 | 1.4px | `#8B50AA` | 0.5 | Sólido |
| 3 | 32 | 1.5px | `#A85D91` | 0.55 | Sólido |
| 2 | 22 | 2.0px | `#C46B78` | 0.65 | Sólido |
| 1 (interno) | 12 | 2.5px | `#C46B78` | 0.75 | Sólido |
| Semilla | 6 | — | Gradiente | 1.0 | Relleno |
| Highlight | 2.5 | — | `#FFFFFF` | 0.45 | Relleno |

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
  <defs>
    <radialGradient id="seedDeco" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#F4A990"/>
      <stop offset="50%" stop-color="#E07A5F"/>
      <stop offset="100%" stop-color="#C85A42"/>
    </radialGradient>
  </defs>
  <circle cx="80" cy="80" r="75" fill="none" stroke="#4338CA" stroke-width="0.8" stroke-dasharray="2.5 1.5" opacity="0.25"/>
  <circle cx="80" cy="80" r="62" fill="none" stroke="#6366F1" stroke-width="1" opacity="0.3"/>
  <circle cx="80" cy="80" r="52" fill="none" stroke="#6E44C0" stroke-width="1.2" opacity="0.4"/>
  <circle cx="80" cy="80" r="42" fill="none" stroke="#8B50AA" stroke-width="1.4" opacity="0.5"/>
  <circle cx="80" cy="80" r="32" fill="none" stroke="#A85D91" stroke-width="1.5" opacity="0.55"/>
  <circle cx="80" cy="80" r="22" fill="none" stroke="#C46B78" stroke-width="2" opacity="0.65"/>
  <circle cx="80" cy="80" r="12" fill="none" stroke="#C46B78" stroke-width="2.5" opacity="0.75"/>
  <circle cx="80" cy="80" r="6" fill="url(#seedDeco)"/>
  <circle cx="78.5" cy="78.5" r="2.5" fill="white" opacity="0.45"/>
</svg>
```

### 8.2 Uso como Fondo Difuminado

```css
position: absolute;
pointer-events: none;
z-index: 0;
opacity: 0.06-0.15;
```

| Contexto | Posición | Tamaño | Opacidad |
|----------|----------|--------|----------|
| Hero | top-right (-150px offset) | 450px | 0.10 |
| Hero | bottom-left (-100px offset) | 350px | 0.06 |
| Cards destacadas | top-right interno | 150px | 0.15 |
| Footer | top-right (-100px offset) | 300px | 0.05 |
| Secciones alternas | esquinas | 200-300px | 0.08 |

### 8.3 Variante Dark para Decorativos

En fondos oscuros, usar colores luminosos:
- Anillo exterior: `#FFFFFF` opacity 0.2
- Anillos interiores: `#818CF8`, `#8B5CF6`, `#A78BFA`, `#C084FC`, `#E879A9`

---

## 9. ESTRUCTURA DE PÁGINA

### 9.1 Header
```
padding: 16px 48px
background: White
border-bottom: 1px solid Border
flex: space-between
  - Logo lockup (izquierda)
  - Nav links: 14px, weight 500, Text Secondary (centro/derecha)
  - CTA button terciario (derecha)
```

### 9.2 Hero Section
```
padding: 80px 48px
position: relative (para círculos decorativos)
text-align: center
max-width contenido: 800px centrado
  - Badge accent
  - H1 con span en Accent para énfasis
  - Body Large, Text Secondary, max-width 580px
  - Card cita (elevated)
  - Grupo de botones (primario + secundario)
```

### 9.3 Secciones de Contenido
```
padding: 80px 48px
background: alternar White / Background Alt
max-width: 900-1000px centrado
  - Overline en Accent
  - H2
  - Body, Text Secondary
  - Contenido específico (cards, timeline, etc.)
```

### 9.4 Footer
```
padding: 64px 48px 32px
background: Text Primary (#1E1B2E)
color: White
  - Logo lockup (variant dark) + descripción
  - Columnas de links (títulos en Accent, uppercase)
  - Línea separadora rgba(255,255,255,0.1)
  - Copyright + links legales
```

---

## 10. APLICACIONES

### 10.1 Presentaciones (PowerPoint/Keynote)

**Slide título**:
- Fondo: Background (#FDFCFB)
- Logo esquina superior izquierda
- Título centrado: H1, Text Primary
- Círculos decorativos esquina inferior derecha
- Línea Accent inferior (4px)

**Slide contenido**:
- Fondo: White
- Título: H3, alineado izquierda
- Contenido: Body, Text Secondary
- Iconos de módulo cuando aplique
- Badge de fase si es relevante

**Slide de módulo**:
- Card Primary como contenedor principal
- Icono del módulo grande (80px)
- Número + fase en badge
- Título + subtítulo

### 10.2 Documentos (Word/PDF)

**Portada**:
- Logo centrado superior
- Título en H1
- Subtítulo en Body Large, Text Secondary
- Círculos decorativos sutiles
- Línea Accent separadora

**Páginas interiores**:
- Márgenes: 2.5cm
- Header: Logo pequeño + título documento
- Body text: 11pt Montserrat, interlineado 1.5
- Títulos: H3, Primary color
- Highlights: fondo Accent Muted

### 10.3 Emails/Newsletter

**Header**:
- Fondo Primary Muted
- Logo centrado
- Línea Accent inferior

**Contenido**:
- Fondo White
- Títulos: H4
- Body: 16px
- CTAs: botones Primary con sombra

---

## 11. PROMPT DE REFERENCIA RÁPIDA

> Usa este bloque como contexto para IAs generativas:

```
IDENTIDAD VISUAL "LIDERAR CON CONSCIENCIA"

Concepto: Ondas de consciencia expandiéndose desde una semilla radiante interior.
Metáfora: Círculos concéntricos con semilla coral-gradiente en centro.

=== SISTEMA DE 7 MÓDULOS (PERMANENTE) ===
Los 7 colores representan los 7 módulos del programa:
M1: #E07A5F (coral) → M2: #C46B78 → M3: #A85D91 → M4: #8B50AA → M5: #6E44C0 → M6: #6366F1 → M7: #4338CA (índigo)

USO DE LOS 7 COLORES:
- Iconos de módulo: SIEMPRE los 7 colores (cada módulo su color)
- Círculos decorativos: SIEMPRE 7 anillos (representan los 7 módulos)
- Logo: usa 4 de los 7 (M2, M4, M5, M7) como síntesis visual
- UI general: solo índigo + coral, NO intermedios

=== LOGO (4 anillos, viewBox 48) ===
- Exterior punteado: r=22, stroke 0.8px, #4338CA (M7), opacity 0.4, dash "2.5 1.5"
- Anillo 3: r=18, stroke 1.4px, #6E44C0 (M5), opacity 0.55
- Anillo 2: r=14.5, stroke 1.8px, #8B50AA (M4), opacity 0.7
- Anillo 1: r=11, stroke 2.5px, #C46B78 (M2), opacity 0.85
- Semilla: r=6.5, gradiente radial #F4A990 → #E07A5F → #C85A42
- Highlight: r=2.8, white, opacity 0.45

=== COLORES UI ===
- Principal: Índigo #4338CA (variantes: #3730A3 dark, #6366F1 light, #E0E7FF muted)
- Acento: Coral #E07A5F (variantes: #C85A42 dark, #F4A990 light, #FEF2F0 muted)
- Fondo: #FDFCFB (alt: #F9F7F5)
- Texto: #1E1B2E (primario), #524D5F (secundario), #8C8697 (muted)
- Borde: #E8E4E0

=== TIPOGRAFÍA ===
Outfit/Montserrat, weights 400-700
- H1: 52px/700, H2: 38px/700, H3: 28px/700
- Body: 15-18px/400, line-height 1.65-1.8

=== ESPACIADO ===
Base 8px. Cards: 28px padding, 20px radius. Secciones: 80px vertical.

=== ESTILO VISUAL ===
- Semilla con gradiente radial (calidez y profundidad)
- Grosores de trazo progresivos (mayor en centro)
- Círculos decorativos difuminados en esquinas (7 anillos = 7 módulos)
- Cards con bordes sutiles o elevación suave
- Badges pill-shaped para etiquetas
- CTAs en coral con sombra suave

TONO: Profesional pero cálido, contemporáneo, humano, inspirador sin ser esotérico.
```

---

## 12. ARCHIVOS DE REFERENCIA

### 12.1 Exportaciones
- [x] logo-light.svg — Logo variante fondos claros
- [x] logo-dark.svg — Logo variante fondos oscuros
- [x] favicon.svg — Favicon simplificado (3 anillos)
- [x] circulos-decorativos.svg — Elemento decorativo (7 anillos)
- [ ] Logo PNG @1x, @2x, @3x
- [ ] Favicon ICO/PNG (16, 32, 180, 512)
- [ ] Iconos de módulos SVG (7 archivos)
- [ ] Lockup horizontal SVG
- [ ] Lockup vertical SVG

### 12.2 Templates
- [ ] Presentación PowerPoint/Keynote
- [ ] Documento Word base
- [ ] Plantilla email HTML
- [ ] Componentes Figma/Sketch

---

*Versión 2.0 — Enero 2026*
*Liderar con Consciencia — Manual de Identidad Visual*
