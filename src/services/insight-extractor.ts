/* eslint-disable @typescript-eslint/no-explicit-any */
import winkNLP from "wink-nlp";
import model from "wink-eng-lite-web-model";
import { InsightType } from "@prisma/client";
import Sentiment from "sentiment";

const nlp = winkNLP(model);
const its = nlp.its;
const as = nlp.as;
const sentiment = new Sentiment();

type Insight = {
  type: InsightType;
  label: string;
  confidence: number;
};

export async function extractInsights(text?: string): Promise<Insight[]> {
  if (!text || text.trim().length === 0) return [];

  const doc = nlp.readDoc(text);
  const insightsMap = new Map<string, Insight>();

 
  doc.sentences().each((sentence: any) => {
    const sentenceText = sentence.out('text');

   
    const sent = sentiment.analyze(sentenceText);
    const polarity = sent.comparative;

   
    if (Math.abs(polarity) < 0.15) return;

   
    sentence
      .tokens()
      .filter((t:any) => t.out(its.pos) === "NOUN")
      .out(as.array)
      .forEach((token: any) => {
        const label = normalizeLabel(token.out(its.lemma));

        if (!label || label.length < 3) return;

        const type =
          polarity > 0
            ? InsightType.FEATURE
            : InsightType.CRITICISM;

        const confidence = Math.min(
          1,
          Math.abs(polarity) + token.out(its.tf) * 0.1
        );

        
        if (!insightsMap.has(label)) {
          insightsMap.set(label, {
            type,
            label,
            confidence: Number(confidence.toFixed(2)),
          });
        }
      });
  });

  return Array.from(insightsMap.values());
}


function normalizeLabel(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .trim();
}
