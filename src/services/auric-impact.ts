export function calculateAuricImpact(
    rating: number,
    sentimentScore: number
  ): number {
    const ratingComponent = (rating / 5) * 0.6;
    const sentimentComponent = ((sentimentScore + 1) / 2) * 0.4;
  
    return Number((ratingComponent + sentimentComponent).toFixed(4));
  }
  