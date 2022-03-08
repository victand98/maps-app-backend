import { Router } from "express";
import { placeController } from "../controllers";
import { use } from "../helpers/utils";
import { requireAuth } from "../middlewares";

const placeRouter = Router();

placeRouter.get("/", use(placeController.all));
placeRouter.get("/:id", use(placeController.one));
placeRouter.post("/", requireAuth, use(placeController.save));
placeRouter.put("/:id", requireAuth, use(placeController.update));
placeRouter.delete("/:id", requireAuth, use(placeController.remove));

export { placeRouter };
