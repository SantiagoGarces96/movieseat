import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getNowPlayingTMDB, getUpcomingTMDB } from "@/lib/TMDB";

export async function POST() {
  await dbConnect();

  try {
    await getNowPlayingTMDB();
    await getUpcomingTMDB();

    return NextResponse.json({
      message: "Base de datos completada exitosamente",
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
