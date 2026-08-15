# SynergyUI documentation

Esta carpeta contiene una documentación estática de SynergyUI. La entrada es `index.html`; el estilo vive en `styles.css`, la interacción en `app.js` y los contratos estructurados en `api.json`. Las páginas están separadas por área para que la navegación sea directa: quickstart, API global, componentes, temas, iconos, localización y notas de runtime.

## Servir localmente

La página principal puede abrirse directamente desde el sistema de archivos. Para habilitar el catálogo interactivo de iconos, sirve la carpeta con cualquier servidor HTTP estático, porque el navegador bloquea `fetch("icons.json")` en algunos contextos `file://`.

```bash
cd web
python3 -m http.server 8080
```

Después abre `http://localhost:8080/`.

## Regenerar el catálogo

`icons.json` se genera desde los seis archivos bajo `src/Icons/*/Icons.lua`. El script auxiliar está en la raíz del repositorio como `tools_build_icon_catalog.py` y no forma parte de la interfaz pública.

```bash
python3 tools_build_icon_catalog.py
```

El proceso conserva nombres, asset IDs y descriptores de spritesheet cuando están presentes. La página `icons.html` limita el render inicial a 180 resultados visibles para mantener fluida la navegación, pero muestra el total de coincidencias.

## Estructura

| Archivo | Propósito |
| --- | --- |
| `index.html` | Presentación, mapa conceptual y enlaces de entrada. |
| `examples.html` | Ejemplos Basic y Full, incluyendo configuración con flags. |
| `api.html` | Métodos globales, ventana, notificaciones y diálogos. |
| `components.html` | Constructores de tabs y contratos de cada control. |
| `themes.html` | Presets, esquema semántico, métricas, motion y temas custom. |
| `icons.html` | Carga de sets, uso en tabs y catálogo navegable. |
| `localization.html` | Diccionarios, fallback y claves `@Key`. |
| `reference.html` | Persistencia, geometría, overlays, cleanup y límites. |
| `api.json` | Índice estructurado de métodos, builders, temas y persistencia. |
| `icons.json` | Inventario generado de las entradas de iconos. |
| `styles.css` | Sistema visual responsive y accesible. |
| `app.js` | Búsqueda, navegación móvil, copiado, tabs y catálogo. |

## Fuente

La implementación documentada es `dist/main.lua`. Los nombres de iconos proceden de `src/Icons`. Si la API cambia, actualiza primero los contratos de las páginas afectadas y después vuelve a generar `icons.json`.
