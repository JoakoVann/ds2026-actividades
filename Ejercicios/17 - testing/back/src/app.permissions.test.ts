import jwt from 'jsonwebtoken';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import app from './app';
import { JWT_SECRET } from './config/env';

describe('matriz de permisos de libros', () => {
  it('rechaza con 403 a un cliente que intenta crear un libro', async () => {
    const token = jwt.sign({ id: 1, rol: 'CLIENTE' }, JWT_SECRET);

    const response = await request(app)
      .post('/api/libros')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ error: 'No tenés permiso para esta operación' });
  });
});
