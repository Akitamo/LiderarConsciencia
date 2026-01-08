# Instrucciones para desarrollar elementos IA

# Regla crítica
- Desarrollar primero en _wip/ai/, promover solo cuando esté validado
- No modificar elementos validados sin revisión previa

# Convenciones de nombrado
- prompts/: verbo-objeto.md (reestructurar-modulo.md)
- skills/: dominio-capacidad.md (curso-revision-pedagogica.md)
- workflows/: wf-proceso.md (wf-crear-nuevo-modulo.md)
- hooks/: nombre-hook.js (save-session.js)
- agents/: agent-nombre.md (agent-revisor-contenido.md)

# Frontmatter
```yaml
---
status: draft | testing | validated
created: YYYY-MM-DD
tags: [tipo, dominio]
---
```

Nota: `version` solo se añade al promover a _ai/

# Tags válidos
- Estado (status en frontmatter): draft | testing | validated | deprecated
- Tipo: prompt, skill, workflow, agent, hook
- Dominio: curso, marketing, ai-infra
- Prioridad: core, experimental

# Flujo de promoción
1. Crear en _wip/ai/[tipo]/
2. Probar exhaustivamente
3. Cambiar status a validated
4. Mover a _ai/[tipo]/
