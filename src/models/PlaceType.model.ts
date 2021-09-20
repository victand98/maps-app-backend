import mongoose from "mongoose";

export interface PlaceTypeDocument extends mongoose.Document {
  name: string;
  description?: string;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
}

const PlaceTypeSchema = new mongoose.Schema<PlaceTypeDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    icon: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const PlaceType = mongoose.model<PlaceTypeDocument>(
  "PlaceType",
  PlaceTypeSchema
);
