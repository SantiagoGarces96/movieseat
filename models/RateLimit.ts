import { Schema, model, models, Model } from "mongoose";

interface IRateLimit {
  _id: string;
  count: number;
  expiresAt: Date;
}

const rateLimitSchema = new Schema<IRateLimit>({
  _id: { type: String, required: true },
  count: { type: Number, required: true },
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
});

export default (models.RateLimit as Model<IRateLimit>) ||
  model<IRateLimit>("RateLimit", rateLimitSchema);
