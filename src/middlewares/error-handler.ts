import { NextFunction, Request, Response } from "express";
import { CustomError } from "../helpers/errors/custom-error";
import log from "../helpers/logger";

export const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  log.error(err);

  if (err instanceof CustomError)
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });

  res.status(400).json({
    errors: [{ message: "¡Algo ha salido mal!" }],
  });
};
