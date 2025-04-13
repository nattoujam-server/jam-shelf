-- CreateTable
CREATE TABLE "Sku" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "warnThreshold" INTEGER NOT NULL DEFAULT 3,
    "dangerThreshold" INTEGER NOT NULL DEFAULT 1
);

-- CreateIndex
CREATE UNIQUE INDEX "Sku_name_key" ON "Sku"("name");
