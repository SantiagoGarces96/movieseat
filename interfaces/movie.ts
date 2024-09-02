import { MovieStatus } from "@/types/movie";
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
  status: MovieStatus;
  sessions: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IParsedMovie {
  title: string;
  backdrop: string;
  description: string;
  releaseDate: Date;
  duration: number;
  genre: string[];
  director: string;
  cast: string[];
  language: string[];
  trailer: string | null;
  poster: string;
  status: MovieStatus;
}
