import log from "../helpers/logger";
import { Password } from "../helpers/Password";
import { Permission, PlaceType, User } from "../models";
import { Role } from "../models/Role.model";
import { adminUserData, permissionData, placeTypeData, roleData } from "./data";

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

const insertRoles = async () => {
  log.info("Inserting Roles...");
  const rolesToInsert = roleData.map((role) =>
    Role.findOneAndUpdate({ name: role.name }, role, { upsert: true })
  );
  await Promise.all(rolesToInsert);
  log.info("Roles Inserted");
};

const insertPermissions = async () => {
  log.info("Inserting Permissions...");
  const permissionsToInsert = permissionData.map(async (permission) => {
    const roles = await Role.find({ name: { $in: permission.roles } }).distinct(
      "_id"
    );
    permission.roles = roles;
    return Permission.findOneAndUpdate({ name: permission.name }, permission, {
      upsert: true,
    });
  });
  await Promise.all(permissionsToInsert);
  log.info("Permissions Inserted");
};

const insertAdmin = async () => {
  log.info("Inserting Admin...");
  adminUserData.password = await Password.toHash(adminUserData.password);
  const adminRole = await Role.findOne({ name: adminUserData.role });
  adminUserData.role = adminRole?.id;
  await User.findOneAndUpdate({ email: adminUserData.email }, adminUserData, {
    upsert: true,
  });
  log.info("Admin inserted");
};

const seeders = async () => {
  try {
    await insertPlaceTypes();
    await insertRoles();
    await insertPermissions();
    await insertAdmin();
  } catch (error) {
    log.error(`An error occurred while saving the data: ${error}`);
  }
};

export { seeders };
