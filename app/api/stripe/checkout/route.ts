import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getStripe, STRIPE_PRICES } from "@/lib/stripe/client";

const Input = z.object({
  clubId: z.string().uuid(),
  plan: z.enum(["monthly", "yearly"])
});

export async function POST(req: Request) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const json = await req.json();
  const parsed = Input.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { data: club } = await supabase
    .from("clubs")
    .select("id, name, stripe_customer_id, created_by")
    .eq("id", parsed.data.clubId)
    .maybeSingle();
  if (!club) return NextResponse.json({ error: "Club not found" }, { status: 404 });

  const { data: membership } = await supabase
    .from("club_members")
    .select("role")
    .eq("club_id", club.id)
    .eq("profile_id", user.id)
    .maybeSingle();
  if (!membership || !["owner", "organizer"].includes(membership.role)) {
    return NextResponse.json({ error: "Only organizers can upgrade a club" }, { status: 403 });
  }

  const stripe = getStripe();

  let customerId = club.stripe_customer_id;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email ?? undefined,
      metadata: { club_id: club.id }
    });
    customerId = customer.id;
    await supabase.from("clubs").update({ stripe_customer_id: customerId }).eq("id", club.id);
  }

  const priceId = parsed.data.plan === "yearly" ? STRIPE_PRICES.proYearly : STRIPE_PRICES.proMonthly;
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=0`,
    metadata: { club_id: club.id, plan: parsed.data.plan }
  });

  return NextResponse.json({ url: session.url });
}
