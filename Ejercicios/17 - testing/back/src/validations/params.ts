import { z } from 'zod';

export const paramsSchema = z.object({
  id: z.coerce.number({ invalid_type_error: 'El id debe ser un número' }).int('El id debe ser entero').positive('El id debe ser positivo'),
});
