# 2. Requisitos

## Requisitos funcionales

### Sitio público y clientes

| Código | Requisito |
|---|---|
| RF-01 | El sistema muestra las películas en cartelera y los próximos estrenos. |
| RF-02 | El sistema muestra el detalle de cada película: sinopsis, duración, género, director, reparto, idiomas, tráiler y funciones disponibles. |
| RF-03 | Una persona puede crear una cuenta con nombre, apellido, correo y contraseña de al menos 8 caracteres. |
| RF-04 | Una persona puede iniciar y cerrar sesión. |
| RF-05 | El cliente ve el mapa de sillas de una función, con las sillas libres, ocupadas y elegidas, y el precio de cada tipo de silla. |
| RF-06 | El cliente puede apartar hasta 8 sillas. Quedan apartadas por 10 minutos. |
| RF-07 | Si otra persona ya tomó alguna de las sillas elegidas, el sistema lo informa y no aparta ninguna. |
| RF-08 | El cliente puede agregar comida a su compra, hasta 10 unidades por producto, según el inventario disponible. |
| RF-09 | El cliente paga con Stripe en modo de prueba. El total se calcula en el servidor. |
| RF-10 | Después del pago, el sistema genera una boleta con un código único y un código QR. |
| RF-11 | El cliente puede ver todas sus boletas en "Mis boletas". |
| RF-12 | El sistema muestra el menú de comidas, organizado en combos, comidas y bebidas. |

### Administración

| Código | Requisito |
|---|---|
| RF-13 | Solo los administradores pueden entrar al panel. |
| RF-14 | El panel muestra gráficas de películas por género, ventas de comida, ingresos por mes, asientos disponibles y boletas vendidas por día. |
| RF-15 | El administrador puede crear, editar y eliminar películas, salas, funciones y productos de comida. |
| RF-16 | No se puede eliminar una función con sillas vendidas o apartadas, ni una sala o película que tenga funciones futuras con ventas. |
| RF-17 | El administrador puede actualizar la cartelera pegando la lista de películas del cine. |
| RF-18 | El administrador puede consultar usuarios, boletas y transacciones, con búsqueda, orden y paginación. |

### Procesos automáticos

| Código | Requisito |
|---|---|
| RF-19 | Cada día el sistema trae de TMDB las películas en cartelera y los próximos estrenos para Colombia. |
| RF-20 | Cada día el sistema actualiza el estado de cada película y programa las funciones de los próximos 7 días. |
| RF-21 | Las sillas de una reserva vencida se liberan solas. |
| RF-22 | Si Stripe confirma un pago, la boleta se genera aunque el cliente cierre la página antes de volver al sitio. |

## Requisitos no funcionales

| Código | Tipo | Requisito |
|---|---|---|
| RNF-01 | Seguridad | Las contraseñas se guardan cifradas con bcrypt. |
| RNF-02 | Seguridad | La sesión viaja en una cookie `httpOnly` firmada, que dura 8 horas. |
| RNF-03 | Seguridad | El inicio de sesión y el registro limitan los intentos repetidos. |
| RNF-04 | Seguridad | Todos los datos que llegan al servidor se validan antes de usarse. |
| RNF-05 | Seguridad | El sistema solo acepta llaves de prueba de Stripe. |
| RNF-06 | Integridad | Una silla nunca se vende dos veces, aunque dos personas la elijan al mismo tiempo. |
| RNF-07 | Integridad | Un pago genera una sola boleta y una sola transacción, aunque Stripe avise varias veces. |
| RNF-08 | Usabilidad | Todos los textos están en español y el sitio se adapta a celulares. |
| RNF-09 | Usabilidad | Los formularios del panel conservan lo escrito cuando hay un error. |
| RNF-10 | Disponibilidad | La aplicación funciona en Vercel, sin servidores encendidos todo el tiempo. |
| RNF-11 | Mantenibilidad | El código usa TypeScript y está separado en páginas, lógica, modelos y validaciones. |
| RNF-12 | Rendimiento | El inicio y el detalle de cada película se guardan en caché y se renuevan cada minuto. Las páginas de sillas, compra y boletas se generan en el momento, para mostrar siempre datos actuales. |

## Casos de uso principales

### CU-01: Comprar boletas

**Actor:** cliente con sesión iniciada.

1. El cliente elige una película y una función.
2. El sistema muestra el mapa de sillas.
3. El cliente elige sus sillas y pulsa "Continuar".
4. El sistema aparta las sillas por 10 minutos.
5. El cliente agrega comida, si quiere, y pulsa "Pagar con Stripe".
6. El sistema abre el pago de Stripe con el total calculado en el servidor.
7. El cliente paga.
8. El sistema genera la boleta y la muestra con su código QR.

**Caminos alternos:**

- En el paso 4, si alguna silla ya no está libre, el sistema avisa y el cliente elige otras.
- En el paso 7, si el cliente vuelve atrás sin pagar, la reserva queda otra vez lista para pagar y la comida vuelve al inventario.
- Si el cliente no paga a tiempo, la reserva vence y las sillas se liberan.

### CU-02: Actualizar la cartelera

**Actor:** administrador.

1. El administrador copia la lista de películas de la página del cine y la pega en "Cartelera".
2. El sistema reconoce los títulos y busca cada uno en TMDB.
3. El sistema muestra qué película encontró para cada título y cuáles no coincidieron.
4. Si coincidieron al menos 5 películas, esa lista pasa a ser la cartelera y se reprograman las funciones.

### CU-03: Administrar el catálogo

**Actor:** administrador.

1. El administrador entra a una sección del panel: películas, salas, funciones o comida.
2. Busca, ordena o pagina los registros.
3. Crea, edita o elimina un registro.
4. El sistema valida los datos y muestra un mensaje de éxito o de error.
