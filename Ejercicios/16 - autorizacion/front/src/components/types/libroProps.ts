export interface Autor {
  id: number;
  nombre: string;
  nacionalidad: string;
}

export interface Categoria {
  id: number;
  nombre: string;
}

export interface Libro {
  id: number;
  titulo: string;
  precio: number;
  imagen: string;
  disponible: boolean;
  autor: Autor;
  categorias?: Categoria[];
}