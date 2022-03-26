import { Router } from "express";
import { parkingPointStandController } from "../controllers";
import { use } from "../helpers/utils";
import { authorization, requireAuth } from "../middlewares";
import { Permissions } from "../types";

const parkingPointStandRouter = Router();

parkingPointStandRouter.get("/", use(parkingPointStandController.all));
parkingPointStandRouter.get("/:id", use(parkingPointStandController.one));
parkingPointStandRouter.post(
  "/",
  requireAuth,
  authorization(Permissions["save:parkingPointStand"]),
  use(parkingPointStandController.save)
);
parkingPointStandRouter.put(
  "/:id",
  requireAuth,
  authorization(Permissions["update:parkingPointStand"]),
  use(parkingPointStandController.update)
);

export { parkingPointStandRouter };
