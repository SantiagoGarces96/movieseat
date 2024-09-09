import { IMovieModel } from "@/interfaces/movie";
import { MovieStatus } from "@/types/movie";
import { Schema, model, models } from "mongoose";

const movieSchema = new Schema<IMovieModel>({
  _id: { type: Schema.Types.ObjectId, required: true, unique: true },
  title: { type: String, required: true },
  backdrop: { type: String, required: true },
  description: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  duration: { type: Number, required: true },
  genre: [{ type: String, required: true }],
  director: { type: String, required: true },
  cast: [{ type: String, required: true }],
  language: [{ type: String, required: true }],
  subtitles: { type: Boolean, default: false },
  trailer: { type: String, required: true },
  poster: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(MovieStatus),
    default: MovieStatus.UPCOMING,
  },
  sessions: [{ type: Schema.Types.ObjectId, ref: "Session", required: true }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default models.Movie || model<IMovieModel>("Movie", movieSchema);
