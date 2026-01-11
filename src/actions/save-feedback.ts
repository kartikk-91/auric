"use server";
import { db } from "@/lib/db";

export async function saveFeedback(feedbackData: {
  name: string;
  state: string;
  country: string;
  text: string;
  questions: { id: string; label: string; rating: number | null }[];
  companyId: string;
}) {
  try {
    const overall = feedbackData.questions.find(
      (q) => q.label.toLowerCase() === "overall satisfaction"
    );
    const overallRating = overall?.rating ?? 0;

    const feedback = await db.feedback.create({
      data: {
        name: feedbackData.name,
        state: feedbackData.state,
        country: feedbackData.country,
        text: feedbackData.text,
        rating: overallRating,
        sentiment: "NEUTRAL", 
        fields: feedbackData.questions, 
        companyId: feedbackData.companyId,
      },
    });

    return { success: true, feedback };
  } catch (err) {
    console.error("Error saving feedback:", err);
    return { success: false, error: "Failed to save feedback" };
  }
}
