# 11. Manual del administrador

El panel está en `/dashboard`. Solo entran las cuentas con rol de administrador. La primera se crea con `npm run create-admin` (ver [Instalación](09-instalacion-y-despliegue.md)).

## Partes del panel

A la izquierda está el menú con todas las secciones. Arriba hay un buscador general: se abre con **Ctrl + K** y busca a la vez usuarios, películas, comidas y salas.

Cada tabla del panel permite:

- **Buscar:** escribe en la caja de la derecha. El ícono de ayuda indica por qué campos busca.
- **Ordenar:** toca el título de una columna. Un toque ordena de menor a mayor y otro de mayor a menor.
- **Cambiar cuántos registros ver:** 5, 10, 15 o 20, en la lista de la izquierda.
- **Pasar de página:** con las flechas de abajo.

En el celular, cada registro se muestra como una tarjeta en lugar de una fila.

## Resumen

La primera pantalla muestra cinco gráficas:

| Gráfica | Qué muestra |
|---|---|
| Películas por género | Cuántas películas hay de cada género, y cuántas en cartelera, en preventa y próximamente. |
| Ventas de comida por categoría | Unidades vendidas de combos, comidas y bebidas. |
| Ingresos por mes | Lo recaudado en cada uno de los últimos 12 meses. |
| Disponibilidad de asientos | Sillas libres por sala en las funciones que aún no empiezan. |
| Boletas vendidas por día | Sillas vendidas en cada uno de los últimos 30 días. |

Las fechas de las ventas se cuentan en hora de Colombia.

## Funciones

Las funciones se programan solas cada noche (ver [Cartelera y funciones](06-cartelera-y-funciones.md)). Aun así, puedes crear, editar o eliminar funciones a mano.

- **Crear:** toca **Crear función** y elige la película, la sala, la fecha, la hora y los precios.
- **Editar:** toca el lápiz.
- **Eliminar:** toca la papelera y confirma. No se puede eliminar una función con sillas vendidas o apartadas.

## Películas

- **Crear:** toca **Crear película** y completa el formulario: título, sinopsis, imágenes, fecha de estreno, duración, géneros, reparto, idiomas y estado. Las imágenes deben venir de TMDB (`image.tmdb.org`) o de la carpeta del proyecto (`/images/...`).
- **Editar:** toca el lápiz.
- **Eliminar:** toca la papelera y confirma. También se borran sus funciones sin ventas. Si alguna función futura ya tiene boletas vendidas, la película no se puede eliminar todavía.

## Salas

- **Crear:** indica el nombre, el formato (2D, 3D o IMAX) y cuántas sillas generales y preferenciales tiene. Las sillas van en filas de 10, así que el número debe ser 10, 20, 30, etc., hasta 260.
- **Eliminar:** también se borran sus funciones sin ventas. Si alguna función futura ya tiene boletas vendidas, la sala no se puede eliminar todavía.

## Comida

Cada producto tiene nombre, imagen, descripción, precio, categoría (combos, comidas o bebidas), tipo, tamaño y cantidad disponible. La cantidad baja sola con cada venta y vuelve a subir si un pago se cancela o vence.

Para cargar o actualizar el menú completo, usa `npm run seed-menu`.

## Cartelera

Aquí puedes definir exactamente qué películas están en cartelera:

1. Abre la página de cartelera del cine y copia todo el texto de la lista.
2. Pégalo en la caja y toca **Actualizar cartelera**.
3. El panel muestra cada título reconocido, la película de TMDB con la que coincidió y cuántos datos coincidieron. Los títulos aceptados dicen **Entró** y los rechazados dicen **Por fuera**.

La lista dura **10 días**. Después de ese tiempo, la cartelera vuelve sola a las 12 películas más populares de TMDB para Colombia. Si quieres mantener una lista fija, pégala de nuevo antes de que venza.

Si el texto no parece una cartelera (se reconocen menos de 5 películas), no se cambia nada.

## Usuarios, boletas y transacciones

Estas tres secciones son **de consulta**: muestran los registros, pero no se editan desde el panel.

| Sección | Qué muestra | Se puede buscar por |
|---|---|---|
| Usuarios | Nombre, correo, rol, boletas compradas y fecha de registro. | Nombre, apellido o correo |
| Boletas | Código, película, sala, función, sillas, total, comprador y fecha de compra. | Código, película o correo del comprador |
| Transacciones | Referencia de pago de Stripe, comprador, boleta, total, medio de pago, estado y fecha. | Referencia de pago o correo del comprador |

Para dar el rol de administrador a otra persona, usa `npm run create-admin` con su correo. El comando no cambia su contraseña.

## Mensajes del panel

Después de guardar o eliminar, aparece un mensaje arriba de la pantalla: verde si salió bien y rojo si hubo un error. Si hay un error, el formulario conserva lo que escribiste para que lo corrijas.
