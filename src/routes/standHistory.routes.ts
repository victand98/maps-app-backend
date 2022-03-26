import { Router } from "express";
import { standHistoryController } from "../controllers";
import { use } from "../helpers/utils";
import { authorization, requireAuth } from "../middlewares";
import { Permissions } from "../types";

const standHistoryRouter = Router();

standHistoryRouter.get("/", use(standHistoryController.all));
standHistoryRouter.get("/:id", use(standHistoryController.one));
standHistoryRouter.post(
  "/",
  requireAuth,
  authorization(Permissions["save:standHistory"]),
  use(standHistoryController.save)
);
standHistoryRouter.put(
  "/:id",
  requireAuth,
  authorization(Permissions["update:standHistory"]),
  use(standHistoryController.update)
);

export { standHistoryRouter };
