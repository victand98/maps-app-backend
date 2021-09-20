import { Request, Response } from "express";
import { PlaceType } from "../models/PlaceType.model";

/**
 * Get all place types.
 * @route GET /place-type/all
 */
export const getPlaceTypes = async (req: Request, res: Response) => {
  const placeTypes = await PlaceType.find();
  return res.status(200).json({ placeTypes });
};

/**
 * Save one place type.
 * @route POST /place-type/save
 */
export const savePlaceType = async (req: Request, res: Response) => {
  const newPlaceType = new PlaceType(req.body);
  await newPlaceType.save();
  return res.json({
    message: "El tipo de lugar se ha registrado con éxito.",
    newPlaceType,
  });
};
