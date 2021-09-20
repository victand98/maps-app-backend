import { Express } from "express";
import placeRouter from "./place.route";
import placeTypeRouter from "./placeType.route";

export default (app: Express) => {
  app.use("/place", placeRouter);
  app.use("/place-type", placeTypeRouter);
};
