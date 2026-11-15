import bcrypt from 'bcrypt';
import { prisma } from '../src/config/prisma';

async function main() {
  const autores = await Promise.all([
    prisma.autor.upsert({
      where: { nombre: 'Gabriel García Márquez' },
      update: { nacionalidad: 'Colombia' },
      create: { nombre: 'Gabriel García Márquez', nacionalidad: 'Colombia' },
    }),
    prisma.autor.upsert({
      where: { nombre: 'George Orwell' },
      update: { nacionalidad: 'Reino Unido' },
      create: { nombre: 'George Orwell', nacionalidad: 'Reino Unido' },
    }),
    prisma.autor.upsert({
      where: { nombre: 'Antoine de Saint-Exupéry' },
      update: { nacionalidad: 'Francia' },
      create: { nombre: 'Antoine de Saint-Exupéry', nacionalidad: 'Francia' },
    }),
  ]);

  const categorias = await Promise.all([
    prisma.categoria.upsert({
      where: { nombre: 'Ficción' },
      update: {},
      create: { nombre: 'Ficción' },
    }),
    prisma.categoria.upsert({
      where: { nombre: 'Clásicos' },
      update: {},
      create: { nombre: 'Clásicos' },
    }),
    prisma.categoria.upsert({
      where: { nombre: 'Literatura' },
      update: {},
      create: { nombre: 'Literatura' },
    }),
  ]);

  const autorMap = Object.fromEntries(
    autores.map((autor: { id: number; nombre: string }) => [autor.nombre, autor]),
  );
  const categoriaMap = Object.fromEntries(
    categorias.map((categoria: { id: number; nombre: string }) => [categoria.nombre, categoria]),
  );

  const libros = [
    {
      titulo: 'Cien años de soledad',
      precio: 6200,
      imagen: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80',
      autor: 'Gabriel García Márquez',
      categorias: ['Ficción', 'Clásicos'],
    },
    {
      titulo: '1984',
      precio: 5400,
      imagen: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
      autor: 'George Orwell',
      categorias: ['Clásicos', 'Literatura'],
    },
    {
      titulo: 'El principito',
      precio: 4500,
      imagen: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
      autor: 'Antoine de Saint-Exupéry',
      categorias: ['Ficción', 'Literatura'],
    },
  ];

  for (const libro of libros) {
    const existing = await prisma.libro.findFirst({ where: { titulo: libro.titulo } });
    const data = {
      titulo: libro.titulo,
      precio: libro.precio,
      imagen: libro.imagen,
      disponible: true,
      autor: { connect: { id: autorMap[libro.autor].id } },
    };
    const categoriaIds = libro.categorias.map((nombre) => ({ id: categoriaMap[nombre].id }));

    if (existing) {
      await prisma.libro.update({
        where: { id: existing.id },
        data: { ...data, categorias: { set: categoriaIds } },
      });
    } else {
      await prisma.libro.create({
        data: { ...data, categorias: { connect: categoriaIds } },
      });
    }
  }

  const usuarios = [
    { email: 'admin@libreria.test', nombre: 'Admin', rol: 'ADMIN' as const, password: 'Admin1234' },
    { email: 'cliente@libreria.test', nombre: 'Cliente', rol: 'CLIENTE' as const, password: 'Cliente1234' },
  ];

  for (const { password, ...datos } of usuarios) {
    await prisma.usuario.upsert({
      where: { email: datos.email },
      update: {},
      create: { ...datos, passwordHash: await bcrypt.hash(password, 10) },
    });
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });