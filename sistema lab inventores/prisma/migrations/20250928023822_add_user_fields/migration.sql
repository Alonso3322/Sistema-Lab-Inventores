/*
  Warnings:

  - A unique constraint covering the columns `[codigo_estudiante]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `carrera` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigo_estudiante` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `carrera` VARCHAR(191) NOT NULL,
    ADD COLUMN `codigo_estudiante` VARCHAR(191) NOT NULL,
    ADD COLUMN `nombre` VARCHAR(191) NOT NULL,
    ADD COLUMN `rol` VARCHAR(191) NOT NULL DEFAULT 'USER',
    ADD COLUMN `telefono` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Impresion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `archivo` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `duracion` VARCHAR(191) NOT NULL,
    `impresora` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_codigo_estudiante_key` ON `User`(`codigo_estudiante`);

-- AddForeignKey
ALTER TABLE `Impresion` ADD CONSTRAINT `Impresion_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
