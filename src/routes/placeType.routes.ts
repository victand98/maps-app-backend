import { Router } from "express";
import { placeTypeController } from "../controllers";
import { use } from "../helpers/utils";
import { requireAuth } from "../middlewares";

const placeTypeRouter = Router();

placeTypeRouter.get("/", use(placeTypeController.all));
placeTypeRouter.post("/", requireAuth, use(placeTypeController.save));

export { placeTypeRouter };
