import { Router } from "express";
import { routeController } from "../controllers";
import { use } from "../helpers/utils";
import { authorization, requireAuth } from "../middlewares";
import { Permissions } from "../types";

const routeRouter = Router();

routeRouter.get(
  "/",
  requireAuth,
  authorization(Permissions["read:routes"]),
  use(routeController.all)
);
routeRouter.get(
  "/me",
  requireAuth,
  authorization(Permissions["read:myRoutes"]),
  use(routeController.allMe)
);
routeRouter.get(
  "/current",
  requireAuth,
  authorization(Permissions["read:currentRoute"]),
  use(routeController.currentRoute)
);
routeRouter.get(
  "/download/csv",
  requireAuth,
  authorization(Permissions["download:routes"]),
  use(routeController.downloadCSV)
);
routeRouter.get(
  "/:id",
  requireAuth,
  authorization(Permissions["read:route"]),
  use(routeController.one)
);
routeRouter.post(
  "/",
  requireAuth,
  authorization(Permissions["save:route"]),
  use(routeController.save)
);
routeRouter.put(
  "/:id",
  requireAuth,
  authorization(Permissions["update:route"]),
  use(routeController.update)
);

export { routeRouter };
