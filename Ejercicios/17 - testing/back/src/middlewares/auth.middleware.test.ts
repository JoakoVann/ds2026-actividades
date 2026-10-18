import express, { type RequestHandler } from 'express';
import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import { authorize } from './auth.middleware';

describe('authorize', () => {
  it('continúa con el siguiente handler cuando el rol está autorizado', async () => {
    const downstream: RequestHandler = vi.fn((_req, res) => res.sendStatus(204));
    const app = express();

    app.get(
      '/admin',
      (req, _res, next) => {
        req.usuario = { id: 1, rol: 'ADMIN' };
        next();
      },
      authorize('ADMIN'),
      downstream,
    );

    await request(app).get('/admin').expect(204);
    expect(downstream).toHaveBeenCalledOnce();
  });
});
