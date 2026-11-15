import type { Prisma } from '../generated/prisma/client';
import { prisma } from '../lib/prisma';

export type AutorConLibros = Prisma.AutorGetPayload<{ include: { libros: true } }>;

export const getAll = (): Promise<AutorConLibros[]> =>
  prisma.autor.findMany({
    include: { libros: true },
    orderBy: { id: 'asc' },
  });

export const getById = (id: number): Promise<AutorConLibros | null> =>
  prisma.autor.findUnique({
    where: { id },
    include: { libros: true },
  });

export const create = (data: Prisma.AutorCreateInput): Promise<AutorConLibros> =>
  prisma.autor.create({
    data,
    include: { libros: true },
  });

export const update = (id: number, data: Prisma.AutorUpdateInput): Promise<AutorConLibros> =>
  prisma.autor.update({
    where: { id },
    data,
    include: { libros: true },
  });

export const remove = (id: number): Promise<AutorConLibros> =>
  prisma.autor.delete({
    where: { id },
    include: { libros: true },
  });
