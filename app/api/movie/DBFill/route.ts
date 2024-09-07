import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getNowPlayingTMDB, getUpcomingTMDB, parseMovie } from "@/lib/TMDB";
import Movie from "@/models/Movie";
import Session from "@/models/Session";
import Room from "@/models/Room";

export async function POST() {
  await dbConnect();

  try {
    console.log("Iniciando el proceso de llenado de la base de datos...");

    // Obtener las películas desde TMDB
    const nowPlaying = await getNowPlayingTMDB();
    const parseNowPlaying = await parseMovie(nowPlaying);

    const upcoming = await getUpcomingTMDB();
    const parseUpcoming = await parseMovie(upcoming);

    const moviesDetail = [...parseNowPlaying, ...parseUpcoming];

    console.log("Películas parseadas: ", moviesDetail.length);

    // Procesar cada película y almacenarla en la base de datos
    for (const movie of moviesDetail) {
      console.log(`Procesando película: ${movie.title}`);

      // Verificar si la película ya existe en la base de datos
      const existingMovie = await Movie.findOne({ title: movie.title });
      if (!existingMovie) {
        console.log(`Guardando nueva película: ${movie.title}`);

        const newMovie = new Movie({
          _id: movie._id,
          title: movie.title,
          backdrop: movie.backdrop,
          description: movie.description,
          releaseDate: movie.releaseDate,
          duration: movie.duration,
          genre: movie.genre,
          director: movie.director,
          cast: movie.cast,
          language: movie.language,
          trailer: movie.trailer,
          poster: movie.poster,
          status: movie.status,
          sessions: movie.sessions,
        });

        // Guardar la película en la base de datos
        await newMovie.save();
      }

      // Procesar las sesiones y verificar si las salas están en la base de datos
      console.log(`Verificando sesiones para la película: ${movie.title}`);

      if (movie.sessions && movie.sessions.length > 0) {
        for (const sessionId of movie.sessions) {
          console.log(`Procesando sesión: ${sessionId}`);

          const session = await Session.findById(sessionId).populate("roomId");

          if (session) {
            // Verificar si roomId existe
            if (session.roomId) {
              console.log(`Procesando sala para la sesión: ${sessionId}`);

              const roomExists = await Room.findById(session.roomId._id);
              if (!roomExists) {
                console.log(`Guardando nueva sala: ${session.roomId.name}`);
                const newRoom = new Room({
                  _id: session.roomId._id,
                  name: session.roomId.name,
                  totalSeatsGeneral: session.roomId.totalSeatsGeneral,
                  totalSeatsPreferential: session.roomId.totalSeatsPreferential,
                  room: session.roomId.room,
                });

                await newRoom.save();
              }
            } else {
              console.log(`No hay sala asociada a la sesión ${sessionId}`);
            }

            // Guardar la sesión en la base de datos
            await session.save();
          } else {
            console.log(`No se encontró la sesión ${sessionId}`);
          }
        }
      } else {
        console.log(
          `No se encontraron sesiones para la película: ${movie.title}`,
        );
      }
    }

    console.log(
      "Proceso de llenado de la base de datos completado exitosamente.",
    );
    return NextResponse.json({
      message: "Base de datos completada exitosamente",
      moviesDetail,
    });
  } catch (error: any) {
    console.error(
      "Error durante el proceso de llenado de la base de datos: ",
      error.message,
    );
    return new Response(
      JSON.stringify({ message: error.message || "Ocurrió un error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
