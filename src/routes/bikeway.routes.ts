import { Router } from "express";
import { bikewayController } from "../controllers";
import { use } from "../helpers/utils";
import { requireAuth } from "../middlewares";

const bikewayRouter = Router();

bikewayRouter.get("/", use(bikewayController.all));
bikewayRouter.get("/:id", use(bikewayController.one));
bikewayRouter.post("/", requireAuth, use(bikewayController.save));
bikewayRouter.put("/:id", requireAuth, use(bikewayController.update));

export { bikewayRouter };
