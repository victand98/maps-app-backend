import { Router } from "express";
import { userController } from "../controllers";
import { use } from "../helpers/utils";
import { authorization, requireAuth } from "../middlewares";
import { Permissions } from "../types";

const userRouter = Router();

userRouter.get(
  "/",
  requireAuth,
  authorization(Permissions["read:users"]),
  use(userController.all)
);
userRouter.post(
  "/",
  requireAuth,
  authorization(Permissions["save:user"]),
  use(userController.save)
);
userRouter.put(
  "/:id",
  requireAuth,
  authorization(Permissions["update:user"]),
  use(userController.update)
);

export { userRouter };
