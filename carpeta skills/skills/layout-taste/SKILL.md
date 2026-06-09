---
name: layout-taste
description: Criterio de layout y taste para ELEMENT Cotizador. Usa esta skill para mejorar balance visual, jerarquia, espaciado, limpieza, ritmo, densidad y composicion.
compatibility: opencode
metadata:
  project: ELEMENT Cotizador
  stack: React TypeScript Tailwind CSS
  focus: layout visual-balance hierarchy spacing
---

# Layout Taste

Usa esta skill cuando el usuario pida una interfaz mas limpia, moderna, balanceada, con mejor layout, mejor jerarquia visual o menos apariencia generica.

## Direccion ELEMENT

- Oscura, premium y sobria.
- Mobile-first con max-width cercano a `430px`.
- Densa pero respirable: cada pantalla debe permitir accion rapida.
- Acento dorado `#b69462` como señal de accion o foco, no como decoracion masiva.
- Bordes, contraste y espaciado consistentes.

## Reglas de balance

- Jerarquia primero: una accion principal por pantalla.
- Agrupa por tarea, no por decoracion.
- Usa escala de 4px: `4, 8, 12, 16, 20, 24, 32`.
- Reduce cards innecesarias. Una card debe agrupar una decision, dato o accion real.
- Evita texto gigante dentro de herramientas compactas.
- Mantén botones y controles con altura tactil minima de `44px`.
- En dashboard o wizard, prioriza lectura vertical y flujo de una mano.

## Layout audit

- El ojo sabe donde empezar.
- El CTA principal es obvio.
- Los elementos relacionados estan cerca.
- Las labels, inputs y errores no compiten entre si.
- El fondo no distrae del formulario o decision.
- No hay solapes con la tab bar inferior.
- Hay suficiente aire entre bloques, pero no se desperdicia pantalla mobile.

## Patrones

- Dashboard: header breve, acciones principales claras, estados importantes antes que acciones secundarias.
- Wizard: indicador de paso cerca del titulo, progreso delgado, un bloque activo por paso.
- Formularios: labels claras, inputs tactiles, errores debajo del campo.
- Modales: titulo concreto, cuerpo breve, maximo dos acciones en confirmaciones.

## Combinacion

- Usa `frontend-design` para direccion visual.
- Usa `tailwind-css-patterns` para implementar con Tailwind v4.
- Usa `motion-microinteractions` para botones, transiciones y estados.
- Usa `frontend-patterns` para componentes existentes del proyecto.
