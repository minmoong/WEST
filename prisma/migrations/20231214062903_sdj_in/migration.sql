/*
  Warnings:

  - You are about to drop the column `likeType` on the `MealLike` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `MealLike` table. All the data in the column will be lost.
  - Added the required column `count` to the `MealLike` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MealLike" DROP CONSTRAINT "MealLike_userId_fkey";

-- AlterTable
ALTER TABLE "MealLike" DROP COLUMN "likeType",
DROP COLUMN "userId",
ADD COLUMN     "count" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "LikeType";
