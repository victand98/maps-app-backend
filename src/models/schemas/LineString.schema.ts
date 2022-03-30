import mongoose from "mongoose";

export interface LineStringDocument extends mongoose.Document {
  type: string;
  coordinates: Array<number[]>;
}

export const LineStringSchema = new mongoose.Schema<LineStringDocument>(
  {
    type: {
      type: String,
      enum: ["LineString"],
      default: "LineString",
      required: true,
    },
    coordinates: {
      type: [[Number]],
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
