import { Request, Response } from "express";
import { NotFoundError } from "../helpers/errors";
import { Role } from "../models";

/**
 * Get all roles.
 * @route GET /role/
 */
export const all = async (req: Request, res: Response) => {
  const roles = await Role.find();
  return res.json(roles);
};

/**
 * Get one role.
 * @route GET /role/:id
 */
export const one = async (req: Request, res: Response) => {
  const role = await Role.findById(req.params.id);
  if (!role) throw new NotFoundError();

  return res.json(role);
};

/**
 * Save one role.
 * @route POST /role/
 */
export const save = async (req: Request, res: Response) => {
  const role = Role.build(req.body);
  await role.save();

  return res.status(201).json(role);
};

/**
 * Update one role.
 * @route PUT /role/:id
 */
export const update = async (req: Request, res: Response) => {
  const role = await Role.findById(req.params.id);

  if (!role) throw new NotFoundError();

  role.set(req.body);
  await role.save();

  res.json(role);
};
