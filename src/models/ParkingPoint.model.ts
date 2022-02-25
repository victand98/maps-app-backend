import mongoose from "mongoose";
import { Place, PlaceAttrs, PlaceDoc } from "./Place.model";

interface ParkingPointAttrs extends PlaceAttrs {
  spots: number;
  occupied: number;
}

interface ParkingPointModel extends mongoose.Model<ParkingPointDoc> {
  build(attrs: ParkingPointAttrs): ParkingPointDoc;
}

interface ParkingPointDoc extends PlaceDoc {
  spots: number;
  occupied: number;
}

const ParkingPointSchema = new mongoose.Schema({
  spots: {
    type: Number,
    required: true,
  },
  occupied: {
    type: Number,
    required: true,
  },
});

ParkingPointSchema.statics.build = (attrs: ParkingPointAttrs) =>
  new ParkingPoint(attrs);

const ParkingPoint = Place.discriminator<ParkingPointDoc, ParkingPointModel>(
  "ParkingPoint",
  ParkingPointSchema
);

export { ParkingPoint, ParkingPointAttrs };
