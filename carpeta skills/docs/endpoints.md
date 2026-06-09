# Endpoints Utilizados por ELEMENT Cotizador

Fuente revisada: `element-cotizador/src/shared/services/api.ts`, usos en `element-cotizador/src/features/**` y `docs/DOCUMENTACION_CONEXION_COTIZADOR.md`.

## Configuracion base

- Base URL por defecto web: `http://localhost:3000/api/v1`.
- Variable esperada: `VITE_API_URL` o runtime `VITE_API_URL`.
- Shop slug por defecto web: `elemet-haus`.
- Header comun: `X-Shop-Slug: <shop_slug>`.
- Header auth: `Authorization: Bearer <token>`.
- El cliente web agrega `?shop_slug=<slug>` a rutas protegidas que no sean `/public/*` ni `/auth/*`.

## Autenticacion

| Metodo | Endpoint | Auth | Uso en app |
|---|---|---:|---|
| POST | `/api/v1/auth/customer/register` | No | Registro de arquitecto/customer. |
| POST | `/api/v1/auth/login` | No | Login y obtencion de JWT. |
| GET | `/api/v1/auth/me` | Si | Perfil del usuario autenticado. |

Nota: `docs/DOCUMENTACION_CONEXION_COTIZADOR.md` tambien menciona `POST /api/v1/auth/customer-register`. El frontend real usa `/auth/customer/register`; conviene confirmar cual queda como contrato final del backend.

## Landing publica

| Metodo | Endpoint | Auth | Uso en app |
|---|---|---:|---|
| GET | `/api/v1/public/site-config?shop_slug=<slug>` | No | Textos, colores y configuracion publica de landing. |
| GET | `/api/v1/public/landing-images?shop_slug=<slug>` | No | Imagenes publicas: hero, logos y piezas visuales. |

## Cotizaciones

| Metodo | Endpoint | Auth | Uso en app |
|---|---|---:|---|
| GET | `/api/v1/quotes?shop_slug=<slug>` | Si | Listar cotizaciones del usuario/customer. |
| GET | `/api/v1/quotes/:id?shop_slug=<slug>` | Si | Cargar una cotizacion especifica. |
| POST | `/api/v1/quotes?shop_slug=<slug>` | Si | Crear cotizacion desde el wizard. |
| PATCH | `/api/v1/quotes/:id?shop_slug=<slug>` | Si | Actualizar cotizacion. |
| DELETE | `/api/v1/quotes/:id?shop_slug=<slug>` | Si | Eliminar cotizacion. |
| POST | `/api/v1/quotes/:id/select-plan?shop_slug=<slug>` | Si | Asignar plan de pagos a cotizacion. |

Payload base de creacion observado/recomendado:

```json
{
  "client": "Maria Garcia",
  "project": "Casa Campestre",
  "area": 250.5,
  "price": 17500000,
  "status": "draft",
  "data": {
    "areaMode": "dimensions",
    "selectedServices": ["arch"],
    "paymentPlanId": 1
  }
}
```

## Planes de pago

| Metodo | Endpoint | Auth | Uso en app |
|---|---|---:|---|
| GET | `/api/v1/payment-plans?shop_slug=<slug>` | Si | Listar planes guardados. |
| GET | `/api/v1/payment-plans/:id?shop_slug=<slug>` | Si | Ver detalle de plan. |
| POST | `/api/v1/payment-plans?shop_slug=<slug>` | Si | Crear plan reutilizable. |
| PUT | `/api/v1/payment-plans/:id?shop_slug=<slug>` | Si | Editar plan. |
| DELETE | `/api/v1/payment-plans/:id?shop_slug=<slug>` | Si | Eliminar plan. |
| PATCH | `/api/v1/payment-plans/:id/default?shop_slug=<slug>` | Si | Marcar plan como predeterminado. |

Payload esperado:

```json
{
  "name": "Plan estandar",
  "description": "Firma, revisiones y entrega",
  "isDefault": true,
  "installments": [
    { "name": "Firma", "percentage": 50, "order": 1 },
    { "name": "Revision 1", "percentage": 30, "order": 2 },
    { "name": "Entrega", "percentage": 20, "order": 3 }
  ]
}
```

## Pagos de cotizaciones

| Metodo | Endpoint | Auth | Uso en app |
|---|---|---:|---|
| GET | `/api/v1/quotes/:id/payments?shop_slug=<slug>` | Si | Listar pagos registrados de una cotizacion. |
| POST | `/api/v1/quotes/:id/payments?shop_slug=<slug>` | Si | Registrar pago manual de una cuota. |
| DELETE | `/api/v1/quotes/:id/payments/:paymentId?shop_slug=<slug>` | Si | Revertir/eliminar pago registrado. |

Payload observado:

```json
{
  "installmentIndex": 0,
  "amount": 8750000,
  "method": "manual",
  "status": "confirmed",
  "notes": "Transferencia bancaria"
}
```

## Configuracion del customer

| Metodo | Endpoint | Auth | Uso en app |
|---|---|---:|---|
| GET | `/api/v1/customer-config/me?shop_slug=<slug>` | Si | Cargar tarifas, invoice, estimacion y plan default. |
| PUT | `/api/v1/customer-config/me?shop_slug=<slug>` | Si | Guardar configuracion del usuario/customer. |

El frontend web convierte algunos campos:

| Frontend | Backend |
|---|---|
| `subPackages` | `sub_packages` |
| `completePackage` | `complete_package` |
| `paymentPlan` | `payment_plan` |
| `obraNegraPrice` | `obra_negra` |
| `obraGrisPrice` | `obra_gris` |
| `acabadosPrice` | `acabados` |
| `customEstimations` | `custom_estimations` |

## Rutas internas de la app web a mapear en Android

| Web | Pantalla Android sugerida |
|---|---|
| `/` | Landing publica |
| `/login` | Login |
| `/register` | Registro |
| `/dashboard` | Inicio autenticado |
| `/quote` | Wizard de cotizacion |
| `/history` | Historial |
| `/invoice/:quoteId` | Cuenta de cobro |
| `/tarifas` | Ajustes: tarifas |
| `/pagos` | Ajustes: pagos |
| `/cuenta-cobro` | Ajustes: cuenta de cobro |
| `/estimacion` | Ajustes: estimacion de obra |

## Endpoints historicos/documentados pero no usados por el frontend actual

Estos aparecen en documentos antiguos (`docs/database.md` o historias), pero no en `api.ts`:

- `/api/health`
- `/api/site-config`
- `/api/landing-images`
- `/api/service-catalog`
- `/api/auth/register`
- `/api/auth/login`
- `/api/auth/me`
- `/api/config`
- `/api/admin/*`
- `/api/webhooks/*`

Para la app Android conviene tomar como contrato inicial los endpoints `/api/v1/*` usados por `api.ts`.
