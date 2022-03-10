import { Request, Response } from "express";
import { NotFoundError } from "../helpers/errors";
import { Bikeway } from "../models";

/**
 * Get all Bikeways.
 * @route GET /bikeway/
 */
export const all = async (req: Request, res: Response) => {
  const bikeways = await Bikeway.find();
  return res.json(bikeways);
};

/**
 * Get one Bikeway.
 * @route GET /bikeway/:id
 */
export const one = async (req: Request, res: Response) => {
  const bikeway = await Bikeway.findById(req.params.id);
  if (!bikeway) throw new NotFoundError();
  return res.json(bikeway);
};

/**
 * Save one bikeway.
 * @route POST /bikeway/
 */
export const save = async (req: Request, res: Response) => {
  const bikeway = Bikeway.build(req.body);
  await bikeway.save();

  return res.status(201).json(bikeway);
};

/**
 * Update one bikeway.
 * @route PUT /bikeway/:id
 */
export const update = async (req: Request, res: Response) => {
  const bikeway = await Bikeway.findById(req.params.id);

  if (!bikeway) throw new NotFoundError();

  bikeway.set(req.body);
  await bikeway.save();

  res.json(bikeway);
};
