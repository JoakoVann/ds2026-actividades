import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';
import { JWT_EXPIRES_IN, JWT_SECRET, SALT_ROUNDS } from '../config/env';
import type { Login, Registro } from '../validations/auth.validation';
import type { PayloadToken, UsuarioPublico } from '../types/usuarios.types';

export async function registrar(datos: Registro): Promise<UsuarioPublico> {
  const passwordHash = await bcrypt.hash(datos.password, SALT_ROUNDS);
  return prisma.usuario.create({
    data: { nombre: datos.nombre, email: datos.email, passwordHash },
    select: { id: true, email: true, nombre: true, rol: true },
  });
}

export async function findById(id: number): Promise<UsuarioPublico | null> {
  return prisma.usuario.findUnique({
    where: { id },
    select: { id: true, email: true, nombre: true, rol: true },
  });
}

export async function login(datos: Login): Promise<{ token: string; usuario: UsuarioPublico } | null> {
  const usuario = await prisma.usuario.findUnique({
    where: { email: datos.email },
    omit: { passwordHash: false },
  });
  if (!usuario) return null;

  const coincide = await bcrypt.compare(datos.password, usuario.passwordHash);
  if (!coincide) return null;

  const payload: PayloadToken = { id: usuario.id, rol: usuario.rol };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return {
    token,
    usuario: { id: usuario.id, email: usuario.email, nombre: usuario.nombre, rol: usuario.rol },
  };
}