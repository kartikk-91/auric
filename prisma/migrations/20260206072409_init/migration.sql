/*
  Warnings:

  - You are about to drop the column `date` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `sentiment` on the `Feedback` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "RatingType" AS ENUM ('OVERALL', 'CUSTOM');

-- CreateEnum
CREATE TYPE "InsightType" AS ENUM ('FEATURE', 'CRITICISM');

-- CreateEnum
CREATE TYPE "KnowledgeType" AS ENUM ('SUMMARY', 'FEATURE', 'ISSUE', 'TREND');

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "date",
DROP COLUMN "rating",
DROP COLUMN "sentiment",
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "feedbackId" TEXT NOT NULL,
    "type" "RatingType" NOT NULL,
    "label" TEXT,
    "value" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedbackAnalysis" (
    "id" TEXT NOT NULL,
    "feedbackId" TEXT NOT NULL,
    "sentiment" "Sentiment" NOT NULL,
    "sentimentScore" DOUBLE PRECISION NOT NULL,
    "auricImpact" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeedbackAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedbackInsight" (
    "id" TEXT NOT NULL,
    "feedbackId" TEXT NOT NULL,
    "type" "InsightType" NOT NULL,
    "label" TEXT NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeedbackInsight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrgMetrics" (
    "companyId" TEXT NOT NULL,
    "totalFeedbacks" INTEGER NOT NULL,
    "avgRating" DOUBLE PRECISION NOT NULL,
    "auricScore" DOUBLE PRECISION NOT NULL,
    "positiveCount" INTEGER NOT NULL,
    "neutralCount" INTEGER NOT NULL,
    "negativeCount" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrgMetrics_pkey" PRIMARY KEY ("companyId")
);

-- CreateTable
CREATE TABLE "OrgKnowledge" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "type" "KnowledgeType" NOT NULL,
    "content" TEXT NOT NULL,
    "embedding" DOUBLE PRECISION[],
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrgKnowledge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FeedbackAnalysis_feedbackId_key" ON "FeedbackAnalysis"("feedbackId");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackAnalysis" ADD CONSTRAINT "FeedbackAnalysis_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackInsight" ADD CONSTRAINT "FeedbackInsight_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgMetrics" ADD CONSTRAINT "OrgMetrics_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgKnowledge" ADD CONSTRAINT "OrgKnowledge_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
