import { Router } from "express";
import { parkingPointController } from "../controllers";
import { use } from "../helpers/utils";
import { authorization, requireAuth } from "../middlewares";
import { Permissions } from "../types";

const parkingPointRouter = Router();

parkingPointRouter.get("/", use(parkingPointController.all));
parkingPointRouter.post(
  "/",
  requireAuth,
  authorization(Permissions["save:parkingPoint"]),
  use(parkingPointController.save)
);
parkingPointRouter.put(
  "/:id",
  requireAuth,
  authorization(Permissions["update:parkingPoint"]),
  use(parkingPointController.update)
);

export { parkingPointRouter };
