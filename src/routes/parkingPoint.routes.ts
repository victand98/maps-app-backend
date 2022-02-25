import { Router } from "express";
import { parkingPointController } from "../controllers";
import { use } from "../helpers/utils";
import { requireAuth } from "../middlewares";

const parkingPointRouter = Router();

parkingPointRouter.get("/", use(parkingPointController.all));
parkingPointRouter.post("/", requireAuth, use(parkingPointController.save));
parkingPointRouter.put("/:id", requireAuth, use(parkingPointController.update));

export { parkingPointRouter };
