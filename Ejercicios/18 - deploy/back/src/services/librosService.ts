import type { Prisma } from '../generated/prisma/client';
import { prisma } from '../lib/prisma';

const libroConAutor = {
  include: {
    autor: true,
  },
} as const;

const libroDetalle = {
  include: {
    autor: true,
    categorias: true,
  },
} as const;

export type LibroConAutor = Prisma.LibroGetPayload<typeof libroConAutor>;
export type LibroDetalle = Prisma.LibroGetPayload<typeof libroDetalle>;

export const getAll = (): Promise<LibroConAutor[]> =>
  prisma.libro.findMany({
    ...libroConAutor,
    orderBy: { id: 'asc' },
  });

export const getById = (id: number): Promise<LibroDetalle | null> =>
  prisma.libro.findUnique({
    where: { id },
    ...libroDetalle,
  });

export const create = (data: Prisma.LibroCreateInput): Promise<LibroDetalle> =>
  prisma.libro.create({
    data,
    ...libroDetalle,
  });

export const update = (id: number, data: Prisma.LibroUpdateInput): Promise<LibroDetalle> =>
  prisma.libro.update({
    where: { id },
    data,
    ...libroDetalle,
  });

export const remove = (id: number): Promise<LibroDetalle> =>
  prisma.libro.delete({
    where: { id },
    ...libroDetalle,
  });
