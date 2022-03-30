import { Request, Response } from "express";
import { NotFoundError } from "../helpers/errors";
import { Route } from "../models";

/**
 * Get all routes.
 * @route GET /route/
 */
export const all = async (req: Request, res: Response) => {
  const routes = await Route.find().select("-location").populate("user");
  return res.json(routes);
};

/**
 * Get all routes.
 * @route GET /route/me
 */
export const allMe = async (req: Request, res: Response) => {
  const routes = await Route.find({ user: req.currentUser!.id }).select(
    "-location"
  );
  return res.json(routes);
};

/**
 * Get one route.
 * @route GET /route/:id
 */
export const one = async (req: Request, res: Response) => {
  const route = await Route.findById(req.params.id).populate("user");
  if (!route) throw new NotFoundError();

  return res.json(route);
};

/**
 * Get current route per cyclist.
 * @route GET /route/current
 */
export const currentRoute = async (req: Request, res: Response) => {
  const route = await Route.findOne({
    user: req.currentUser!.id,
    location: { $exists: false },
  });
  return res.json(route);
};

/**
 * Save one route.
 * @route POST /route/
 */
export const save = async (req: Request, res: Response) => {
  const route = Route.build(req.body);
  await route.save();

  return res.status(201).json(route);
};

/**
 * Update one route.
 * @route PUT /route/:id
 */
export const update = async (req: Request, res: Response) => {
  const route = await Route.findById(req.params.id);

  if (!route) throw new NotFoundError();

  route.set(req.body);
  await route.save();

  res.json(route);
};
