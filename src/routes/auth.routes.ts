import express from "express";
import { authController } from "../controllers";
import { use } from "../helpers/utils";
import { authorization } from "../middlewares";
import { Permissions } from "../types";

const authRouter = express.Router();

authRouter.post("/signin", use(authController.signin));
authRouter.post("/signup", use(authController.signup));
authRouter.post("/logout", use(authController.logout));
authRouter.get("/current/user", use(authController.currentUser));
authRouter.put(
  "/update/password",
  authorization(Permissions["update:password"]),
  use(authController.updatePassword)
);

export { authRouter };
