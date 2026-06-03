================================================================================
  ELEMENT - COTIZADOR PROFESIONAL
  Arquitectura, Lenguajes y Herramientas
================================================================================

1. LENGUAJES
--------------------------------------------------------------------------------
  Frontend:     TypeScript 6.0 (tipado estricto)
  Backend:      JavaScript (Node.js 22.x)
  Estilos:      CSS (via Tailwind v4)
  Marcado:      HTML5 / JSX (React)
  Base de datos: SQL (PostgreSQL via Prisma ORM)


2. FRAMEWORKS Y LIBRERÍAS PRINCIPALES
--------------------------------------------------------------------------------
  FRONTEND
  ───────────────────────────────────────────────────────────────────────────────
  Categoría            | Tecnología        | Versión   | Propósito
  ---------------------|-------------------|-----------|---------------------------
  UI Framework         | React             | 19.x      | Componentes SPA
  Build Tool           | Vite              | 8.x       | Dev server, bundler
  Routing              | React Router      | 7.x       | Navegación SPA
  Estilos              | Tailwind CSS      | 4.x       | Utility-first CSS
  Estado global        | Zustand           | 5.x       | Estado reactivo mínimo
  Persistencia local   | Dexie.js          | 4.x       | IndexedDB wrapper
  Captura de imagen    | html2canvas       | 1.4.x     | DOM → PNG
  Exportación PDF      | jsPDF             | 4.x       | Generación de PDFs

  BACKEND
  ───────────────────────────────────────────────────────────────────────────────
  Categoría            | Tecnología        | Versión   | Propósito
  ---------------------|-------------------|-----------|---------------------------
  Runtime              | Node.js           | 22.x      | Entorno servidor
  Framework API        | Express           | 5.x       | REST API
  Lenguaje             | JavaScript        | ESM       | Lógica del servidor
  Autenticación        | JWT (jsonwebtoken)| —         | Tokens de acceso
  Encriptación         | bcrypt            | —         | Hash de contraseñas
  Validación           | Joi / express-validator | —  | Validación de requests
  Documentación API    | Swagger / OpenAPI | —         | Documentación endpoints

  BASE DE DATOS
  ───────────────────────────────────────────────────────────────────────────────
  Categoría            | Tecnología        | Versión   | Propósito
  ---------------------|-------------------|-----------|---------------------------
  Motor BD             | PostgreSQL        | 16.x      | Base de datos relacional
  ORM                  | Prisma            | 6.x       | Modelado y consultas
  Migraciones          | Prisma Migrate    | —         | Control de esquema
  Cliente API          | REST              | —         | Comunicación frontend-backend


3. HERRAMIENTAS DE DESARROLLO
--------------------------------------------------------------------------------
  FRONTEND
  - Testing unitario:     Vitest 4.x + Testing Library + jsdom
  - Linting:              ESLint 10.x + typescript-eslint
  - Type checking:        TypeScript 6.0 (tsc)
  - Formateo:             Prettier

  BACKEND
  - Testing:              Node:test / Mocha + Chai / Supertest
  - Linting:              ESLint 10.x (JavaScript)
  - Formateo:             Prettier
  - Dev reload:           Nodemon
  - Debugging:            Node inspector (--inspect)

  GENERALES
  - Control de versión:   Git
  - Editor:               Cursor / VS Code
  - Contenedores:         Docker (producción)


4. ARQUITECTURA DE CARPETAS
--------------------------------------------------------------------------------
  element-cotizador/
  │
  ├── docs/                          # Documentación del proyecto
  │   ├── user-stories.txt           # 34 user stories
  │   ├── design-system.txt          # Guía de diseño visual
  │   └── architecture.md            # Este archivo
  │
  ├── .agents/skills/                # Contexto para agentes IA
  │   ├── architecture/rules.md      # Reglas técnicas
  │   ├── context/project-context.md # Descripción del producto
  │   ├── memory/                    # Decisiones y riesgos
  │   ├── workflows/                 # Flujos de desarrollo
  │   ├── prompts/                   # Prompts reutilizables
  │   ├── tools/                     # Comandos y scripts
  │   ├── backend/                   # Skill backend Node/Express
  │   └── database/                  # Skill base de datos
  │
  ├── backend/                       # API server (Node + Express)
  │   ├── src/
  │   │   ├── routes/               # Rutas REST (auth, quotes, config...)
  │   │   ├── controllers/          # Lógica de cada endpoint
  │   │   ├── models/               # Modelos Prisma
  │   │   ├── middleware/           # JWT, validación, errores
  │   │   ├── services/            # Lógica de negocio del backend
  │   │   ├── utils/               # Helpers, constantes
  │   │   └── app.js               # Entry point Express
  │   ├── prisma/
  │   │   ├── schema.prisma         # Esquema de base de datos
  │   │   └── migrations/           # Migraciones generadas
  │   ├── tests/                    # Tests del backend
  │   ├── package.json
  │   └── .env                      # Variables de entorno backend
  │
  └── frontend/                      # Cliente React (Vite)
      └── src/
          ├── app/                   # Router y layout global
          ├── features/
          │   ├── auth/              # Login
          │   ├── dashboard/         # Inicio
          │   ├── quote/             # Wizard 5 pasos
          │   ├── history/           # Historial
          │   ├── invoice/           # Cuenta de cobro
          │   └── settings/          # Configuración
          ├── shared/
          │   ├── components/        # UI primitives
          │   ├── hooks/             # Custom hooks
          │   ├── services/          # Lógica de negocio pura
          │   └── types/             # Interfaces TS
          ├── lib/                   # Utilidades
          └── index.css              # Estilos globales + Tailwind


5. PRINCIPIOS ARQUITECTÓNICOS
--------------------------------------------------------------------------------
  GENERALES
  - Feature-first: cada funcionalidad es una carpeta autocontenida
  - Single Responsibility: servicios de negocio SIN dependencias UI
  - Repository Pattern: acceso a datos abstraído tras interfaces
  - Mobile-first: diseño base 430px, adaptativo a desktop
  - Offline-first: funcionalidad parcial sin conexión (caché local)

  BACKEND
  - RESTful API: endpoints semanticos y versionados (/api/v1/)
  - Stateless: cada request contiene su contexto (JWT)
  - Layered architecture: routes → controllers → services → Prisma
  - Separation: lógica de negocio en services, no en controllers
  - Error handling centralizado: middleware de errores Express

  BASE DE DATOS
  - Modelado con Prisma: schema declarativo, migrations automatizadas
  - Índices en columnas de búsqueda frecuente (clientes, fechas, estados)
  - Soft delete para cotizaciones (campo deletedAt)
  - Relaciones: User → Quotes → QuoteItems, Config → Services


6. FLUJO DE DATOS
--------------------------------------------------------------------------------
  OFFLINE (solo frontend local)
  ───────────────────────────────────────────────────────────────────────────────
  Componente (UI)
      ↓  llama a
  Custom Hook (useQuote, usePricing)
      ↓  usa
  Service (areaCalculator, pricingService)
      ↓  persiste en
  Repository (QuoteRepository, ConfigRepository)
      ↓  almacena en
  IndexedDB (Dexie.js) / localStorage

  ONLINE (con backend)
  ───────────────────────────────────────────────────────────────────────────────
  Componente (UI)
      ↓  llama a
  API Hook (useApi)
      ↓  petición HTTP (fetch/axios)
  Express Router (/api/v1/quotes)
      ↓  delega a
  Controller (quoteController)
      ↓  usa
  Service (quoteService)
      ↓  consulta con
  Prisma ORM
      ↓  ejecuta en
  PostgreSQL

  SINCRONIZACIÓN (futuro)
  ───────────────────────────────────────────────────────────────────────────────
  Los datos locales en IndexedDB se sincronizan con PostgreSQL
  cuando hay conexión. Estrategia: offline-first con cola de escritura.


7. DEPENDENCIAS COMPLETAS
--------------------------------------------------------------------------------
  FRONTEND (package.json)
  ───────────────────────────────────────────────────────────────────────────────
  Producción:
    react, react-dom, react-router-dom, zustand,
    dexie, html2canvas, jspdf, tailwindcss, @tailwindcss/vite

  Desarrollo:
    typescript, vite, @vitejs/plugin-react, vitest,
    @testing-library/react, @testing-library/jest-dom, jsdom,
    eslint, typescript-eslint, @eslint/js,
    eslint-plugin-react-hooks, eslint-plugin-react-refresh

  BACKEND (package.json)
  ───────────────────────────────────────────────────────────────────────────────
  Producción:
    express, cors, helmet, morgan,
    @prisma/client, jsonwebtoken, bcrypt,
    joi, express-validator

  Desarrollo:
    nodemon, prisma, eslint, prettier,
    mocha, chai, supertest


8. SCRIPTS DISPONIBLES
--------------------------------------------------------------------------------
  FRONTEND
  ───────────────────────────────────────────────────────────────────────────────
  npm run dev          → Inicia Vite (frontend)
  npm run build        → Compila frontend para producción
  npm run lint         → ESLint frontend
  npm run typecheck    → Verifica tipos TypeScript
  npm run test         → Tests frontend (Vitest)

  BACKEND
  ───────────────────────────────────────────────────────────────────────────────
  npm run dev          → Inicia servidor con Nodemon
  npm run start        → Inicia servidor en producción
  npm run lint         → ESLint backend
  npm run test         → Tests backend (Mocha)
  npm run db:migrate   → Ejecuta migraciones Prisma
  npm run db:seed      → Pobla base de datos con datos iniciales
  npm run db:studio    → Abre Prisma Studio (UI de BD)


9. VARIABLES DE ENTORNO
--------------------------------------------------------------------------------
  FRONTEND (.env en frontend/)
  ───────────────────────────────────────────────────────────────────────────────
  VITE_APP_TITLE=ELEMENT Cotizador
  VITE_APP_VERSION=1.0.0
  VITE_API_URL=http://localhost:4000/api/v1

  BACKEND (.env en backend/)
  ───────────────────────────────────────────────────────────────────────────────
  PORT=4000
  DATABASE_URL=postgresql://user:password@localhost:5432/element_cotizador
  JWT_SECRET=your-secret-key
  JWT_EXPIRES_IN=7d
  CORS_ORIGIN=http://localhost:5173


10. DECISIONES TÉCNICAS CLAVE
--------------------------------------------------------------------------------
  FRONTEND
  ✓ TypeScript sobre JavaScript: tipado estricto para modelo de datos complejo
  ✓ Zustand sobre Redux/Context: mínimo boilerplate, fácil migración
  ✓ Dexie.js sobre localStorage puro: queries, índices, escalabilidad
  ✓ Tailwind v4 sobre CSS modules: rapidez de desarrollo, tema consistente
  ✓ Vitest sobre Jest: integración nativa con Vite, más rápido
  ✓ Feature-first sobre pages/router: mejor escalabilidad a largo plazo

  BACKEND
  ✓ JavaScript sobre TypeScript en backend: simplicidad, equipo reducido
  ✓ Express sobre Fastify/NestJS: madurez, comunidad, simplicidad
  ✓ Prisma sobre Sequelize/Knex: schema declarativo, migrations, DX
  ✓ PostgreSQL sobre MongoDB: datos relacionales, integridad referencial
  ✓ JWT sobre sesiones: stateless, escalable, mobile-friendly
  ✓ API REST sobre GraphQL: simplicidad, suficiente para el dominio

  ARQUITECTURA
  ✓ Offline-first: funciona sin backend + sincronización cuando hay conexión
  ✓ Monorepo sin monorepo tool: dos proyectos separados (frontend/ + backend/)
  × Sin WebSockets: no hay necesidad de tiempo real
  × Sin microservicios: dominio acotado, un solo equipo
  × Sin colas de mensajes: no hay procesos asíncronos pesados

================================================================================
