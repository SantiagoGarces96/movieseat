import { MovieStatus } from "@/types/movie";
import mongoose, { Schema, Document } from "mongoose";
import { ISession } from "./session";

export interface IMovieModel extends Document {
  _id: mongoose.Types.ObjectId;
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
  _id: mongoose.Types.ObjectId;
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

export interface IMovie {
  _id: string;
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
  sessions: ISession[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
