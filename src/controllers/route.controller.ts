import { Request, Response } from "express";
import { parseAsync } from "json2csv";
import { NotFoundError } from "../helpers/errors";
import { Route, RouteDoc } from "../models";
import fs from "fs";
import path from "path";

/**
 * Get all routes.
 * @route GET /route/
 */
export const all = async (req: Request, res: Response) => {
  const routes = await Route.find()
    .select("-location")
    .sort({ createdAt: -1 })
    .populate("user");
  return res.json(routes);
};

/**
 * Get all routes.
 * @route GET /route/me
 */
export const allMe = async (req: Request, res: Response) => {
  const routes = await Route.find({ user: req.currentUser!.id })
    .select("-location")
    .sort({ createdAt: -1 });
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

export const downloadCSV = async (req: Request, res: Response) => {
  const routes = await Route.find().sort({ createdAt: -1 }).populate("user");

  const fields = [
    {
      label: "Usuario",
      value: "user",
    },
    {
      label: "Ruta",
      value: "ruta",
    },
    {
      label: "Nombre de la ruta",
      value: "name",
    },
    {
      label: "Fecha",
      value: "createdAt",
    },
    {
      label: "Hora de inicio",
      value: "startTime",
    },
    {
      label: "Hora fin",
      value: "endTime",
    },
    {
      label: "Propósito",
      value: "purpose",
    },
    {
      label: "Tipo de bicicleta",
      value: "bikeType",
    },
  ];
  const csv = await parseAsync(routes, {
    fields,
    transforms: [
      (item: RouteDoc) => {
        return {
          ...item,
          user: `${item.user.firstName} ${item.user.lastName}`,
          ruta: item.location
            ? JSON.stringify(item.location.coordinates)
            : "En progreso",
          name: item.name,
          createdAt: item.createdAt,
          startTime: item.startTime,
          endTime: item.endTime || "Por definir",
          purpose: item.purpose,
          bikeType: item.bikeType,
        };
      },
    ],
  });

  const publicPath = path.join(__dirname, "..", "public");
  const filePath: string = path.join(publicPath, "rutas.csv");
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath);
  }
  fs.writeFileSync(filePath, csv, { encoding: "utf-8" });

  res.download(filePath);
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
