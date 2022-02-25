import mongoose from "mongoose";
import { PlaceTypes } from "../types";

interface PlaceTypeAttrs {
  name: PlaceTypes;
  description?: string;
  icon: string;
}

interface PlaceTypeModel extends mongoose.Model<PlaceTypeDoc> {
  build(attrs: PlaceTypeAttrs): PlaceTypeDoc;
}

interface PlaceTypeDoc extends mongoose.Document {
  name: PlaceTypes;
  description?: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

const PlaceTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: Object.values(PlaceTypes),
      unique: true,
    },
    description: String,
    icon: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

PlaceTypeSchema.statics.build = (attrs: PlaceTypeAttrs) => new PlaceType(attrs);

const PlaceType = mongoose.model<PlaceTypeDoc, PlaceTypeModel>(
  "PlaceType",
  PlaceTypeSchema
);

export { PlaceType, PlaceTypeAttrs, PlaceTypeDoc };
