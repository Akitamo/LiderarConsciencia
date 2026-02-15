# INSTRUCTIONS — PPTX Patcher

> **Si perdiste contexto, lee este archivo y TRACKER.md.**

## Reglas inamovibles

1. **NUNCA inventar texto.** Todo texto proviene de `module-data.json`, que fue extraido de los PPTX originales de Manus.
2. **M07 es el modelo correcto.** Sus slides estructurales (portada, separadores, gracias, refs) son la referencia visual.
3. **Conservar slides de contenido intactas.** Solo se reemplazan slides estructurales.
4. **Montserrat es la fuente corporativa.** Debe usarse en todas las slides patcheadas.
5. **Output siempre en:** `_wip/curso/Presentación Powerpoint/ppts CLAUDE CODE/`

## Archivos del sistema

| Archivo | Propósito |
|---------|-----------|
| `INSTRUCTIONS.md` | Este fichero. Reglas vinculantes. |
| `TRACKER.md` | Estado de progreso por módulo. |
| `module-data.json` | Textos extraídos de PPTX originales (fuente de verdad). |
| `pptx-patcher.py` | Script de parcheo. |
| `verify-patch.py` | Script de verificación (6 checks). |

## Cómo ejecutar

### Parchear un módulo
```bash
cd _wip/slide-engine
python pptx-patcher.py M06
```

### Verificar un módulo parcheado
```bash
python verify-patch.py M06
```

### Parchear todos los pendientes
```bash
python pptx-patcher.py --all
```

## Flujo por módulo (autónomo)

1. Leer `TRACKER.md` -> siguiente módulo con estado `TODO`
2. Ejecutar `pptx-patcher.py <MODULE>`
3. Ejecutar `verify-patch.py <MODULE>`
4. Si FAIL -> diagnosticar, corregir, re-verificar
5. Si PASS -> actualizar `TRACKER.md` a `DONE`
6. Siguiente módulo

## Orden de ejecución

M06 -> M05 -> M04 -> M03 -> M02 -> M01D -> M01C -> M01B -> M01A -> M00

## Qué se reemplaza vs qué se conserva

### Se REEMPLAZA (con diseño M07):
- **Portada** (slide 1): Tag de módulo + título + cita
- **Separadores**: Número + "TEMA" + título + subtítulo
- **Gracias**: "Gracias" + "Liderar con Consciencia" + URL
- **Refs**: "PARA PROFUNDIZAR" + fuentes (solo si existen en el original)

### Se CONSERVA:
- Todas las slides de contenido (no estructurales)
- El texto exacto de los originales (cambia el diseño, no el contenido)

## Diseño M07 (referencia)

### Colores
- Accent (tag, número, "Gracias"): `#DC8060`
- Título principal: `#FFFFFF`
- Subtítulo/cita: `#E0EBEB`
- URL/meta: `#A8B0A8`
- Refs header: `#2A5058`
- Refs body: `#5A6A6A`
- Refs concept: `#889088`

### Slide sizes
- Width: 9144000 EMU (10")
- Height: 5143500 EMU (5.63")
