import { describe, expect, it } from 'vitest';
import { libroCreateSchema } from './libro';

describe('libroCreateSchema', () => {
  it('acepta los datos válidos de un libro', () => {
    const result = libroCreateSchema.safeParse({
      titulo: 'El Principito',
      precio: 1200,
      imagen: 'https://example.com/libro.jpg',
      autorId: 1,
    });

    expect(result.success).toBe(true);
  });

  it('rechaza un precio que no sea positivo', () => {
    const result = libroCreateSchema.safeParse({
      titulo: 'El Principito',
      precio: 0,
      imagen: 'https://example.com/libro.jpg',
      autorId: 1,
    });

    expect(result.success).toBe(false);
  });
});
