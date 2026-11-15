BEGIN;

CREATE TABLE "_LibroCategoria" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_LibroCategoria_AB_pkey" PRIMARY KEY ("A", "B")
);

INSERT INTO "_LibroCategoria" ("A", "B")
SELECT "B", "A"
FROM "LibroCategoria"
ON CONFLICT ("A", "B") DO NOTHING;

DROP TABLE "LibroCategoria";

CREATE INDEX "_LibroCategoria_B_index" ON "_LibroCategoria"("B");

ALTER TABLE "_LibroCategoria"
ADD CONSTRAINT "_LibroCategoria_A_fkey"
FOREIGN KEY ("A") REFERENCES "Categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "_LibroCategoria"
ADD CONSTRAINT "_LibroCategoria_B_fkey"
FOREIGN KEY ("B") REFERENCES "Libro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT;
