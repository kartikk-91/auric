"use server";

import { db } from "@/lib/db";
import { feedbackQueue } from "@/queues/feedback-queue";
import { revalidatePath } from "next/cache";

type RatingInput = {
  type: "OVERALL" | "CUSTOM";
  label?: string;
  value: number;
};

export async function submitFeedback(input: {
  companyId: string;
  name?: string;
  country?: string;
  state?: string;
  text?: string;
  fields?: Record<string, unknown>;
  ratings: RatingInput[];
}) {
  const {
    companyId,
    name,
    country,
    state,
    text,
    fields = {},
    ratings,
  } = input;

 
  const feedback = await db.feedback.create({
    data: {
      companyId,
      name,
      country,
      state,
      text,
      fields,
      ratings: {
        createMany: {
          data: ratings,
        },
      },
    },
  });

 
  await feedbackQueue.add("analyze-feedback", {
    feedbackId: feedback.id,
  });

 
  revalidatePath("/dashboard");

  return { success: true };
}
