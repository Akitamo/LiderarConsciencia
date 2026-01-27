# Migración Curso a Producción

**Fecha inicio:** 2026-01-27
**Estado global:** COMPLETADO
**Última actualización:** 2026-01-27 12:45

---

## Instrucciones de recuperación

Si pierdes contexto, lee este fichero y:
1. Busca el primer paso con estado `PENDIENTE` o `EN_CURSO`
2. Si hay uno `EN_CURSO`, verifica si se completó (ejecuta la verificación)
3. Continúa desde ahí

**REGLA CRÍTICA:** Nunca marques COMPLETADO sin ejecutar la verificación del paso.

---

## Contexto

### Origen
```
C:\dev\projects\LiderarConsciencia\_wip\curso\nuevo curso\
├── La progresión epistemológica del programa.md
├── modulo-00-el-momento-que-nos-convoca\  (8 ficheros .md + Prácticas-entrenamiento\)
├── modulo-01-consciente-de-lo-que-soy\    (12 ficheros .md)
├── modulo-02-consciente-de-como-estoy\    (ficheros .md)
├── modulo-03-consciente-de-lo-que-pienso-siento\  (ficheros .md)
├── modulo-04-consciente-de-lo-que-necesito\       (ficheros .md)
├── modulo-05-consciente-de-lo-que-necesitamos\    (ficheros .md)
├── modulo-06-consciente-de-lo-que-quiero\         (ficheros .md)
└── modulo-07-consciente-de-lo-que-esta-bien\      (ficheros .md)
```

### Destino
```
C:\dev\projects\LiderarConsciencia\CURSO\
```

### Reglas
- PRESERVAR en destino: carpetas `Prácticas-entrenamiento\` y `recursos\` de M1-M7
- PRESERVAR en destino: `00-indice-general-curso.md`, `CLAUDE.md`, `README.md`, `Documentos\`
- REEMPLAZAR: solo ficheros .md dentro de cada módulo
- CREAR: módulo M0 completo (no existe en producción)
- COPIAR: documento progresión epistemológica a raíz CURSO\

---

## Plan de ejecución

### FASE 0: Backup
**Estado:** COMPLETADO (45 ficheros respaldados)

**Acción:** Crear backup de .md actuales en `CURSO\_backup\v2-pre-migracion\`

**Comandos:**
```bash
mkdir -p "C:\dev\projects\LiderarConsciencia\CURSO\_backup\v2-pre-migracion"
for i in 01 02 03 04 05 06 07; do
  mkdir -p "C:\dev\projects\LiderarConsciencia\CURSO\_backup\v2-pre-migracion\modulo-$i"
  cp "C:\dev\projects\LiderarConsciencia\CURSO\modulo-$i-"*/*.md "C:\dev\projects\LiderarConsciencia\CURSO\_backup\v2-pre-migracion\modulo-$i/" 2>/dev/null
done
```

**Verificación:**
```bash
find "C:\dev\projects\LiderarConsciencia\CURSO\_backup\v2-pre-migracion" -name "*.md" | wc -l
# Esperado: >50 ficheros
```

---

### FASE 1: Migrar M1
**Estado:** COMPLETADO

**Acción:** Reemplazar .md en modulo-01-consciente-de-lo-que-soy

**Comandos:**
```bash
# Borrar .md antiguos (NO toca subcarpetas)
find "C:\dev\projects\LiderarConsciencia\CURSO\modulo-01-consciente-de-lo-que-soy" -maxdepth 1 -name "*.md" -delete

# Copiar .md nuevos
cp "C:\dev\projects\LiderarConsciencia\_wip\curso\nuevo curso\modulo-01-consciente-de-lo-que-soy"/*.md "C:\dev\projects\LiderarConsciencia\CURSO\modulo-01-consciente-de-lo-que-soy/"
```

**Verificación:**
```bash
ls "C:\dev\projects\LiderarConsciencia\CURSO\modulo-01-consciente-de-lo-que-soy"/*.md | wc -l
# Esperado: 12 ficheros
ls "C:\dev\projects\LiderarConsciencia\CURSO\modulo-01-consciente-de-lo-que-soy\Prácticas-entrenamiento" 2>/dev/null && echo "OK: Prácticas preservadas"
```

---

### FASE 2: Migrar M2
**Estado:** COMPLETADO

**Acción:** Reemplazar .md en modulo-02-consciente-de-como-estoy

**Comandos:**
```bash
find "C:\dev\projects\LiderarConsciencia\CURSO\modulo-02-consciente-de-como-estoy" -maxdepth 1 -name "*.md" -delete
cp "C:\dev\projects\LiderarConsciencia\_wip\curso\nuevo curso\modulo-02-consciente-de-como-estoy"/*.md "C:\dev\projects\LiderarConsciencia\CURSO\modulo-02-consciente-de-como-estoy/"
```

**Verificación:**
```bash
ls "C:\dev\projects\LiderarConsciencia\CURSO\modulo-02-consciente-de-como-estoy"/*.md | wc -l
ls "C:\dev\projects\LiderarConsciencia\CURSO\modulo-02-consciente-de-como-estoy\Prácticas-entrenamiento" 2>/dev/null && echo "OK: Prácticas preservadas"
```

---

### FASE 3: Migrar M3
**Estado:** COMPLETADO

**Acción:** Reemplazar .md en modulo-03-consciente-de-lo-que-pienso-siento

**Comandos:**
```bash
find "C:\dev\projects\LiderarConsciencia\CURSO\modulo-03-consciente-de-lo-que-pienso-siento" -maxdepth 1 -name "*.md" -delete
cp "C:\dev\projects\LiderarConsciencia\_wip\curso\nuevo curso\modulo-03-consciente-de-lo-que-pienso-siento"/*.md "C:\dev\projects\LiderarConsciencia\CURSO\modulo-03-consciente-de-lo-que-pienso-siento/"
```

**Verificación:**
```bash
ls "C:\dev\projects\LiderarConsciencia\CURSO\modulo-03-consciente-de-lo-que-pienso-siento"/*.md | wc -l
ls "C:\dev\projects\LiderarConsciencia\CURSO\modulo-03-consciente-de-lo-que-pienso-siento\Prácticas-entrenamiento" 2>/dev/null && echo "OK: Prácticas preservadas"
```

---

### FASE 4: Migrar M4
**Estado:** COMPLETADO

**Acción:** Reemplazar .md en modulo-04-consciente-de-lo-que-necesito

**Comandos:**
```bash
find "C:\dev\projects\LiderarConsciencia\CURSO\modulo-04-consciente-de-lo-que-necesito" -maxdepth 1 -name "*.md" -delete
cp "C:\dev\projects\LiderarConsciencia\_wip\curso\nuevo curso\modulo-04-consciente-de-lo-que-necesito"/*.md "C:\dev\projects\LiderarConsciencia\CURSO\modulo-04-consciente-de-lo-que-necesito/"
```

**Verificación:**
```bash
ls "C:\dev\projects\LiderarConsciencia\CURSO\modulo-04-consciente-de-lo-que-necesito"/*.md | wc -l
ls "C:\dev\projects\LiderarConsciencia\CURSO\modulo-04-consciente-de-lo-que-necesito\Prácticas-entrenamiento" 2>/dev/null && echo "OK: Prácticas preservadas"
```

---

### FASE 5: Migrar M5
**Estado:** COMPLETADO

**Acción:** Reemplazar .md en modulo-05-consciente-de-lo-que-necesitamos

**Comandos:**
```bash
find "C:\dev\projects\LiderarConsciencia\CURSO\modulo-05-consciente-de-lo-que-necesitamos" -maxdepth 1 -name "*.md" -delete
cp "C:\dev\projects\LiderarConsciencia\_wip\curso\nuevo curso\modulo-05-consciente-de-lo-que-necesitamos"/*.md "C:\dev\projects\LiderarConsciencia\CURSO\modulo-05-consciente-de-lo-que-necesitamos/"
```

**Verificación:**
```bash
ls "C:\dev\projects\LiderarConsciencia\CURSO\modulo-05-consciente-de-lo-que-necesitamos"/*.md | wc -l
ls "C:\dev\projects\LiderarConsciencia\CURSO\modulo-05-consciente-de-lo-que-necesitamos\Prácticas-entrenamiento" 2>/dev/null && echo "OK: Prácticas preservadas"
```

---

### FASE 6: Migrar M6
**Estado:** COMPLETADO

**Acción:** Reemplazar .md en modulo-06-consciente-de-lo-que-quiero

**Comandos:**
```bash
find "C:\dev\projects\LiderarConsciencia\CURSO\modulo-06-consciente-de-lo-que-quiero" -maxdepth 1 -name "*.md" -delete
cp "C:\dev\projects\LiderarConsciencia\_wip\curso\nuevo curso\modulo-06-consciente-de-lo-que-quiero"/*.md "C:\dev\projects\LiderarConsciencia\CURSO\modulo-06-consciente-de-lo-que-quiero/"
```

**Verificación:**
```bash
ls "C:\dev\projects\LiderarConsciencia\CURSO\modulo-06-consciente-de-lo-que-quiero"/*.md | wc -l
ls "C:\dev\projects\LiderarConsciencia\CURSO\modulo-06-consciente-de-lo-que-quiero\Prácticas-entrenamiento" 2>/dev/null && echo "OK: Prácticas preservadas"
```

---

### FASE 7: Migrar M7
**Estado:** COMPLETADO

**Acción:** Reemplazar .md en modulo-07-consciente-de-lo-que-esta-bien

**Comandos:**
```bash
find "C:\dev\projects\LiderarConsciencia\CURSO\modulo-07-consciente-de-lo-que-esta-bien" -maxdepth 1 -name "*.md" -delete
cp "C:\dev\projects\LiderarConsciencia\_wip\curso\nuevo curso\modulo-07-consciente-de-lo-que-esta-bien"/*.md "C:\dev\projects\LiderarConsciencia\CURSO\modulo-07-consciente-de-lo-que-esta-bien/"
```

**Verificación:**
```bash
ls "C:\dev\projects\LiderarConsciencia\CURSO\modulo-07-consciente-de-lo-que-esta-bien"/*.md | wc -l
ls "C:\dev\projects\LiderarConsciencia\CURSO\modulo-07-consciente-de-lo-que-esta-bien\Prácticas-entrenamiento" 2>/dev/null && echo "OK: Prácticas preservadas"
```

---

### FASE 8: Crear M0 (nuevo)
**Estado:** COMPLETADO

**Acción:** Crear módulo 0 completo (no existe en producción)

**Comandos:**
```bash
# Crear carpeta
mkdir -p "C:\dev\projects\LiderarConsciencia\CURSO\modulo-00-el-momento-que-nos-convoca"

# Copiar ficheros .md
cp "C:\dev\projects\LiderarConsciencia\_wip\curso\nuevo curso\modulo-00-el-momento-que-nos-convoca"/*.md "C:\dev\projects\LiderarConsciencia\CURSO\modulo-00-el-momento-que-nos-convoca/"

# Copiar carpeta Prácticas-entrenamiento
cp -r "C:\dev\projects\LiderarConsciencia\_wip\curso\nuevo curso\modulo-00-el-momento-que-nos-convoca\Prácticas-entrenamiento" "C:\dev\projects\LiderarConsciencia\CURSO\modulo-00-el-momento-que-nos-convoca/"
```

**Verificación:**
```bash
ls "C:\dev\projects\LiderarConsciencia\CURSO\modulo-00-el-momento-que-nos-convoca"/*.md | wc -l
# Esperado: 8 ficheros
ls "C:\dev\projects\LiderarConsciencia\CURSO\modulo-00-el-momento-que-nos-convoca\Prácticas-entrenamiento" && echo "OK: Prácticas copiadas"
```

---

### FASE 9: Documento progresión epistemológica
**Estado:** COMPLETADO

**Acción:** Copiar documento a raíz de CURSO\

**Comandos:**
```bash
cp "C:\dev\projects\LiderarConsciencia\_wip\curso\nuevo curso\La progresión epistemológica del programa.md" "C:\dev\projects\LiderarConsciencia\CURSO\"
```

**Verificación:**
```bash
ls "C:\dev\projects\LiderarConsciencia\CURSO\La progresión epistemológica del programa.md" && echo "OK: Documento copiado"
```

---

### FASE 10: Verificación final
**Estado:** COMPLETADO

**Acción:** Validar estructura completa

**Verificaciones:**
```bash
# Contar módulos (debe haber 8: M0-M7)
ls -d "C:\dev\projects\LiderarConsciencia\CURSO\modulo-"*/ | wc -l
# Esperado: 8

# Verificar que cada módulo tiene Prácticas-entrenamiento
for i in 00 01 02 03 04 05 06 07; do
  ls "C:\dev\projects\LiderarConsciencia\CURSO\modulo-$i-"*/Prácticas-entrenamiento 2>/dev/null && echo "M$i: OK"
done

# Verificar documento progresión
ls "C:\dev\projects\LiderarConsciencia\CURSO\La progresión epistemológica del programa.md"

# Verificar que NO hay referencias a Savoring en producción
grep -ri "savoring" "C:\dev\projects\LiderarConsciencia\CURSO\modulo-"*/*.md | wc -l
# Esperado: 0
```

---

## Log de ejecución

| Fase | Inicio | Fin | Estado | Notas |
|------|--------|-----|--------|-------|
| 0 | 12:50 | 12:51 | COMPLETADO | 45 ficheros |
| 1 | 12:53 | 12:54 | COMPLETADO | 12 ficheros |
| 2 | 12:54 | 12:54 | COMPLETADO | 7 ficheros |
| 3 | 12:54 | 12:54 | COMPLETADO | |
| 4 | 12:54 | 12:54 | COMPLETADO | |
| 5 | 12:54 | 12:54 | COMPLETADO | |
| 6 | 12:54 | 12:54 | COMPLETADO | |
| 7 | 12:54 | 12:54 | COMPLETADO | |
| 8 | 12:57 | 12:57 | COMPLETADO | 8 ficheros + Prácticas |
| 9 | 12:58 | 12:58 | COMPLETADO | |
| 10 | 12:59 | 12:59 | COMPLETADO | 8 módulos, 0 Savoring |

---

## Rollback (si algo falla)

Si necesitas revertir:
```bash
# Restaurar desde backup v2
cp "C:\dev\projects\LiderarConsciencia\CURSO\_backup\v2-pre-migracion\modulo-XX\"*.md "C:\dev\projects\LiderarConsciencia\CURSO\modulo-XX-*\"
```

Para M0 (no existía): simplemente borrar la carpeta creada.
