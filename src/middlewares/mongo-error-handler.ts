import { NextFunction, Request, Response } from "express";
import { MongoError, MongoServerError } from "mongodb";
import mongoose from "mongoose";
import { CustomMongoError } from "../helpers/errors/custom-mongo-error";

export const MongoErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof MongoError || err instanceof mongoose.Error) {
    const mongoError = getMongoError(err);
    next(mongoError);
  }

  next(err);
};

const getMongoError = (err: MongoError | mongoose.Error): CustomMongoError => {
  console.log("[MONGO ERROR]", err);
  switch (err.constructor) {
    case MongoServerError: {
      const mongoServerError = err as MongoServerError;
      if (mongoServerError.code === 11000) {
        const field = Object.keys(mongoServerError.keyValue);
        return new CustomMongoError([
          {
            message: `El campo ya se encuentra registrado`,
            field: field[0],
          },
        ]);
      }
    }

    case mongoose.Error.ValidationError: {
      const mongoValidationError = err as mongoose.Error.ValidationError;
      let errors = Object.values(mongoValidationError.errors).map((el) => {
        const err = el as mongoose.Error.CastError;
        return {
          message: "El campo ingresado no es válido",
          field: err.path,
        };
      });
      return new CustomMongoError(errors);
    }
  }

  return new CustomMongoError([{ message: "Ha ocurrido un error inesperado" }]);
};
