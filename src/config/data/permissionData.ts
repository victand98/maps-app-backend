import { PermissionAttrs } from "../../models";
import { Permissions, Roles } from "../../types";

export const permissionData: PermissionAttrs[] = [
  /**
   * Auth
   */
  {
    name: Permissions["update:password"],
    status: true,
    roles: [Roles.admin, Roles.cyclist],
  },

  /**
   * Users
   */
  {
    name: Permissions["read:users"],
    status: true,
    roles: [Roles.admin],
  },
  {
    name: Permissions["read:user"],
    status: true,
    roles: [Roles.admin, Roles.cyclist],
  },
  {
    name: Permissions["save:user"],
    status: true,
    roles: [Roles.admin],
  },
  {
    name: Permissions["update:user"],
    status: true,
    roles: [Roles.admin, Roles.cyclist],
  },

  /**
   * Roles
   */
  {
    name: Permissions["read:roles"],
    status: true,
    roles: [Roles.admin],
  },
  {
    name: Permissions["read:role"],
    status: true,
    roles: [Roles.admin],
  },
  {
    name: Permissions["save:role"],
    status: true,
    roles: [Roles.admin],
  },
  {
    name: Permissions["update:role"],
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
   * Parking Point Stand
   */
  {
    name: Permissions["save:parkingPointStand"],
    status: true,
    roles: [Roles.admin],
  },
  {
    name: Permissions["update:parkingPointStand"],
    status: true,
    roles: [Roles.admin],
  },

  /**
   * Stand History
   */
  {
    name: Permissions["save:standHistory"],
    status: true,
    roles: [Roles.admin],
  },
  {
    name: Permissions["update:standHistory"],
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

  /**
   * Routes
   */
  {
    name: Permissions["read:routes"],
    status: true,
    roles: [Roles.admin],
  },
  {
    name: Permissions["read:myRoutes"],
    status: true,
    roles: [Roles.admin, Roles.cyclist],
  },
  {
    name: Permissions["read:currentRoute"],
    status: true,
    roles: [Roles.admin, Roles.cyclist],
  },
  {
    name: Permissions["read:route"],
    status: true,
    roles: [Roles.admin, Roles.cyclist],
  },
  {
    name: Permissions["save:route"],
    status: true,
    roles: [Roles.admin, Roles.cyclist],
  },
  {
    name: Permissions["update:route"],
    status: true,
    roles: [Roles.admin, Roles.cyclist],
  },
];
