import type { Autor } from '../generated/prisma/client';
import { prisma } from '../lib/prisma';

export const getAll = (): Promise<Autor[]> => prisma.autor.findMany({ orderBy: { id: 'asc' } });

export const getById = (id: number): Promise<Autor | null> => prisma.autor.findUnique({ where: { id } });

export const create = (data: Pick<Autor, 'nombre' | 'nacionalidad'>): Promise<Autor> =>
  prisma.autor.create({ data });

export const update = (
  id: number,
  data: Partial<Pick<Autor, 'nombre' | 'nacionalidad'>>,
): Promise<Autor> => prisma.autor.update({ where: { id }, data });

export const remove = (id: number): Promise<Autor> => prisma.autor.delete({ where: { id } });
