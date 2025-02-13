/*
  Warnings:

  - You are about to drop the column `supplierId` on the `Product` table. All the data in the column will be lost.
  - The primary key for the `Supplier` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Supplier` table. All the data in the column will be lost.
  - Changed the type of `type` on the `IncomeExpense` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `suppliers` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('Income', 'Expense', 'Error');

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_supplierId_fkey";

-- AlterTable
ALTER TABLE "IncomeExpense" DROP COLUMN "type",
ADD COLUMN     "type" "TransactionType" NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "supplierId",
ADD COLUMN     "suppliers" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Supplier" DROP CONSTRAINT "Supplier_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Supplier_pkey" PRIMARY KEY ("suppliers");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_suppliers_fkey" FOREIGN KEY ("suppliers") REFERENCES "Supplier"("suppliers") ON DELETE CASCADE ON UPDATE CASCADE;
