-- CreateEnum
CREATE TYPE "LikeType" AS ENUM ('LIKE', 'DISLIKE');

-- CreateEnum
CREATE TYPE "MealType" AS ENUM ('LUNCH', 'DINNER');

-- CreateTable
CREATE TABLE "MealLike" (
    "id" SERIAL NOT NULL,
    "mealType" "MealType" NOT NULL,
    "likeType" "LikeType" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "MealLike_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MealLike" ADD CONSTRAINT "MealLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
