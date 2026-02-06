import { Rating } from "@prisma/client";

export function calculateOverallRating(ratings: Rating[]): number {
  if (!ratings || ratings.length === 0) {
    return 0;
  }

  const overall = ratings.find((r) => r.type === "OVERALL");
  if (overall) return overall.value;

  const sum = ratings.reduce((acc, r) => acc + r.value, 0);
  return Number((sum / ratings.length).toFixed(2));
}
