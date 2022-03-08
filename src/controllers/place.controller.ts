import { Request, Response } from "express";
import { NotFoundError } from "../helpers/errors";
import { Place, PlaceAttrs } from "../models";
import { CustomRequest } from "../types";

/**
 * Get all places.
 * @route GET /place/
 */
export const all = async (req: Request, res: Response) => {
  const places = await Place.find().populate("type");
  return res.json(places);
};

/**
 * Get one place.
 * @route GET /place/:id
 */
export const one = async (req: Request, res: Response) => {
  const place = await Place.findById(req.params.id).populate("type");

  if (!place) throw new NotFoundError();

  res.json(place);
};

/**
 * Save one place.
 * @route POST /place/
 */
export const save = async (req: CustomRequest<PlaceAttrs>, res: Response) => {
  const place = Place.build(req.body);
  await place.save();

  return res.status(201).json(place);
};

/**
 * Update one place.
 * @route PUT /place/:id
 */
export const update = async (req: Request, res: Response) => {
  const place = await Place.findById(req.params.id);

  if (!place) throw new NotFoundError();

  place.set(req.body);
  await place.save();

  res.json(place);
};

/**
 * Remove one place.
 * @route DELETE /place/:id
 */
export const remove = async (req: CustomRequest<PlaceAttrs>, res: Response) => {
  const place = await Place.findById(req.params.id);

  if (!place) throw new NotFoundError();

  await place.remove();

  res.status(202).json(place);
};
