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
