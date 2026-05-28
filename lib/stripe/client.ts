import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeClient) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY not set");
    }
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
      typescript: true
    });
  }
  return stripeClient;
}

export const STRIPE_PRICES = {
  proMonthly: process.env.STRIPE_PRICE_ID_PRO_MONTHLY ?? "",
  proYearly: process.env.STRIPE_PRICE_ID_PRO_YEARLY ?? ""
};
