import { MovieStatus } from "@/types/movie";
import mongoose, { Schema, Document } from "mongoose";
import { ISession } from "./session";

export interface IMovieModel extends Document {
  _id: mongoose.Types.ObjectId;
  imdb_id: number;
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
  imdb_id: number;
  title: string;
  backdrop: string;
  description: string;
  releaseDate: Date;
  duration: number;
  genre: string[];
  director: string;
  cast: string[];
  language: string[];
  trailer: string;
  poster: string;
  status: MovieStatus;
}

export interface IMovie {
  _id: string;
  imdb_id: number;
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

export interface IMovieByGenre {
  _id: string;
  count: number;
}

export interface IMovieByStatus {
  _id: MovieStatus;
  count: number;
}

export interface IMoviesResponse {
  results: IMovie[];
  type: string;
  page: number;
  totalPages: number;
  totalResults: number;
}
