# Documentación de SynergyUI

Esta carpeta contiene la documentación estática publicada en [xyraniz.github.io/SynergyUI](https://xyraniz.github.io/SynergyUI/). Está organizada como un sitio sin dependencias de runtime: cada página enlaza directamente con las demás y el catálogo interactivo de iconos consume el `icons.json` versionado junto al sitio.

## Contenido

| Archivo | Propósito |
| --- | --- |
| [`index.html`](index.html) | Presentación general, modelo mental y mapa del repositorio. |
| [`examples.html`](examples.html) | Loader oficial, ejemplo básico y ejemplo completo con flags, temas y controles. |
| [`api.html`](api.html) | Métodos globales, ventanas, notificaciones y diálogos. |
| [`components.html`](components.html) | Constructores de tabs y contratos de cada control. |
| [`themes.html`](themes.html) | Temas incluidos, colores semánticos, métricas, motion y temas personalizados. |
| [`icons.html`](icons.html) | Sets de iconos, uso en tabs y catálogo navegable. |
| [`localization.html`](localization.html) | Diccionarios, fallback y claves con prefijo `@`. |
| [`reference.html`](reference.html) | Persistencia, geometría, overlays, cleanup y límites del runtime. |
| [`api.json`](api.json) | Índice estructurado de la API documentada. |
| [`llms.txt`](llms.txt) | Copia publicada del contrato AI-readable canónico de la raíz. |
| [`icons.json`](icons.json) | Inventario generado de nombres, asset IDs y descriptores de iconos. |
| [`styles.css`](styles.css) | Sistema visual, accesibilidad y responsive layout. |
| [`app.js`](app.js) | Navegación móvil, búsqueda, copiado, tabs y catálogo interactivo. |

## Fuente de verdad

La implementación documentada es [`../dist/main.lua`](../dist/main.lua). El contrato AI-readable canónico es [`../llms.txt`](../llms.txt), y `web/llms.txt` debe ser una copia idéntica para su publicación. Los catálogos de iconos se derivan de los archivos fuente bajo `src/Icons/*/Icons.lua`. Cuando cambia la API, actualiza primero las páginas y los contratos afectados; después regenera el catálogo si también cambiaron los iconos.

```bash
python3 tools_build_icon_catalog.py
```

El workflow de GitHub Actions comprueba los archivos requeridos, valida los enlaces internos, confirma que `icons.json` coincide con sus fuentes y verifica que `../llms.txt` y `llms.txt` sean idénticos. Los pushes a `main` publican automáticamente esta carpeta en la web oficial.

## Diseño responsive

El sitio está pensado con un enfoque mobile-first para **teléfonos, tablets y equipos de escritorio**. La navegación lateral se convierte en un menú accesible en pantallas pequeñas, las cuadrículas se apilan progresivamente y los bloques de código y tablas conservan su propio desplazamiento interno cuando el contenido es más ancho que la pantalla. El documento raíz evita desbordamientos horizontales para que la página no se aleje ni muestre una franja vacía lateral en dispositivos táctiles.
