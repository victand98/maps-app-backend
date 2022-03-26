import { Router } from "express";
import { placeController } from "../controllers";
import { use } from "../helpers/utils";
import { authorization, requireAuth } from "../middlewares";
import { Permissions } from "../types";

const placeRouter = Router();

placeRouter.get("/", use(placeController.all));
placeRouter.get("/:id", use(placeController.one));
placeRouter.post(
  "/",
  requireAuth,
  authorization(Permissions["save:place"]),
  use(placeController.save)
);
placeRouter.put(
  "/:id",
  requireAuth,
  authorization(Permissions["update:bikeway"]),
  use(placeController.update)
);
placeRouter.delete(
  "/:id",
  requireAuth,
  authorization(Permissions["delete:place"]),
  use(placeController.remove)
);

export { placeRouter };
