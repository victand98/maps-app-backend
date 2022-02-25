import { Router } from "express";
import { placeTypeController } from "../controllers";
import { use } from "../helpers/utils";

const placeTypeRouter = Router();

placeTypeRouter.get("/", use(placeTypeController.all));
placeTypeRouter.post("/", use(placeTypeController.save));

export { placeTypeRouter };
