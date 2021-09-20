import { Router } from "express";
import { placeController } from "../controllers";

import { use } from "../utils/functions";

const placeRouter = Router();

placeRouter.get("/all", use(placeController.getPlaces));

placeRouter.post("/save", use(placeController.savePlace));

export default placeRouter;
