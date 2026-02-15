# LIDERAR CON CONSCIENCIA — Design System Specification v1.0

> **Propósito de este documento:** Servir como referencia técnica única para cualquier agente o sesión que genere presentaciones del curso "Liderar con Consciencia". Contiene los tokens de diseño, los arquetipos de diapositiva con código HTML/CSS exacto, la biblioteca de componentes reutilizables y un protocolo de auto-auditoría.
>
> **Cómo usar este documento:** Pégalo al inicio de cualquier chat que vaya a generar una presentación de un módulo del curso. El agente debe tratar este documento como **ley de estilo vinculante** y ejecutar la checklist de auditoría antes de entregar.

---

## 1. TOKENS DE DISEÑO (Design Tokens)

### 1.1 Paleta de Color

| Token | Hex | Uso principal |
|:---|:---|:---|
| `--dark-teal` | `#1F3A3D` | Fondo de slides oscuros (portada, separadores, claims, cierre) |
| `--mid-teal` | `#2A5058` | Títulos h2 en slides claros, insight-box de fondo, badges |
| `--light-teal` | `#487878` | Headers secundarios, variante de separador |
| `--sage` | `#889088` | Texto terciario, labels, iconos desactivados |
| `--coral` | `#DC8060` | Acento principal: tags, highlights, números, líneas de énfasis |
| `--light-coral` | `#F0A080` | Bordes suaves en tarjetas de acento |
| `--cream` | `#FDFCFB` | Fondo de slides de contenido estándar |
| `--off-white` | `#F2F7F7` | Fondo de tarjetas/cajas en slides claros |
| `--warm-bg` | `#FFF0EB` | Fondo de tarjetas de acento (highlight cards) |
| `--border` | `#E8E4E0` | Líneas separadoras, bordes de tarjetas |
| `--text-primary` | `#2A3A3A` | Texto principal en slides claros |
| `--text-secondary` | `#5A6A6A` | Texto de descripción/cuerpo |
| `--text-muted` | `#A8B0A8` | Texto apagado en slides oscuros |
| `--text-light` | `#E0EBEB` | Texto claro en slides oscuros |

### 1.2 Tipografía

| Elemento | Familia | Peso | Tamaño | Tracking | Transform |
|:---|:---|:---|:---|:---|:---|
| **Portada: Módulo Tag** | Montserrat | 700 | 24px | 6px | uppercase |
| **Portada: Título h1** | Montserrat | 700 | 80px | — | — |
| **Portada: Cita** | Montserrat | 300 italic | 32px | — | — |
| **Separador: Número** | Montserrat | 700 | 180px | — | — |
| **Separador: Tag "TEMA"** | Montserrat | 600 | 20px | 4px | uppercase |
| **Separador: Título h1** | Montserrat | 700 | 64px | — | — |
| **Separador: Subtítulo** | Montserrat | 300 | 28px | — | — |
| **Contenido: Tag** | Montserrat | 700 | 16px | 2px | uppercase |
| **Contenido: Título h2** | Montserrat | 700 | 42px | — | — |
| **Contenido: Cuerpo** | Montserrat | 400 | 18–20px | — | — |
| **Contenido: Descripción** | Montserrat | 300 | 18px | — | — |
| **Claim: Título h1** | Montserrat | 700 | 90px | — | uppercase |
| **Claim: Definición** | Montserrat | 300 | 32px | — | — |
| **Claim: Sub-texto** | Montserrat | 400 italic | 24px | — | — |
| **Cierre: "Gracias"** | Montserrat | 700 | 120px | 5px | uppercase |
| **Cierre: Curso** | Montserrat | 300 | 32px | 2px | uppercase |
| **Insight-box** | Montserrat | 500 | 20–22px | — | — |
| **Quote: Texto** | Montserrat | 300 italic | 24–32px | — | — |
| **Quote: Autor** | Montserrat | 700 | 16px | 1px | uppercase |
| **Highlight (inline)** | Montserrat | 700 | hereda | — | — |

**Fuente única:** `https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap`

Para citas literarias largas, se puede añadir opcionalmente Playfair Display italic:
`https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400&display=swap`

### 1.3 Espaciado y Dimensiones

| Token | Valor | Uso |
|:---|:---|:---|
| `slide-width` | 1280px | Ancho fijo del contenedor |
| `slide-min-height` | 720px | Altura mínima (NUNCA usar `height` fijo) |
| `padding-portada` | 80px 100px | Slides oscuros centrados |
| `padding-contenido` | 60px 80px | Slides de contenido estándar |
| `padding-contenido-denso` | 40px 60px | Slides con mucho contenido |
| `header-margin-bottom` | 40px (estándar) / 30px (denso) | Separación header→contenido |
| `header-border` | 2px solid #E8E4E0 | Línea bajo el header en slides claros |
| `header-border-dark` | 1px solid rgba(255,255,255,0.1) | Línea bajo el header en slides oscuros |
| `gap-columns` | 30–40px | Separación entre columnas |
| `gap-cards` | 20–30px | Separación entre tarjetas |

### 1.4 Reglas Globales Obligatorias

```css
/* RESET OBLIGATORIO — Incluir en TODAS las diapositivas */
* { margin: 0; padding: 0; box-sizing: border-box; }

/* CONTENEDOR PRINCIPAL — NUNCA usar padding-bottom en slide-container */
.slide-container {
    width: 1280px;
    min-height: 720px;
    position: relative;
    overflow: hidden;
}
```

**Prohibiciones absolutas:**
- NUNCA `border-radius` en tarjetas o contenedores (excepto `border-radius: 50%` para círculos decorativos y bullets).
- NUNCA `box-shadow` visible (máximo `0 5px 15px rgba(0,0,0,0.03)`).
- NUNCA animaciones CSS (`@keyframes`, `transition`, `hover`).
- NUNCA `position: absolute` en contenedores principales.
- NUNCA `overflow: hidden` en el `body`.
- NUNCA CSS fuera de `.slide-container`.
- NUNCA imágenes externas o no-locales.
- NUNCA SVG inline; usar `<img>` con rutas absolutas.

---

## 2. ARQUETIPOS DE DIAPOSITIVA (Slide Archetypes)

Cada módulo debe usar estos arquetipos exactos para las diapositivas estructurales. El contenido cambia; la estructura no.

### 2.1 ARQUETIPO: Portada del Módulo

**Cuándo:** Primera diapositiva de cada módulo.
**Fondo:** `#1F3A3D` (dark-teal).
**Estructura:** Alineación izquierda. Contenido apilado verticalmente. Círculos decorativos en esquina superior derecha. Logo CSS en esquina inferior derecha.

```html
<!-- ARQUETIPO: PORTADA DEL MÓDULO -->
<div class="slide-container" style="
    width:1280px; min-height:720px; position:relative; overflow:hidden;
    background-color:#1F3A3D; display:flex; flex-direction:column;
    justify-content:center; padding:80px 100px;">

    <!-- Círculos decorativos (OBLIGATORIOS) -->
    <div style="position:absolute; border-radius:50%; border:1px solid rgba(255,255,255,0.05);
        width:900px; height:900px; top:-300px; right:-300px; pointer-events:none;"></div>
    <div style="position:absolute; border-radius:50%; border:1px solid rgba(220,128,96,0.1);
        width:700px; height:700px; top:-200px; right:-200px; pointer-events:none;"></div>
    <div style="position:absolute; border-radius:50%; border:1px solid rgba(220,128,96,0.15);
        width:500px; height:500px; top:-100px; right:-100px; pointer-events:none;"></div>

    <div style="position:relative; z-index:1; max-width:950px;">
        <!-- Tag del módulo -->
        <span style="color:#DC8060; font-size:24px; font-weight:700;
            letter-spacing:6px; margin-bottom:30px; text-transform:uppercase;
            display:block;">Módulo XX</span>

        <!-- Título principal -->
        <h1 style="font-size:80px; font-weight:700; line-height:1.05;
            margin-bottom:50px; color:#FFFFFF;">
            Consciente de lo<br>que [Tema]
        </h1>

        <!-- Línea de acento (OBLIGATORIA) -->
        <div style="width:140px; height:8px; background-color:#DC8060;
            margin-bottom:60px;"></div>

        <!-- Cita de apertura -->
        <div style="border-left:5px solid #DC8060; padding-left:40px; margin-top:20px;">
            <p style="font-size:32px; font-weight:300; font-style:italic;
                line-height:1.4; color:#E0EBEB;">
                "Cita relevante del módulo."
            </p>
        </div>
    </div>

    <!-- Logo CSS (OBLIGATORIO, esquina inferior derecha) -->
    <div style="position:absolute; bottom:80px; right:80px; width:100px; height:100px; z-index:2;">
        <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
            border-radius:50%; border:1px solid rgba(220,128,96,0.4);
            width:100%; height:100%; box-sizing:border-box;"></div>
        <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
            border-radius:50%; border:2px solid rgba(220,128,96,0.7);
            width:70%; height:70%; box-sizing:border-box;"></div>
        <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
            border-radius:50%; border:3px solid #DC8060;
            width:40%; height:40%; box-sizing:border-box;"></div>
        <div style="width:16%; height:16%; background:#DC8060; border-radius:50%;
            position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);"></div>
    </div>
</div>
```

**Variables a cambiar:** Número de módulo, título, cita.

---

### 2.2 ARQUETIPO: Separador de Tema

**Cuándo:** Primera diapositiva de cada tema/sección dentro del módulo.
**Fondo:** `#1F3A3D` (dark-teal).
**Estructura:** Layout horizontal. Número grande (180px) a la izquierda con barra vertical coral. Texto a la derecha.

```html
<!-- ARQUETIPO: SEPARADOR DE TEMA -->
<div class="slide-container" style="
    width:1280px; min-height:720px; position:relative; overflow:hidden;
    background-color:#1F3A3D; display:flex; flex-direction:column;
    justify-content:center; padding:80px 100px;">

    <!-- Círculos decorativos (2 en separadores) -->
    <div style="position:absolute; border-radius:50%; border:1px solid rgba(255,255,255,0.05);
        width:800px; height:800px; top:-200px; right:-200px; pointer-events:none;"></div>
    <div style="position:absolute; border-radius:50%; border:1px solid rgba(220,128,96,0.1);
        width:600px; height:600px; top:-100px; right:-100px; pointer-events:none;"></div>

    <div style="position:relative; z-index:1; display:flex; align-items:flex-start;">
        <!-- Bloque numérico -->
        <div style="margin-right:60px; position:relative; padding-right:40px;">
            <div style="font-size:180px; font-weight:700; color:#DC8060;
                line-height:0.8; opacity:0.9;">01</div>
            <div style="width:6px; height:100%; min-height:160px; background-color:#DC8060;
                position:absolute; right:0; top:5px;"></div>
        </div>

        <!-- Bloque de texto -->
        <div style="max-width:800px; padding-top:10px; padding-left:20px;">
            <span style="color:#E0EBEB; font-size:20px; font-weight:600;
                letter-spacing:4px; margin-bottom:20px; text-transform:uppercase;
                display:block; opacity:0.8;">TEMA</span>
            <h1 style="font-size:64px; font-weight:700; line-height:1.1;
                margin-bottom:30px; color:#FFFFFF;">
                Título del<br>Tema
            </h1>
            <p style="font-size:28px; font-weight:300; color:#E0EBEB;
                line-height:1.4; max-width:700px;">
                Subtítulo descriptivo del tema.
            </p>
        </div>
    </div>
</div>
```

**Variables a cambiar:** Número (01, 02, 03, 04), título, subtítulo.

---

### 2.3 ARQUETIPO: Contenido Estándar (Fondo Claro)

**Cuándo:** Diapositivas de desarrollo de contenido.
**Fondo:** `#FDFCFB` (cream).
**Estructura:** Header con tag + título h2 + línea separadora. Contenido debajo.

```html
<!-- ARQUETIPO: CONTENIDO ESTÁNDAR -->
<div class="slide-container" style="
    width:1280px; min-height:720px; position:relative; overflow:hidden;
    background-color:#FDFCFB; display:flex; flex-direction:column;
    padding:60px 80px;">

    <!-- HEADER (OBLIGATORIO en toda slide de contenido) -->
    <div style="margin-bottom:40px; border-bottom:2px solid #E8E4E0; padding-bottom:20px;">
        <span style="color:#DC8060; font-size:16px; font-weight:700;
            letter-spacing:2px; text-transform:uppercase; display:block;
            margin-bottom:10px;">TAG EN MAYÚSCULAS</span>
        <h2 style="font-size:42px; font-weight:700; color:#2A5058; margin:0;">
            Título de la diapositiva
        </h2>
    </div>

    <!-- ZONA DE CONTENIDO (varía según el tipo) -->
    <div style="flex-grow:1; display:flex; gap:40px;">
        <!-- Aquí va el contenido específico -->
    </div>
</div>
```

**Regla:** El header SIEMPRE tiene la misma estructura: Tag (coral, 16px, uppercase) + h2 (mid-teal, 42px, 700) + border-bottom.

---

### 2.4 ARQUETIPO: Claim / Impacto (Fondo Oscuro)

**Cuándo:** Diapositivas de alto impacto emocional, revelaciones, manifiestos, citas clave.
**Fondo:** `#1F3A3D` (dark-teal).
**Estructura:** Centrado vertical y horizontal. Tipografía grande. Mínimo contenido.

```html
<!-- ARQUETIPO: CLAIM / IMPACTO -->
<div class="slide-container" style="
    width:1280px; min-height:720px; position:relative; overflow:hidden;
    background-color:#1F3A3D; display:flex; flex-direction:column;
    justify-content:center; align-items:center;
    padding-top:80px; padding-left:100px; padding-right:100px;
    text-align:center;">

    <!-- Tag superior -->
    <span style="color:#E0EBEB; font-size:20px; font-weight:600;
        letter-spacing:4px; margin-bottom:30px; text-transform:uppercase;
        display:block; opacity:0.8;">CATEGORÍA</span>

    <!-- Título de impacto -->
    <h1 style="font-size:90px; font-weight:700; line-height:1; margin-bottom:50px;
        color:#DC8060; text-transform:uppercase;">
        CONCEPTO CLAVE
    </h1>

    <!-- Definición enmarcada -->
    <div style="border-top:2px solid #DC8060; border-bottom:2px solid #DC8060;
        padding-top:40px; padding-left:60px; padding-right:60px; max-width:900px;">
        <p style="font-size:32px; font-weight:300; line-height:1.4; color:#FFFFFF;
            margin-bottom:30px;">
            Definición o frase de impacto con <span style="font-weight:700;
            color:#E0EBEB;">palabra clave</span> destacada.
        </p>
    </div>

    <!-- Sub-texto -->
    <p style="font-size:24px; color:#A8B0A8; font-style:italic; margin-top:40px;">
        "Cita complementaria o reflexión."
    </p>
</div>
```

---

### 2.5 ARQUETIPO: Cierre / Gracias

**Cuándo:** Penúltima diapositiva de cada módulo.
**Fondo:** `#1F3A3D` (dark-teal).
**Estructura:** Centrado absoluto. "Gracias" en coral 120px. Línea blanca. Nombre del curso.

```html
<!-- ARQUETIPO: CIERRE / GRACIAS -->
<div class="slide-container" style="
    width:1280px; min-height:720px; position:relative; overflow:hidden;
    background-color:#1F3A3D; display:flex; flex-direction:column;
    justify-content:center; align-items:center; padding:80px;">

    <!-- Círculos decorativos centrados -->
    <div style="position:absolute; width:900px; height:900px;
        border:1px solid rgba(255,255,255,0.03); border-radius:50%;
        top:50%; left:50%; transform:translate(-50%,-50%); pointer-events:none;"></div>
    <div style="position:absolute; width:700px; height:700px;
        border:1px solid rgba(220,128,96,0.05); border-radius:50%;
        top:50%; left:50%; transform:translate(-50%,-50%); pointer-events:none;"></div>

    <div style="z-index:1; text-align:center;">
        <h1 style="font-size:120px; font-weight:700; color:#DC8060;
            letter-spacing:5px; margin-bottom:20px; text-transform:uppercase;
            line-height:1;">Gracias</h1>
        <div style="width:80px; height:4px; background-color:#FFFFFF;
            margin:0 auto 40px auto;"></div>
        <div style="font-size:32px; font-weight:300; color:#FFFFFF;
            letter-spacing:2px; text-transform:uppercase;">
            Liderar con Consciencia
        </div>
        <div style="margin-top:60px; font-size:18px; color:#A8B0A8;
            letter-spacing:1px;">
            www.liderarconconsciencia.com
        </div>
    </div>
</div>
```

**Regla:** Esta diapositiva es IDÉNTICA en todos los módulos. No se personaliza.

---

### 2.6 ARQUETIPO: Referencias

**Cuándo:** Última diapositiva de cada módulo.
**Fondo:** `#FDFCFB` (cream).
**Estructura:** Header estándar + Grid de 2 columnas con items bordeados a la izquierda en coral.

```html
<!-- ARQUETIPO: REFERENCIAS -->
<div class="slide-container" style="
    width:1280px; min-height:720px; position:relative; overflow:hidden;
    background-color:#FDFCFB; display:flex; flex-direction:column;
    padding:60px 80px;">

    <!-- Header estándar -->
    <div style="margin-bottom:50px; border-bottom:2px solid #E8E4E0; padding-bottom:20px;">
        <span style="color:#DC8060; font-size:16px; font-weight:700;
            letter-spacing:2px; text-transform:uppercase; display:block;
            margin-bottom:10px;">PARA PROFUNDIZAR</span>
        <h2 style="font-size:42px; font-weight:700; color:#2A5058; margin:0;">
            Fuentes principales
        </h2>
    </div>

    <!-- Grid de referencias -->
    <div style="display:grid; grid-template-columns:1fr 1fr; column-gap:60px; row-gap:30px;">
        <div style="padding-left:20px; border-left:3px solid #DC8060;">
            <span style="font-size:20px; font-weight:700; color:#2A5058;
                display:block; margin-bottom:5px;">Autor, A. (Año)</span>
            <span style="font-size:20px; font-style:italic; color:#5A6A6A;
                line-height:1.4;">Título del libro o artículo.</span>
            <span style="font-size:16px; color:#889088; margin-top:5px;
                display:block;">Concepto: Nombre del concepto.</span>
        </div>
        <!-- Repetir para cada referencia -->
    </div>
</div>
```

---

## 3. BIBLIOTECA DE COMPONENTES (Component Library)

Estos son los "bloques de construcción" que se combinan dentro de las diapositivas de contenido.

### 3.1 Insight Box (Caja de Mensaje Principal)

**Uso:** Cierre de una diapositiva con un mensaje clave. Se coloca al final del contenido.

```css
.insight-box {
    background-color: #2A5058;
    color: #FFFFFF;
    padding: 20px;
    text-align: center;
    font-size: 22px;
    font-weight: 500;
    margin-top: auto;
}
.insight-box .highlight {
    color: #DC8060;
    font-weight: 700;
}
```

**Variante clara (para slides oscuros):**
```css
.insight-box-light {
    background-color: #F2F7F7;
    border-left: 4px solid #2A5058;
    padding: 20px;
    font-size: 18px;
    color: #5A6A6A;
    font-style: italic;
}
```

### 3.2 Quote Card (Tarjeta de Cita)

**Uso:** Citas de autores dentro de slides de contenido.

```css
.quote-card {
    background-color: #F2F7F7;
    padding: 30px;
    border-left: 6px solid #DC8060;
}
.quote-text {
    font-size: 24px;
    font-style: italic;
    color: #2A5058;
    line-height: 1.4;
    margin-bottom: 15px;
}
.quote-author {
    font-size: 16px;
    font-weight: 700;
    color: #DC8060;
    text-transform: uppercase;
    letter-spacing: 1px;
}
```

### 3.3 Comparison Columns (Columnas de Comparación)

**Uso:** Contrastes tipo "A vs B" (Cumplimiento vs Virtud, Técnico vs Ético, etc.).

```css
.comparison-container { display: flex; gap: 40px; flex-grow: 1; }
.column { flex: 1; padding: 25px; display: flex; flex-direction: column; }

/* Columna izquierda (lo "viejo" o "insuficiente") */
.col-left {
    background-color: #F2F7F7;
    border: 1px solid #E0EBEB;
}
.col-left .col-title { color: #5A6A6A; }

/* Columna derecha (lo "nuevo" o "deseable") */
.col-right {
    background-color: #FFF0EB;
    border: 1px solid #F0A080;
}
.col-right .col-title { color: #DC8060; }

/* Título de columna */
.col-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
    padding-bottom: 15px;
    border-bottom: 2px solid rgba(0,0,0,0.05);
}
```

### 3.4 Module Card (Tarjeta de Módulo/Tema)

**Uso:** Mapas de módulo, grids de temas, listas de capacidades.

```css
.module-card {
    background-color: #FFFFFF;
    border: 1px solid #E8E4E0;
    padding: 30px;
    display: flex;
    flex-direction: column;
    position: relative;
    border-left: 6px solid #2A5058;
}
.card-number {
    font-size: 48px;
    font-weight: 700;
    color: #E0EBEB;
    position: absolute;
    top: 20px;
    right: 20px;
    line-height: 1;
}
.card-title {
    font-size: 24px;
    font-weight: 700;
    color: #2A5058;
    margin-bottom: 15px;
    padding-right: 40px;
}
.card-desc {
    font-size: 18px;
    line-height: 1.5;
    color: #5A6A6A;
}

/* Variante destacada (último tema o tema actual) */
.module-card-accent {
    background-color: #FFF0EB;
    border-left-color: #DC8060;
    border-color: #F0A080;
}
.module-card-accent .card-number { color: rgba(220, 128, 96, 0.2); }
.module-card-accent .card-title { color: #DC8060; }
```

### 3.5 Synthesis Item (Item de Síntesis)

**Uso:** Diapositiva de síntesis final ("Las 3 ideas clave").

```css
.synthesis-item {
    display: flex;
    align-items: flex-start;
    padding: 20px;
    background-color: #FFFFFF;
    border-left: 6px solid #2A5058;
    box-shadow: 0 5px 15px rgba(0,0,0,0.03);
}
.item-number {
    font-size: 48px;
    font-weight: 700;
    color: #DC8060;
    margin-right: 30px;
    line-height: 1;
    opacity: 0.8;
}
.item-title {
    font-size: 24px;
    font-weight: 700;
    color: #2A5058;
    margin-bottom: 10px;
    text-transform: uppercase;
}
.item-desc {
    font-size: 18px;
    color: #5A6A6A;
    line-height: 1.5;
}
```

### 3.6 Reference Item (Item de Referencia)

**Uso:** Diapositiva de referencias bibliográficas.

```css
.ref-item {
    padding-left: 20px;
    border-left: 3px solid #DC8060;
}
.ref-author {
    font-size: 20px;
    font-weight: 700;
    color: #2A5058;
    display: block;
    margin-bottom: 5px;
}
.ref-title {
    font-size: 20px;
    font-style: italic;
    color: #5A6A6A;
    line-height: 1.4;
}
.ref-note {
    font-size: 16px;
    color: #889088;
    margin-top: 5px;
    display: block;
}
```

### 3.7 Highlight (Texto Destacado Inline)

**Uso:** Dentro de cualquier texto para enfatizar una palabra o frase clave.

```css
/* En slides claros */
.highlight { color: #DC8060; font-weight: 700; }

/* En slides oscuros */
.highlight-light { color: #E0EBEB; font-weight: 700; }
```

### 3.8 Accent Line (Línea de Acento)

**Uso:** Separador visual entre secciones dentro de una diapositiva.

```css
.accent-line {
    width: 140px;
    height: 8px;
    background-color: #DC8060;
}
/* Variante corta */
.accent-line-short {
    width: 80px;
    height: 4px;
    background-color: #FFFFFF; /* En slides oscuros */
}
```

### 3.9 Step/Phase Header (Header de Fase)

**Uso:** En diapositivas de proceso (ANTES/DURANTE/DESPUÉS) o pasos numerados.

```css
.step-header {
    padding: 15px 20px;
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 20px;
}
/* Variantes de color por fase */
.step-header-1 { background-color: #2A5058; }
.step-header-2 { background-color: #487878; }
.step-header-3 { background-color: #DC8060; }
```

---

## 4. REGLAS DE COMPOSICIÓN

### 4.1 Estructura Narrativa Obligatoria de Cada Módulo

Toda presentación de un módulo DEBE seguir esta secuencia:

| # | Tipo | Arquetipo | Fondo |
|:---|:---|:---|:---|
| 1 | Portada del Módulo | §2.1 | Oscuro |
| 2 | Contexto / Recapitulación | Contenido Estándar | Claro |
| 3 | La Brecha (tensión del módulo) | Claim/Impacto | Oscuro |
| 4 | Tesis Central | Contenido Estándar | Claro |
| 5 | Mapa del Módulo (4 temas) | Contenido Estándar | Claro |
| 6–N | Temas (cada uno empieza con Separador §2.2) | Mixto | Alternado |
| N+1 | Síntesis (3 ideas clave) | Contenido Estándar | Claro |
| N+2 | Gracias | §2.5 | Oscuro |
| N+3 | Referencias | §2.6 | Claro |

### 4.2 Alternancia de Fondos

- **Nunca** más de 3 diapositivas consecutivas con el mismo fondo.
- Los separadores de tema (§2.2) SIEMPRE son oscuros.
- Las diapositivas de contenido SIEMPRE son claras (cream).
- Los claims/impacto SIEMPRE son oscuros.
- Esto crea un ritmo visual natural: claro-claro-oscuro-claro-claro-oscuro...

### 4.3 Densidad de Contenido

- **Máximo 4 puntos principales** por diapositiva.
- Si un concepto necesita más de 4 puntos, dividir en 2 diapositivas.
- El texto de cuerpo nunca debe superar las 6 líneas por bloque.
- Preferir visualización (diagrama, comparación, lista visual) sobre párrafos.

---

## 5. PROTOCOLO DE AUTO-AUDITORÍA

Antes de entregar cualquier presentación, el agente DEBE ejecutar esta checklist y reportar el resultado.

### 5.1 Checklist Técnica (por diapositiva)

```
□ ¿El contenedor es width:1280px y min-height:720px?
□ ¿Se usa overflow:hidden SOLO en .slide-container?
□ ¿NO hay padding-bottom en .slide-container?
□ ¿NO hay border-radius en tarjetas o contenedores?
□ ¿NO hay box-shadow mayor a rgba(0,0,0,0.03)?
□ ¿NO hay animaciones CSS (@keyframes, transition, hover)?
□ ¿La fuente es Montserrat (cargada vía Google Fonts)?
□ ¿Los colores usados están en la tabla de tokens (§1.1)?
□ ¿El tag del header es coral (#DC8060), 16px, 700, uppercase, letter-spacing:2px?
□ ¿El título h2 es mid-teal (#2A5058), 42px, 700?
□ ¿El header tiene border-bottom: 2px solid #E8E4E0?
□ ¿Las imágenes (si hay) usan rutas absolutas locales?
□ ¿NO hay SVG inline?
```

### 5.2 Checklist Estructural (por presentación)

```
□ ¿La primera diapositiva usa el Arquetipo Portada (§2.1)?
□ ¿Cada tema empieza con el Arquetipo Separador (§2.2)?
□ ¿Los números de los separadores son secuenciales (01, 02, 03, 04)?
□ ¿Hay una diapositiva de Mapa del Módulo con grid 2x2?
□ ¿Hay una diapositiva de Síntesis con exactamente 3 items?
□ ¿La penúltima diapositiva es "Gracias" (§2.5)?
□ ¿La última diapositiva es "Referencias" (§2.6)?
□ ¿No hay más de 3 slides consecutivas con el mismo fondo?
□ ¿Todos los claims/impacto usan fondo oscuro?
□ ¿Todos los contenidos estándar usan fondo claro (cream)?
```

### 5.3 Checklist de Identidad Visual (global)

```
□ ¿Se usa SOLO la paleta definida en §1.1? (No hay grises, azules o verdes no listados)
□ ¿El coral (#DC8060) se usa SOLO para acentos (tags, highlights, números, líneas)?
□ ¿El dark-teal (#1F3A3D) se usa SOLO como fondo de slides oscuros?
□ ¿El mid-teal (#2A5058) se usa para títulos h2 y insight-boxes?
□ ¿Los círculos decorativos aparecen en Portada, Separadores y Cierre?
□ ¿El logo CSS aparece SOLO en la Portada?
□ ¿La diapositiva "Gracias" es idéntica al arquetipo (§2.5)?
□ ¿NO se usan emojis en diapositivas formales? (Permitidos solo en listas comparativas)
```

---

## 6. INSTRUCCIONES DE USO PARA OTROS CHATS

### Para el usuario:

1. **Copia este documento completo** y pégalo como mensaje inicial (o adjúntalo como archivo) en cualquier chat que vaya a generar una presentación de un módulo.

2. **Añade esta instrucción al inicio:**

> "Antes de generar cualquier diapositiva, lee y memoriza el documento `LIDERAR_Design_System_Spec.md` adjunto. Es la especificación de diseño vinculante. Toda diapositiva que generes DEBE cumplir con los arquetipos, tokens y componentes definidos. Al finalizar, ejecuta la checklist de auto-auditoría (§5) y reporta el resultado."

3. **Proporciona el contenido del módulo** (ficheros markdown) como de costumbre.

4. **Verifica** que el agente reporte la checklist antes de entregar.

### Para el agente:

- Los arquetipos de §2 son **plantillas exactas**. No los "interpretes"; cópialos y cambia solo las variables indicadas.
- Los componentes de §3 son **bloques reutilizables**. Combínalos dentro de los arquetipos de contenido.
- Si necesitas un componente que no está en §3, créalo siguiendo los mismos patrones (colores de §1.1, tipografía de §1.2, sin border-radius, sin animaciones).
- Ejecuta §5 antes de entregar. Si algún check falla, corrige antes de presentar.

---

*Documento generado a partir de la presentación validada del Módulo 07: "Consciente de lo que Está Bien".*
*Versión 1.0 — Febrero 2026.*
