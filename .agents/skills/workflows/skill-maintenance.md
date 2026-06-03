# Flujo de Mantenimiento de Skills

Actualizar `.agents/skills/` cuando:
- una preferencia de diseño o arquitectura se repite
- se descubre una convención importante del proyecto
- una corrección probablemente se repetirá en futuras tareas
- un prompt o checklist empieza a usarse más de una vez
- una decisión técnica afecta a varios archivos o módulos
- se agrega una herramienta, dependencia o proceso nuevo

## Dónde documentar

- `architecture/`: reglas técnicas, estructura de carpetas
- `context/`: descripción del producto, stack, dominio
- `memory/`: decisiones tomadas, riesgos, aprendizajes
- `prompts/`: prompts reutilizables para revisión
- `workflows/`: pasos repetibles para desarrollo, QA
- `tools/`: comandos, scripts, variables

## Frase guía

"Si esto me va a servir otra vez, debe vivir en una skill o documento de `.agents/skills/`."
