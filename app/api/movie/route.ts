import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Movie from "@/models/Movie";
import { IMovie } from "@/interfaces/movie";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const movieData = await request.json();
    const movie: IMovie = await Movie.create(movieData);
    return NextResponse.json(movie, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create movie." },
      { status: 500 },
    );
  }
}
