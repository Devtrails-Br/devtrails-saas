/*
  Warnings:

  - You are about to drop the column `avatar_url` on the `organizations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "avatar_url",
ADD COLUMN     "logo_url" TEXT;
