# Reglas de Arquitectura

## Stack

- **Frontend:** React 19 + TypeScript + Vite + Tailwind v4
- **Backend:** Node.js + Express + JavaScript (ESM)
- **Base de datos:** PostgreSQL + Prisma ORM
- **Autenticación:** JWT + bcrypt

## Principios generales

- Feature-first en frontend (`features/quote/`, `features/invoice/`)
- Layered architecture en backend (routes → controllers → services → Prisma)
- Servicios puros (sin UI) para lógica de negocio
- Repository pattern para acceso a datos
- Estado global mínimo con Zustand
- Mobile-first (430px base)
- Offline-first: funcionalidad local + sincronización con backend
- verifica las skills que puedas utilizar y te sirvan 

## Estructura de carpetas

```
element-cotizador/
├── frontend/
│   └── src/
│       ├── app/              # Router, layout, providers
│       ├── features/         # auth, dashboard, quote, history, invoice, settings
│       ├── shared/           # components, hooks, services, types
│       └── lib/              # utils, constants
│
├── backend/
│   └── src/
│       ├── routes/           # Definición de rutas REST
│       ├── controllers/      # Orquestación request/response
│       ├── services/         # Lógica de negocio
│       ├── middleware/       # JWT, validación, errores
│       ├── models/           # Schemas Prisma importados
│       └── utils/            # Helpers, validación Joi
│
├── docs/                     # Documentación
└── .agents/skills/           # Contexto para agentes IA
```

## Principios backend

- **RESTful API** versionada (`/api/v1/`)
- **Stateless**: JWT en cada request, no sesiones
- **Error handling centralizado**: middleware `errorHandler` al final de la cadena Express
- **Controllers delgados**: solo reciben request, llaman services, devuelven response
- **Services gruesos**: toda la lógica de negocio, testeas unitariamente
- **Validación en middleware**: Joi schemas separados por endpoint
- **Soft delete**: campo `deletedAt` en Quote, nunca DELETE físico

## Principios base de datos

- **Prisma schema** declarativo como fuente de verdad
- **Migrations** versionadas con Prisma Migrate
- **Índices** en columnas de filtro/búsqueda: status, createdAt, userId, consecutive
- **JSON columns** para datos flexibles (formData, paymentPlan) sin perder esquematización
- **UUID v4** como PKs para escalar sin conflictos
- **Relaciones** modeladas con foreign keys en Prisma

## Calidad

- Frontend: `npm run lint`, `npm run typecheck`, `npm run test` (Vitest)
- Backend: `npm run lint` (ESLint JS), `npm run test` (Mocha + Supertest)
- Prisma: `npx prisma validate` antes de migrar
- Tests unitarios obligatorios para services (frontend y backend)
