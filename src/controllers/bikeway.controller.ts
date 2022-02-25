import { Request, Response } from "express";
import { Bikeway, BikewayAttrs } from "../models";
import { CustomRequest } from "../types";

/**
 * Get all Bikeways.
 * @route GET /bikeway/
 */
export const all = async (req: Request, res: Response) => {
  const bikeways = await Bikeway.find();
  return res.json(bikeways);
};

/**
 * Save one bikeway.
 * @route POST /bikeway/
 */
export const save = async (req: CustomRequest<BikewayAttrs>, res: Response) => {
  const bikeway = Bikeway.build(req.body);
  await bikeway.save();

  return res.status(201).json(bikeway);
};
