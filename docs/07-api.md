# 7. API

Estas son las rutas del servidor, en `app/api`. Todas reciben y responden JSON, salvo las que redirigen. Los mensajes de error vienen en español, en el campo `message`.

"Sesión" significa que la ruta necesita la cookie `movieseat_session`, que se crea al iniciar sesión.

## Cuentas

### `POST /api/auth/register`

Crea una cuenta de cliente e inicia la sesión.

```json
{ "name": "Ana", "lastName": "Gómez", "email": "ana@correo.com", "password": "una-clave-segura" }
```

| Código | Cuándo |
|---|---|
| 201 | Cuenta creada. La respuesta trae la cookie de sesión. |
| 400 | Datos inválidos, o ya existe una cuenta con ese correo. |
| 429 | Más de 10 intentos de registro desde la misma IP en una hora. |

### `POST /api/auth/login`

```json
{ "email": "ana@correo.com", "password": "una-clave-segura" }
```

| Código | Cuándo |
|---|---|
| 200 | Sesión iniciada. Responde `{ "role": "client" }` o `"admin"`, junto con la cookie. |
| 401 | Correo o contraseña incorrectos. El mensaje es el mismo en los dos casos, para no revelar qué correos existen. |
| 429 | 5 intentos fallidos para el mismo correo desde la misma IP, o 30 desde la misma IP, en 15 minutos. |

### `POST /api/auth/logout`

Borra la cookie de sesión. Responde `200`.

### `GET /api/auth/session`

Devuelve quién tiene la sesión abierta: `{ "user": { "name", "email", "role" } }`, o `{ "user": null }`.

## Reservas y pagos

### `POST /api/reservations` (sesión)

Aparta sillas en una función.

```json
{ "sessionId": "6af007eab67890499a15aff9", "seats": [{ "type": "general", "seat": "A6" }, { "type": "general", "seat": "A7" }] }
```

| Código | Cuándo |
|---|---|
| 201 | Sillas apartadas. Responde `{ "id": "<id de la reserva>" }`. |
| 400 | Selección inválida: entre 1 y 8 sillas, sin repetir, con nombres como `A1`. |
| 401 | Sin sesión. |
| 404 | La función no existe. |
| 409 | Alguna silla ya no está disponible. |
| 410 | La función ya empezó. |

### `POST /api/reservations/[id]/pay` (sesión)

Abre el pago en Stripe con la comida elegida.

```json
{ "foods": [{ "id": "<id de la comida>", "quantity": 1 }] }
```

| Código | Cuándo |
|---|---|
| 201 | Pago abierto. Responde `{ "url": "<página de pago de Stripe>" }`. |
| 200 | El pago anterior ya se había completado. Responde `{ "ticketId": "..." }`. |
| 400 | Datos inválidos: hasta 10 unidades por producto, sin productos repetidos. |
| 409 | Una comida ya no existe o no tiene suficientes unidades. |
| 410 | La reserva venció o la función ya no está disponible. |
| 503 | Stripe no está configurado. |

### `POST /api/reservations/[id]/cancel` (sesión)

Cancela una reserva pendiente del cliente y libera sus sillas. Responde `{ "cancelled": true }`, o `404` si no había nada que cancelar.

### `GET /api/reservations/[id]/resume` (sesión)

Stripe envía aquí al cliente cuando vuelve sin pagar. Cierra el pago abierto y redirige a la página de compra. Si el pago alcanzó a completarse, redirige a la boleta.

### `GET /api/checkout/return?session_id=...`

Stripe envía aquí al cliente después de pagar. El sistema confirma el pago con Stripe, genera la boleta si aún no existe y redirige a `/mis-boletas/[id]`.

### `POST /api/webhooks/stripe`

Recibe los avisos de Stripe. Comprueba la firma con `STRIPE_WEBHOOK_SECRET`.

| Evento | Qué hace |
|---|---|
| `checkout.session.completed` | Genera la boleta y la transacción. |
| `checkout.session.async_payment_succeeded` | Lo mismo, para pagos que se confirman después. |
| `checkout.session.expired` | Libera las sillas y la comida de la reserva. |

| Código | Cuándo |
|---|---|
| 200 | Aviso procesado. |
| 400 | La firma no es válida. |
| 500 | Error al procesar. Stripe vuelve a intentarlo más tarde. |
| 503 | Falta `STRIPE_WEBHOOK_SECRET`. |

## Tareas programadas

### `GET /api/cron/filldb` y `GET /api/cron/update-sessions`

Necesitan el encabezado `Authorization: Bearer <CRON_SECRET>`. Sin él responden `401`. Ver [Cartelera y funciones](06-cartelera-y-funciones.md).

## Acciones del panel

El panel no usa estas rutas. Usa acciones del servidor de Next.js, definidas en `services/`. Por ejemplo, `createMovie` en `services/movies.ts` o `getTransactions` en `services/transactions.ts`. Las acciones que cambian datos, y las consultas de usuarios, boletas y transacciones, exigen una sesión de administrador.
