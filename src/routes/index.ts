import { Express } from "express";
import placeRouter from "./place.route";
import placeTypeRouter from "./placeType.route";
import bikewayRouter from "./bikeway.route";

export default (app: Express) => {
  app.use("/place", placeRouter);
  app.use("/place-type", placeTypeRouter);
  app.use("/bikeway", bikewayRouter);
};
