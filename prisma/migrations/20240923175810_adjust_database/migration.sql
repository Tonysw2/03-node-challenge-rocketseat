/*
  Warnings:

  - You are about to drop the column `neighbourhood` on the `orgs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `orgs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `neighborhood` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "neighbourhood",
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ALTER COLUMN "cep" SET DATA TYPE TEXT,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");
