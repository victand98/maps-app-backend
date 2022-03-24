import { PermissionAttrs } from "../../models";
import { Permissions, Roles } from "../../types";

export const permissionData: PermissionAttrs[] = [
  /**
   * Users
   */
  {
    name: Permissions["read:users"],
    status: true,
    roles: [Roles.admin],
  },
  {
    name: Permissions["save:user"],
    status: true,
    roles: [Roles.admin],
  },
  {
    name: Permissions["update:user"],
    status: true,
    roles: [Roles.admin],
  },

  /**
   * Bikeways
   */
  {
    name: Permissions["save:bikeway"],
    status: true,
    roles: [Roles.admin],
  },
  {
    name: Permissions["update:bikeway"],
    status: true,
    roles: [Roles.admin],
  },

  /**
   * Parking Point
   */
  {
    name: Permissions["save:parkingPoint"],
    status: true,
    roles: [Roles.admin],
  },
  {
    name: Permissions["update:parkingPoint"],
    status: true,
    roles: [Roles.admin],
  },

  /**
   * Places
   */
  {
    name: Permissions["save:place"],
    status: true,
    roles: [Roles.admin],
  },
  {
    name: Permissions["update:place"],
    status: true,
    roles: [Roles.admin],
  },
  {
    name: Permissions["delete:place"],
    status: true,
    roles: [Roles.admin],
  },

  /**
   * Place Types
   */
  {
    name: Permissions["save:placeType"],
    status: true,
    roles: [Roles.admin],
  },
  {
    name: Permissions["update:placeType"],
    status: true,
    roles: [Roles.admin],
  },
];
