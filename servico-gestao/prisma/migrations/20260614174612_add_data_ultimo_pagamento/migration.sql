/*
  Warnings:

  - Added the required column `dataUltimoPagamento` to the `Assinatura` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assinatura" ADD COLUMN     "dataUltimoPagamento" TIMESTAMP(3) NOT NULL;
