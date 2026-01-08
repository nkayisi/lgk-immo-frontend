-- AlterEnum: Add commissionnaire to SpaceType
ALTER TYPE "SpaceType" ADD VALUE IF NOT EXISTS 'commissionnaire';
