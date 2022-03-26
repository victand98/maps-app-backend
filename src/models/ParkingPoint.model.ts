import mongoose from "mongoose";
import { Place, PlaceAttrs, PlaceDoc } from "./Place.model";

interface ParkingPointAttrs extends PlaceAttrs {
  openingTime: string;
  closingTime: string;
}

interface ParkingPointModel extends mongoose.Model<ParkingPointDoc> {
  build(attrs: ParkingPointAttrs): ParkingPointDoc;
}

interface ParkingPointDoc extends PlaceDoc {
  openingTime: string;
  closingTime: string;
}

const ParkingPointSchema = new mongoose.Schema({
  openingTime: String,
  closingTime: String,
});

ParkingPointSchema.statics.build = (attrs: ParkingPointAttrs) =>
  new ParkingPoint(attrs);

const ParkingPoint = Place.discriminator<ParkingPointDoc, ParkingPointModel>(
  "ParkingPoint",
  ParkingPointSchema
);

export { ParkingPoint, ParkingPointDoc, ParkingPointAttrs };
