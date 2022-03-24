import config from "config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { RoleDoc } from "../models";

interface UserPayload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: boolean;
  role: RoleDoc;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return next();

  try {
    const jwtKey = config.get<string>("jwtKey");
    const accessToken = authHeader.split(" ")[1];
    const payload = jwt.verify(accessToken, jwtKey) as UserPayload;
    req.currentUser = payload;
  } catch (error) {}

  next();
};
