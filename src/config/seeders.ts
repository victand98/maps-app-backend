import { Password } from "../helpers/Password";
import { Permission, PlaceType, User } from "../models";
import { Role } from "../models/Role.model";
import { adminUserData, permissionData, placeTypeData, roleData } from "./data";

const insertPlaceTypes = async () => {
  console.info("Inserting Place Types...");
  const placeTypesToInsert = placeTypeData.map((placeType) =>
    PlaceType.findOneAndUpdate({ name: placeType.name }, placeType, {
      upsert: true,
    })
  );
  await Promise.all(placeTypesToInsert);
  console.info("Place Types inserted");
};

const insertRoles = async () => {
  console.info("Inserting Roles...");
  const rolesToInsert = roleData.map((role) =>
    Role.findOneAndUpdate({ name: role.name }, role, { upsert: true })
  );
  await Promise.all(rolesToInsert);
  console.info("Roles Inserted");
};

const insertPermissions = async () => {
  console.info("Inserting Permissions...");
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
  console.info("Permissions Inserted");
};

const insertAdmin = async () => {
  console.info("Inserting Admin...");
  adminUserData.password = await Password.toHash(adminUserData.password);
  const adminRole = await Role.findOne({ name: adminUserData.role });
  adminUserData.role = adminRole?.id;
  await User.findOneAndUpdate({ email: adminUserData.email }, adminUserData, {
    upsert: true,
  });
  console.info("Admin inserted");
};

const seeders = async () => {
  try {
    await insertPlaceTypes();
    await insertRoles();
    await insertPermissions();
    await insertAdmin();
  } catch (error) {
    console.error(`An error occurred while saving the data: ${error}`);
  }
};

export { seeders };
