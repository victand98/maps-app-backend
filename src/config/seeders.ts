import log from "../helpers/logger";
import { PlaceType, User } from "../models";
import { Password } from "../helpers/Password";
import { adminUserData, placeTypeData } from "./data";

const insertPlaceTypes = async () => {
  log.info("Inserting Place Types...");
  const placeTypesToInsert = placeTypeData.map((placeType) =>
    PlaceType.findOneAndUpdate({ name: placeType.name }, placeType, {
      upsert: true,
    })
  );
  await Promise.all(placeTypesToInsert);
  log.info("Place Types inserted");
};

const insertAdmin = async () => {
  log.info("Inserting Admin...");
  adminUserData.password = await Password.toHash(adminUserData.password);
  await User.findOneAndUpdate({ email: adminUserData.email }, adminUserData, {
    upsert: true,
  });
  log.info("Admin inserted");
};

const seeders = async () => {
  try {
    await insertPlaceTypes();
    await insertAdmin();
  } catch (error) {
    log.error(`An error occurred while saving the data: ${error}`);
  }
};

export { seeders };
