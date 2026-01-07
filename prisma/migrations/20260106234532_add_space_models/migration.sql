-- CreateEnum
CREATE TYPE "SpaceType" AS ENUM ('public', 'locataire', 'bailleur');

-- CreateEnum
CREATE TYPE "SpaceStatus" AS ENUM ('active', 'disabled');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "activeSpaceId" TEXT;

-- CreateTable
CREATE TABLE "Space" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "SpaceType" NOT NULL,
    "status" "SpaceStatus" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Space_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Space_userId_type_key" ON "Space"("userId", "type");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_activeSpaceId_fkey" FOREIGN KEY ("activeSpaceId") REFERENCES "Space"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
