---
name: backend-node-express
description: Backend con Node.js, Express y JavaScript para ELEMENT Cotizador. API REST, autenticación JWT, validación con Joi, arquitectura en capas.
compatibility: opencode
metadata:
  project: ELEMENT Cotizador
  stack: Node.js Express JavaScript
---

# Backend — Node.js + Express (JavaScript)

## Stack

| Tecnología      | Propósito                          |
|-----------------|------------------------------------|
| Node.js 22.x    | Runtime del servidor               |
| Express 5.x     | Framework HTTP (REST API)          |
| JavaScript ESM  | Lenguaje del backend               |
| Prisma 6.x      | ORM para PostgreSQL                |
| JWT             | Autenticación stateless            |
| bcrypt          | Hash de contraseñas                |
| Joi             | Validación de schemas              |
| Morgan          | Logging HTTP                       |
| Helmet          | Seguridad de headers               |
| Nodemon         | Recarga automática en desarrollo   |

## Arquitectura en capas

```
Request HTTP
    → Router (routes/)
    → Middleware (auth, validación, errores)
    → Controller (controllers/)
    → Service (services/) — lógica de negocio
    → Prisma ORM → PostgreSQL
    → Response JSON
```

## Endpoints principales

### Auth
- `POST /api/v1/auth/register` — Registrar usuario
- `POST /api/v1/auth/login` — Iniciar sesión (devuelve JWT)
- `GET /api/v1/auth/me` — Perfil del usuario autenticado

### Quotes
- `GET /api/v1/quotes` — Listar cotizaciones (filtro: estado, fecha, cliente)
- `POST /api/v1/quotes` — Crear cotización
- `GET /api/v1/quotes/:id` — Obtener cotización por ID
- `PUT /api/v1/quotes/:id` — Actualizar cotización
- `DELETE /api/v1/quotes/:id` — Eliminar (soft delete)
- `PATCH /api/v1/quotes/:id/status` — Cambiar estado

### Config
- `GET /api/v1/config` — Obtener configuración (servicios, pagos, facturación)
- `PUT /api/v1/config` — Actualizar configuración

### Invoice
- `GET /api/v1/invoices/:quoteId` — Generar datos de cuenta de cobro
- `POST /api/v1/invoices/:quoteId/send` — Enviar por email

## Reglas

- Los controllers NO tienen lógica de negocio; solo orquestan request/response
- Los services contienen TODA la lógica de negocio y son testeas unitariamente
- Los middleware se encargan de autenticación, validación y manejo de errores
- Errores manejados con middleware centralizado (errorHandler)
- Rutas versionadas bajo `/api/v1/`
- Fechas siempre en ISO 8601 (UTC)
- IDs auto-generados por Prisma
- Soft delete para cotizaciones (campo `deletedAt`)
- Paginación en listas: `?page=1&limit=20`

## Validación

- Usar Joi para validar request body, params y query
- Schemas definidos en `src/utils/validation.js`
- Middleware `validate(schema)` que recibe el schema y lo aplica

## Autenticación

- JWT en header `Authorization: Bearer <token>`
- Payload: `{ userId, role, iat, exp }`
- Middleware `auth` verifica token y adjunta `req.user`
- Middleware `optionalAuth` para endpoints públicos que pueden beneficiarse de contexto

## Testing

- Framework: Mocha + Chai
- HTTP testing: Supertest
- Prisma mock: usar `mongodb-memory-server` o mock de Prisma client
- Tests de integración sobre endpoints completos
- Tests unitarios sobre services
