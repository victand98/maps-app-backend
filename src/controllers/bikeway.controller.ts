import { Request, Response } from "express";
import { Bikeway} from "../models/Bikeway.model";

/**
 * Get all Bikeways.
 * @route GET /bikeway/all
 */
export const getBikeways = async (req: Request, res: Response) => {
  const bikeways = await Bikeway.find();
  return res.status(200).json({ bikeways });
};

/**
 * Save one bikeway.
 * @route POST /bikeway/save
 */
export const saveBikeway = async (req: Request, res: Response) => {
  const newBikeway = new Bikeway(req.body);
  await newBikeway.save();
  return res.json({ message: "La ciclovía se ha registrado con éxito", newBikeway });
};
