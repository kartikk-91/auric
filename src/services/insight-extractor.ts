import { InsightType } from "@prisma/client";

export async function extractInsights(text?: string): Promise<
  {
    type: InsightType;
    label: string;
    confidence: number;
  }[]
> {
  if (!text) return [];

  const lower = text.toLowerCase();
  const insights = [];

  if (lower.includes("support")) {
    insights.push({
      type: InsightType.FEATURE,
      label: "Customer Support",
      confidence: 0.8,
    });
  }

  if (lower.includes("ui") || lower.includes("interface")) {
    insights.push({
      type: InsightType.CRITICISM,
      label: "User Interface",
      confidence: 0.75,
    });
  }

  if (lower.includes("pricing") || lower.includes("expensive")) {
    insights.push({
      type: InsightType.CRITICISM,
      label: "Pricing",
      confidence: 0.7,
    });
  }

  return insights;
}
