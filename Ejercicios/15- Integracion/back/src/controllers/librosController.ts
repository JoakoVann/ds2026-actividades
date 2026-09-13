import { Request, Response } from 'express';
import * as service from '../services/librosService';

export const list = async (_req: Request, res: Response) => {
  const libros = await service.getAll();
  res.json(libros);
};

export const getOne = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const libro = await service.getById(id);

  if (!libro) {
    return res.status(404).json({ message: 'Libro no encontrado' });
  }

  return res.json(libro);
};

export const create = async (req: Request, res: Response) => {
  const { titulo, precio, imagen, disponible = true, autorId, categoriaIds = [] } = req.body;

  const nuevo = await service.create({
    titulo,
    precio,
    imagen,
    disponible,
    autor: { connect: { id: autorId } },
    categorias: categoriaIds.length > 0 ? { connect: categoriaIds.map((categoriaId: number) => ({ id: categoriaId })) } : undefined,
  });

  return res.status(201).json(nuevo);
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { titulo, precio, imagen, disponible, autorId, categoriaIds, ...rest } = req.body;

  const libroActualizado = await service.update(id, {
    ...rest,
    ...(titulo !== undefined && { titulo }),
    ...(precio !== undefined && { precio }),
    ...(imagen !== undefined && { imagen }),
    ...(disponible !== undefined && { disponible }),
    ...(autorId !== undefined && { autor: { connect: { id: autorId } } }),
    ...(categoriaIds !== undefined && { categorias: { set: categoriaIds.map((categoriaId: number) => ({ id: categoriaId })) } }),
  });

  return res.json(libroActualizado);
};

export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await service.remove(id);
  return res.status(204).send();
};
