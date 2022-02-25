import { Request, Response } from "express";
import { PlaceType, PlaceTypeAttrs } from "../models";
import { CustomRequest } from "../types";

/**
 * Get all place types.
 * @route GET /placetype/
 */
export const all = async (req: Request, res: Response) => {
  const placeTypes = await PlaceType.find();

  return res.json(placeTypes);
};

/**
 * Save one place type.
 * @route POST /placetype/
 */
export const save = async (
  req: CustomRequest<PlaceTypeAttrs>,
  res: Response
) => {
  const placeType = PlaceType.build(req.body);
  await placeType.save();

  return res.status(201).json(placeType);
};
