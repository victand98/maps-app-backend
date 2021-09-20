import mongoose from "mongoose";

export interface PointDocument extends mongoose.Document {
  type: string;
  coordinates: number[];
}

export const PointSchema = new mongoose.Schema<PointDocument>({
  type: {
    type: String,
    enum: ["Point"],
    default: "Point",
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});
