import { Schema, Document } from "mongoose";

export interface IMovie extends Document {
  _id: Schema.Types.ObjectId;
  title: string;
  backdrop: string;
  description: string;
  releaseDate: Date;
  duration: number;
  genre: string[];
  director: string;
  cast: string[];
  language: string[];
  subtitles: boolean;
  trailer: string;
  poster: string;
  status: "pre-sale" | "billboard" | "upcoming";
  sessions: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
