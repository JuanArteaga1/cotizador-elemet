# Android - ELEMENT Cotizador

Esta carpeta agrupa la documentacion necesaria para desarrollar el frontend Android conectado al backend principal/SaaS.

## Contenido

- `docs/android-frontend-brief.md`: guia de producto, arquitectura recomendada y traduccion del frontend web a Android.
- `docs/endpoints.md`: inventario de endpoints usados por el frontend actual y esperados por la app Android.
- `docs/user-stories-android.md`: revision de historias existentes y ampliacion para app Android.
- `docs/design-system-web-base.txt`: archivo original con indicaciones visuales de la app web.
- `docs/conexion-backend-base.md`: documento original de conexion backend.
- `docs/user-stories-original.txt`: historias originales del proyecto.
- `skills/`: skills copiadas que sirven como contexto para construir la version Android.

## Stack recomendado para la app Android

- Kotlin + Jetpack Compose.
- Arquitectura MVVM por feature.
- Retrofit + OkHttp para HTTP.
- Kotlinx Serialization o Moshi para JSON.
- DataStore para preferencias y token.
- Room solo si se implementa cache offline avanzado.
- Hilt para inyeccion de dependencias si el proyecto crece.

## Primeros pasos sugeridos

1. Crear proyecto Android nativo dentro de esta carpeta.
2. Configurar `BASE_URL` apuntando a `/api/v1`.
3. Implementar cliente HTTP con headers `Authorization: Bearer <token>` y `X-Shop-Slug`.
4. Construir pantallas en este orden: Landing, Login/Register, Dashboard, Wizard de cotizacion, Historial, Cuenta de cobro, Ajustes.
5. Usar `docs/endpoints.md` como contrato inicial con backend.
