import mongoose from "mongoose";
import config from "config";

const connect = async () => {
  try {
    const dbUri = config.get("dbUri") as string;

    await mongoose.connect(dbUri);
    console.log(`Database is connected`);
  } catch (error) {
    console.error(`Database connection error: ${error}`);
    process.exit();
  }
};

export { connect };
