# Brief Frontend Android

## Objetivo

Desarrollar una app Android para ELEMENT Cotizador que replique la experiencia principal del frontend web y se conecte al backend versionado en `/api/v1`.

## Contexto funcional

ELEMENT Cotizador sirve a constructoras, arquitectos e ingenieros en Colombia. La app permite:

- Registro e inicio de sesion.
- Landing publica configurable por tienda.
- Wizard de cotizacion de 5 pasos.
- Calculo de areas, servicios, descuentos y planes de pago.
- Historial de cotizaciones.
- Registro manual de pagos.
- Generacion/visualizacion de cuenta de cobro.
- Ajustes de tarifas, planes de pago, datos de cuenta de cobro y estimacion de obra.

## Skills usadas como insumo

No existe una skill especifica de Android en el proyecto. Para esta preparacion se copiaron las skills que mas aportan al frontend mobile:

- `project-context`: dominio, stack, alcance y tono de producto.
- `frontend-patterns`: patrones UI ya usados en la web.
- `layout-taste`: criterio mobile-first, jerarquia, densidad y acento dorado.
- `architecture`: reglas de arquitectura, capas y contrato REST.

## Adaptacion visual Android

La app debe sentirse nativa, pero conservar identidad ELEMENT:

- Fondo principal: `#0a0a0a`.
- Superficies: `#1a1a1a`.
- Bordes/divisores: `#2a2a2a`.
- Texto principal: `#ffffff`.
- Texto secundario: `#999999`.
- Acento: `#b69462`.
- Peligro: `#ff3b30`.
- Exito: `#34c759`.

En Compose, crear `ElementTheme` con `ColorScheme` oscuro. Usar el acento dorado para CTA, foco, seleccion y progreso, no como decoracion masiva.

## Componentes a portar

- Bottom navigation con 4 entradas: Inicio, Cotizar, Historial, Ajustes.
- Sidebar/menu lateral para accesos secundarios.
- Cards compactas para acciones, cotizaciones y servicios.
- Inputs tactiles de minimo 44dp de alto.
- Toggle options para modos de area, forma de lote y paquete completo.
- Service item seleccionable con check visual.
- Checkbox item para fachadas con volado.
- Step indicator del wizard.
- Dialogos de confirmacion para acciones destructivas.
- Toast/Snackbar para exito, error y advertencia.

## Arquitectura recomendada

```text
android/
  app/
    src/main/java/.../
      core/
        network/
        storage/
        ui/
        model/
      feature/
        auth/
        landing/
        dashboard/
        quote/
        history/
        invoice/
        settings/
```

Reglas:

- Feature-first.
- ViewModel por pantalla o flujo.
- Repositorios para hablar con API.
- DTOs separados de modelos de UI si el backend usa `snake_case`.
- Guardar token en DataStore o EncryptedSharedPreferences.
- Centralizar `shop_slug` y `BASE_URL`.

## Diferencias importantes frente a web

- La web usa `localStorage`; Android debe usar almacenamiento seguro.
- La web imprime con `window.print`; Android debe usar `PrintManager`, PDF nativo o share sheet.
- La web usa html2canvas; Android deberia renderizar cuenta de cobro como pantalla/PDF nativo.
- La web manda `shop_slug` como query param y header `X-Shop-Slug`; Android debe replicar ambos mientras el backend lo requiera.
- Las imagenes/logo/firma deben resolverse con picker nativo y, si el backend lo soporta, subir a storage en vez de base64 local.
