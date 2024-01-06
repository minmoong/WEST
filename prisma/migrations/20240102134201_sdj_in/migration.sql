/*
  Warnings:

  - You are about to drop the `VerifyEmailPasscode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "VerifyEmailPasscode";

-- CreateTable
CREATE TABLE "Passcode" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passcode" TEXT NOT NULL,

    CONSTRAINT "Passcode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Passcode_email_key" ON "Passcode"("email");
