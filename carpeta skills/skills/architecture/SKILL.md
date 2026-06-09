---
name: architecture
description: Reglas de arquitectura para ELEMENT Cotizador. Usa esta skill al decidir estructura de carpetas, capas frontend/backend, persistencia, validacion y calidad.
compatibility: opencode
metadata:
  project: ELEMENT Cotizador
  stack: React TypeScript Node Express Prisma
---

# Architecture

Usa esta skill antes de proponer o implementar cambios estructurales en ELEMENT Cotizador.

## Flujo

1. Lee [rules.md](rules.md) para confirmar stack, capas, estructura y reglas de calidad.
2. Mantén frontend feature-first, backend por capas y persistencia con Prisma/IndexedDB segun el modulo.
3. Si agregas una regla recurrente, actualiza [rules.md](rules.md).

## Principios clave

- Frontend: React 19, TypeScript, Vite, Tailwind v4, mobile-first.
- Backend: Node.js, Express, JavaScript ESM, REST versionado en `/api/v1`.
- Base de datos: PostgreSQL, Prisma, soft delete y migraciones versionadas.
- Validacion: lint, typecheck, tests y verificacion visual cuando aplique.
