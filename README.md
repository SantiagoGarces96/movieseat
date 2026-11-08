# MovieSeat

MovieSeat es una página web para ver la cartelera de cine y comprar boletas en línea. En ella eliges la película, la función y tus sillas, agregas comida si quieres y pagas. Al final recibes una boleta con un código QR.

La hicimos como proyecto de grado. Queríamos una experiencia de compra parecida a la de los cines de Colombia, pero más clara, más limpia y sin publicidad.

**Sitio publicado:** https://movieseat.vercel.app

> Los pagos funcionan en **modo de prueba** de Stripe. No se cobra dinero real. Para probar una compra, usa la tarjeta `4242 4242 4242 4242`, cualquier fecha futura y cualquier CVC de 3 dígitos.

## Qué se puede hacer

**Si eres cliente:**

- Ver las películas en cartelera y los próximos estrenos, con sinopsis, reparto y tráiler.
- Elegir una función y escoger tus sillas en el mapa de la sala. Las sillas quedan apartadas por 10 minutos.
- Agregar combos, comida y bebidas antes de pagar.
- Pagar con Stripe en modo de prueba.
- Ver tus boletas en "Mis boletas", cada una con su código QR.

**Si eres administrador:**

- Ver un resumen con gráficas de ventas, ingresos y ocupación de las salas.
- Crear, editar y eliminar películas, salas, funciones y productos de comida.
- Actualizar la cartelera pegando la lista de películas del cine.
- Consultar usuarios, boletas vendidas y transacciones.

**Lo que pasa solo, sin intervención de nadie:**

- Cada noche se traen películas nuevas desde TMDB.
- Cada noche se actualiza la cartelera y se programan las funciones de los próximos 7 días.

## Tecnologías

| Parte | Herramienta |
|---|---|
| Aplicación web | Next.js 15 (App Router), React 19, TypeScript |
| Estilos | Tailwind CSS y daisyUI |
| Base de datos | MongoDB con Mongoose |
| Validación de datos | Zod |
| Pagos | Stripe Checkout (modo de prueba) |
| Sesiones | JWT firmado con `jose`, guardado en una cookie `httpOnly` |
| Datos de películas | API de TMDB |
| Gráficas | Recharts |
| Publicación | Vercel, con tareas programadas (cron) |

## Probarlo en tu computador

Necesitas [Node.js](https://nodejs.org/) entre las versiones 20 y 22.

### Opción rápida: el demo

No necesita base de datos ni claves de TMDB. Crea una base temporal con películas ficticias y la borra al cerrar.

```bash
npm install
```

```bash
npm run demo
```

Abre http://localhost:3000. El demo crea estas dos cuentas de prueba:

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | `admin@movieseat.test` | `demo-admin-1234` |
| Cliente | `cliente@movieseat.test` | `demo-cliente-1234` |

Para probar el pago en el demo, también necesitas una llave de prueba de Stripe en `.env.local` (ver abajo).

### Opción completa: con tu propia base de datos

1. Copia `.env.example` como `.env.local` y completa los valores. En [Instalación y despliegue](docs/09-instalacion-y-despliegue.md) está qué es cada uno.
2. Instala las dependencias y arranca el servidor:

```bash
npm install
```

```bash
npm run dev
```

3. Crea tu cuenta de administrador:

```bash
npm run create-admin
```

4. Carga el menú de comidas:

```bash
npm run seed-menu
```

## Documentación

Toda la documentación del proyecto está en la carpeta [`docs`](docs/):

1. [Visión general](docs/01-vision-general.md): el problema, los objetivos y el alcance.
2. [Requisitos](docs/02-requisitos.md): requisitos funcionales y no funcionales.
3. [Arquitectura](docs/03-arquitectura.md): cómo está organizado el sistema y por qué.
4. [Modelo de datos](docs/04-modelo-de-datos.md): las colecciones y cómo se relacionan.
5. [Flujo de compra](docs/05-flujo-de-compra.md): desde elegir sillas hasta recibir la boleta.
6. [Cartelera y funciones](docs/06-cartelera-y-funciones.md): las tareas automáticas y los precios.
7. [API](docs/07-api.md): las rutas del servidor.
8. [Seguridad](docs/08-seguridad.md): cómo se protegen las cuentas, los pagos y los datos.
9. [Instalación y despliegue](docs/09-instalacion-y-despliegue.md): variables, comandos y Vercel.
10. [Manual de usuario](docs/10-manual-de-usuario.md): cómo comprar una boleta.
11. [Manual del administrador](docs/11-manual-del-administrador.md): cómo usar el panel.
12. [Pruebas](docs/12-pruebas.md): qué se probó y cómo repetirlo.
13. [Limitaciones y trabajo futuro](docs/13-limitaciones-y-trabajo-futuro.md).

## Estructura del código

```text
app/          Páginas, rutas de la API y componentes de la interfaz
lib/          Lógica principal: reservas, pagos, cartelera, sesiones
models/       Modelos de MongoDB (Mongoose)
schema/       Reglas de validación con Zod
services/     Acciones del servidor que usa el panel de administración
scripts/      Demo, creación del administrador y carga del menú
types/        Tipos y enumeraciones compartidas
utils/        Funciones pequeñas de apoyo (fechas, precios, formatos)
docs/         Documentación del proyecto
```

## Equipo

- **Santiago Aguirre**: desarrollo full stack. [GitHub](https://github.com/SantiagoGarces96)
- **Felipe Yepes**: desarrollo full stack. [GitHub](https://github.com/YepesF)

## Créditos

Los datos y las imágenes de las películas vienen de [TMDB](https://www.themoviedb.org/). Este producto usa la API de TMDB, pero TMDB no lo respalda ni lo certifica. Los créditos de las demás imágenes están en la página "Nosotros" del sitio.
