export interface Feature {
    icon: string;
    title: string;
    description: string;
}

export interface PricingPlan {
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  buttonText: string;
  features: string[];
  highlighted?: boolean;
}
  