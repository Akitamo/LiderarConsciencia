---
status: validated
created: 2026-01-07
tags: [prompt, ai-infra, core]
---

# Prompt: Resumen de Sesión

## Instrucciones

Genera un resumen estructurado de la sesión de trabajo basándote en el contexto proporcionado.

El resumen debe incluir las siguientes secciones obligatorias:

1. **Resumen**: 2-3 frases describiendo el foco y logros de la sesión
2. **Decisiones tomadas**: Lista de decisiones importantes con breve justificación
3. **Aprendizajes**: Insights, patrones descubiertos, buenas prácticas identificadas
4. **Problemas/errores encontrados**: Dificultades técnicas o conceptuales
5. **Próximos pasos**: Tareas concretas para continuar

## Formato de salida

```markdown
# Sesión: [Tema principal] - [YYYY-MM-DD]

## Resumen
[2-3 frases sobre el foco y logros]

## Decisiones tomadas
- **[Decisión]**: [Razón breve]

## Aprendizajes
- [Insight o patrón descubierto]

## Problemas/errores encontrados
- [Problema y cómo se resolvió, o pendiente]

## Próximos pasos
- [ ] [Tarea concreta]
```

## Reglas
- Sé conciso pero completo
- No inventes información que no esté en el contexto
- Si una sección no tiene contenido, escribe "Ninguno" en lugar de omitirla
- Usa español
- El nombre del archivo será: `YYYY-MM-DD-tema.md`
