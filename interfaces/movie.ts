import { Schema, Document } from "mongoose";

export interface IMovie extends Document {
  title: string;
  description: string;
  releaseDate: Date;
  duration: number;
  genre: string;
  director: string;
  cast: string[];
  status: "pre-sale" | "billboard" | "upcoming";
  sessions: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
