import { Autor } from '../types/autor';

const autores: Autor[] = [
  { id: 'a1', nombre: 'Gabriel', apellido: 'García Márquez', nacionalidad: 'Colombiana' },
  { id: 'a2', nombre: 'George', apellido: 'Orwell', nacionalidad: 'Británica' },
];

export const getAll = (): Autor[] => autores;

export const getById = (id: string): Autor | undefined => autores.find((a) => a.id === id);

export const create = (data: Omit<Autor, 'id'>): Autor => {
  const newAutor: Autor = { ...data, id: String(Date.now()) };
  autores.push(newAutor);
  return newAutor;
};

export const update = (id: string, data: Partial<Omit<Autor, 'id'>>): Autor | undefined => {
  const idx = autores.findIndex((a) => a.id === id);
  if (idx === -1) return undefined;
  autores[idx] = { ...autores[idx], ...data };
  return autores[idx];
};

export const remove = (id: string): boolean => {
  const idx = autores.findIndex((a) => a.id === id);
  if (idx === -1) return false;
  autores.splice(idx, 1);
  return true;
};
