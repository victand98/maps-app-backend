import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../helpers/errors";
import { ParkingPointStand, StandHistory } from "../models";
import { ParkingPointStandStatus } from "../types";

/**
 * Get all parking point stands.
 * @route GET /parkingpointstand/
 */
export const all = async (req: Request, res: Response) => {
  const parkingPointStands = await ParkingPointStand.find().populate(
    "parkingPoint currentStandHistory"
  );
  return res.json(parkingPointStands);
};

/**
 * Get one parking point stand.
 * @route GET /parkingpointstand/:id
 */
export const one = async (req: Request, res: Response) => {
  const parkingPointStand = await ParkingPointStand.findById(
    req.params.id
  ).populate("parkingPoint currentStandHistory");
  if (!parkingPointStand) throw new NotFoundError();

  const standHistorial = await StandHistory.find({
    parkingPointStand: parkingPointStand.id,
  }).populate({ path: "user", select: "firstName lastName email status" });

  return res.json({ parkingPointStand, standHistorial });
};

/**
 * Save one parking point stand.
 * @route POST /parkingpointstand/
 */
export const save = async (req: Request, res: Response) => {
  const savedParkingPointStand = await ParkingPointStand.findOne({
    number: req.body.number,
    parkingPoint: req.body.parkingPoint,
  });
  if (savedParkingPointStand)
    throw new BadRequestError(
      `El espacio de estacionamiento ${savedParkingPointStand.number} ya se encuentra registrado`,
      "number"
    );

  const parkingPointStand = ParkingPointStand.build(req.body);
  await parkingPointStand.save();

  return res.status(201).json(parkingPointStand);
};

/**
 * Update one parking point stand.
 * @route PUT /parkingpointstand/:id
 */
export const update = async (req: Request, res: Response) => {
  const parkingPointStand = await ParkingPointStand.findById(req.params.id);
  if (!parkingPointStand) throw new NotFoundError();

  const { entryTime, exitTime, user, currentStandHistory, ...rest } = req.body;

  switch (req.body.status) {
    case ParkingPointStandStatus.occupied:
      if (currentStandHistory) {
        const savedStandHistory = await StandHistory.findById(
          currentStandHistory
        );
        if (!savedStandHistory) throw new NotFoundError();
        savedStandHistory.set({ entryTime, user });
        await savedStandHistory.save();
      } else {
        const standHistory = StandHistory.build({
          entryTime,
          user,
          parkingPointStand: parkingPointStand.id,
        });
        await standHistory.save();
        parkingPointStand.set({
          ...rest,
          currentStandHistory: standHistory.id,
        });
      }
      break;

    case ParkingPointStandStatus.unoccupied:
      if (currentStandHistory) {
        const savedStandHistory = await StandHistory.findById(
          currentStandHistory
        );
        if (!savedStandHistory) throw new NotFoundError();
        savedStandHistory.set({ exitTime });
        await savedStandHistory.save();
      }
      parkingPointStand.set({
        ...rest,
        currentStandHistory: null,
      });
      break;

    default:
      if (req.body.number && req.body.number !== parkingPointStand.number) {
        const savedParkingPointStand = await ParkingPointStand.findOne({
          number: req.body.number,
          parkingPoint: parkingPointStand.parkingPoint,
        });
        if (savedParkingPointStand)
          throw new BadRequestError(
            `El espacio de estacionamiento ${savedParkingPointStand.number} ya se encuentra registrado`,
            "number"
          );
      }
      parkingPointStand.set(req.body);
      break;
  }

  await parkingPointStand.save();

  res.json(parkingPointStand);
};
