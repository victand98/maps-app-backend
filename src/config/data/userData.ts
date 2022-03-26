import { UserAttrs } from "../../models";
import config from "config";
import { Roles } from "../../types";

export const adminUserData: UserAttrs = {
  firstName: "Super",
  lastName: "Administrador",
  password: config.get<string>("adminPassword"),
  email: config.get<string>("adminEmail"),
  status: true,
  role: Roles.admin,
};
