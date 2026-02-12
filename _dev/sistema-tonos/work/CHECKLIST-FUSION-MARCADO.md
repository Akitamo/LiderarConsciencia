# Checklist Validación Fusión-Marcado

## Criterios de Validación (por archivo)

### E1: Estructura fusionada
- [ ] Sin tags #teoria ni #explicacion
- [ ] Sin sección "Notas para revisión"
- [ ] Frontmatter con fecha actualizada

### E2: Jerarquía correcta
- [ ] Subtítulos nuevos usan #### (no ###)
- [ ] Secciones ## y ### originales preservadas

### E3: Marcado #metafora
- [ ] Solo donde desarrolla IMAGEN (no concepto)
- [ ] Ocupa bloque diferenciado
- [ ] No es metáfora lexicalizada

### E4: Marcado #ejemplo
- [ ] Solo casos desarrollados (contexto, acción, resultado)
- [ ] No enumeraciones ilustrativas
- [ ] Ocupa bloque diferenciado

### E5: Referencias (CRÍTICO)
- [ ] Footnotes [^n] para fuentes mencionadas en texto teórico
- [ ] Footnotes en descripciones de #imagen y #video (autores, libros, revistas)
- [ ] Footnotes en bloques #cita que incluyan autor/año/obra
- [ ] Artículos de revista incluidos (TIME, National Geographic, HBR, etc.)
- [ ] Numeración en orden de aparición (de arriba a abajo)
- [ ] NO se inventaron fuentes
- [ ] Formato correcto al final del documento

### E6: Preservación de recursos
- [ ] #imagen preservados con rutas exactas
- [ ] #video preservados con rutas exactas
- [ ] #ejercicio preservados (actividades interactivas)
- [ ] #practica preservados (actividades experienciales)
- [ ] #cita preservados (citas textuales)
- [ ] #pregunta preservados (preguntas reflexivas)
- [ ] Contenido sin modificación de redacción

---

## Puntuación

| Puntuación | Estado | Acción |
|------------|--------|--------|
| 6/6 | ✅ OK | Aprobado |
| 5/6 | ⚠️ Revisar | Documentar cuál falla |
| ≤4/6 | ❌ Problema | Usuario decide si regenerar |

---

## Errores Comunes Detectados (v1.2)

| Error | Síntoma | Solución |
|-------|---------|----------|
| Footnotes en descripciones multimedia | Imagen menciona autor+libro sin [^n] | Revisar TODAS las descripciones de #imagen/#video |
| Citas sin footnote | Bloque #cita con autor(año) sin [^n] | Aplicar relación #cita↔footnotes del prompt |
| Numeración desordenada | [^12] aparece antes que [^1] | Renumerar según orden de aparición |
| Revistas omitidas | TIME, HBR, etc. sin footnote | Incluir artículos de revista como fuentes |

---

## Inventario de Recursos (para reporte)

El reporte debe incluir conteo de todos los recursos por archivo:

| Recurso | Tag | Descripción |
|---------|-----|-------------|
| Imágenes | #imagen | Fotografías, ilustraciones, diagramas |
| Vídeos | #video | Vídeos embebidos o referenciados |
| GIFs | #imagen #Gif o #Gif | Animaciones |
| Ejercicios | #ejercicio | Actividades interactivas |
| Prácticas | #practica | Actividades experienciales guiadas |
| Citas | #cita | Citas textuales de autores |
| Preguntas | #pregunta | Preguntas reflexivas al lector |
| Metáforas | #metafora | Analogías desarrolladas (nuevas) |
| Ejemplos | #ejemplo | Casos desarrollados (nuevos) |
| Footnotes | [^n] | Referencias bibliográficas (nuevas) |

---

## Plantilla Reporte por Módulo

### Tabla de Validación
```markdown
| Archivo | E1 | E2 | E3 | E4 | E5 | E6 | Total |
|---------|----|----|----|----|----|----|-------|
| mXX-YY  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 6/6   |
```

### Inventario de Recursos
```markdown
| Archivo | #imagen | #video | #Gif | #ejercicio | #practica | #cita | #pregunta | #metafora | #ejemplo | Footnotes |
|---------|---------|--------|------|------------|-----------|-------|-----------|-----------|----------|-----------|
| mXX-YY  | N       | N      | N    | N          | N         | N     | N         | N         | N        | N         |
```

---

## Instrucciones para Agentes

**CRÍTICO:** Antes de transformar cada archivo, el agente DEBE:

1. **Leer COMPLETO** el prompt `_dev/sistema-tonos/prompts/prompt-fusion-marcado.md`
2. **Leer COMPLETO** el archivo original a transformar
3. Aplicar TODAS las reglas del prompt, especialmente:
   - Footnotes en descripciones de multimedia
   - Footnotes en bloques #cita con autor/año
   - Numeración de footnotes en orden de aparición
4. Ejecutar auto-validación según Parte 6 del prompt

---

**Versión:** 1.2
**Fecha:** 16/01/2026
**Basado en:** prompt-fusion-marcado.md v3.5
