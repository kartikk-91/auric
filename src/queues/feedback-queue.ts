import { Queue } from "bullmq";
import redis from "@/lib/redis";

export const feedbackQueue = new Queue("feedback", {
  connection: redis,
});
