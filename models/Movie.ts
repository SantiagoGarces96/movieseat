import { IMovie } from "@/interfaces/movie";
import { Schema, model, models } from "mongoose";

const movieSchema = new Schema<IMovie>({
  title: { type: String, required: true },
  backdrop: { type: String, required: true },
  description: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  duration: { type: Number, required: true },
  genre: { type: String, required: true },
  director: { type: String, required: true },
  cast: [{ type: String, required: true }],
  status: {
    type: String,
    enum: ["pre-sale", "billboard", "upcoming"],
    default: "upcoming",
  },
  sessions: [{ type: Schema.Types.ObjectId, ref: "Session" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default models.Movie || model<IMovie>("Movie", movieSchema);
