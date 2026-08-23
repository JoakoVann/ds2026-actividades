import type { Libro } from '../generated/prisma/client';
import { prisma } from '../lib/prisma';

export const getAll = (): Promise<Libro[]> => prisma.libro.findMany({ orderBy: { id: 'asc' } });

export const getById = (id: number): Promise<Libro | null> => prisma.libro.findUnique({ where: { id } });

export const create = (data: Pick<Libro, 'titulo' | 'autor' | 'precio' | 'imagen' | 'disponible'>): Promise<Libro> =>
  prisma.libro.create({ data });

export const update = (
  id: number,
  data: Partial<Pick<Libro, 'titulo' | 'autor' | 'precio' | 'imagen' | 'disponible'>>,
): Promise<Libro> => prisma.libro.update({ where: { id }, data });

export const remove = (id: number): Promise<Libro> => prisma.libro.delete({ where: { id } });
