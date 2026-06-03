# Flujo de Desarrollo

1. Leer contexto en `context/project-context.md`
2. Revisar reglas en `architecture/rules.md`
3. Revisar user stories en `docs/user-stories.txt`
4. Ubicar el área afectada (frontend/ o backend/)
5. Hacer cambios pequeños y coherentes con el estilo actual
6. Ejecutar verificación correspondiente:

## Frontend (frontend/)

```powershell
npm run lint
npm run typecheck
npm run test
```

## Backend (backend/)

```powershell
npm run lint
npm run test
npx prisma validate   # si se tocó el schema
```

7. Verificar manualmente en navegador (mobile + desktop)
8. Si aparece una regla nueva o instrucción repetitiva, actualizar el archivo correspondiente en `.agents/skills/`
