# SynergyUI

**SynergyUI** es una biblioteca de interfaces para Roblox escrita en Lua. Su API está organizada alrededor de ventanas, tabs y controles configurables, con soporte para temas, iconos, localización, flags, persistencia y overlays.

> **Documentación:** [xyraniz.github.io/SynergyUI](https://xyraniz.github.io/SynergyUI/)

## Inicio rápido

Carga la implementación publicada en la rama `main` y conserva el resultado en la variable `SynergyUI`. Este es el loader que utiliza la documentación oficial:

```lua
local SynergyUI = loadstring(game:HttpGet("https://raw.githubusercontent.com/Xyraniz/SynergyUI/main/dist/main.lua"))()
```

Después puedes crear una ventana, un tab y tu primer control:

```lua
local Window = SynergyUI:CreateWindow({
    Title = "Mi primera ventana",
})

local MainTab = Window:CreateTab("Main")

MainTab:CreateButton({
    Name = "Say hello",
    Callback = function()
        SynergyUI:Notify("Hello from SynergyUI")
    end,
})
```

El loader requiere un entorno Roblox que permita realizar la solicitud HTTP y ejecutar el código Lua descargado. La documentación incluye ejemplos completos y contratos detallados para cada método.

## Qué incluye

| Área | Capacidades |
| --- | --- |
| Ventanas | Ventanas arrastrables y redimensionables, minimizar, tecla de alternancia, ciclo de vida y overlays. |
| Navegación | Tabs con iconos y un objeto de elementos para construir cada sección. |
| Controles | Labels, secciones, separadores, botones, toggles, checkboxes, sliders, progress bars, dropdowns, checklists, inputs, keybinds, color pickers, radio groups, imágenes y vídeo. |
| Estado | Flags para leer y cambiar valores desde fuera de la UI, callbacks y persistencia en JSON. |
| Apariencia | Temas incluidos, color de acento, temas personalizados y sistema semántico de colores. |
| Utilidades | Notificaciones, notificaciones del juego, diálogos `Alert`, `Confirm` y `Prompt`, además de localización. |
| Iconos | Sets `solar`, `lucide`, `geist` y otros catálogos documentados, con nombres, asset IDs y descriptores de spritesheet. |

## Documentación

La documentación pública vive en [https://xyraniz.github.io/SynergyUI/](https://xyraniz.github.io/SynergyUI/). El recorrido recomendado es:

1. [Quickstart](https://xyraniz.github.io/SynergyUI/examples.html) para copiar un ejemplo básico o completo.
2. [Components](https://xyraniz.github.io/SynergyUI/components.html) para consultar opciones, callbacks y valores iniciales.
3. [Global API](https://xyraniz.github.io/SynergyUI/api.html) para ventanas, notificaciones, diálogos y utilidades globales.
4. [Themes](https://xyraniz.github.io/SynergyUI/themes.html), [Icon catalog](https://xyraniz.github.io/SynergyUI/icons.html) y [Localization](https://xyraniz.github.io/SynergyUI/localization.html) para personalizar la experiencia.
5. [Runtime notes](https://xyraniz.github.io/SynergyUI/reference.html) para persistencia, geometría, overlays, limpieza y límites del runtime.
6. [AI-readable reference](https://xyraniz.github.io/SynergyUI/llms.txt) para firmas completas, opciones, retornos, prioridades y reglas de carga. El mismo contrato está disponible en [`llms.txt`](llms.txt) en la raíz del repositorio.

## Estructura del repositorio

| Ruta | Propósito |
| --- | --- |
| [`dist/main.lua`](dist/main.lua) | Implementación distribuible de SynergyUI. |
| [`web/`](web/index.html) | Fuente de la documentación pública estática. |
| [`web/api.json`](web/api.json) | Índice estructurado de métodos, builders, temas y persistencia. |
| [`llms.txt`](llms.txt) | Referencia canónica completa y legible por máquinas de la API y el runtime. |
| [`web/llms.txt`](web/llms.txt) | Copia publicada de la referencia AI-readable; debe permanecer sincronizada con la raíz. |
| [`web/icons.json`](web/icons.json) | Catálogo generado de las entradas de iconos. |
| [`tools_build_icon_catalog.py`](tools_build_icon_catalog.py) | Generador del catálogo de iconos a partir de los archivos fuente. |
| [`.github/workflows/docs.yml`](.github/workflows/docs.yml) | Validación y despliegue automático de GitHub Pages. |

## Desarrollo de la documentación

Los cambios de documentación se realizan dentro de `web/`; la referencia AI-readable canónica vive también en `llms.txt` y su copia publicada en `web/llms.txt`. El workflow de GitHub Actions comprueba que existan las páginas requeridas, valida las referencias HTML, verifica que ambas referencias AI-readable sean idénticas y confirma que el catálogo de iconos generado esté actualizado. Cuando los cambios llegan a `main`, GitHub Pages publica la carpeta `web/` en el sitio oficial.

Si cambias los catálogos de iconos, regenera `web/icons.json` con:

```bash
python3 tools_build_icon_catalog.py
```

## Licencia

Consulta [`LICENSE`](LICENSE) para conocer los términos de uso del proyecto.
