import { Request, Response } from 'express';
import * as service from '../services/librosService';

export const list = async (_req: Request, res: Response) => {
  res.json(await service.getAll());
};

export const getOne = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(404).json({ error: 'Libro no encontrado' });
  const libro = await service.getById(id);
  if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });
  res.json(libro);
};

export const create = async (req: Request, res: Response) => {
  const { titulo, autor, precio, imagen, disponible = true } = req.body;
  if (!titulo || !autor || !Number.isInteger(precio) || !imagen) {
    return res.status(400).json({ error: 'Faltan campos requeridos o precio inválido' });
  }
  const nuevo = await service.create({ titulo, autor, precio, imagen, disponible });
  res.status(201).json(nuevo);
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(404).json({ error: 'Libro no encontrado' });
  const data = req.body;
  try {
    const updated = await service.update(id, data);
    return res.json(updated);
  } catch {
    return res.status(404).json({ error: 'Libro no encontrado' });
  }
};

export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(404).json({ error: 'Libro no encontrado' });
  try {
    await service.remove(id);
    return res.status(204).send();
  } catch {
    return res.status(404).json({ error: 'Libro no encontrado' });
  }
};
