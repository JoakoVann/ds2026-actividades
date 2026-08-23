import { prisma } from '../src/config/prisma';

async function main() {
  await prisma.libro.deleteMany();
  await prisma.autor.deleteMany();

  await prisma.autor.createMany({
    data: [
      { nombre: 'Gabriel García Márquez', nacionalidad: 'Colombia' },
      { nombre: 'George Orwell', nacionalidad: 'Reino Unido' },
      { nombre: 'Antoine de Saint-Exupéry', nacionalidad: 'Francia' },
    ],
  });

  await prisma.libro.createMany({
    data: [
      {
        titulo: 'Cien años de soledad',
        autor: 'Gabriel García Márquez',
        precio: 6200,
        imagen: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80',
        disponible: true,
      },
      {
        titulo: '1984',
        autor: 'George Orwell',
        precio: 5400,
        imagen: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
        disponible: true,
      },
      {
        titulo: 'El principito',
        autor: 'Antoine de Saint-Exupéry',
        precio: 4500,
        imagen: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
        disponible: true,
      },
    ],
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });