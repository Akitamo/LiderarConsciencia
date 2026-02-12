---
date: 2026-01-31T09:42:21.735Z
tags: [session]
messages: 13
strategy: single-pass
---

# Sesión: Instalación Obsidian Skills en Claude Code - 2024-12-19

## Resumen
Se instalaron exitosamente las skills de Obsidian para Claude Code desde el repositorio de Kepano. Las skills añaden capacidades para trabajar con archivos de Obsidian (Markdown, Canvas, Bases) mientras se mantiene la compatibilidad con las reglas del proyecto.

## Decisiones tomadas
- **Mantener regla de no wikilinks**: Se confirmó que las skills no deben usar wikilinks, solo sintaxis Markdown estándar
- **Instalación completa de las 3 skills**: Para tener todas las capacidades disponibles (Markdown, Canvas, Bases)

## Aprendizajes
- Las skills de Obsidian se organizan en carpetas separadas bajo `.claude/skills/`
- Cada skill tiene su propio archivo `SKILL.md` con instrucciones específicas
- Las skills se activan automáticamente según el contexto de trabajo
- Es posible usar skills parcialmente respetando reglas de proyecto existentes

## Problemas/errores encontrados
- Ninguno

## Próximos pasos
- [ ] Las skills están listas para usar automáticamente cuando se trabaje con archivos .md, .base o .canvas
- [ ] Recordar siempre usar sintaxis Markdown estándar, no wikilinks
