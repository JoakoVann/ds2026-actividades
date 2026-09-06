export interface Libro {
  id: string;
  titulo: string;
  autor: string;
  precio?: number;
  imagen: string;
  disponible?: boolean;
}