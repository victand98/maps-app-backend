import logger from "pino";
import * as dayjs from "dayjs";

const log = logger({
  prettyPrint: true,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs.default().format()}"`,
});

export default log;
