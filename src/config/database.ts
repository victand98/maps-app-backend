import mongoose, { mongo } from "mongoose";
import config from "config";

const connect = async () => {
  try {
    const dbUri = config.get("dbUri") as string;

    mongoose.set("strictQuery", false);
    await mongoose.connect(dbUri);
    console.log(`Database is connected`);
    return;
  } catch (error) {
    console.error(`Database connection error: ${error}`);
    process.exit();
  }
};

export { connect };
