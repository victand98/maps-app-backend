import mongoose from "mongoose";
import {
  LineStringDocument,
  LineStringSchema,
} from "./schemas/LineString.schema";

interface BikewayAttrs {
  name: string;
  location: LineStringDocument;
}

interface BikewayModel extends mongoose.Model<BikewayDoc> {
  build(attrs: BikewayAttrs): BikewayDoc;
}

interface BikewayDoc extends mongoose.Document {
  name: string;
  location: LineStringDocument;
  createdAt: string;
  updatedAt: string;
}

const BikewaySchema = new mongoose.Schema(
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

BikewaySchema.statics.build = (attrs: BikewayAttrs) => new Bikeway(attrs);

const Bikeway = mongoose.model<BikewayDoc, BikewayModel>(
  "Bikeway",
  BikewaySchema
);

export { Bikeway, BikewayAttrs };
