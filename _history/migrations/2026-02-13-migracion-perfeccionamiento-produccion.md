# Migración: Perfeccionamiento → Producción (CURSO/)

**Fecha:** 2026-02-13
**Versión backup:** v3-pre-perfeccionamiento
**Tipo:** Reemplazo completo de módulos

## Qué se hizo

Promoción del trabajo de perfeccionamiento realizado entre 2026-02-05 y 2026-02-12 desde `_wip/curso/Perfeccionamiento Curso/` a `CURSO/`.

### Diferencia con migración anterior (v2, 2026-01-27)
La migración v2 solo reemplazó archivos `.md` preservando `recursos/` y `Prácticas-entrenamiento/`. **Esta migración reemplazó carpetas de módulo completas** porque los `.md` perfeccionados referencian `assets/` (no `recursos/imagenes/`), las carpetas `assets/` contienen los 612 recursos etiquetados, y las `Prácticas-entrenamiento/` fueron actualizadas.

## Trabajo incluido en esta promoción

| Tarea | Alcance |
|-------|---------|
| Etiquetado de recursos | 612 recursos en 8 módulos (m00-m07) |
| Frontmatter YAML | 61 archivos .md con metadatos estructurados |
| Conversión wikilinks | ~547 wikilinks → markdown estándar |
| Footnotes académicos | ~135 footnotes verificados/añadidos |

## Operaciones realizadas

### FASE 0: Backup
- Destino: `CURSO/_backup/v3-pre-perfeccionamiento/`
- Contenido: 8 carpetas de módulo completas + 2 archivos .md raíz

### FASE 1: Eliminación
- 8 carpetas `modulo-XX-*` de CURSO/
- `00-indice-general-curso.md`
- `La progresión epistemológica del programa.md`

### FASE 2: Copia
- Origen: `_wip/curso/Perfeccionamiento Curso/`
- 8 carpetas `modulo-XX-*` (con `assets/`, `Prácticas-entrenamiento/`, `recursos/` donde existía)
- `00-indice-general-curso.md`
- `La progresión epistemológica del programa.md`
- NO copiado: `0-Auxiliar/`, `a_InfografíasNotebook/`, `b_PresentacionesNotebook/`

### Infraestructura preservada (no tocada)
- `CURSO/README.md`
- `CURSO/CLAUDE.md`
- `CURSO/Documentos/`
- `CURSO/_backup/`

## Verificación post-migración

| Verificación | Resultado |
|-------------|-----------|
| Carpetas modulo-XX-* | 8 carpetas presentes |
| Carpeta assets/ por módulo | 8/8 presentes |
| Archivos .md | M00:6, M01:12, M02:7, M03:8, M04:8, M05:8, M06:6, M07:6 (total: 61) |
| Referencias a assets/ | Verificadas |
| Frontmatter YAML | Presente en archivos .md |
| Backup v3 | Completo con 8 módulos + 2 archivos raíz |

## Pendiente post-migración
- Actualizar `CURSO/CLAUDE.md` (sistema de marcado: 7 tags → 12 tags)
