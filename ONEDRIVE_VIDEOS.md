# Cómo usar videos de OneDrive

## Paso 1: Subir el video a OneDrive

1. Ve a [OneDrive.com](https://onedrive.live.com)
2. Sube tu video (formato MP4 recomendado)
3. Espera a que termine la carga

## Paso 2: Obtener el enlace para embed

### Opción A: Embed directo (Recomendado)

1. Haz clic derecho en el video → **Insertar**
2. OneDrive te mostrará un código como:
   ```html
   <iframe src="https://onedrive.live.com/embed?cid=XXXXX&resid=YYYYY&authkey=ZZZZZ"
           width="320" height="180" frameborder="0" scrolling="no" allowfullscreen></iframe>
   ```
3. Copia solo la URL que está en `src="..."`, ejemplo:
   ```
   https://onedrive.live.com/embed?cid=XXXXX&resid=YYYYY&authkey=ZZZZZ
   ```

### Opción B: Desde enlace de compartir

1. Haz clic derecho en el video → **Compartir**
2. Cambia permisos a "**Cualquier persona con el vínculo puede ver**"
3. Haz clic en "Copiar vínculo"
4. Te dará algo como: `https://1drv.ms/v/s!AbC123...`
5. Para convertirlo a embed:
   - Ve a: https://www.onedrive-embed.com/ (herramienta no oficial)
   - O manualmente:
     - Pega el enlace corto en tu navegador
     - Te redirigirá a una URL larga como:
       `https://onedrive.live.com/?cid=ABC&id=XYZ&authkey=DEF`
     - Cambia `onedrive.live.com/?` por `onedrive.live.com/embed?`
     - Resultado: `https://onedrive.live.com/embed?cid=ABC&id=XYZ&authkey=DEF`

## Paso 3: Usar en tu código

Abre `assets/js/data.global.js` y usa la función `ONEDRIVE()`:

```javascript
{
  id: "leccion-1",
  num: 1,
  title: "Qué es y qué no es IA",
  video: ONEDRIVE("https://onedrive.live.com/embed?cid=ABC&resid=XYZ&authkey=DEF"),
  // ... resto de propiedades
}
```

## Ejemplos completos

### YouTube (actual):
```javascript
video: YT("aircAruvnKk")
```

### OneDrive:
```javascript
video: ONEDRIVE("https://onedrive.live.com/embed?cid=123456&resid=789&authkey=abc")
```

### Video local en tu proyecto:
```javascript
video: LOCAL("assets/videos/leccion-1.mp4")
```

## Ventajas de usar OneDrive

✅ Control total sobre los videos (sin Error 153)
✅ Sin restricciones de embed
✅ Gratis hasta 5 GB
✅ Funciona con `file://` y `http://localhost`
✅ Puedes cambiar/actualizar videos cuando quieras

## Desventajas

❌ Requiere conexión a internet
❌ Velocidad de carga puede variar
❌ Los videos deben ser públicos

## Recomendaciones

1. **Formato**: MP4 con codec H.264 (mejor compatibilidad)
2. **Resolución**: 1280x720 (720p) o 1920x1080 (1080p)
3. **Tamaño**: Máximo 100 MB por video para carga rápida
4. **Nombres**: Usa nombres descriptivos: `leccion-1-que-es-ia.mp4`

## Troubleshooting

### "El video no se carga"
- Verifica que el video sea público (permiso: "Cualquier persona con el vínculo")
- Asegúrate de usar la URL de `/embed?` no la URL normal

### "Dice que el video no está disponible"
- El video puede estar aún procesándose en OneDrive
- Espera 5-10 minutos después de subir

### "No veo el iframe"
- Abre la consola del navegador (F12)
- Verifica que la URL esté correcta
- Prueba el enlace directamente en el navegador

## Alternativas a OneDrive

- **Google Drive**: Similar proceso, usa enlaces de embed
- **Vimeo**: Excelente calidad, plan gratis limitado
- **YouTube Unlisted**: Videos no públicos pero embebibles
- **Videos locales**: Guardar en `assets/videos/` (aumenta tamaño del proyecto)
