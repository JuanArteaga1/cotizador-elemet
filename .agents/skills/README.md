# Agents Skills Workspace — ELEMENT Cotizador

Contexto operativo para agentes IA que trabajen en **ELEMENT Cotizador**, app profesional de cotización y facturación para construcción/arquitectura.

## Compatibilidad OpenCode

OpenCode detecta skills de proyecto en:

```text
.agents/skills/<name>/SKILL.md
```

Cada carpeta dentro de `.agents/skills/` debe tener un `SKILL.md` con frontmatter YAML al inicio. Solo se usan estos campos:

- `name` obligatorio.
- `description` obligatorio, entre 1 y 1024 caracteres.
- `license` opcional.
- `compatibility` opcional, usar `opencode`.
- `metadata` opcional, mapa de cadena a cadena para datos como `project`, `stack`, `workflow` o `audience`.

Los campos desconocidos de primer nivel se ignoran, por eso la informacion adicional debe ir dentro de `metadata`.

## Estructura

- `architecture/` — Stack, reglas técnicas, estructura de carpetas
- `context/` — Producto, dominio, endpoints API
- `memory/` — Decisiones, riesgos, aprendizajes
- `prompts/` — Prompts reutilizables
- `tools/` — Comandos, scripts, dependencias, ENV
- `workflows/` — Flujos de desarrollo y QA
- `backend/` — Skill Node.js + Express (JavaScript)
- `database/` — Skill PostgreSQL + Prisma ORM
- `motion-microinteractions/` — Animaciones de interfaz, botones reales, transiciones y reduced motion
- `layout-taste/` — Balance visual, jerarquia, espaciado, limpieza y composicion
- `smithery-design-stack/` — Links y comandos de skills Smithery recomendadas

## Skills externas

- `frontend-design/` — Skill UI/UX (reorientada a ELEMENT)
- `tailwind-css-patterns/` — Skill Tailwind (reorientada a ELEMENT)
- `typescript-advanced-types/` — Skill TypeScript (reorientada a ELEMENT)

## Stack completo

| Capa       | Tecnología                  |
|------------|-----------------------------|
| Frontend   | React 19 + TS + Vite + Tailwind v4 |
| Backend    | Node.js + Express + JavaScript ESM |
| BD         | PostgreSQL + Prisma ORM     |
| Auth       | JWT + bcrypt                |
| Testing FE | Vitest + Testing Library    |
| Testing BE | Mocha + Chai + Supertest    |

## Prioridades para agentes

- Frontend: feature-first, mobile-first (430px), offline-first
- Backend: layered architecture, REST API versionada, stateless (JWT)
- BD: Prisma Migrate, soft delete, UUIDs, JSON columns
- Validar cambios con lint, typecheck/test y verificación visual
