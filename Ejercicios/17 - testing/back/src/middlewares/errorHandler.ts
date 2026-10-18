import type { NextFunction, Request, Response } from 'express';

type PrismaErrorLike = {
  code: string;
  meta?: unknown;
  message: string;
};

const isPrismaError = (error: unknown): error is PrismaErrorLike =>
  Boolean(
    error &&
      typeof error === 'object' &&
      'code' in error &&
      typeof (error as { code?: unknown }).code === 'string' &&
      'message' in error,
  );

export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (isPrismaError(error)) {
    switch (error.code) {
      case 'P2002':
        return res.status(409).json({
          message: 'Ya existe un registro con esos datos únicos.',
          error: error.meta ?? error.message,
        });
      case 'P2025':
        return res.status(404).json({
          message: 'Registro no encontrado.',
          error: error.meta ?? error.message,
        });
      case 'P2003':
        return res.status(400).json({
          message: 'La relación referenciada no existe.',
          error: error.meta ?? error.message,
        });
      default:
        return res.status(500).json({
          message: 'Error interno del servidor',
          error: error.message,
        });
    }
  }

  if (error instanceof Error) {
    return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }

  return res.status(500).json({ message: 'Error interno del servidor' });
};
