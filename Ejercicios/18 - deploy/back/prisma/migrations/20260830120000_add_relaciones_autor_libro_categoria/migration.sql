BEGIN;

-- CreateTable: Categoria
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- Convert the existing Libro.autor values into related Autor records.
INSERT INTO "Autor" ("nombre", "nacionalidad")
SELECT DISTINCT "autor", 'Desconocida'
FROM "Libro"
ON CONFLICT ("nombre") DO NOTHING;

ALTER TABLE "Libro" ADD COLUMN "autorId" INTEGER;

UPDATE "Libro" AS libro
SET "autorId" = autor."id"
FROM "Autor" AS autor
WHERE autor."nombre" = libro."autor";

ALTER TABLE "Libro" ALTER COLUMN "autorId" SET NOT NULL;
ALTER TABLE "Libro" DROP COLUMN "autor";

-- CreateTable: LibroCategoria
CREATE TABLE "LibroCategoria" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nombre_key" ON "Categoria"("nombre");

CREATE UNIQUE INDEX "LibroCategoria_AB_unique" ON "LibroCategoria"("A", "B");
CREATE INDEX "LibroCategoria_B_index" ON "LibroCategoria"("B");

-- AddForeignKey
ALTER TABLE "Libro"
ADD CONSTRAINT "Libro_autorId_fkey"
FOREIGN KEY ("autorId") REFERENCES "Autor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "LibroCategoria"
ADD CONSTRAINT "LibroCategoria_A_fkey"
FOREIGN KEY ("A") REFERENCES "Libro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "LibroCategoria"
ADD CONSTRAINT "LibroCategoria_B_fkey"
FOREIGN KEY ("B") REFERENCES "Categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT;
