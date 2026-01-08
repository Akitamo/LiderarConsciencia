---
id: decision-001
status: accepted
created: 2026-01-07
updated: 2026-01-07
tags: [decision, ai-infra, estructura]
---

# 001 - Estructura de Carpetas del Proyecto

**Estado**: accepted
**Fecha**: 2026-01-07

## Contexto

Necesitamos definir una estructura de carpetas que permita:
- Trabajar con Claude Code de forma eficiente
- Separar elementos validados de work-in-progress
- Mantener historial de decisiones y sesiones
- Escalar el uso de IA sin caos

El proyecto tiene contenido existente (`CURSO/`, `Marketing/`) que debe integrarse sin disrupciones.

## Opciones consideradas

### Opción A: Todo en `.claude/`

Seguir el patrón de PAI de Daniel Miessler: todo dentro de `.claude/`.

- **Pros**: Estándar emergente, portabilidad
- **Contras**: Mezcla config con contenido, no compatible con Obsidian como editor principal

### Opción B: Carpetas separadas con prefijo `_`

Crear carpetas `_ai/`, `_wip/`, `_history/` fuera de `.claude/`.

- **Pros**: Clara separación, visible en Obsidian, compatible con flujo actual
- **Contras**: No estándar, más carpetas en raíz

### Opción C: Híbrido

`.claude/` solo para config, carpetas `_` para contenido operativo.

- **Pros**: Lo mejor de ambos mundos
- **Contras**: Más complejidad inicial

## Decisión

**Adoptamos Opción C (Híbrido)** con la siguiente estructura:

```
.claude/           → Solo configuración (settings, CLAUDE.md)
_ai/               → Elementos IA validados
_wip/              → Work in progress
_history/          → Registro de decisiones y sesiones
```

### Razones

1. **Obsidian como editor principal**: Las carpetas `_` son visibles y navegables
2. **Separación clara**: Config vs contenido vs historial
3. **Flujo de estados**: `_wip/` → `_ai/` es intuitivo
4. **Compatible con PAI**: Podemos adoptar más elementos de PAI después

## Consecuencias

### Positivas
- Estructura clara y escalable
- Fácil onboarding para colaboradores
- Historial de decisiones consultable

### Negativas
- Más carpetas en la raíz del proyecto
- Necesidad de documentar las convenciones

### Neutras
- Requiere crear READMEs para cada carpeta
- Necesita frontmatter consistente

## Implementación

1. Crear estructura de carpetas
2. Crear READMEs explicativos
3. Migrar elementos existentes
4. Documentar en CLAUDE.md

## Referencias

- Análisis de PAI (documentación interna de investigación)
- Esta decisión reemplaza borradores previos
