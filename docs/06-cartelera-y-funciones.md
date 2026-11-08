# 6. Cartelera y funciones

La cartelera se mantiene sola. Todas las noches dos tareas programadas traen películas nuevas, deciden cuáles están en cartelera y programan las funciones de la semana. El administrador puede, además, pegar la lista exacta de películas del cine.

## Tareas programadas

Están configuradas en `vercel.json` y Vercel las ejecuta todos los días:

| Hora (UTC) | Hora en Colombia | Ruta | Qué hace |
|---|---|---|---|
| 00:00 | 7:00 p. m. | `/api/cron/filldb` | Trae de TMDB las películas en cartelera y los próximos estrenos para Colombia, y guarda las nuevas. |
| 00:05 | 7:05 p. m. | `/api/cron/update-sessions` | Actualiza el estado de cada película y programa las funciones de los próximos 7 días. |

Las dos rutas exigen el encabezado `Authorization: Bearer <CRON_SECRET>`. Vercel lo envía solo. Sin esa clave, la ruta responde `401` y no hace nada.

## Estado de cada película

El estado depende de la fecha de estreno (`getMovieStatus` en `lib/TMDB.ts`):

| Situación | Estado |
|---|---|
| Se estrena en más de 8 días | Próximamente (`upcoming`) |
| Se estrena dentro de los próximos 8 días | Preventa (`pre-sale`) |
| Se estrenó hace 120 días o menos | Cartelera (`billboard`) |
| Se estrenó hace más de 120 días | Archivada (`archived`) |

## Qué películas quedan en cartelera

Hay dos formas de decidirlo (`updateMoviesStatus` en `lib/schedule.ts`):

**Con una lista del administrador.** Si el administrador pegó una lista en el panel hace 10 días o menos, la cartelera es exactamente esa lista, en ese orden, más las películas creadas a mano. Las películas de la lista se mantienen aunque sean antiguas, como pasa con los reestrenos.

**Sin lista, o con una lista de más de 10 días.** La cartelera son las 12 películas más populares que TMDB reporta en cartelera para Colombia en los últimos 3 días. Esos 3 días dan margen por si alguna noche falla la sincronización. Si TMDB no reporta ninguna, se usan las 12 más populares entre las que están en cartelera según su fecha de estreno.

Las películas que salen de la cartelera quedan archivadas, no se borran. Las que vencieron por fecha y no están en la lista sí se eliminan, junto con sus funciones.

### Cómo se lee la lista pegada

El administrador copia el texto de la página de cartelera del cine y lo pega en el panel. El sistema:

1. Reconoce los títulos y las fechas de estreno, e ignora etiquetas como "Preventa" o "Recomendada para mayores de 12 años".
2. Busca cada título en TMDB y compara varios datos: el título en español, el título original, si TMDB la tiene en cartelera para Colombia y el año de estreno.
3. Acepta una película solo si coincide más de la mitad de los datos, con un mínimo de dos.
4. Si menos de 5 películas coinciden, no cambia nada, porque probablemente el texto no era una cartelera.

El panel muestra el resultado título por título, para que el administrador vea qué encontró el sistema.

## Programación de funciones

`planSchedule` (en `lib/schedule.ts`) llena cada sala durante los próximos 7 días:

- La primera función empieza a las 10:00 a. m. y la última a más tardar a las 10:00 p. m.
- Entre una función y otra hay 60 minutos: 30 de limpieza y 30 de preparación.
- Si una película no tiene duración registrada, se calculan 120 minutos.
- Las horas se redondean a múltiplos de 5 minutos.
- Primero se reparten las películas que aún no tienen funciones ese día. Una película suele repetirse dos veces seguidas en la misma sala.
- Las películas en preventa reciben funciones desde el día de su estreno.

Las funciones que ya pasaron o que tienen sillas vendidas nunca se tocan. Las demás se pueden borrar y volver a crear si la cartelera cambió. Las funciones de hace más de un mes se borran.

## Precios

Cada función guarda su precio cuando se crea (`calculatePrice` en `lib/TMDB.ts`). El precio depende del formato de la sala, del tipo de silla, de la hora y de si la película está en preventa.

**Precios base (funciones que empiezan hasta la 1:00 p. m.):**

| Formato | General | Preferencial |
|---|---|---|
| 2D | $5.000 | $8.000 |
| 3D | $10.000 | $14.000 |
| IMAX | $8.000 | $12.000 |

**Multiplicadores:**

| Momento | Cartelera | Preventa |
|---|---|---|
| Hasta la 1:00 p. m. | × 1 | × 2 |
| Después de la 1:00 p. m. | × 3 | × 5 |

Por ejemplo, una silla general en una función 3D de las 4:00 p. m. de una película en cartelera cuesta $10.000 × 3 = $30.000.

Si cambian las reglas de precios, las funciones que ya existen conservan su precio y las nuevas usan la regla nueva.
