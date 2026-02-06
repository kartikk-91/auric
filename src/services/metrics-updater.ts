import { db } from "@/lib/db";
import { Sentiment } from "@prisma/client";

export async function updateOrgMetrics({
  companyId,
  rating,
  sentiment,
  auricImpact,
}: {
  companyId: string;
  rating: number;
  sentiment: Sentiment;
  auricImpact: number;
}) {
  await db.$transaction(async (tx) => {
    const existing = await tx.orgMetrics.findUnique({
      where: { companyId },
    });

    if (!existing) {
      await tx.orgMetrics.create({
        data: {
          companyId,
          totalFeedbacks: 1,
          avgRating: rating,
          auricScore: auricImpact,
          positiveCount: sentiment === "POSITIVE" ? 1 : 0,
          neutralCount: sentiment === "NEUTRAL" ? 1 : 0,
          negativeCount: sentiment === "NEGATIVE" ? 1 : 0,
        },
      });
      return;
    }

    const newTotal = existing.totalFeedbacks + 1;

    await tx.orgMetrics.update({
      where: { companyId },
      data: {
        totalFeedbacks: newTotal,
        avgRating:
          (existing.avgRating * existing.totalFeedbacks + rating) /
          newTotal,
        auricScore:
          (existing.auricScore * existing.totalFeedbacks + auricImpact) /
          newTotal,
        positiveCount:
          existing.positiveCount +
          (sentiment === "POSITIVE" ? 1 : 0),
        neutralCount:
          existing.neutralCount +
          (sentiment === "NEUTRAL" ? 1 : 0),
        negativeCount:
          existing.negativeCount +
          (sentiment === "NEGATIVE" ? 1 : 0),
      },
    });
  });
}
