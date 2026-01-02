# Guía de Convenciones: Liderar con Consciencia

## Estructura de carpetas

```
LiderarConsciencia/
├── 00-indice-curso.md
├── modulo-XX-nombre-del-modulo/
│   ├── mXX-00-indice.md
│   ├── mXX-NN-nombre-seccion.md
│   ├── mXX-eNN-ejercicio.md
│   └── recursos/
│       ├── imagenes/
│       ├── videos/
│       └── referencias/
└── _templates/
```

## Nomenclatura de archivos

| Tipo | Patrón | Ejemplo |
|------|--------|---------|
| Carpeta módulo | `modulo-XX-nombre` | `modulo-01-consciente-de-lo-que-soy` |
| Índice módulo | `mXX-00-indice.md` | `m01-00-indice.md` |
| Sección teórica | `mXX-NN-nombre.md` | `m01-05-los-dos-sistemas.md` |
| Ejercicio | `mXX-eNN-nombre.md` | `m01-e01-atencion-focalizada.md` |
| Imagen | `mXX-nombre.png` | `m01-modelo-cerebro.png` |
| Vídeo | `mXX-vNN-nombre.mp4` | `m01-v01-introduccion.mp4` |

## Sistema de tags

### Tags de página (frontmatter YAML)
Temáticas generales. Van al inicio del archivo:

```yaml
---
id: m01-05
titulo: "Los dos sistemas de pensamiento"
modulo: 1
orden: 5
tags: [neurociencia, kahneman, toma-decisiones]
---
```

### Tags inline (tipo de contenido)
Marcan secciones dentro del archivo:

| Tag | Uso |
|-----|-----|
| `#teoria` | Contenido conceptual |
| `#ejercicio` | Práctica guiada |
| `#reflexion` | Pregunta para el alumno |
| `#video` | Referencia a vídeo |
| `#metafora` | Analogía o ejemplo ilustrativo |
| `#referencias` | Bibliografía |
| `#insight-clave` | Idea central destacada |

## Configuración Obsidian (obligatoria)

Settings → Files and links:
- **Use [[Wikilinks]]** → OFF
- **New link format** → Relative path to file

Esto genera links compatibles con GitHub: `[texto](./archivo.md)`

## Templates disponibles

| Template | Función |
|----------|---------|
| `Generar Indice Curso` | Lista módulos con links |
| `Generar Indice Modulo` | Lista secciones del módulo actual |
| `Nueva Seccion` | Crea archivo con frontmatter correcto |

## Flujo de trabajo

1. **Escribir contenido** → Los links son automáticamente compatibles
2. **Añadir/quitar archivos** → Regenerar índice del módulo afectado
3. **Commit y push** → GitHub renderiza correctamente

## Qué funciona en cada plataforma

| Elemento | Obsidian | GitHub |
|----------|----------|--------|
| Frontmatter YAML | Metadata oculta | Oculto (parseable) |
| `#teoria` | Tag buscable | Texto visible |
| `[texto](./archivo.md)` | Link activo | Link activo |
| Dataview queries | Ejecuta en vivo | No aplica |

## Pendiente: Script de transformación (futuro)

Para el repositorio consumido por agentes IA, se creará un script que:

1. Lee los archivos Markdown del repo fuente
2. Transforma tags inline `#teoria` a formato JSON en comentario HTML:
   ```html
   <!--lc: {"tags": ["teoria"]} -->
   ```
3. Genera `index.json` con metadata de todos los archivos
4. Escribe el resultado en un segundo repositorio optimizado para IA

Este script **no afecta** al flujo de trabajo en Obsidian. Se ejecutará manualmente o vía GitHub Action cuando sea necesario.

---

*Última actualización: Enero 2025*
