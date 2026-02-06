import { Sentiment } from "@prisma/client";

export async function analyzeSentiment(
  text?: string,
  _fields?: unknown
): Promise<{ sentiment: Sentiment; sentimentScore: number }> {
  if (!text || text.trim().length === 0) {
    return {
      sentiment: Sentiment.NEUTRAL,
      sentimentScore: 0,
    };
  }

  const lower = text.toLowerCase();

  let score = 0;

  if (
    lower.includes("love") ||
    lower.includes("great") ||
    lower.includes("excellent")
  ) {
    score += 0.6;
  }

  if (
    lower.includes("bad") ||
    lower.includes("poor") ||
    lower.includes("confusing")
  ) {
    score -= 0.6;
  }

 
  let sentiment: Sentiment = Sentiment.NEUTRAL;

  if (score > 0.25) sentiment = Sentiment.POSITIVE;
  if (score < -0.25) sentiment = Sentiment.NEGATIVE;

  return {
    sentiment,
    sentimentScore: Number(score.toFixed(2)),
  };
}
