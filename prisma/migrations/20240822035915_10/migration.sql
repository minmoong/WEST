/*
  Warnings:

  - You are about to drop the column `anonymous` on the `DeletedPost` table. All the data in the column will be lost.
  - You are about to drop the column `anonymous` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DeletedPost" DROP COLUMN "anonymous";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "anonymous";
