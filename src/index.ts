import { app } from "./app";
import { connect } from "./config/database";
import config from "config";
import log from "./helpers/logger";
import { seeders } from "./config/seeders";

const port = config.get("port") as number;
const host = config.get("host") as string;

app.listen(port, () => {
  log.info(`Server started at http://${host}:${port}`);
  connect();
  seeders();
});
