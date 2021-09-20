import { Request, Response } from "express";
import { Place } from "../models/Place.model";

/**
 * Get all places.
 * @route GET /place/all
 */
export const getPlaces = async (req: Request, res: Response) => {
  const places = await Place.find().populate("placeType", "icon");
  return res.status(200).json({ places });
};

/**
 * Save one place.
 * @route POST /place/save
 */
export const savePlace = async (req: Request, res: Response) => {
  const newPlace = new Place(req.body);
  await newPlace.save();
  return res.json({ message: "El lugar se ha registrado con éxito", newPlace });
};
