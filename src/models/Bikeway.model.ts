import mongoose from "mongoose";
import {
  LineStringDocument,
  LineStringSchema,
} from "./schemas/LineString.schema";

export interface BikewayDocument extends mongoose.Document {
  name: string;
  location: LineStringDocument;
  createdAt: Date;
  updatedAt: Date;
}

const BikewaySchema = new mongoose.Schema<BikewayDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: LineStringSchema,
      required: true,
    },
  },
  { timestamps: true }
);

export const Bikeway = mongoose.model<BikewayDocument>(
  "Bikeway",
  BikewaySchema
);
