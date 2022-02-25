import { UserAttrs } from "../../models";
import config from "config";

export const adminUserData: UserAttrs = {
  firstName: "Super",
  lastName: "Administrador",
  password: config.get<string>("adminPassword"),
  email: config.get<string>("adminEmail"),
  status: true,
};
