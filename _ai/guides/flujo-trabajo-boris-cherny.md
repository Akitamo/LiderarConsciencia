---
source: Boris Cherny (creador de Claude Code)
extracted: 2026-01-12
tags: [claude-code, workflow, paralelización, plan-mode]
---

# Flujo de Trabajo de Boris Cherny

Boris Cherny es el creador de **Claude Code**, una herramienta que desarrolló inicialmente como un "proyecto paralelo" y que ha transformado la manera en que los desarrolladores interactúan con la inteligencia artificial desde la terminal. A través de su experiencia, Boris ha compartido un flujo de trabajo altamente eficiente que se centra en la **paralelización**, la **planificación rigurosa** y la **memoria persistente** del proyecto.

---

## 1. Extrema Paralelización de Tareas

Boris no utiliza un solo agente, sino que opera múltiples instancias de Claude simultáneamente para maximizar su productividad:

- **Múltiples terminales:** Ejecuta habitualmente **cinco terminales de Claude Code en paralelo** para trabajar en distintas partes de un proyecto al mismo tiempo. Al ser una herramienta basada en la terminal, consume mucha menos memoria que abrir múltiples instancias de un IDE como VS Code o Cursor.
- **Agentes web:** Utiliza adicionalmente entre **5 y 10 agentes web de Claude** (a través de la interfaz de claude.ai) para delegar tareas mientras está lejos de su computadora o incluso antes de dormir, permitiéndole revisar el código generado al despertar.

---

## 2. El "Modo Plan" como Piedra Angular

Para Boris, la planificación es la fase más crítica para obtener resultados de alta calidad.

- **Iteración antes de ejecutar:** Recomienda iniciar cada sesión en **"plan mode"** (activado con `shift + tab` dos veces). En este modo, el agente solo lee el código y discute la estrategia con el usuario.
- **Implementación en un solo intento ("One-shot"):** Boris sostiene que, si se dedica suficiente tiempo a perfeccionar el plan mediante un diálogo de ida y vuelta, Claude suele ser capaz de implementar la solución completa de manera correcta en un solo intento.

---

## 3. Gestión de la Memoria del Proyecto (claude.md)

Boris enfatiza la importancia de mantener un archivo `claude.md` en la raíz del repositorio, que actúa como la **memoria a largo plazo** del proyecto.

- **Reglas y Patrones:** Este archivo documenta la arquitectura, los estilos de diseño y las reglas específicas que Claude debe seguir.
- **Aprendizaje mediante PRs:** Una de sus técnicas más innovadoras es etiquetar a Claude en las *Pull Requests* (PR) de sus compañeros de equipo para pedirle que extraiga lecciones aprendidas de las revisiones de código y las incorpore automáticamente al archivo `claude.md`, asegurando que el agente "se vuelva más inteligente" con cada cambio en el repositorio.

---

## 4. Automatización con Comandos y Sub-agentes

Boris personaliza su entorno para eliminar fricciones y tareas repetitivas:

- **Comandos Slash Personalizados:** Utiliza comandos como `/commit-push-PR` para automatizar flujos de trabajo frecuentes en un solo paso.
- **Sub-agentes especializados:** Despliega agentes secundarios para tareas de revisión, como el **"code simplifier"** para limpiar código complejo o el **"verify app"** para realizar pruebas exhaustivas.
- **Hooks de post-herramienta:** Configura "hooks" que ejecutan automáticamente comandos de formato (*linting*) o pruebas inmediatamente después de que Claude realiza una edición, asegurando que el código siempre cumpla con los estándares antes de ser revisado.

---

## 5. Verificación Continua y Bucles Autónomos

Boris aboga por un sistema donde la IA no solo escribe código, sino que también valida su funcionalidad:

- **Bucle de retroalimentación:** Considera esencial dar a Claude los medios para verificar su propio trabajo (por ejemplo, mediante la extensión de Chrome para probar interfaces de usuario), lo que puede aumentar de 2 a 3 veces la calidad del resultado final.
- **Ralph Wiggum y bucles largos:** Utiliza herramientas como el plugin **Ralph Wiggum**, que permite a Claude trabajar en bucles autónomos durante horas para abordar refactorizaciones masivas o tareas de mantenimiento de gran escala.

---

## Metáfora

Trabajar como Boris Cherny es como ser el director de una orquesta donde no solo tienes a un músico, sino a varios grupos tocando en salas diferentes. Antes de que suene la primera nota, el director pasa mucho tiempo revisando la partitura con todos (Modo Plan) y escribe las correcciones en un manual maestro que todos consultan (`claude.md`). Al final, los músicos no solo tocan, sino que graban su interpretación y la escuchan para corregir errores antes de que el director dé el visto bueno final (Verificación).

---

## Aplicación a este proyecto

Prácticas ya implementadas en LiderarConsciencia:
- `.claude/CLAUDE.md` como memoria del proyecto
- `.claude/commands/` para comandos personalizados
- `_history/` para registro de sesiones

Prácticas a considerar:
- Uso más intensivo del modo plan antes de implementaciones
- Hooks para validación automática (formato, enlaces)
