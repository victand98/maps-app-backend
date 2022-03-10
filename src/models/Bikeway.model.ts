import mongoose from "mongoose";
import {
  LineStringDocument,
  LineStringSchema,
} from "./schemas/LineString.schema";

interface BikewayAttrs {
  name: string;
  location: LineStringDocument;
  color?: string;
  width?: number;
  opacity?: number;
  description?: string;
  status: boolean;
}

interface BikewayModel extends mongoose.Model<BikewayDoc> {
  build(attrs: BikewayAttrs): BikewayDoc;
}

interface BikewayDoc extends mongoose.Document {
  name: string;
  location: LineStringDocument;
  color: string;
  width: number;
  opacity: number;
  description: string;
  status: boolean;
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
    color: {
      type: String,
      default: "#5048E5",
    },
    width: {
      type: Number,
      default: 3,
    },
    opacity: {
      type: Number,
      default: 1,
    },
    description: String,
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
  }
);

BikewaySchema.statics.build = (attrs: BikewayAttrs) => new Bikeway(attrs);

const Bikeway = mongoose.model<BikewayDoc, BikewayModel>(
  "Bikeway",
  BikewaySchema
);

export { Bikeway, BikewayAttrs };
