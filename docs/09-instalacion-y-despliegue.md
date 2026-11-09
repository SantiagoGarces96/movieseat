# 9. Instalación y despliegue

## Requisitos

- [Node.js](https://nodejs.org/) entre las versiones 20 y 22.
- Para usar datos reales: una base de datos de MongoDB (por ejemplo, un clúster gratuito de MongoDB Atlas) y una cuenta de TMDB.
- Para probar pagos: una cuenta de Stripe en modo de prueba.

## Variables de entorno

Copia `.env.example` como `.env.local` y completa los valores:

| Variable | Obligatoria | Para qué sirve |
|---|---|---|
| `MONGODB_URI` | Sí | Dirección de conexión a MongoDB. |
| `TMDB_API_TOKEN` | Sí | Token de lectura de TMDB. Se obtiene en themoviedb.org, en Ajustes > API. |
| `JWT_SECRET` | Sí | Texto largo y aleatorio con el que se firman las sesiones. |
| `CRON_SECRET` | Sí | Texto largo y aleatorio. Protege las tareas programadas. |
| `STRIPE_SECRET_KEY` | Para pagar | Llave secreta de prueba de Stripe. Empieza por `sk_test_`. |
| `STRIPE_WEBHOOK_SECRET` | Para pagar | Secreto del webhook de Stripe. Empieza por `whsec_`. |
| `NEXT_PUBLIC_SITE_URL` | No | Dirección pública del sitio. Por defecto, `https://movieseat.vercel.app`. |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME`, `ADMIN_LAST_NAME` | Solo una vez | Datos para `npm run create-admin`. Borra `ADMIN_PASSWORD` después de usarlo. |

Un texto aleatorio para `JWT_SECRET` o `CRON_SECRET` se puede generar así:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Nunca subas `.env.local` al repositorio ni compartas su contenido.**

## Comandos

| Comando | Qué hace |
|---|---|
| `npm install` | Instala las dependencias. |
| `npm run demo` | Abre la aplicación con una base temporal, películas ficticias y dos cuentas de prueba. Al cerrar, los datos se borran. |
| `npm run dev` | Abre la aplicación en modo de desarrollo con la base de `.env.local`. |
| `npm run build` | Prepara la versión de producción. |
| `npm run start` | Abre la versión de producción ya preparada. |
| `npm run lint` | Revisa el estilo y los errores comunes del código. |
| `npm run create-admin` | Crea un administrador con los datos `ADMIN_*` de `.env.local`. Si el correo ya existe, solo le da el rol de administrador. |
| `npm run seed-menu` | Carga los 28 productos del menú: combos, comidas y bebidas. Si un producto ya existe, lo actualiza. |

## Primera instalación con datos reales

1. Copia `.env.example` como `.env.local` y completa las variables obligatorias.
2. Instala las dependencias:

```bash
npm install
```

3. Crea el administrador:

```bash
npm run create-admin
```

4. Carga el menú:

```bash
npm run seed-menu
```

5. Arranca la aplicación:

```bash
npm run dev
```

6. Entra a http://localhost:3000/login con la cuenta de administrador. Crea al menos una sala en el panel.
7. Las películas y las funciones aparecen después de que corren las tareas programadas. En tu computador puedes ejecutarlas a mano, reemplazando `TU_CRON_SECRET` por el valor de `.env.local`:

```bash
curl -H "Authorization: Bearer TU_CRON_SECRET" http://localhost:3000/api/cron/filldb
```

```bash
curl -H "Authorization: Bearer TU_CRON_SECRET" http://localhost:3000/api/cron/update-sessions
```

## Publicación en Vercel

El proyecto ya está conectado a Vercel:

- Cada cambio en la rama `main` se publica en https://movieseat.vercel.app.
- Cada rama y cada pull request recibe una dirección de vista previa.

Para configurarlo desde cero:

1. Importa el repositorio en Vercel.
2. En Settings > Environment Variables, agrega las mismas variables de `.env.local`, salvo las `ADMIN_*`.
3. Vercel lee `vercel.json` y crea solo las dos tareas programadas. También da hasta 60 segundos a las rutas de la API.

> Las vistas previas y la producción usan hoy la misma base de datos. Una compra hecha en una vista previa aparece también en producción. Ver [Limitaciones](13-limitaciones-y-trabajo-futuro.md).

## Configurar Stripe

1. En el panel de Stripe, activa el **modo de prueba**.
2. Copia la llave secreta de prueba (`sk_test_...`) en `STRIPE_SECRET_KEY`.
3. En Developers > Webhooks, crea un destino con la dirección `https://<tu-dominio>/api/webhooks/stripe` y estos eventos:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
   - `checkout.session.expired`
4. Copia el secreto de firma (`whsec_...`) en `STRIPE_WEBHOOK_SECRET`.
5. En Settings > Business, pon "MovieSeat" como nombre público. Es el nombre que el cliente ve en la página de pago.

En tu computador, Stripe no puede enviar avisos a `localhost`. Igual la compra funciona: al volver del pago, el sistema le pregunta a Stripe por el pago y genera la boleta.

## Tarjetas de prueba

| Tarjeta | Resultado |
|---|---|
| `4242 4242 4242 4242` | Pago aprobado. |
| `4000 0000 0000 0002` | Pago rechazado. |

Usa cualquier fecha futura, cualquier CVC de 3 dígitos y cualquier nombre.
