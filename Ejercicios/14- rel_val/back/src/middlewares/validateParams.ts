import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { paramsSchema } from '../validations/params';

export const validateParams = (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = paramsSchema.parse(req.params);
    req.params.id = String(parsed.id);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Parámetros inválidos',
        errors: error.flatten().fieldErrors,
      });
    }

    return next(error);
  }
};
