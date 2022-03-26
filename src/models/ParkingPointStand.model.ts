import mongoose from "mongoose";
import { ParkingPointStandStatus } from "../types";
import { ParkingPointDoc } from "./ParkingPoint.model";
import { StandHistoryDoc } from "./StandHistory.model";

interface ParkingPointStandAttrs {
  status: ParkingPointStandStatus;
  number: number;
  parkingPoint: string;
  currentStandHistory?: string;
}

interface ParkingPointStandModel extends mongoose.Model<ParkingPointStandDoc> {
  build(attrs: ParkingPointStandAttrs): ParkingPointStandDoc;
}

interface ParkingPointStandDoc extends mongoose.Document {
  status: ParkingPointStandStatus;
  number: number;
  parkingPoint: ParkingPointDoc;
  currentStandHistory?: StandHistoryDoc;
  createdAt: string;
  updatedAt: string;
}

const ParkingPointStandSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      enum: Object.values(ParkingPointStandStatus),
      default: ParkingPointStandStatus.unoccupied,
    },
    number: {
      type: Number,
      required: true,
    },
    parkingPoint: {
      type: mongoose.Types.ObjectId,
      ref: "ParkingPoint",
      required: true,
    },
    currentStandHistory: {
      type: mongoose.Types.ObjectId,
      ref: "StandHistory",
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

ParkingPointStandSchema.statics.build = (attrs: ParkingPointStandAttrs) =>
  new ParkingPointStand(attrs);

const ParkingPointStand = mongoose.model<
  ParkingPointStandDoc,
  ParkingPointStandModel
>("ParkingPointStand", ParkingPointStandSchema);

export { ParkingPointStand, ParkingPointStandDoc, ParkingPointStandAttrs };
