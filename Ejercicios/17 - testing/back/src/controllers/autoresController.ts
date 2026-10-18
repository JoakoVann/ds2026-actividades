import { Request, Response } from 'express';
import * as service from '../services/autoresService';

export const list = async (_req: Request, res: Response) => {
  const autores = await service.getAll();
  return res.json(autores);
};

export const getOne = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const autor = await service.getById(id);

  if (!autor) {
    return res.status(404).json({ message: 'Autor no encontrado' });
  }

  return res.json(autor);
};

export const create = async (req: Request, res: Response) => {
  const autor = await service.create(req.body);
  return res.status(201).json(autor);
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const autor = await service.update(id, req.body);
  return res.json(autor);
};

export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await service.remove(id);
  return res.status(204).send();
};
