"use server";

import { feedbackQueue } from "@/queues/feedback-queue";

export async function testQueue() {
    await feedbackQueue.add("analyze-feedback", {
        feedbackId: "cmlam94gn00035sa2pw1tonhy",
    });

    return { success: true };
}
