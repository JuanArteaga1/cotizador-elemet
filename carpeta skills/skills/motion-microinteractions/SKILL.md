---
name: motion-microinteractions
description: Motion system para ELEMENT Cotizador. Usa esta skill para animaciones de interfaz, botones reales, transiciones, microinteracciones, estados hover/focus/active y reduced motion.
compatibility: opencode
metadata:
  project: ELEMENT Cotizador
  stack: React TypeScript Tailwind CSS
  focus: animations transitions microinteractions buttons
---

# Motion Microinteractions

Usa esta skill cuando el usuario pida animaciones, botones con sensacion real, transiciones, feedback tactil, hover states, focus states, modales, toasts, wizard steps o mejoras de fluidez.

## Principios ELEMENT

- Movimiento sobrio, premium y funcional.
- Base mobile-first: los estados `active` importan tanto como `hover`.
- Usa transform y opacity como primera opcion; evita animar layout, width o height.
- Toda animacion no esencial debe respetar `motion-safe:` y `prefers-reduced-motion`.
- Duraciones: `80ms-120ms` feedback instantaneo, `150ms-180ms` botones, `220ms-280ms` cards/tabs, `300ms-420ms` modales y wizard.

## Botones reales

Un boton de ELEMENT debe tener estados default, hover, active/tap, focus-visible, disabled y loading.

```tsx
<button
  className="
    group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-2xl
    bg-accent px-5 font-semibold text-black
    transition-[transform,opacity,box-shadow,background-color] duration-150 ease-out
    hover:shadow-[0_12px_32px_rgba(182,148,98,.28)]
    active:scale-[.98] active:opacity-85
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg
    disabled:pointer-events-none disabled:opacity-45
    motion-reduce:transition-none
  "
  type="button"
>
  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full motion-reduce:hidden" />
  <span className="relative">Guardar cotizacion</span>
</button>
```

## Transiciones de interfaz

Usa entradas con stagger cuando aparecen listas, cards o pasos del wizard:

```tsx
{items.map((item, index) => (
  <article
    key={item.id}
    className="motion-safe:animate-element-slide-up"
    style={{ animationDelay: `${index * 70}ms` }}
  >
    {item.content}
  </article>
))}
```

## Checklist

- La animacion explica estado, jerarquia o accion.
- El usuario entiende que algo fue presionado, seleccionado, guardado o cambiado.
- No se mueve texto mientras el usuario lo lee.
- No hay saltos de layout al cargar, hover, loading o error.
- Se verifico mobile 375px/430px y desktop.
- Se uso `motion-safe:` o reduced motion.

## Referencias locales

- Lee `../tailwind-css-patterns/references/element-motion-system.md` para tokens y keyframes Tailwind v4.
- Combina con `frontend-design`, `layout-taste` y `frontend-patterns`.
