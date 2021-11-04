import { Router } from "express";
import { bikewayController } from "../controllers";

import { use } from "../utils/functions";

const bikewayRouter = Router();

bikewayRouter.get("/all", use(bikewayController.getBikeways));

bikewayRouter.post("/save", use(bikewayController.saveBikeway));

export default bikewayRouter;
