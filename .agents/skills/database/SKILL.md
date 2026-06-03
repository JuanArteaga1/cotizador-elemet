---
name: database-postgres-prisma
description: Base de datos PostgreSQL con Prisma ORM para ELEMENT Cotizador. Migraciones, modelo de datos, relaciones e índices.
compatibility: opencode
metadata:
  project: ELEMENT Cotizador
  stack: PostgreSQL Prisma
---

# Base de Datos — PostgreSQL + Prisma

## Stack

| Tecnología      | Propósito                          |
|-----------------|------------------------------------|
| PostgreSQL 16.x | Motor de base de datos relacional  |
| Prisma 6.x      | ORM, migraciones, tipo seguro      |
| Prisma Studio   | UI visual para explorar datos      |

## Modelo de datos

### User
```
id            String (PK, auto UUID)
email         String (único)
password      String (hash con bcrypt)
name          String
company       String? (nombre de empresa opcional)
role          enum: ADMIN, USER (default: USER)
createdAt     DateTime
updatedAt     DateTime
```

### Quote
```
id            String (PK, auto UUID)
consecutive   Int (auto-incremental, unique)
clientName    String
projectName   String
status        enum: DRAFT, SENT, PAID, COMPLETED, CANCELLED
area          Float
totalPrice    Float
discount      Float (default: 0)
paymentPlan   JSON (plan de pagos personalizado por cotización)
formData      JSON (datos completos del wizard)
createdAt     DateTime
updatedAt     DateTime
deletedAt     DateTime? (soft delete)
userId        String (FK → User)
```

### QuoteService
```
id            String (PK)
quoteId       String (FK → Quote)
serviceId     String (FK → Service | custom)
serviceName   String
servicePrice  Float
quantity      Float
unit          String
total         Float
type          enum: PACKAGE, SUBPACKAGE, INDIVIDUAL, ADDITIONAL
```

### Service (catálogo global)
```
id            String (PK)
key           String (único, ej: "arch", "struct")
name          String
price         Float
unit          String
isDefault     Boolean (no editable si es true)
createdAt     DateTime
```

### Config
```
id            String (PK)
userId        String (FK → User, único)
subPackages   JSON
completePackage JSON
paymentPlan   JSON
invoice       JSON (company, representative, banking, document)
updatedAt     DateTime
```

## Relaciones

```
User 1──N Quote
User 1──1 Config
Quote 1──N QuoteService
Quote N──1 User
Config N──1 User
```

## Reglas

- IDs: UUID v4 generados con `cuid()` de Prisma o `uuid`
- Soft delete con campo `deletedAt` (nunca borrar físicamente cotizaciones)
- Timestamps automáticos con `@updatedAt`
- Índices: `Quote.userId`, `Quote.status`, `Quote.createdAt`, `Quote.consecutive`
- Campo `formData` en Quote almacena el JSON completo del wizard para flexibilidad
- Campo `paymentPlan` en Quote permite planes de pago personalizados por cotización
- La tabla Service almacena tanto servicios por defecto (isDefault=true) como personalizados
- Migraciones versionadas con Prisma Migrate, nunca editar SQL generado manualmente

## Comandos

```powershell
npx prisma generate      # Generar Prisma Client
npx prisma migrate dev   # Crear migración en desarrollo
npx prisma migrate deploy# Aplicar migraciones en producción
npx prisma db seed       # Poblar datos iniciales
npx prisma studio        # Abrir UI exploradora de BD
```

## Seed data

- 1 usuario admin por defecto
- 8 servicios por defecto (Arquitectónico, Estructural, Hidrosanitario, Eléctrico, Renders, Recorrido, Presupuesto, Licencias)
- Sub-paquetes: Instalaciones (Eléctrico + Hidrosanitario)
- Paquete completo premium
- Plan de pagos: 4 cuotas (50%, 20%, 20%, 10%)
