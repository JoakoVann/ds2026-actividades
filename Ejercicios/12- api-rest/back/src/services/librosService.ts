import { Libro } from '../types/libro';

const libros: Libro[] = [
  {
    id: '1',
    titulo: 'El principito',
    autor: 'Antoine de Saint-Exupéry',
    imagen:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    titulo: '1984',
    autor: 'George Orwell',
    imagen:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    titulo: 'Cien años de soledad',
    autor: 'Gabriel García Márquez',
    imagen:
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80',
  },
];

export const getAll = (): Libro[] => libros;

export const getById = (id: string): Libro | undefined => libros.find((l) => l.id === id);

export const create = (data: Omit<Libro, 'id'>): Libro => {
  const newLibro: Libro = { ...data, id: String(Date.now()) };
  libros.push(newLibro);
  return newLibro;
};

export const update = (id: string, data: Partial<Omit<Libro, 'id'>>): Libro | undefined => {
  const idx = libros.findIndex((l) => l.id === id);
  if (idx === -1) return undefined;
  libros[idx] = { ...libros[idx], ...data };
  return libros[idx];
};

export const remove = (id: string): boolean => {
  const idx = libros.findIndex((l) => l.id === id);
  if (idx === -1) return false;
  libros.splice(idx, 1);
  return true;
};
