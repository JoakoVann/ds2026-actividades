import express from 'express';
import cors from 'cors';
import librosRouter from './routes/librosRouter';
import autoresRouter from './routes/autoresRouter';
import authRouter from './routes/authRouter';
import { errorHandler } from './middlewares/errorHandler';
import { FRONTEND_URL } from './config/env';

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

app.use(express.json());

const allowedOrigins = FRONTEND_URL.split(',').map((origin) => origin.trim()).filter(Boolean);
app.use(cors({ origin: allowedOrigins, allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'] }));

app.use('/api/libros', librosRouter);
app.use('/api/autores', autoresRouter);
app.use('/api/auth', authRouter);
app.use((_req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
