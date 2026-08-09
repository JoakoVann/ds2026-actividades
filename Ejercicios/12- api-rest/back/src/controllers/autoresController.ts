import { Request, Response } from 'express';
import * as service from '../services/autoresService';

export const list = (_req: Request, res: Response) => {
  res.json(service.getAll());
};

export const getOne = (req: Request, res: Response) => {
  const { id } = req.params;
  const autor = service.getById(id);
  if (!autor) return res.status(404).json({ error: 'Autor no encontrado' });
  res.json(autor);
};

export const create = (req: Request, res: Response) => {
  const { nombre, apellido, nacionalidad } = req.body;
  if (!nombre) return res.status(400).json({ error: 'Falta el nombre' });
  const nuevo = service.create({ nombre, apellido, nacionalidad });
  res.status(201).json(nuevo);
};

export const update = (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const updated = service.update(id, data);
  if (!updated) return res.status(404).json({ error: 'Autor no encontrado' });
  res.json(updated);
};

export const remove = (req: Request, res: Response) => {
  const { id } = req.params;
  const ok = service.remove(id);
  if (!ok) return res.status(404).json({ error: 'Autor no encontrado' });
  res.status(204).send();
};
