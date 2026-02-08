export function calculateAuricImpact(
  rating: number,
  sentimentScore: number
): number {
 
  const ratingSignal = (rating - 3) / 2; 

  
  const sentimentSignal = Math.max(-1, Math.min(1, sentimentScore));

  let rawImpact =
    ratingSignal * 0.65 +
    sentimentSignal * 0.35;

  rawImpact = Math.tanh(rawImpact);

 
  const impact = Math.max(-1, Math.min(1, rawImpact));

  return Number(impact.toFixed(4));
}
