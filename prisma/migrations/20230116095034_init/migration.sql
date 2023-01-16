/*
  Warnings:

  - You are about to drop the `planets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "planets";

-- CreateTable
CREATE TABLE "planet" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "moon" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "planet_pkey" PRIMARY KEY ("id")
);
