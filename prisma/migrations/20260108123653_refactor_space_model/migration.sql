/*
  Migration: Refactor Space model
  - Create new space table with reference data
  - Create user_space association table
  - Migrate existing user spaces to new model
*/

-- Create new space table (reference data)
CREATE TABLE "space" (
    "id" TEXT NOT NULL,
    "type" "SpaceType" NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "space_pkey" PRIMARY KEY ("id")
);

-- Insert default spaces
INSERT INTO "space" ("id", "type", "label", "description") VALUES
    (gen_random_uuid()::text, 'public', 'Public', 'Espace pour les particuliers et visiteurs'),
    (gen_random_uuid()::text, 'locataire', 'Locataire', 'Espace pour les locataires'),
    (gen_random_uuid()::text, 'bailleur', 'Bailleur', 'Espace pour les propriétaires et bailleurs'),
    (gen_random_uuid()::text, 'commissionnaire', 'Commissionnaire', 'Espace pour les agents immobiliers et commissionnaires');

-- Create user_space association table
CREATE TABLE "user_space" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    "status" "SpaceStatus" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_space_pkey" PRIMARY KEY ("id")
);

-- Migrate existing user spaces to new model
INSERT INTO "user_space" ("id", "userId", "spaceId", "status", "createdAt", "updatedAt")
SELECT 
    gen_random_uuid()::text,
    "Space"."userId",
    "space"."id",
    "Space"."status",
    "Space"."createdAt",
    CURRENT_TIMESTAMP
FROM "Space"
INNER JOIN "space" ON "Space"."type" = "space"."type";

-- Add activeUserSpaceId column to user table
ALTER TABLE "user" ADD COLUMN "activeUserSpaceId" TEXT;

-- Migrate activeSpaceId to activeUserSpaceId
UPDATE "user" 
SET "activeUserSpaceId" = "user_space"."id"
FROM "Space"
INNER JOIN "user_space" ON "user_space"."userId" = "user"."id"
INNER JOIN "space" ON "user_space"."spaceId" = "space"."id" AND "Space"."type" = "space"."type"
WHERE "user"."activeSpaceId" = "Space"."id";

-- Drop old foreign keys
ALTER TABLE "Space" DROP CONSTRAINT IF EXISTS "Space_userId_fkey";
ALTER TABLE "user" DROP CONSTRAINT IF EXISTS "user_activeSpaceId_fkey";

-- Drop old activeSpaceId column
ALTER TABLE "user" DROP COLUMN "activeSpaceId";

-- Drop old Space table
DROP TABLE "Space";

-- CreateIndex
CREATE UNIQUE INDEX "space_type_key" ON "space"("type");

-- CreateIndex
CREATE INDEX "user_space_userId_idx" ON "user_space"("userId");

-- CreateIndex
CREATE INDEX "user_space_spaceId_idx" ON "user_space"("spaceId");

-- CreateIndex
CREATE UNIQUE INDEX "user_space_userId_spaceId_key" ON "user_space"("userId", "spaceId");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_activeUserSpaceId_fkey" FOREIGN KEY ("activeUserSpaceId") REFERENCES "user_space"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_space" ADD CONSTRAINT "user_space_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_space" ADD CONSTRAINT "user_space_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "space"("id") ON DELETE CASCADE ON UPDATE CASCADE;
