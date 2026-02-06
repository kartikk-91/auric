"use server";

import { db } from "@/lib/db";
import { feedbackQueue } from "@/queues/feedback-queue";

export async function createTestFeedback() {
 
  const companyId = "cmlam8bog00015sa2gwzi1xkl";

 
  const feedback = await db.feedback.create({
    data: {
      companyId,
      name: "Test User",
      country: "India",
      state: "KA",
      text: "I love the product but the UI is a bit confusing",
      fields: {},
      ratings: {
        create: [
          { type: "OVERALL", value: 4 },
          { type: "CUSTOM", label: "Support", value: 5 },
          { type: "CUSTOM", label: "UI", value: 3 },
        ],
      },
    },
  });

 
  await feedbackQueue.add("analyze-feedback", {
    feedbackId: feedback.id,
  });

  return {
    feedbackId: feedback.id,
  };
}
