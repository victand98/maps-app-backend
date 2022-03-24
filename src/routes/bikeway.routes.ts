import { Router } from "express";
import { bikewayController } from "../controllers";
import { use } from "../helpers/utils";
import { authorization, requireAuth } from "../middlewares";
import { Permissions } from "../types";

const bikewayRouter = Router();

bikewayRouter.get("/", use(bikewayController.all));
bikewayRouter.get("/:id", use(bikewayController.one));
bikewayRouter.post(
  "/",
  requireAuth,
  authorization(Permissions["save:bikeway"]),
  use(bikewayController.save)
);
bikewayRouter.put(
  "/:id",
  requireAuth,
  authorization(Permissions["update:bikeway"]),
  use(bikewayController.update)
);

export { bikewayRouter };
