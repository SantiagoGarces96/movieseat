import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import Movie from "@/models/Movie";
import { IMovie } from "@/interfaces/movie";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "Invalid movie ID format" },
      { status: 400 },
    );
  }

  try {
    const movie: IMovie | null = await Movie.findById(id).populate("sessions");
    if (!movie) {
      return NextResponse.json({ message: "Movie not found" }, { status: 404 });
    }
    return NextResponse.json(movie, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to retrieve movie." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  await dbConnect();
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "Invalid movie ID format" },
      { status: 400 },
    );
  }

  try {
    const result: IMovie | null = await Movie.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ message: "Movie not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Movie deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete movie." },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  await dbConnect();
  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "Invalid movie ID format" },
      { status: 400 },
    );
  }

  try {
    const updates = await request.json();
    const movie: IMovie | null = await Movie.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!movie) {
      return NextResponse.json({ message: "Movie not found" }, { status: 404 });
    }
    return NextResponse.json(movie, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update movie." },
      { status: 500 },
    );
  }
}
