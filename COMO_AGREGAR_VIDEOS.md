# 📹 Cómo Agregar Tus Videos de OneDrive

## Resumen Rápido

Tu plataforma está configurada para usar **SOLO videos de OneDrive**. Todas las 18 lecciones tienen placeholders que debes reemplazar con tus URLs reales.

## 🎯 Pasos Principales

### 1. Sube tus 18 videos a OneDrive

- Ve a https://onedrive.live.com
- Crea una carpeta llamada "Curso-IA-Videos" (opcional pero recomendado)
- Sube tus 18 videos con nombres claros:
  - `leccion-1-que-es-ia.mp4`
  - `leccion-2-prompting-basico.mp4`
  - ... etc

### 2. Obtén la URL de embed para cada video

Para **CADA video**:

1. **Clic derecho** en el video
2. Selecciona **"Insertar"**
3. OneDrive te mostrará algo como:
   ```html
   <iframe src="https://onedrive.live.com/embed?cid=ABC123&resid=XYZ456&authkey=DEF789"
           width="320" height="180" frameborder="0" scrolling="no" allowfullscreen></iframe>
   ```
4. **Copia SOLO la URL** que está dentro de `src="..."`:
   ```
   https://onedrive.live.com/embed?cid=ABC123&resid=XYZ456&authkey=DEF789
   ```

### 3. Reemplaza los placeholders

Abre el archivo: `assets/js/data.global.js`

Busca cada placeholder y reemplázalo con tu URL real:

**ANTES:**
```javascript
video: ONEDRIVE("TU_URL_ONEDRIVE_LECCION_1"),
```

**DESPUÉS:**
```javascript
video: ONEDRIVE("https://onedrive.live.com/embed?cid=ABC123&resid=XYZ456&authkey=DEF789"),
```

## 📋 Lista de Verificación

Usa esta lista para marcar los videos que ya agregaste:

- [ ] Lección 1: Qué es y qué no es IA
- [ ] Lección 2: Prompting básico
- [ ] Lección 3: Prompts para WhatsApp/mostrador
- [ ] Lección 4: Transcripción y resumen de audios
- [ ] Lección 5: Mejora de redacción
- [ ] Lección 6: ML sin programación (conceptos)
- [ ] Lección 7: Predicción de demanda (intro)
- [ ] Lección 8: Métricas simples
- [ ] Lección 9: Gráficas desde planillas
- [ ] Lección 10: Descripción desde imagen
- [ ] Lección 11: SKU/OEM y sinonimia
- [ ] Lección 12: Edición rápida de fotos (móvil)
- [ ] Lección 13: Microvideos promocionales (30-45 s)
- [ ] Lección 14: Uso responsable de IA
- [ ] Lección 15: Sesgos y verificación humana
- [ ] Lección 16: Asistentes para reuniones
- [ ] Lección 17: IA generativa hoy
- [ ] Lección 18: Computación cuántica (intro)

## 🔍 Buscar y Reemplazar Masivo (Opcional)

Si tienes un editor de código (VS Code), puedes usar buscar y reemplazar:

1. Abre `assets/js/data.global.js`
2. Presiona `Ctrl+F` (buscar)
3. Busca: `TU_URL_ONEDRIVE_LECCION_1`
4. Reemplaza con: tu URL real
5. Repite para las 18 lecciones

## ⚠️ Importante

### Asegúrate de que tus videos sean PÚBLICOS en OneDrive

- Al hacer clic en "Insertar", OneDrive automáticamente hace el video compartible
- Si el video dice "No disponible", verifica los permisos de compartir

### Formato de video recomendado

- **Formato:** MP4 (H.264)
- **Resolución:** 720p (1280x720) o 1080p (1920x1080)
- **Tamaño:** Máximo 100 MB por video
- **Duración:** Según lo que especifica cada lección (8-14 minutos)

## 🧪 Probar tus videos

1. Guarda los cambios en `data.global.js`
2. Inicia el servidor local:
   ```bash
   python -m http.server 8080
   ```
3. Abre: http://localhost:8080/index.html
4. Haz clic en una lección
5. Verifica que el video se cargue correctamente

## ❓ Troubleshooting

### "El video no se carga"
- Verifica que copiaste la URL completa correctamente
- Asegúrate de que incluye `?cid=...&resid=...&authkey=...`

### "Video no disponible"
- El video puede estar procesándose en OneDrive
- Espera 5-10 minutos después de subirlo
- Verifica que el video sea compartible públicamente

### "No veo la opción Insertar"
- Algunos tipos de cuenta de OneDrive pueden no tener esta opción
- Alternativa: usa "Compartir" → copia el link → convierte manualmente:
  1. Pega el link en el navegador
  2. Te redirige a una URL larga
  3. Cambia `/view` por `/embed` en la URL
  4. Ejemplo: `onedrive.live.com/view?...` → `onedrive.live.com/embed?...`

## 📚 Más Ayuda

Ver archivo completo: `ONEDRIVE_VIDEOS.md` para documentación detallada.
