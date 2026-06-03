---
name: smithery-design-stack
description: Links e instalacion recomendada de skills Smithery para mejorar diseño frontend, motion, Tailwind, UI specs y criterio visual en ELEMENT Cotizador.
compatibility: opencode
metadata:
  project: ELEMENT Cotizador
  workflow: skill-installation
---

# Smithery Design Stack

Usa esta skill cuando el usuario pregunte que skills instalar para mejorar diseño, motion, layout o frontend UI.

## Ya disponible en el proyecto

- `frontend-design`: instalada localmente en `.agents/skills/frontend-design`.
- `tailwind-css-patterns`: Tailwind v4 y patrones del proyecto.
- `motion-microinteractions`: botones, transiciones y microinteracciones.
- `layout-taste`: balance, jerarquia y limpieza visual.

## Smithery sugeridas

- `andronics/animation-creator`: CSS animations, transitions, button interactions y micro-interactions.
- `dylantarre/motion-scale`: tokens consistentes de duracion, easing, delays y reduced motion.
- `mintuz/tailwind`: Tailwind design systems, tokens, CVA, dark mode y animaciones.
- `muzhicaomingwang/ui`: UI/UX specs, layout, components, states, transitions y micro-interactions.
- `bejranonda/frontend-aesthetics`: criterio estetico para evitar interfaces genericas.
- `Byunk/designing-frontend`: flujo para frontend distintivo y production-grade.

## Comandos de instalacion

```powershell
npx @smithery/cli@latest skill add andronics/animation-creator
npx @smithery/cli@latest skill add dylantarre/motion-scale
npx -y skills add https://smithery.ai/skills/mintuz/tailwind
npx -y skills add https://smithery.ai/skills/muzhicaomingwang/ui
npx @smithery/cli@latest skill add bejranonda/frontend-aesthetics
npx @smithery/cli@latest skill add Byunk/designing-frontend
```

Si Smithery instala una skill globalmente y quieres que OpenCode la lea como skill de proyecto, adaptala a:

```text
.agents/skills/<name>/SKILL.md
```

## Prompt recomendado

```text
Usa frontend-design, layout-taste, motion-microinteractions, tailwind-css-patterns y frontend-patterns para mejorar esta pantalla de ELEMENT Cotizador. Quiero botones con estados reales, transiciones suaves, microanimaciones accesibles, layout limpio, jerarquia clara y estilo oscuro premium con acento dorado.
```
