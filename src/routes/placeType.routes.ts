import { Router } from "express";
import { placeTypeController } from "../controllers";
import { use } from "../helpers/utils";
import { authorization, requireAuth } from "../middlewares";
import { Permissions } from "../types";

const placeTypeRouter = Router();

placeTypeRouter.get("/", use(placeTypeController.all));
placeTypeRouter.post(
  "/",
  requireAuth,
  authorization(Permissions["save:placeType"]),
  use(placeTypeController.save)
);
placeTypeRouter.put(
  "/:id",
  requireAuth,
  authorization(Permissions["update:placeType"]),
  use(placeTypeController.update)
);

export { placeTypeRouter };
