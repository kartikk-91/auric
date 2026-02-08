import { db } from "@/lib/db";
import { calculateOverallRating } from "./rating-calculator";
import { analyzeSentiment } from "./sentiment-analyzer";
import { calculateAuricImpact } from "./auric-impact";
import { extractInsights } from "./insight-extractor";
import { updateOrgMetrics } from "./metrics-updater";

export async function analyzeFeedback(feedbackId: string) {

  const feedback = await db.feedback.findUnique({
    where: { id: feedbackId },
    include: {
      ratings: true,
      analysis: true,
    },
  });

  if (!feedback) {
    throw new Error("Feedback not found");
  }


  if (feedback.analysis) {
    console.log("⚠️ Feedback already analyzed, skipping:", feedbackId);
    return;
  }


  const overallRating = calculateOverallRating(feedback.ratings);


  const sentimentResult = await analyzeSentiment(
    feedback.text!,
    feedback.fields,
    overallRating
  );



  const auricImpact = calculateAuricImpact(
    overallRating,
    sentimentResult.sentimentScore
  );


  await db.feedbackAnalysis.create({
    data: {
      feedbackId,
      sentiment: sentimentResult.sentiment,
      sentimentScore: sentimentResult.sentimentScore,
      auricImpact,
    },
  });


  const insights = await extractInsights(feedback.text!);

  if (insights.length > 0) {
    await db.feedbackInsight.createMany({
      data: insights.map((i) => ({
        feedbackId,
        type: i.type,
        label: i.label,
        confidence: i.confidence,
      })),
    });
  }


  await updateOrgMetrics({
    companyId: feedback.companyId,
    rating: overallRating,
    sentiment: sentimentResult.sentiment,
    auricImpact,
  });
}
