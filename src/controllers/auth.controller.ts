import { Request, Response } from "express";
import { Password } from "../helpers/Password";
import { User } from "../models";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../helpers/errors/bad-request-error";
import config from "config";

export const signin = async (req: Request, res: Response) => {
  console.log(`\n\nREQUEST ON SIGNIN\n`, req.headers);
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new BadRequestError("Las credenciales no son válidas");

  const passwordsMatch = await Password.compare(user.password, password);

  if (!passwordsMatch)
    throw new BadRequestError("Las credenciales no son válidas");

  if (!user.status)
    throw new BadRequestError("Su cuenta se encuentra inactiva");

  // Generate JWT
  const jwtKey = config.get<string>("jwtKey");
  const userJWT = jwt.sign(user.toJSON(), jwtKey);

  // Store it on session object
  req.session = {
    jwt: userJWT,
  };

  res.status(200).json(user);
};

export const logout = (req: Request, res: Response) => {
  req.session = null;
  res.json({});
};

export const currentUser = (req: Request, res: Response) => {
  res.json({ currentUser: req.currentUser || null });
};
