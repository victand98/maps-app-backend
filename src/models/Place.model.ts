import mongoose from "mongoose";
import { PlaceTypeDoc } from "./PlaceType.model";
import { PointDocument, PointSchema } from "./schemas/Point.schema";

interface PlaceAttrs {
  name: string;
  formattedAddress?: string;
  location: PointDocument;
  type: PlaceTypeDoc;
  status: boolean;
}

interface PlaceModel extends mongoose.Model<PlaceDoc> {
  build(attrs: PlaceAttrs): PlaceDoc;
}

interface PlaceDoc extends mongoose.Document {
  name: string;
  formattedAddress?: string;
  location: PointDocument;
  type: PlaceTypeDoc;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

const PlaceSchema = new mongoose.Schema(
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
    type: { type: mongoose.Types.ObjectId, ref: "PlaceType", required: true },
    status: {
      type: Boolean,
      default: true,
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
    discriminatorKey: "kind",
  }
);

PlaceSchema.statics.build = (attrs: PlaceAttrs) => new Place(attrs);

const Place = mongoose.model<PlaceDoc, PlaceModel>("Place", PlaceSchema);

export { Place, PlaceAttrs, PlaceDoc };
