# Historias de Usuario - Revision para Android

## Resultado de verificacion

Se encontro `docs/user-stories.txt` y se copio como `android/docs/user-stories-original.txt`.

El archivo original contiene 47 historias y cubre los modulos principales de la app web:

- Autenticacion, registro y rutas protegidas.
- Dashboard y navegacion.
- Wizard de cotizacion de 5 pasos.
- Historial, resumen, edicion, eliminacion y estado de cotizaciones.
- Cuenta de cobro, compartir e imprimir/exportar.
- Ajustes de tarifas, pagos, cuenta de cobro y estimacion.
- Persistencia local/demo, PWA, notificaciones, sidebar y microinteracciones.
- Backend/API REST y sincronizacion.

Las historias son suficientes como base funcional, pero no estaban completas para Android nativo. Se agregan historias especificas de Android para cubrir almacenamiento seguro, navegacion nativa, conectividad, exportacion/compartir y permisos.

## Historias Android agregadas

### US-48 | App Android nativa con identidad ELEMENT

Como usuario de ELEMENT Cotizador,
quiero usar una app Android nativa con la misma identidad premium de la web,
para cotizar desde el celular con una experiencia fluida y profesional.

Criterios:

- Implementa tema oscuro con acento dorado.
- Respeta componentes tactiles de minimo 44dp.
- Mantiene navegacion principal: Inicio, Cotizar, Historial, Ajustes.
- Usa textos en espanol y moneda COP.
- La primera pantalla autenticada es el dashboard.

### US-49 | Almacenamiento seguro de sesion

Como usuario autenticado,
quiero que mi sesion quede guardada de forma segura,
para no iniciar sesion cada vez sin exponer mi token.

Criterios:

- Guarda JWT en DataStore seguro o EncryptedSharedPreferences.
- Agrega `Authorization: Bearer <token>` a requests protegidos.
- Limpia token y datos locales al cerrar sesion.
- Redirige a login ante errores 401.

### US-50 | Cliente API Android conectado al backend principal

Como desarrollador,
quiero un cliente API centralizado,
para consumir todos los endpoints del backend de forma consistente.

Criterios:

- Base URL configurable por build flavor o archivo de configuracion.
- Header `X-Shop-Slug` en todas las solicitudes.
- Query `shop_slug` en rutas protegidas mientras el backend lo requiera.
- Manejo uniforme de respuestas `{ data: ... }`.
- Manejo de errores de red con mensajes claros.

### US-51 | Sincronizacion y tolerancia a fallos de red

Como usuario movil,
quiero que la app maneje desconexiones sin perder mi trabajo,
para poder cotizar aun con internet inestable.

Criterios:

- Muestra estados de carga y error al consultar backend.
- No borra el formulario actual si falla un request.
- Reintenta carga de dashboard/historial desde una accion visible.
- Mantiene en memoria el borrador del wizard durante la sesion.
- Si se implementa cache offline, marca claramente datos pendientes de sincronizar.

### US-52 | Compartir cuenta de cobro desde Android

Como usuario,
quiero compartir la cuenta de cobro desde la app Android,
para enviarla por WhatsApp, correo u otras aplicaciones.

Criterios:

- Genera PDF o imagen de la cuenta de cobro desde datos de quote + config.
- Abre Android Sharesheet con archivo o texto preformateado.
- Nombre de archivo incluye consecutivo y cliente.
- Permite imprimir con flujo nativo cuando el dispositivo lo soporte.

### US-53 | Gestion de imagenes en ajustes

Como usuario administrador,
quiero cargar logo y firma desde mi dispositivo,
para personalizar la cuenta de cobro.

Criterios:

- Usa selector nativo de imagenes.
- Valida tamano y tipo de archivo.
- Muestra previsualizacion y opcion de eliminar.
- Guarda referencia segun contrato del backend; si aun no hay upload, mantiene valor local temporal.

### US-54 | Registro manual de pagos desde historial

Como usuario,
quiero registrar pagos de cuotas desde el historial,
para saber que partes de una cotizacion ya fueron pagadas.

Criterios:

- Carga pagos con `GET /quotes/:id/payments`.
- Muestra cuotas pendientes y pagadas.
- Registra pago con monto calculado por porcentaje.
- Evita registrar dos pagos confirmados para la misma cuota.
- Permite revertir un pago si el backend lo autoriza.

### US-55 | Paridad de ajustes web en Android

Como usuario administrador,
quiero configurar tarifas, planes de pago, datos de cuenta de cobro y estimaciones en Android,
para no depender de la web.

Criterios:

- Tarifas: listar, editar, crear servicio custom y eliminar custom.
- Planes: listar, crear, editar, eliminar y marcar default.
- Cuenta de cobro: empresa, representante, banco y documento.
- Estimacion: precios de obra negra, gris, acabados y estimaciones custom si existen.
- Guarda cambios con `PUT /customer-config/me`.

## Estado final

Historias base verificadas: 47.

Historias Android agregadas: 8.

Total consolidado para desarrollo Android: 55.
