# 📥 Mis Software - Portal de Descargas

Un portal web ligero y moderno para descargar tus aplicaciones y software. Diseñado para ser rápido, sin dependencias pesadas y fácil de personalizar.

## ✨ Características

- ✅ **Ultra ligero** - Solo HTML, CSS y JavaScript vanilla
- ✅ **Diseño responsivo** - Funciona perfectamente en móvil y escritorio
- ✅ **Sin dependencias** - No necesita Node.js, npm o frameworks
- ✅ **Fácil de usar** - Solo edita `software.json` para agregar tus aplicaciones
- ✅ **Descarga directa** - Los usuarios descargan archivos .zip sin problemas
- ✅ **Alojado en GitHub Pages** - Hosting gratuito

## 🚀 Inicio Rápido

### 1. Configurar GitHub Pages

1. Ve a **Settings** → **Pages**
2. Selecciona **Deploy from a branch**
3. Elige **main** como rama
4. Guarda y espera a que se publique

Tu sitio estará disponible en: `https://serskynet.github.io/web-software-store/`

### 2. Agregar tus Software

Edita el archivo `software.json`:

```json
[
    {
        "id": 1,
        "name": "Nombre de tu App",
        "description": "Descripción corta",
        "version": "1.0.0",
        "size": "45 MB",
        "icon": "🚀",
        "downloadUrl": "https://github.com/serskynet/web-software-store/releases/download/v1.0/app.zip"
    }
]
```

### 3. Subir archivos ZIP

**Opción A: Usar GitHub Releases** (Recomendado)

1. Ve a **Releases** en tu repo
2. Click en **Create a new release**
3. Tag: `v1.0` (versión)
4. Upload binary: Arrastra tu archivo `.zip`
5. Publica el release
6. Copia la URL del archivo y úsala en `software.json`

**Opción B: Guardar en carpeta `/downloads`**

1. Crea una carpeta `/downloads` en tu repo
2. Sube los archivos `.zip` allí
3. Usa la URL: `downloads/tu-archivo.zip`

## 📝 Estructura del JSON

| Campo | Descripción | Ejemplo |
|-------|-------------|----------|
| `id` | ID único | `1` |
| `name` | Nombre del software | `"Mi App"` |
| `description` | Descripción corta | `"Aplicación útil"` |
| `version` | Número de versión | `"1.0.0"` |
| `size` | Tamaño del archivo | `"45 MB"` |
| `icon` | Emoji para icono | `"🚀"` |
| `downloadUrl` | URL para descargar ZIP | `"https://..."` |

## 🎨 Personalizar

### Cambiar colores

Edita `styles.css` en la sección `:root`:

```css
:root {
    --primary: #2563eb;        /* Azul principal */
    --secondary: #10b981;      /* Verde secundario */
    --danger: #ef4444;         /* Rojo para errores */
}
```

### Cambiar título y subtítulo

En `index.html`, busca:

```html
<h1>📥 Mis Software</h1>
<p class="subtitle">Descarga mis aplicaciones y herramientas</p>
```

## 📦 Subir Archivos ZIP a GitHub Releases

### Paso a paso:

1. **En tu repositorio local:**
   ```bash
   git add .
   git commit -m "Agregar sitio de descargas"
   git push origin main
   ```

2. **En GitHub (navegador):**
   - Ir a **Releases**
   - Click **Create a new release**
   - **Tag version:** `v1.0` (o tu versión)
   - **Title:** `Version 1.0`
   - Subir archivo `.zip` en "Attach binaries"
   - Click **Publish release**

3. **Copiar URL del archivo:**
   - Click derecho en el ZIP → "Copy link"
   - Pegar en `downloadUrl` en `software.json`

## 🌐 URLs de Descarga

Tus archivos ZIP se descargarán desde:

- **GitHub Releases:** `https://github.com/serskynet/web-software-store/releases/download/v1.0/archivo.zip`
- **Carpeta local:** `https://serskynet.github.io/web-software-store/downloads/archivo.zip`

## ⚡ Rendimiento

- Tamaño total: **~30 KB** (sin software)
- Tiempo de carga: < 1 segundo
- Sin dependencias externas
- Compatible con navegadores antiguos

## 🔧 Troubleshooting

**¿No aparecen los archivos?**
- Verifica que `software.json` está en formato JSON válido
- Recarga la página con Ctrl+F5 (borrar caché)

**¿No descarga el archivo?**
- Verifica que la URL en `downloadUrl` es correcta
- Prueba descargar manualmente desde la URL

**¿Cómo cambio el tema?**
- Edita los colores en `styles.css`
- Cambia los emojis en `software.json`

## 📄 Licencia

Libre de usar y modificar. Comparte si te es útil.

---

**¿Necesitas ayuda?** Crea un issue en tu repositorio.