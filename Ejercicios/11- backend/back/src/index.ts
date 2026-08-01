import express, { type Request, type Response, type NextFunction } from 'express';

interface Libro {
  id: string;
  titulo: string;
  autor: string;
  imagen: string;
}

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const libros: Libro[] = [
  {
    id: '1',
    titulo: 'El principito',
    autor: 'Antoine de Saint-Exupéry',
    imagen: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    titulo: '1984',
    autor: 'George Orwell',
    imagen: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    titulo: 'Cien años de soledad',
    autor: 'Gabriel García Márquez',
    imagen: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80',
  },
];

app.get('/libros', (_req: Request, res: Response) => {
  res.json(libros);
});

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
