# Memoria del Proyecto

## Estado actual

- Proyecto legacy en HTML/CSS/JS vanilla (ELEMENT-COTIZADOR.html)
- Scaffold creado: frontend/ (React+TS+Tailwind) + backend/ (Node+Express+JS)
- Documentación extraída: 34 user stories, design system, architecture
- Skills reestructuradas de LimitsHub a ELEMENT

## Decisiones tomadas

### Frontend
- React + TypeScript + Vite + Tailwind v4
- Feature-first folder structure
- Zustand para estado global
- Dexie.js (IndexedDB) para persistencia local offline
- Mobile-first (430px) con tema oscuro + acento dorado #b69462

### Backend
- Node.js + Express + **JavaScript** (no TypeScript en backend)
- API REST versionada bajo `/api/v1/`
- JWT stateless para autenticación
- Joi para validación de schemas
- Layered architecture: routes → controllers → services → Prisma
- Soft delete para cotizaciones (campo deletedAt)

### Base de datos
- PostgreSQL + Prisma ORM
- UUIDs como PKs
- JSON columns para datos flexibles (formData, paymentPlan)
- 8 servicios por defecto no eliminables
- Plan de pagos debe sumar 100%

## Riesgos conocidos

- La migración del diagrama SVG interactivo a React es compleja
- html2canvas tiene limitaciones con estilos modernos CSS
- Sin backend aún no implementado: toda la app opera 100% local
- Sincronización offline-online será un desafío técnico futuro

## Próximos candidatos

- Implementar backend (Express + Prisma + JWT)
- Migrar lógica de localStorage a IndexedDB (frontend)
- Sincronización bidireccional IndexedDB ↔ PostgreSQL
- Exportación a Excel/CSV
- Panel de estadísticas y reportes
