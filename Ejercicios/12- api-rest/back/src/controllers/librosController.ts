import { Request, Response } from 'express';
import * as service from '../services/librosService';

export const list = (_req: Request, res: Response) => {
  res.json(service.getAll());
};

export const getOne = (req: Request, res: Response) => {
  const { id } = req.params;
  const libro = service.getById(id);
  if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });
  res.json(libro);
};

export const create = (req: Request, res: Response) => {
  const { titulo, autor, imagen } = req.body;
  if (!titulo || !imagen) return res.status(400).json({ error: 'Faltan campos requeridos' });
  const nuevo = service.create({ titulo, autor, imagen });
  res.status(201).json(nuevo);
};

export const update = (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const updated = service.update(id, data);
  if (!updated) return res.status(404).json({ error: 'Libro no encontrado' });
  res.json(updated);
};

export const remove = (req: Request, res: Response) => {
  const { id } = req.params;
  const ok = service.remove(id);
  if (!ok) return res.status(404).json({ error: 'Libro no encontrado' });
  res.status(204).send();
};
