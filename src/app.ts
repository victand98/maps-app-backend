import express from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import cookieSession from "cookie-session";
import config from "config";
import log from "./helpers/logger";
import routes from "./routes";
import { currentUser, ErrorHandler, MongoErrorHandler } from "./middlewares";
import { NotFoundError } from "./helpers/errors";

const app = express();

app.set("trust proxy", 1);

// middlewares
app.use(
  morgan("dev", {
    stream: { write: (message: string) => log.info(message) },
  })
);

const corsOrigin: string[] = config.get<string>("corsOrigin").split(",");
console.info(corsOrigin);

app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (corsOrigin.indexOf(origin!) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    exposedHeaders: "*",
  })
);
app.use(
  cookieSession({
    signed: false,
    sameSite: process.env.NODE_ENV !== "development" ? "none" : false,
    secure: process.env.NODE_ENV !== "development",
  })
);

// verify if exists a current user
app.use(currentUser);

// app routes
routes(app);

// Not found error handler
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(MongoErrorHandler);
app.use(ErrorHandler);

export { app };
