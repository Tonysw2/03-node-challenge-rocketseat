/*
  Warnings:

  - Added the required column `created_at` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL;
