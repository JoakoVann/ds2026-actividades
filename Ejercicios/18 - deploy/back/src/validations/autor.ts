import { z } from 'zod';

export const autorCreateSchema = z.object({
  nombre: z.string().trim().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
  nacionalidad: z.string().trim().min(2, 'La nacionalidad es obligatoria').max(100),
});

export const autorUpdateSchema = autorCreateSchema.partial();
