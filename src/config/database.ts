import mongoose from "mongoose";
import config from "config";
import log from "../utils/logger";

const connect = async () => {
  try {
    const dbUri = config.get("dbUri") as string;

    await mongoose.connect(dbUri, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //   useCreateIndex: true,
      //   useFindAndModify: false,
    });
    log.info(`Database is connected`);
  } catch (error) {
    log.error(`Database connection error: ${error}`);
    process.exit();
  }
};

export default connect;
