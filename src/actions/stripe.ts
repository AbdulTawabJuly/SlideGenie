'use server';

import Stripe from "stripe";

// Initialize Stripe with API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function createCheckoutSession(priceId: string, userId: string) {
  if (!priceId || !userId) {
    throw new Error("Missing required parameters");
  }

  try {
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard`,
      cancel_url: `${process.env.NEXT_PUBLIC_HOST_URL}/upgrade`,
      metadata: { userId },
    });

    return session.url;
  } catch (error) {
    console.error("Stripe checkout error:", error);
    throw new Error("Failed to create checkout session");
  }
}