# Prompt: Normalización de Módulo — Frontmatter, Footnotes, Wikilinks

## Objetivo

Normalizar archivos de contenido teórico del curso "Liderar con Consciencia":
1. Añadir o mejorar frontmatter YAML
2. Convertir citas inline a footnotes markdown
3. Eliminar wikilinks Obsidian y usar markdown estándar

**Principio:** NO se modifica la redacción. Solo se añade/corrige estructura.

### Ruta de trabajo

**NUNCA modificar directamente los archivos de producción en `CURSO/`.** Todo el trabajo se realiza sobre las copias en `_wip/curso/Perfeccionamiento Curso/`. Solo se promueven a `CURSO/` mediante el proceso formal de promoción.

---

## 1. Frontmatter YAML

Cada archivo temático debe tener frontmatter YAML al inicio:

```yaml
---
id: mNN-TT
titulo: "Título del tema"
modulo: N
orden: TT
tags: [tag1, tag2, tag3]
ultima_actualizacion: "DD/MM/YYYY"
---
```

### Reglas de tags en frontmatter

| Tipo de archivo | Regla de tags |
|----------------|---------------|
| **Apertura** (mNN-00) | NO lleva tags en frontmatter |
| **Tema** (mNN-01 a mNN-10) | Tags específicos del concepto tratado. Deben ser relevantes y permitir construir una taxonomía del curso. Evitar tags genéricos (`neurociencia`, `cerebro`); preferir conceptos específicos (`cerebro-predictivo`, `free-energy`, `percepcion-constructiva`) |
| **Síntesis** (mNN-XX-sintesis) | Tags a nivel de módulo que cubran los conceptos principales de TODOS los temas del módulo |
| **Práctica** (mNN-entren-*) | `[práctica, modulo-N]` + tipo de práctica específico |

**Criterio de calidad:** Un buen tag de frontmatter es lo suficientemente específico para distinguir este tema de los demás, pero lo suficientemente general para ser útil como categoría en una taxonomía del curso completo.

---

## 2. Enlaces internos (wikilinks)

**Prohibido:** Sintaxis Obsidian wikilinks: `[[#sección|texto]]`, `[[nota]]`

**Usar:** Markdown estándar: `[texto](#sección)`, `[texto](ruta/archivo.md)`

### Conversión de TOC

Las tablas de contenido internas deben convertirse de:
```markdown
- [[#Sección con título|Sección con título]]
	- [[#Sección con título#Subsección|Subsección]]
```

A:
```markdown
- [Sección con título](#sección-con-título)
	- [Subsección](#subsección)
```

**Reglas de anclas markdown:**
- Todo a minúsculas
- Espacios → guiones (`-`)
- Se eliminan caracteres especiales (`:`, `.`, `(`, `)`, `?`, `!`, `,`)
- Tildes se conservan (`á`, `é`, `í`, `ó`, `ú`, `ñ`)
- Las subsecciones Obsidian `#Padre#Hijo` → solo el ancla del hijo `#hijo`
- Los tags inline como `#aux` o `#insight` en los encabezados NO forman parte del ancla

---

## 3. Referencias y fuentes (footnotes)

Usar footnotes de markdown para cualquier fuente que soporte una afirmación: estudios, libros, informes, artículos, webs, autores, etc.

**En el texto:**
```markdown
La expresión facial influye en la experiencia emocional[^1].
```

**Al final de la sección o documento:**
```markdown
[^1]: Strack, Martin y Stepper (1988). Inhibiting and facilitating conditions of the human smile.
```

### Tipos de fuentes que requieren footnote

| Tipo | Ejemplo de formato |
|------|-------------------|
| Estudio académico | Kahneman, D. (2011). Thinking, Fast and Slow. |
| Libro | Goleman, D. (1995). Inteligencia Emocional. Kairós. |
| Informe/consultora | McKinsey Global Institute (2023). The State of AI in 2023. |
| Artículo web | Brené Brown. "The Power of Vulnerability". TED.com |
| Blog de referencia | Seth Godin. "The practice of shipping". seths.blog |
| Autor en redes | Adam Grant [@AdamMGrant]. Publicación en LinkedIn, 2024. |
| Think tank | World Economic Forum (2024). Future of Jobs Report. |
| Entrevista/podcast | Tim Ferriss Show, episodio 234: "Naval Ravikant". |
| Artículo de revista | TIME Magazine (2014). "The Mindful Revolution". |
| Mención de autor/teoría | Tallon-Baudry y Damasio. Teoría del Marco Subjetivo Neuronal. |
| Modelo/matriz/framework | The Wise Compassion Flywheel (Potential Project). |
| Investigación institucional | Universidad de Londres. Estudio sobre ciclo cardíaco y percepción. |

### NO requiere footnote
- Conocimiento general del campo sin atribución específica
- Afirmaciones que el texto original no atribuye a nadie
- Conceptos establecidos sin autor identificable ("la respuesta de lucha o huida")

### Principios

**Regla principal:** Si el texto original menciona una fuente, persona o entidad como respaldo de una afirmación, esa mención debe convertirse en footnote.

**Mención de autores:** Cuando el texto menciona autores por nombre asociados a una teoría o hallazgo, crear footnote aunque no aparezca año ni obra. Usar la información disponible.

**Regla anti-invención:** Solo crear footnotes para fuentes explícitamente mencionadas en el texto original. NUNCA inventar fuentes, completar datos bibliográficos no mencionados, ni añadir referencias que no estén en el texto original.

**Alcance:** Los criterios de footnotes aplican a TODO el contenido del documento, incluyendo descripciones de `#imagen`, `#video` y otros recursos multimedia.

**Numeración:** Los footnotes `[^n]` se numeran según orden de aparición en el documento, de arriba a abajo.

### Limpieza de artefactos

Los documentos convertidos desde PowerPoint/Word pueden tener comas residuales donde había superíndices de citas (`,. `, `,,,`, `,,`). Limpiar estos artefactos al añadir footnotes.

---

## Validación

### Frontmatter
- [ ] Frontmatter YAML presente y completo en cada archivo
- [ ] `id` con formato `mNN-TT`
- [ ] Tags según reglas por tipo de archivo (apertura sin tags, temas con tags específicos, síntesis con tags de módulo)
- [ ] Tags no genéricos (evitar `neurociencia`, `cerebro`, `consciencia`)

### Wikilinks
- [ ] Cero wikilinks `[[` en todo el documento
- [ ] Todos los enlaces internos usan formato estándar `[texto](#ancla)`
- [ ] Anclas en minúsculas con guiones

### Footnotes
- [ ] Fuentes mencionadas en el texto usan footnotes `[^n]`
- [ ] Footnotes incluyen información suficiente para identificar la fuente
- [ ] No se han inventado fuentes ni completado datos no presentes en el original
- [ ] Numeración secuencial según orden de aparición
- [ ] Artefactos de comas residuales limpiados
