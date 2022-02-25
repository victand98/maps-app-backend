import { Express } from "express";
import { authRouter } from "./auth.routes";
import { bikewayRouter } from "./bikeway.routes";
import { parkingPointRouter } from "./parkingPoint.routes";
import { placeRouter } from "./place.routes";
import { placeTypeRouter } from "./placeType.routes";

export default (app: Express) => {
  app.use("/auth", authRouter);
  app.use("/bikeway", bikewayRouter);
  app.use("/parkingpoint", parkingPointRouter);
  app.use("/place", placeRouter);
  app.use("/placetype", placeTypeRouter);
};
