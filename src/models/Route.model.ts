import mongoose from "mongoose";
import { BikeTypes, Purposes } from "../types";
import {
  LineStringDocument,
  LineStringSchema,
} from "./schemas/LineString.schema";
import { UserDoc } from "./User.model";

interface RouteAttrs {
  location: LineStringDocument;
  name: string;
  startTime: string;
  endTime: string;
  purpose: Purposes;
  bikeType: BikeTypes;
  user: string;
}

interface RouteModel extends mongoose.Model<RouteDoc> {
  build(attrs: RouteAttrs): RouteDoc;
}

interface RouteDoc extends mongoose.Document {
  location: LineStringDocument;
  name: string;
  startTime: string;
  endTime: string;
  purpose: Purposes;
  bikeType: BikeTypes;
  user: UserDoc;
  createdAt: string;
  updatedAt: string;
}

const RouteSchema = new mongoose.Schema(
  {
    location: {
      type: LineStringSchema,
    },
    name: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: String,
    purpose: {
      type: String,
      required: true,
      enum: Object.values(Purposes),
    },
    bikeType: {
      type: String,
      required: true,
      enum: Object.values(BikeTypes),
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
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

RouteSchema.statics.build = (attrs: RouteAttrs) => new Route(attrs);

const Route = mongoose.model<RouteDoc, RouteModel>("Route", RouteSchema);

export { Route, RouteDoc, RouteAttrs };
