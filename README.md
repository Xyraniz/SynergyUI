# SynergyUI

SynergyUI es una biblioteca de interfaces para Roblox escrita en Lua. Proporciona ventanas arrastrables y redimensionables, tabs, controles con flags, persistencia en JSON, temas, localización, notificaciones, diálogos y resolución de iconos.


## Documentation

La documentación completa está en [`web/`](web/index.html). También puede servirse localmente como sitio estático:

```bash
cd web
python3 -m http.server 8080
```

Abre `http://localhost:8080/` y comienza por el [Quickstart](web/examples.html). La referencia de componentes incluye todos los builders expuestos por `CreateTab`, sus opciones, callbacks, valores iniciales y métodos de flag.

## Repository layout

| Path | Purpose |
| --- | --- |
| [`dist/main.lua`](dist/main.lua) | Implementación principal de SynergyUI. |
| [`src/Icons/`](src/Icons/) | Catálogos de iconos cargables desde `CreateWindow`. |
| [`web/`](web/index.html) | Sitio de documentación estática. |
| [`.github/workflows/docs.yml`](.github/workflows/docs.yml) | Validación automática de la documentación en pushes y pull requests. |

## License

Consulta [`LICENSE`](LICENSE) para los términos de uso.
