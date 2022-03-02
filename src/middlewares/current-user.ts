import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "config";

interface UserPayload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: boolean;
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
  console.log(`\nREQUEST\n`, req.headers);
  console.log("\nREQ.SESSION\n", req.session);
  if (!req.session?.jwt) return next();

  try {
    const jwtKey = config.get<string>("jwtKey");
    const payload = jwt.verify(req.session.jwt, jwtKey) as UserPayload;
    req.currentUser = payload;
  } catch (error) {}

  next();
};
