import express from "express";
import routes from "./routes";
import helmet from "helmet";
import cors from "cors";
import log from "./utils/logger";
import morgan from "morgan";

const app = express();

app.use(
  morgan("dev", {
    stream: { write: (message: string) => log.info(message) },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

routes(app);

export default app;
