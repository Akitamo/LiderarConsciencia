---
date: 2026-01-11T17:20:05.790Z
tags: [session]
messages: 84
strategy: hierarchical
---

# Sesión: Estructura de proyectos de desarrollo - 2024-12-19

## Resumen
Se diseñó e implementó una nueva estructura de carpetas `_dev/` para organizar proyectos de desarrollo con vibecoding. Se establecieron plantillas, criterios compartidos y se migró la documentación inicial de dos proyectos desde investigación hacia desarrollo estructurado.

## Decisiones tomadas
- **Crear directorio `_dev/` como carpeta raíz**: Separar proyectos de desarrollo de investigación exploratoria
- **Documentación en dos niveles**: Proyecto (PLAN.md) y funcionalidad (specs individuales)
- **Plantillas compartidas**: Templates para README.md, CLAUDE.md, PLAN.md y spec.md
- **Migrar proyectos de investigación**: Transición de `extraccion-referencias-docling` y `sistema-tonos` a estructura de desarrollo

## Aprendizajes
- Las estructuras iniciales complejas requieren simplificación para ser prácticas
- La documentación compartida facilita la consistencia entre proyectos
- Es importante definir claramente los límites entre carpetas `_ai/` (investigación) y `_dev/` (desarrollo)
- Las referencias cruzadas entre documentos mejoran la navegabilidad del proyecto

## Problemas/errores encontrados
- **Anidamiento excesivo**: Las primeras propuestas de estructura eran demasiado complejas
- **Confusión de niveles**: Necesidad de clarificar qué documentar a nivel proyecto vs funcionalidad
- **Ubicación de archivos**: Definir criterios claros para la organización de documentos técnicos

## Próximos pasos
- [ ] Implementar la estructura completa de carpetas y archivos
- [ ] Actualizar documentación de arquitectura para incluir `_dev/`
- [ ] Completar migración de proyectos con documentación actualizada
- [ ] Validar plantillas con casos reales de desarrollo
