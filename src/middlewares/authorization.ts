import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../helpers/errors/not-authorized-error";
import { Permission } from "../models";
import { Permissions } from "../types";

export const authorization =
  (permission: Permissions) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const foundPermission = await Permission.findOne({
      name: permission,
      roles: req.currentUser?.role.id,
    });

    if (!foundPermission) throw new NotAuthorizedError();

    next();
  };
