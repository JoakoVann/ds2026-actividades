import type { Rol } from '../generated/prisma/client';

export type UsuarioPublico = {
  id: number;
  email: string;
  nombre: string;
  rol: Rol;
};

export type PayloadToken = {
  id: number;
  rol: Rol;
};