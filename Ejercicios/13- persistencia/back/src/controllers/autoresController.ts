import { Request, Response } from 'express';
import * as service from '../services/autoresService';

export const list = async (_req: Request, res: Response) => {
  res.json(await service.getAll());
};

export const getOne = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(404).json({ error: 'Autor no encontrado' });
  const autor = await service.getById(id);
  if (!autor) return res.status(404).json({ error: 'Autor no encontrado' });
  res.json(autor);
};

export const create = async (req: Request, res: Response) => {
  const { nombre, nacionalidad } = req.body;
  if (!nombre || !nacionalidad) return res.status(400).json({ error: 'Faltan campos requeridos' });
  const nuevo = await service.create({ nombre, nacionalidad });
  res.status(201).json(nuevo);
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(404).json({ error: 'Autor no encontrado' });
  const data = req.body;
  try {
    const updated = await service.update(id, data);
    return res.json(updated);
  } catch {
    return res.status(404).json({ error: 'Autor no encontrado' });
  }
};

export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(404).json({ error: 'Autor no encontrado' });
  try {
    await service.remove(id);
    return res.status(204).send();
  } catch {
    return res.status(404).json({ error: 'Autor no encontrado' });
  }
};
