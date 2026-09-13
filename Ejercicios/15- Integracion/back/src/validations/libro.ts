import { z } from 'zod';

export const libroCreateSchema = z.object({
  titulo: z.string().trim().min(2, 'El título debe tener al menos 2 caracteres').max(200),
  precio: z.number({ invalid_type_error: 'El precio debe ser un número' }).int('El precio debe ser entero').positive('El precio debe ser positivo'),
  imagen: z.string().url('La imagen debe ser una URL válida'),
  disponible: z.boolean().optional().default(true),
  autorId: z.number({ invalid_type_error: 'El autorId debe ser un número' }).int().positive('El autorId debe ser válido'),
  categoriaIds: z.array(z.number({ invalid_type_error: 'Las categorías deben ser números' }).int().positive()).optional().default([]),
});

export const libroUpdateSchema = z.object({
  titulo: z.string().trim().min(2, 'El título debe tener al menos 2 caracteres').max(200).optional(),
  precio: z.number({ invalid_type_error: 'El precio debe ser un número' }).int('El precio debe ser entero').positive('El precio debe ser positivo').optional(),
  imagen: z.string().url('La imagen debe ser una URL válida').optional(),
  disponible: z.boolean().optional(),
  autorId: z.number({ invalid_type_error: 'El autorId debe ser un número' }).int().positive('El autorId debe ser válido').optional(),
  categoriaIds: z.array(z.number({ invalid_type_error: 'Las categorías deben ser números' }).int().positive()).optional(),
});
