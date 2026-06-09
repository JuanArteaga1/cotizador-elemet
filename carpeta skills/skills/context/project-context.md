# Contexto del Proyecto

## Producto

**ELEMENT Cotizador** es una aplicación profesional para que empresas de construcción y arquitectura en Colombia generen cotizaciones, calculen áreas de construcción, seleccionen servicios de diseño y emitan cuentas de cobro formales.

## Stack completo

### Frontend
- React 19 + TypeScript + Vite + Tailwind CSS v4
- React Router v7, Zustand, Dexie.js (IndexedDB)
- html2canvas + jsPDF para exportación
- Vitest + Testing Library para tests

### Backend
- Node.js 22.x + Express 5.x + JavaScript (ESM)
- JWT + bcrypt para autenticación
- Joi para validación de schemas
- Mocha + Chai + Supertest para tests

### Base de datos
- PostgreSQL 16 + Prisma ORM 6.x
- Migraciones con Prisma Migrate
- Soft delete, JSON columns, UUIDs

## Stack legacy (a migrar)

- HTML5 + CSS3 + JavaScript Vanilla (ELEMENT-COTIZADOR.html)
- LocalStorage para persistencia
- html2canvas para captura de imagen

## Dominio

Cotización de proyectos arquitectónicos:
- Cálculo de áreas (lotes rectangulares/irregulares, ocupación, volados)
- 8 servicios de diseño, sub-paquetes y paquete completo premium
- Plan de pagos fraccionado
- Cuenta de cobro con empresa, representante legal, datos bancarios
- Mercado: Colombia (COP, español)

## Ubicación

- `frontend/` — Cliente React + Vite
- `backend/` — API Express
- `ELEMENT-COTIZADOR.html` — App legacy en la raíz

## Endpoints principales

- `POST /api/v1/auth/login` — Login
- `GET/POST /api/v1/quotes` — CRUD cotizaciones
- `GET/PUT /api/v1/config` — Configuración
- `GET /api/v1/invoices/:quoteId` — Cuenta de cobro
