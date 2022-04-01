import config from "config";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { NotFoundError } from "../helpers/errors";
import { BadRequestError } from "../helpers/errors/bad-request-error";
import { Password } from "../helpers/Password";
import { Permission, Role, User } from "../models";
import { Roles } from "../types";

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).populate("role");

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

  res.status(200).json({ ...user.toJSON(), accessToken: userJWT });
};

export const signup = async (req: Request, res: Response) => {
  const user = User.build(req.body);
  const cyclistRole = await Role.findOne({ name: Roles.cyclist });
  if (!cyclistRole)
    throw new BadRequestError("No se ha encontrado un rol para el usuario");

  user.role = cyclistRole.id;
  await user.save();

  res.status(201).json(user);
};

export const logout = (req: Request, res: Response) => {
  req.session = null;
  res.json({});
};

export const currentUser = (req: Request, res: Response) => {
  res.json({ currentUser: req.currentUser || null });
};

export const userPermissions = async (req: Request, res: Response) => {
  if (req.currentUser) {
    const permissions = await Permission.find({
      roles: req.currentUser.role.id,
    });

    return res.json(permissions);
  }

  res.json([]);
};

export const updatePassword = async (req: Request, res: Response) => {
  const { password, newPassword } = req.body;
  const user = await User.findById(req.currentUser!.id);
  if (!user) throw new NotFoundError();

  const passwordsMatch = await Password.compare(user.password, password);
  if (!passwordsMatch)
    throw new BadRequestError(
      "Su contraseña actual no coincide con la ingresada",
      "password"
    );

  user.set({ password: newPassword });
  await user.save();

  res.json(user);
};
