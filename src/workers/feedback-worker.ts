import "dotenv/config";
import { Worker } from "bullmq";
import redis from "@/lib/redis";
import { analyzeFeedback } from "@/services/analyze-feedback";

const worker = new Worker(
  "feedback",
  async (job) => {
    const { feedbackId } = job.data;

    if (!feedbackId) {
      throw new Error("feedbackId missing in job data");
    }

    console.log("🟢 Analyzing feedback:", feedbackId);

    await analyzeFeedback(feedbackId);
  },
  {
    connection: redis,
  }
);

worker.on("completed", (job) => {
  console.log("✅ Feedback analyzed:", job.data.feedbackId);
});

worker.on("failed", (job, err) => {
  console.error(
    "❌ Feedback analysis failed:",
    job?.data?.feedbackId,
    err
  );
});
