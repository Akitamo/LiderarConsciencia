# Inicio de Sesión

Briefing rápido del estado del proyecto para orientarse antes de empezar.

## Acciones

1. **Leer última sesión** en `_history/sessions/`:
   - Buscar el archivo más reciente (por fecha en nombre YYYY-MM-DD-HHMMSS)
   - Extraer sección "Resumen" (primeros 2-3 párrafos)
   - Extraer sección "Próximos pasos" (tareas que quedaron pendientes)

2. **Leer decisiones recientes** en `_history/decisions/`:
   - Buscar archivo del día actual (YYYY-MM-DD.md)
   - Si no existe, buscar el más reciente
   - Mostrar títulos de decisiones (líneas que empiezan con `### [HH:MM]`)

3. **Leer tareas** en `_TAREAS.md`:
   - Extraer sección "En progreso" (si hay contenido)
   - Mostrar primeras 3-5 tareas de sección "Pendiente"

4. **Mostrar estado git**:
   - Ejecutar `git status --short`
   - Resumir: archivos modificados (M), sin trackear (??)

5. **Presentar briefing** con este formato:

---

## Briefing de Sesión

### Última sesión
**[Fecha]**: [Título extraído del nombre del archivo]
> [Resumen breve - primeras líneas de sección Resumen]

Quedó pendiente:
- [ ] [Tarea 1 de Próximos pasos]
- [ ] [Tarea 2 de Próximos pasos]

### Decisiones recientes
- [HH:MM] [Título decisión 1]
- [HH:MM] [Título decisión 2]

*(Si no hay decisiones del día, mostrar las más recientes con fecha)*

### Tareas activas
**En progreso**: [contenido o "Ninguna tarea en progreso"]

**Pendientes prioritarias**:
1. [Tarea del primer bloque]
2. [Tarea del primer bloque]
3. [Tarea del primer bloque]

### Estado del repositorio
- X archivos modificados
- Y archivos sin trackear
- [Lista breve si hay pocos, o "ver git status" si hay muchos]

---

**¿En qué quieres trabajar hoy?**

---

## Uso

```
/inicio
```

## Notas

- No requiere argumentos
- Si alguna fuente no existe, mostrar "Sin historial previo" o equivalente
- El comando es de solo lectura, no modifica ningún archivo
- Tiempo estimado: 2-5 segundos
