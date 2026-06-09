# Skills Seleccionadas para el Frontend Android

## Skills copiadas como carpetas completas

Cada skill se copio con su carpeta completa desde `.agents/skills` hacia `android/skills`, incluyendo `SKILL.md` y cualquier archivo de apoyo que exista dentro de la carpeta.

| Skill | Carpeta en `android/skills` | Por que sirve |
|---|---|---|
| project-context | `context/` | Define dominio, publico, stack, mercado colombiano y alcance funcional. |
| frontend-patterns | `frontend/` | Resume patrones UI a portar: modales, formularios inline, toggles, service items, wizard y toast. |
| layout-taste | `layout-taste/` | Da criterio visual mobile-first: oscuro, premium, denso pero respirable, acento dorado. |
| architecture | `architecture/` | Define reglas de capas, REST versionado, calidad y estructura feature-first. |
| frontend-design | `frontend-design/` | Aporta criterio de interfaz pulida y productiva para pantallas reales. |
| frontend-aesthetics | `frontend-aesthetics/` | Ayuda a evitar un diseño generico y mantener una experiencia premium. |
| designing-frontend | `designing-frontend/` | Apoya decisiones visuales y composicion de pantallas. |
| design-tokens | `design-tokens/` | Sirve para convertir colores, espaciado y radios a tokens Android/Compose. |
| color-tools | `color-tools/` | Sirve para revisar paleta, contraste y estados accesibles. |
| responsive-helper | `responsive-helper/` | Ayuda a adaptar layouts a telefonos, tablets y orientaciones. |
| motion-microinteractions | `motion-microinteractions/` | Traduce estados hover/focus/active web a feedback tactil y animaciones Compose. |
| a11y-checker | `a11y-checker/` | Apoya auditoria de contraste, foco, tamanos y accesibilidad. |

## Skills no copiadas como base principal

- `tailwind-css-patterns`: especifica de Tailwind; Android Compose no usa Tailwind.
- `css-inspector`, `performance-analyzer`: utiles para web/CSS, menos aplicables a app nativa.
- `backend`, `database`, `tools`, `workflows`: importantes para el proyecto general, pero no son frontend Android.

## Traduccion directa a Android

- `wrap max-width 430px` pasa a layout mobile nativo full width con paddings de 16dp a 20dp.
- `.card` pasa a `Surface` o `Card` con fondo `#1a1a1a`, borde `#2a2a2a` y radio moderado.
- `.btn` pasa a `Button` primario dorado con texto negro.
- `.input` pasa a `OutlinedTextField` oscuro con foco dorado.
- `BottomNav` pasa a `NavigationBar`.
- `Modal` pasa a `AlertDialog` o `Dialog` custom.
- `Toast` pasa a `Snackbar`.
