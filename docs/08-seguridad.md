# 8. Seguridad

Este documento explica cómo se protegen las cuentas, el panel, los pagos y los datos.

## Cuentas y contraseñas

- Las contraseñas se guardan cifradas con **bcrypt**. Nunca se guardan ni se muestran en texto plano.
- Una contraseña debe tener al menos 8 caracteres.
- Los correos se guardan en minúsculas y sin espacios, así `Ana@Correo.com` y `ana@correo.com` son la misma cuenta.
- Cuando el inicio de sesión falla, el mensaje es siempre "Credenciales inválidas.", exista o no el correo. Así nadie puede averiguar qué correos están registrados.

## Sesiones

- Al iniciar sesión, el servidor crea un **JWT firmado con HS256** usando la variable `JWT_SECRET`. El token guarda el identificador, el nombre, el correo y el rol.
- El token viaja en la cookie `movieseat_session`, con estas opciones:
  - `httpOnly`: el JavaScript de la página no puede leerla.
  - `secure` en producción: solo viaja por HTTPS.
  - `sameSite=lax`: otros sitios no pueden usarla en peticiones ocultas.
  - Dura 8 horas.
- Si alguien cambia el contenido del token, la firma deja de coincidir y el servidor lo rechaza.

## Roles y panel de administración

Hay dos roles: `client` y `admin`. Registrarse desde el sitio siempre crea una cuenta `client`. Un administrador solo se crea con el comando `npm run create-admin`, que se ejecuta con acceso directo a la base de datos.

El panel tiene dos capas de protección:

1. `middleware.ts` revisa la cookie antes de abrir cualquier página de `/dashboard`. Sin sesión, envía al inicio de sesión. Con sesión de cliente, envía al inicio del sitio.
2. Cada acción del servidor que crea, cambia o borra datos, y cada consulta de usuarios, ventas o transacciones, llama a `requireAdmin()`. Así, aunque alguien llamara la acción directamente, sin pasar por la página, el servidor la rechaza.

## Límite de intentos

Para frenar a quien intente adivinar contraseñas:

| Acción | Límite | Ventana |
|---|---|---|
| Inicio de sesión, por correo e IP | 5 intentos fallidos | 15 minutos |
| Inicio de sesión, por IP | 30 intentos fallidos | 15 minutos |
| Registro, por IP | 10 intentos | 1 hora |

Los contadores se guardan en MongoDB, porque en Vercel cada petición puede llegar a una instancia distinta. MongoDB los borra solos cuando vencen.

## Validación de datos

Todo lo que llega del navegador se valida con **Zod** antes de usarse (`schema/`):

- Los identificadores deben tener el formato de MongoDB (24 caracteres hexadecimales).
- Las sillas deben llamarse como `A1` o `C10`, y no pueden repetirse.
- Hay límites de cantidad: 8 sillas por reserva y 10 unidades por producto.
- Las imágenes del catálogo solo pueden venir de la carpeta del proyecto o de TMDB.
- Las salas deben tener sillas en filas de 10, hasta 26 filas.

Además, el texto de los buscadores del panel se escapa antes de usarse en una búsqueda de MongoDB. Así, caracteres como `(` o `*` no rompen la búsqueda ni la vuelven lenta a propósito.

## Pagos

- Los datos de la tarjeta se escriben en la página de Stripe y **nunca pasan por nuestro servidor**.
- El total se calcula en el servidor con los precios de la base de datos. El navegador solo envía qué productos quiere y cuántos.
- El sistema **solo acepta llaves de prueba** de Stripe (`sk_test_` o `rk_test_`). Con una llave real, se niega a crear pagos.
- La boleta solo se genera cuando el propio Stripe confirma el pago. El parámetro que llega en la dirección de regreso no basta.
- Los avisos del webhook se aceptan solo si su firma coincide con `STRIPE_WEBHOOK_SECRET`.

## Encabezados de seguridad

`next.config.mjs` agrega estos encabezados a todas las respuestas:

| Encabezado | Para qué sirve |
|---|---|
| `Strict-Transport-Security` | Obliga a usar HTTPS. |
| `X-Content-Type-Options: nosniff` | Evita que el navegador adivine el tipo de un archivo. |
| `X-Frame-Options: DENY` y `frame-ancestors 'none'` | Impiden que otro sitio muestre MovieSeat dentro de un marco, un truco usado para engañar clics. |
| `Referrer-Policy` | Limita la información que se envía a otros sitios al seguir un enlace. |
| `Permissions-Policy` | Desactiva la cámara, el micrófono y la ubicación. |

También se quita el encabezado `X-Powered-By`, que revelaba la tecnología del servidor.

## Secretos

- Las claves viven en variables de entorno: `.env.local` en el computador y la configuración del proyecto en Vercel.
- `.env.local` no se sube al repositorio.
- `.env.example` muestra qué variables hacen falta, sin valores reales.
- Las tareas programadas exigen `CRON_SECRET`. Si la variable no existe, las rutas no se pueden ejecutar.

## Riesgos conocidos

- **Dependencias:** `npm audit` reporta avisos en `next` y `postcss` que se corrigen con Next 16, y uno de severidad baja en `deepmerge`. La actualización a Next 16 está en [trabajo futuro](13-limitaciones-y-trabajo-futuro.md).
- **Política de contenido:** la política de seguridad de contenido (CSP) es parcial. Todavía no restringe los scripts, porque Next y el reproductor de YouTube necesitan una configuración propia.
- **Cambio de rol:** si a un administrador se le quita el rol, su sesión abierta sigue siendo válida hasta que vence, como máximo 8 horas.
