import { Router } from "express";
import { placeTypeController } from "../controllers";

import { use } from "../utils/functions";

const placeTypeRouter = Router();

placeTypeRouter.get("/all", use(placeTypeController.getPlaceTypes));

placeTypeRouter.post("/save", use(placeTypeController.savePlaceType));

export default placeTypeRouter;
