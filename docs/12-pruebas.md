# 12. Pruebas

Este documento resume las pruebas que hicimos y explica cómo repetirlas. Por ahora todas las pruebas son **manuales** o con scripts sueltos. El proyecto todavía no tiene pruebas automáticas que corran solas en cada cambio. Eso está en [trabajo futuro](13-limitaciones-y-trabajo-futuro.md).

## Ambiente de pruebas

Casi todas las pruebas se hicieron con `npm run demo`, que crea una base de datos temporal en memoria. Así se puede comprar, borrar y crear sin tocar los datos reales. Los pagos usan Stripe en modo de prueba.

## Revisión estática

Antes de cada cambio se ejecutan:

| Revisión | Comando | Qué detecta |
|---|---|---|
| Tipos | `npx tsc --noEmit` | Errores de tipos en TypeScript. |
| Estilo y errores comunes | `npm run lint` | Reglas de ESLint de Next.js. |
| Compilación | `npm run build` | Que la versión de producción se pueda preparar. |

## Casos probados

### Compra

| ID | Caso | Resultado esperado | Resultado |
|---|---|---|---|
| P-01 | Compra completa en el demo: 2 sillas generales en una función 3D de las 4:00 p. m. y un Combo Fan, pagada con `4242 4242 4242 4242`. | Stripe cobra $84.900 ($60.000 en sillas y $24.900 en comida). Se genera una boleta con QR y una transacción completada. | Correcto. Boleta `MS-53A50353FB`. |
| P-02 | La boleta y la transacción de P-01 en el panel. | Aparecen en Boletas y en Transacciones con el correo del comprador. | Correcto. |
| P-03 | Precio de las sillas según la hora: funciones de la 1:00 p. m. y de la 1:05 p. m., en cartelera y en preventa. | La de la 1:00 usa el precio de la mañana y la de la 1:05 el de la tarde. | Correcto. |
| P-04 | Reserva con una silla repetida, más de 8 sillas o un tipo de silla inválido. | La API responde `400` y no aparta nada. | Correcto. |
| P-05 | Compra con un producto repetido o con más de 10 unidades. | La validación lo rechaza. | Correcto. |

### Panel de administración

| ID | Caso | Resultado esperado | Resultado |
|---|---|---|---|
| P-06 | Crear una comida con una imagen de un sitio no permitido. | Mensaje de error en español, y el formulario conserva lo escrito. | Correcto. |
| P-07 | Corregir la imagen de P-06 y guardar. | La comida se crea y el panel vuelve a la lista. | Correcto. |
| P-08 | Editar una sala dejando el nombre vacío, y luego con un nombre válido. | Primero muestra el error sin borrar el formulario. Luego guarda el nuevo nombre. | Correcto. |
| P-09 | Eliminar una comida y cancelar la confirmación; luego aceptarla. | Al cancelar no se borra nada. Al aceptar, se borra. | Correcto. |
| P-10 | Eliminar la función que tiene la compra de P-01. | El panel lo impide: "Esta función tiene sillas vendidas o apartadas". | Correcto. |
| P-11 | Eliminar la sala de esa función. | El panel lo impide, porque tiene una función futura con ventas. | Correcto. |
| P-12 | Eliminar una sala sin ventas. | Se borran la sala y sus funciones. | Correcto. |
| P-13 | Crear una sala con 25 sillas, con 270 sillas y con 260 sillas. | Rechaza 25 (no son filas completas de 10) y 270 (más de 26 filas). Acepta 260. | Correcto. |
| P-14 | Abrir Usuarios, Boletas y Transacciones, buscar por correo y ordenar por columnas. | Las tablas muestran los registros en español y responden a la búsqueda. | Correcto. |
| P-15 | Abrir `/dashboard/users/123` o `/dashboard/profile`. | Página "No encontramos esta página". | Correcto. |
| P-16 | Buscar textos como `(`, `a.b`, `c++` o `[x]` en el panel. | La búsqueda trata esos caracteres como texto, sin errores. | Correcto (7 casos). |
| P-17 | Agrupar ventas por día a las 10:30 p. m. hora de Colombia, cuando en UTC ya es el día siguiente. | La venta cuenta en el día de Colombia. | Correcto. |
| P-18 | Entrar a `/dashboard` sin sesión, y luego con una cuenta de cliente. | Sin sesión, envía al inicio de sesión. Con cuenta de cliente, envía al inicio del sitio. | Correcto. |

### Validaciones

| ID | Caso | Resultado |
|---|---|---|
| P-19 | 19 casos sobre los esquemas de comida, salas, funciones, películas, inicio de sesión, reservas y compra: campos faltantes, vacíos, negativos, repetidos y valores por defecto. | Todos correctos. Los mensajes salen en español. |

### Seguridad

| ID | Caso | Resultado esperado | Resultado |
|---|---|---|---|
| P-20 | Revisar los encabezados de una respuesta del sitio. | Incluyen `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` y CSP, y no incluyen `X-Powered-By`. | Correcto. |
| P-21 | Llamar a una tarea programada sin la clave, con una clave equivocada y con la clave correcta. | `401`, `401` y `200`. | Correcto. |

### Concurrencia

| ID | Caso | Resultado esperado | Resultado |
|---|---|---|---|
| P-22 | 8 clientes distintos piden la misma silla al mismo tiempo, en 3 rondas con sillas diferentes (D5, D6 y D7). | En cada ronda, solo una petición aparta la silla (`201`) y las demás reciben "ya no está disponible" (`409`). | Correcto: en las 3 rondas, 1 respuesta `201` y 7 respuestas `409`. |

Así se repite P-22 con el demo encendido. Primero se crean 8 cuentas de prueba con `POST /api/auth/register` y se guarda la cookie de cada una. Luego se lanzan las 8 reservas a la vez:

```bash
for i in 1 2 3 4 5 6 7 8; do
  curl -s -b "cookies-$i.txt" -H "Content-Type: application/json" \
    -d '{"sessionId":"<id de la función>","seats":[{"type":"general","seat":"D5"}]}' \
    -o /dev/null -w "%{http_code}\n" http://localhost:3000/api/reservations &
done; wait
```

## Pruebas pendientes

| Caso | Por qué es importante |
|---|---|
| Compra de prueba en el sitio publicado, con el aviso del webhook de Stripe. | Comprueba la configuración real de Vercel y Stripe. |
| Concurrencia con más peticiones y en el sitio publicado. | P-22 se hizo con 8 peticiones en el demo. Una prueba más grande daría cifras de tiempo de respuesta. |
| Pruebas en varios celulares y navegadores. | La interfaz se diseñó adaptable, pero se ha revisado sobre todo en el computador. |

## Cómo repetir una compra de prueba

1. Ejecuta `npm run demo` y abre http://localhost:3000.
2. Inicia sesión con `cliente@movieseat.test` y `demo-cliente-1234`.
3. Entra a una película de la cartelera, elige una función y dos sillas, y toca **Continuar**.
4. Agrega un combo y toca **Pagar con Stripe**.
5. Paga con `4242 4242 4242 4242`, una fecha futura y CVC `123`.
6. Revisa la boleta. Luego cierra sesión, entra con `admin@movieseat.test` y `demo-admin-1234`, y busca la compra en Boletas y en Transacciones.

Para el pago se necesita `STRIPE_SECRET_KEY` con una llave de prueba en `.env.local`.
