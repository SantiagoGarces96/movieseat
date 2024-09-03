import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Movie from "@/models/Movie";

export async function GET() {
  await dbConnect();
  try {
    const movies = await Movie.find({});
    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch movies." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const movieData = await request.json();
    const newMovie = new Movie(movieData);
    await newMovie.save();
    return NextResponse.json(newMovie, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create movie." },
      { status: 500 },
    );
  }
}
