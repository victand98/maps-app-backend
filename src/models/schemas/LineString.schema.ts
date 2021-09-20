import mongoose from "mongoose";

export interface LineStringDocument extends mongoose.Document {
  type: string;
  coordinates: number[][][];
}

export const LineStringSchema = new mongoose.Schema<LineStringDocument>({
  type: {
    type: String,
    enum: ["LineString"],
    required: true,
  },
  coordinates: {
    type: [[[Number]]],
    required: true,
  },
});
