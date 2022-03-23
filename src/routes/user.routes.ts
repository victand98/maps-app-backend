import { Router } from "express";
import { userController } from "../controllers";
import { use } from "../helpers/utils";
import { requireAuth } from "../middlewares";

const userRouter = Router();

userRouter.get("/", requireAuth, use(userController.all));
userRouter.post("/", requireAuth, use(userController.save));
userRouter.put("/:id", requireAuth, use(userController.update));

export { userRouter };
