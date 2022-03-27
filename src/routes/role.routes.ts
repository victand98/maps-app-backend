import { Router } from "express";
import { roleController } from "../controllers";
import { use } from "../helpers/utils";
import { authorization, requireAuth } from "../middlewares";
import { Permissions } from "../types";

const roleRouter = Router();

roleRouter.get(
  "/",
  requireAuth,
  authorization(Permissions["read:roles"]),
  use(roleController.all)
);
roleRouter.get(
  "/:id",
  requireAuth,
  authorization(Permissions["read:role"]),
  use(roleController.one)
);
roleRouter.post(
  "/",
  requireAuth,
  authorization(Permissions["save:role"]),
  use(roleController.save)
);
roleRouter.put(
  "/:id",
  requireAuth,
  authorization(Permissions["update:role"]),
  use(roleController.update)
);

export { roleRouter };
