# Herramientas del Proyecto

## Frontend (desde frontend/)

```powershell
npm run dev          # Inicia Vite (dev)
npm run build        # Compila producción
npm run preview      # Sirve build local
npm run lint         # ESLint TypeScript
npm run typecheck    # Verifica tipos TS
npm run test         # Vitest
npm run test:watch   # Vitest watch mode
```

## Backend (desde backend/)

```powershell
npm run dev          # Inicia con Nodemon (recarga automática)
npm run start        # Inicia servidor producción
npm run lint         # ESLint JavaScript
npm run test         # Mocha + Supertest

# Prisma
npx prisma generate      # Generar Prisma Client
npx prisma migrate dev   # Migración desarrollo
npx prisma migrate deploy# Migración producción
npx prisma db seed       # Poblar BD inicial
npx prisma studio        # UI exploradora de BD
npx prisma validate      # Validar schema
```

## Dependencias clave

### Frontend
| Dependencia         | Propósito                     |
|---------------------|-------------------------------|
| react, react-dom    | UI framework                  |
| react-router-dom    | Navegación SPA                |
| zustand             | Estado global                 |
| dexie               | IndexedDB wrapper             |
| html2canvas         | Captura DOM → imagen          |
| jspdf               | Generación PDF                |
| tailwindcss         | Utilidades CSS                |
| vitest              | Testing unitario              |

### Backend
| Dependencia         | Propósito                     |
|---------------------|-------------------------------|
| express             | Framework HTTP                |
| @prisma/client      | ORM PostgreSQL                |
| jsonwebtoken        | JWT auth                      |
| bcrypt              | Hash contraseñas              |
| joi                 | Validación de schemas         |
| cors                | CORS headers                  |
| helmet              | Seguridad HTTP                |
| morgan              | Logging HTTP                  |
| nodemon             | Dev auto-reload               |
| mocha / chai        | Testing                       |
| supertest           | HTTP testing                  |

## Variables de entorno

### Frontend (frontend/.env)
```
VITE_APP_TITLE=ELEMENT Cotizador
VITE_APP_VERSION=1.0.0
VITE_API_URL=http://localhost:4000/api/v1
```

### Backend (backend/.env)
```
PORT=4000
DATABASE_URL=postgresql://user:password@localhost:5432/element_cotizador
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```
