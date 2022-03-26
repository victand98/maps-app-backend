import { Request, Response } from "express";
import { NotFoundError } from "../helpers/errors";
import { StandHistory } from "../models";

/**
 * Get all stand histories.
 * @route GET /standhistory/
 */
export const all = async (req: Request, res: Response) => {
  const standHistorys = await StandHistory.find().populate([
    {
      path: "parkingPointStand",
      populate: "parkingPoint",
      select: "parkingPoint number",
    },
    {
      path: "user",
    },
  ]);
  return res.json(standHistorys);
};

/**
 * Get one stand history.
 * @route GET /standhistory/:id
 */
export const one = async (req: Request, res: Response) => {
  const standHistory = await StandHistory.findById(req.params.id).populate([
    {
      path: "parkingPointStand",
      populate: "parkingPoint",
      select: "parkingPoint number",
    },
    {
      path: "user",
    },
  ]);
  if (!standHistory) throw new NotFoundError();

  return res.json(standHistory);
};

/**
 * Save one stand history.
 * @route POST /standhistory/
 */
export const save = async (req: Request, res: Response) => {
  const standHistory = StandHistory.build(req.body);
  await standHistory.save();

  return res.status(201).json(standHistory);
};

/**
 * Update one stand history.
 * @route PUT /standhistory/:id
 */
export const update = async (req: Request, res: Response) => {
  const standHistory = await StandHistory.findById(req.params.id);

  if (!standHistory) throw new NotFoundError();

  standHistory.set(req.body);
  await standHistory.save();

  res.json(standHistory);
};
