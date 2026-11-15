-- CreateTable: Categoria
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Autor
CREATE TABLE "Autor" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "nacionalidad" TEXT NOT NULL,

    CONSTRAINT "Autor_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Libro
CREATE TABLE "Libro" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "precio" INTEGER NOT NULL,
    "imagen" TEXT NOT NULL,
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "autorId" INTEGER NOT NULL,

    CONSTRAINT "Libro_pkey" PRIMARY KEY ("id")
);

-- CreateTable: LibroCategoria
CREATE TABLE "LibroCategoria" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nombre_key" ON "Categoria"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Autor_nombre_key" ON "Autor"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "LibroCategoria_AB_unique" ON "LibroCategoria"("A", "B");

-- CreateIndex
CREATE INDEX "LibroCategoria_B_index" ON "LibroCategoria"("B");

-- AddForeignKey
ALTER TABLE "Libro"
ADD CONSTRAINT "Libro_autorId_fkey"
FOREIGN KEY ("autorId") REFERENCES "Autor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibroCategoria"
ADD CONSTRAINT "LibroCategoria_A_fkey"
FOREIGN KEY ("A") REFERENCES "Libro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibroCategoria"
ADD CONSTRAINT "LibroCategoria_B_fkey"
FOREIGN KEY ("B") REFERENCES "Categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;
