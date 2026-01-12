# Instrucciones para proyectos de desarrollo

Criterios y estándares compartidos por todos los proyectos en `_dev/`.

Ver [README.md](README.md) para catálogo de proyectos.

## Estructura de documentación

**Proyecto**:
- `README.md`: Visión, contexto, objetivo general
- `PLAN.md`: Lista de funcionalidades, estado, orden de ejecución

**Funcionalidad**:
- `specs/XXX-nombre.md`: Especificación autocontenida (Goal, Context, Tasks, Validation)

**Decisiones**:
- `docs/ADR-XXX.md`: Decisiones arquitectónicas que afectan al proyecto

## Cómo usar las specs

1. Copiar plantilla de `_dev/templates/spec.md`
2. Numerar secuencialmente: `001-nombre.md`, `002-nombre.md`
3. Incluir: Objetivo, Justificación, Especificación, Contexto, Tareas, Validación
4. Actualizar estado en `PLAN.md` del proyecto

## Cómo usar el plan de proyecto

1. Copiar plantilla de `_dev/templates/PLAN.md`
2. Listar todas las funcionalidades previstas
3. Actualizar estado conforme se avanza: ⏳ → 🔄 → ✅
4. Mantener "Siguientes pasos" actualizado

## Criterios de calidad

- Código comentado donde no sea autoexplicativo
- Checkpoints guardados en `work/` para poder retomar
- Outputs verificados antes de integrar
- ADRs para decisiones que afecten arquitectura

## Prompts

- Reutilizables → `_ai/prompts/`
- Específicos del proyecto → `_dev/[proyecto]/prompts/`

## Outputs

Los resultados finales se integran donde corresponda:
- Contenido del curso → `CURSO/`
- Prompts validados → `_ai/prompts/`
