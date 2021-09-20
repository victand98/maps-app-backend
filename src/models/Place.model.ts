import mongoose from "mongoose";
import { PlaceTypeDocument } from "./PlaceType.model";
import { PointDocument, PointSchema } from "./schemas/Point.schema";

export interface PlaceDocument extends mongoose.Document {
  name: string;
  formattedAddress?: string;
  location: PointDocument;
  placeType: PlaceTypeDocument["_id"];
  createdAt: Date;
  updatedAt: Date;
}

const PlaceSchema = new mongoose.Schema<PlaceDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    formattedAddress: String,
    location: {
      type: PointSchema,
      required: true,
    },
    placeType: {
      type: mongoose.Types.ObjectId,
      ref: "PlaceType",
    },
  },
  { timestamps: true }
);

export const Place = mongoose.model<PlaceDocument>("Place", PlaceSchema);
