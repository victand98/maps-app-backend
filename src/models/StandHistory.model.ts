import mongoose from "mongoose";
import { ParkingPointStandDoc } from "./ParkingPointStand.model";
import { UserDoc } from "./User.model";

interface StandHistoryAttrs {
  entryTime: string;
  exitTime?: string;
  parkingPointStand: string;
  user: string;
}

interface StandHistoryModel extends mongoose.Model<StandHistoryDoc> {
  build(attrs: StandHistoryAttrs): StandHistoryDoc;
}

interface StandHistoryDoc extends mongoose.Document {
  entryTime: string;
  exitTime?: string;
  parkingPointStand: ParkingPointStandDoc;
  user: UserDoc;
  createdAt: string;
  updatedAt: string;
}

const StandHistorySchema = new mongoose.Schema(
  {
    entryTime: {
      type: String,
      required: true,
    },
    exitTime: {
      type: String,
    },
    parkingPointStand: {
      type: mongoose.Types.ObjectId,
      ref: "ParkingPointStand",
      required: true,
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

StandHistorySchema.statics.build = (attrs: StandHistoryAttrs) =>
  new StandHistory(attrs);

const StandHistory = mongoose.model<StandHistoryDoc, StandHistoryModel>(
  "StandHistory",
  StandHistorySchema
);

export { StandHistory, StandHistoryDoc, StandHistoryAttrs };
