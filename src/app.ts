import express from "express";
import routes from "./routes";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

routes(app);

export default app;
