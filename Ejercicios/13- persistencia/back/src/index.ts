import express from 'express';
import librosRouter from './routes/librosRouter';
import autoresRouter from './routes/autoresRouter';

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api/libros', librosRouter);
app.use('/api/autores', autoresRouter);

app.listen(PORT, () => {
  // sólo levanta el servidor y monta routers
  // no datos ni lógica aquí
  // eslint-disable-next-line no-console
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
