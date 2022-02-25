import { Request, Response } from "express";
import { NotFoundError } from "../helpers/errors";
import { ParkingPoint, ParkingPointAttrs } from "../models";
import { CustomRequest } from "../types";

/**
 * Get all parking points.
 * @route GET /parkingpoint/
 */
export const all = async (req: Request, res: Response) => {
  const parkingPoints = await ParkingPoint.find().populate("type");
  return res.json(parkingPoints);
};

/**
 * Save one parking point.
 * @route POST /parkingpoint/
 */
export const save = async (
  req: CustomRequest<ParkingPointAttrs>,
  res: Response
) => {
  const parkingPoint = ParkingPoint.build(req.body);
  await parkingPoint.save();

  return res.status(201).json(parkingPoint);
};

/**
 * Update one parking point.
 * @route PUT /parkingpoint/:id
 */
export const update = async (
  req: CustomRequest<ParkingPointAttrs>,
  res: Response
) => {
  const parkingPoint = await ParkingPoint.findById(req.params.id);

  if (!parkingPoint) throw new NotFoundError();

  parkingPoint.set(req.body);
  await parkingPoint.save();

  res.json(parkingPoint);
};
