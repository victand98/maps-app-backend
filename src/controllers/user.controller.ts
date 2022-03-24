import { Request, Response } from "express";
import { NotFoundError } from "../helpers/errors";
import { User } from "../models";

/**
 * Get all users.
 * @route GET /user/
 */
export const all = async (req: Request, res: Response) => {
  const users = await User.find().populate("role");
  return res.json(users);
};

/**
 * Save one user.
 * @route POST /user/
 */
export const save = async (req: Request, res: Response) => {
  const user = User.build(req.body);
  await user.save();

  return res.status(201).json(user);
};

/**
 * Update one user.
 * @route PUT /user/:id
 */
export const update = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (!user) throw new NotFoundError();

  user.set(req.body);
  await user.save();

  res.json(user);
};
