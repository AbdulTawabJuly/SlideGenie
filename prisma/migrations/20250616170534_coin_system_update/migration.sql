-- AlterTable
ALTER TABLE "User" ALTER COLUMN "subscription" SET DEFAULT false,
ALTER COLUMN "coins" SET DEFAULT 5;

-- CreateTable
CREATE TABLE "CoinTransaction" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "coins" INTEGER NOT NULL,
    "lemonSqueezyOrderId" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoinTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CoinTransaction" ADD CONSTRAINT "CoinTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
