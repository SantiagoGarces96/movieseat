# 1. Visión general

## El problema

Comprar boletas de cine en línea en Colombia suele ser más complicado de lo que debería. Muchas páginas tienen publicidad, pasos de más y una navegación confusa: cuesta encontrar la función, el mapa de sillas no siempre es claro y no se entiende bien cuánto se va a pagar hasta el final.

También pasa algo menos visible: si dos personas eligen la misma silla al mismo tiempo, el sistema tiene que decidir cuál de las dos se la queda sin vender la silla dos veces. Y si alguien cierra la pestaña justo después de pagar, la boleta tiene que generarse igual.

## La propuesta

MovieSeat es una página de cine con un flujo de compra corto y claro:

1. Ver la cartelera.
2. Elegir película y función.
3. Escoger las sillas en el mapa de la sala.
4. Agregar comida, si se quiere.
5. Pagar.
6. Recibir la boleta con código QR.

Detrás de esa experiencia hay un panel para administrar el cine y unas tareas automáticas que mantienen la cartelera y las funciones al día sin que nadie tenga que hacerlo a mano.

## Objetivo general

Desarrollar una aplicación web para la venta de boletas de cine que permita consultar la cartelera, elegir sillas, comprar comida y pagar en línea de forma segura, junto con un panel de administración y la actualización automática de la cartelera.

## Objetivos específicos

1. Mostrar la cartelera y los próximos estrenos con información real de las películas, tomada de TMDB.
2. Permitir elegir sillas en un mapa de la sala, evitando que una misma silla se venda dos veces.
3. Integrar un pago en línea con Stripe, en modo de prueba, que genere una sola boleta por pago aunque Stripe avise varias veces.
4. Entregar al cliente una boleta digital con un código QR único.
5. Construir un panel para administrar películas, salas, funciones, comida y la cartelera, y para consultar usuarios, boletas y transacciones.
6. Automatizar la actualización diaria de la cartelera y la programación de funciones.
7. Proteger las cuentas, los pagos y el panel con buenas prácticas de seguridad.

## Alcance

**Incluye:**

- Sitio público: inicio, cartelera, próximos estrenos, detalle de película, comidas y "Nosotros".
- Registro e inicio de sesión de clientes.
- Selección de sillas, compra de comida y pago con Stripe en modo de prueba.
- Boletas con código QR en "Mis boletas".
- Panel de administración con gráficas, gestión del catálogo y consulta de ventas.
- Tareas programadas en Vercel para la cartelera y las funciones.

**No incluye:**

- Cobros reales. El proyecto solo acepta llaves de prueba de Stripe y se niega a funcionar con una llave real.
- Lectura del código QR en la entrada de la sala.
- Reembolsos, recuperación de contraseña ni envío de la boleta por correo.
- Varias sedes o ciudades: el sistema maneja un solo cine.

Estas funciones están descritas en [Limitaciones y trabajo futuro](13-limitaciones-y-trabajo-futuro.md).

## A quién está dirigido

- **Clientes:** cualquier persona que quiera ver qué hay en cartelera y comprar boletas desde el celular o el computador.
- **Administradores:** el personal del cine que mantiene el catálogo y revisa las ventas.
