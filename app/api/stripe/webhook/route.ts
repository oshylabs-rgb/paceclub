import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe/client";
import { createServiceRoleClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const stripe = getStripe();
  const signature = req.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "no signature" }, { status: 400 });

  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("stripe sig fail", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createServiceRoleClient();

  switch (event.type) {
    case "checkout.session.completed":
    case "customer.subscription.updated":
    case "customer.subscription.created": {
      const sub = event.data.object as Stripe.Checkout.Session | Stripe.Subscription;
      const clubId = (sub as any).metadata?.club_id;
      const plan = (sub as any).metadata?.plan === "yearly" ? "pro_annual" : "pro";
      if (clubId) {
        await supabase
          .from("clubs")
          .update({
            plan,
            stripe_subscription_id: (sub as any).subscription ?? (sub as Stripe.Subscription).id,
            current_period_end: (sub as Stripe.Subscription).current_period_end
              ? new Date((sub as Stripe.Subscription).current_period_end * 1000).toISOString()
              : null
          })
          .eq("id", clubId);
      }
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const clubId = (sub as any).metadata?.club_id;
      if (clubId) {
        await supabase.from("clubs").update({ plan: "free", stripe_subscription_id: null }).eq("id", clubId);
      }
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}

export const config = { runtime: "nodejs" };
