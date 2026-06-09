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

## Reglas de colaboración frontend/backend

- **Rol del AI:** Desarrollador exclusivo del **frontend** del cotizador (React + TS + Tailwind).
- **No tocar backend:** No se modifica código backend (Node/Express/Prisma), ni se asumen cambios en la base de datos sin confirmación del usuario.
- **Proponer endpoints:** El AI puede solicitar al usuario la creación de nuevos endpoints en el backend SaaS, entregando:
  - Método HTTP y ruta (ej. `GET /api/v1/payment-plans`).
  - Parámetros de entrada (query, body, params).
  - Estructura esperada de respuesta (JSON de ejemplo).
  - Validaciones que debería hacer el backend (si aplica).
- **Asumir con cuidado:** El AI puede asumir cómo funciona un endpoint basado en la documentación existente (`DOCUMENTACION_CONEXION_COTIZADOR.md`), pero si no está seguro de algún campo, tipo, o comportamiento, **debe preguntar al usuario** antes de continuar.

## Reglas del backend sobre pagos (Quote Payments)

El backend devuelve los pagos de una cotización por separado del plan de pagos. El frontend debe cruzarlos manualmente:

- **`installmentIndex`**: índice base **cero** del array `installments` (NO comparar contra `order`).
  - `0` = primera cuota, `1` = segunda cuota, etc.
- **Monto**: el backend envía `transactionAmount` y `amount`. El frontend usa `transactionAmount ?? amount`.
- **Estado**: pagos manuales se crean con `status: "confirmed"`. El backend también acepta `"approved"` como válido.
- **Lógica correcta en frontend**:
  ```ts
  const isPaid = payment.status === "confirmed" || payment.status === "approved";
  const installmentIndex = payment.installmentIndex; // 0-based
  const paidAmount = payment.transactionAmount ?? payment.amount;
  ```

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

### Backend: Cuentas de Cobro (Invoices) — Spec lista

Estado: **Pendiente de implementación en backend**

**Modelo propuesto** (`quote_invoices`):
```sql
CREATE TABLE quote_invoices (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_id        UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
    number          INT NOT NULL,
    installment_index INT NOT NULL,  -- índice 0-based de la cuota del plan de pagos
    client          TEXT NOT NULL,
    project         TEXT NOT NULL,
    description     TEXT,
    total_amount    INTEGER NOT NULL CHECK (total_amount > 0),
    status          VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid')),
    paid_at         TIMESTAMP WITH TIME ZONE,
    form_data_snapshot JSONB NOT NULL,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_invoice_number_per_quote UNIQUE (quote_id, number)
);
```

**Endpoints propuestos** (`/api/v1`):

1. `POST /quotes/:quoteId/invoices` — Crear cuenta de cobro con snapshot inmutable
   - Body: `{ invoice: { number, installment_index, client, project, description, total_amount, form_data_snapshot, created_at } }`
   - Response: 201 Created + invoice completo
   - Reglas:
     - `number` auto-secuencial por cotización
     - `installment_index` vincula la invoice a una cuota específica del plan de pagos (0-based)
     - `total_amount` es el monto de ESA cuota (no el total de la cotización)
     - `form_data_snapshot` es JSONB opaco

2. `GET /quotes/:quoteId/invoices` — Listar cuentas de cobro
   - Query opcionales: `?status=`, `?sort=created_at:asc|desc`
   - Response: `{ data: [...], meta: { total } }`

3. `GET /quotes/:quoteId/invoices/:invoiceId` — Obtener una cuenta de cobro
   - Response: 200 + invoice completo con `form_data_snapshot`

4. `PATCH /quotes/:quoteId/invoices/:invoiceId` — Actualizar estado (parcial)
   - Body: `{ invoice: { status, paid_at } }`
   - Uso: sincronización manual o auto-update cuando cambian pagos

5. `DELETE /quotes/:quoteId/invoices/:invoiceId` — Soft delete (owner/admin)
   - Response: 204 No Content

## Reglas de negocio
- Cada invoice está vinculada a UNA cuota del plan de pagos (`installment_index`).
  - Ej: plan de 5 cuotas → 5 invoices posibles, cada una con `installment_index` 0..4.
- `status` se evalúa por cuota individual:
  - Si `quote_payments` tiene pago confirmado para `installment_index` → `paid`
  - Si no → `pending`
- `total_amount` es el monto calculado de esa cuota: `quote_price * installment.percentage / 100`
- `form_data_snapshot` es inmutable: guarda estado completo de la cotización en el momento de generar
- Pagos siguen vinculados a `quote_payments.quote_id` (no a invoice directamente); estado del invoice se deriva cruzando `installment_index` con pagos confirmados
- Índices recomendados: `quote_id`, `installment_index`, `status`, `created_at`
