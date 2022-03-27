import { Express } from "express";
import { authRouter } from "./auth.routes";
import { bikewayRouter } from "./bikeway.routes";
import { parkingPointRouter } from "./parkingPoint.routes";
import { parkingPointStandRouter } from "./parkingPointStand.routes";
import { placeRouter } from "./place.routes";
import { placeTypeRouter } from "./placeType.routes";
import { roleRouter } from "./role.routes";
import { standHistoryRouter } from "./standHistory.routes";
import { userRouter } from "./user.routes";

export default (app: Express) => {
  app.use("/auth", authRouter);
  app.use("/bikeway", bikewayRouter);
  app.use("/parkingpoint", parkingPointRouter);
  app.use("/parkingpointstand", parkingPointStandRouter);
  app.use("/place", placeRouter);
  app.use("/placetype", placeTypeRouter);
  app.use("/role", roleRouter);
  app.use("/standhistory", standHistoryRouter);
  app.use("/user", userRouter);
};
