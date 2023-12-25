-- CreateTable
CREATE TABLE "VerifyEmailPasscode" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passcode" TEXT NOT NULL,

    CONSTRAINT "VerifyEmailPasscode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VerifyEmailPasscode_email_key" ON "VerifyEmailPasscode"("email");
