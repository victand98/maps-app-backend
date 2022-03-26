import { Request, Response } from "express";
import { NotFoundError } from "../helpers/errors";
import { ParkingPoint, ParkingPointStand } from "../models";

/**
 * Get all parking points.
 * @route GET /parkingpoint/
 */
export const all = async (req: Request, res: Response) => {
  const parkingPoints = await ParkingPoint.find().populate("type");
  return res.json(parkingPoints);
};

/**
 * Get one parking point.
 * @route GET /parkingpoint/:id
 */
export const one = async (req: Request, res: Response) => {
  const parkingPoint = await ParkingPoint.findById(req.params.id).populate(
    "type"
  );
  if (!parkingPoint) throw new NotFoundError();

  const parkingPointStands = await ParkingPointStand.find({
    parkingPoint: parkingPoint.id,
  }).populate({
    path: "currentStandHistory",
    populate: {
      path: "user",
      select: "firstName lastName email status",
    },
    select: "entryTime user",
  });

  return res.json({ parkingPoint, parkingPointStands });
};

/**
 * Save one parking point.
 * @route POST /parkingpoint/
 */
export const save = async (req: Request, res: Response) => {
  const parkingPoint = ParkingPoint.build(req.body);
  await parkingPoint.save();

  return res.status(201).json(parkingPoint);
};

/**
 * Update one parking point.
 * @route PUT /parkingpoint/:id
 */
export const update = async (req: Request, res: Response) => {
  const parkingPoint = await ParkingPoint.findById(req.params.id);

  if (!parkingPoint) throw new NotFoundError();

  parkingPoint.set(req.body);
  await parkingPoint.save();

  res.json(parkingPoint);
};
