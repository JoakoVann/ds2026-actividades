import bcrypt from 'bcrypt';
import { prisma } from '../src/config/prisma';

async function main() {
  await prisma.libro.deleteMany();
  await prisma.categoria.deleteMany();
  await prisma.autor.deleteMany();

  const autores = await Promise.all([
    prisma.autor.create({ data: { nombre: 'Gabriel García Márquez', nacionalidad: 'Colombia' } }),
    prisma.autor.create({ data: { nombre: 'George Orwell', nacionalidad: 'Reino Unido' } }),
    prisma.autor.create({ data: { nombre: 'Antoine de Saint-Exupéry', nacionalidad: 'Francia' } }),
  ]);

  const categorias = await Promise.all([
    prisma.categoria.create({ data: { nombre: 'Ficción' } }),
    prisma.categoria.create({ data: { nombre: 'Clásicos' } }),
    prisma.categoria.create({ data: { nombre: 'Literatura' } }),
  ]);

  const autorMap = Object.fromEntries(
    autores.map((autor: { id: number; nombre: string }) => [autor.nombre, autor]),
  );
  const categoriaMap = Object.fromEntries(
    categorias.map((categoria: { id: number; nombre: string }) => [categoria.nombre, categoria]),
  );

  await prisma.libro.create({
    data: {
      titulo: 'Cien años de soledad',
      precio: 6200,
      imagen: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80',
      disponible: true,
      autor: { connect: { id: autorMap['Gabriel García Márquez'].id } },
      categorias: { connect: [{ id: categoriaMap['Ficción'].id }, { id: categoriaMap['Clásicos'].id }] },
    },
  });

  await prisma.libro.create({
    data: {
      titulo: '1984',
      precio: 5400,
      imagen: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
      disponible: true,
      autor: { connect: { id: autorMap['George Orwell'].id } },
      categorias: { connect: [{ id: categoriaMap['Clásicos'].id }, { id: categoriaMap['Literatura'].id }] },
    },
  });

  await prisma.libro.create({
    data: {
      titulo: 'El principito',
      precio: 4500,
      imagen: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
      disponible: true,
      autor: { connect: { id: autorMap['Antoine de Saint-Exupéry'].id } },
      categorias: { connect: [{ id: categoriaMap['Ficción'].id }, { id: categoriaMap['Literatura'].id }] },
    },
  });

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