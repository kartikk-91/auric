import SentimentLib from "sentiment";
import { Sentiment } from "@prisma/client";

const sentiment = new SentimentLib();

export async function analyzeSentiment(
  text?: string,
  _fields?: unknown,
  overallRating?: number
): Promise<{ sentiment: Sentiment; sentimentScore: number }> {
  if (!text || text.trim().length === 0) {
    return { sentiment: Sentiment.NEUTRAL, sentimentScore: 0 };
  }

  
  const result = sentiment.analyze(text);

  let score = Math.max(-1, Math.min(1, result.comparative));

  if (typeof overallRating === "number") {
    const ratingSignal = (overallRating - 3) / 2; 
    score = score * 0.7 + ratingSignal * 0.3;
  }

  
  let sentimentEnum: Sentiment = Sentiment.NEUTRAL;

  if (score > 0.15) sentimentEnum = Sentiment.POSITIVE;
  if (score < -0.15) sentimentEnum = Sentiment.NEGATIVE;

  return {
    sentiment: sentimentEnum,
    sentimentScore: Number(score.toFixed(3)),
  };
}
