-- CreateEnum
CREATE TYPE "AirdropStatus" AS ENUM ('OPEN', 'UPCOMING', 'CLOSED', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "AirdropStage" AS ENUM ('TODO', 'IN_PROGRESS', 'COMPLETE');

-- CreateTable
CREATE TABLE "Airdrop" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "chain" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" "AirdropStatus" NOT NULL,
    "description" TEXT,
    "howTo" TEXT,
    "siteUrl" TEXT,
    "claimUrl" TEXT,
    "estValueUsd" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stage" "AirdropStage" NOT NULL DEFAULT 'TODO',
    "stepsTotal" INTEGER NOT NULL DEFAULT 0,
    "stepsDone" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Airdrop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AirdropTag" (
    "airdropId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "AirdropTag_pkey" PRIMARY KEY ("airdropId","tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Airdrop_slug_key" ON "Airdrop"("slug");

-- CreateIndex
CREATE INDEX "Airdrop_stage_idx" ON "Airdrop"("stage");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- AddForeignKey
ALTER TABLE "AirdropTag" ADD CONSTRAINT "AirdropTag_airdropId_fkey" FOREIGN KEY ("airdropId") REFERENCES "Airdrop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AirdropTag" ADD CONSTRAINT "AirdropTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
