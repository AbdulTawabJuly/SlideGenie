import Stripe from "stripe"

// Initialize Stripe with the correct API version
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil", // Use the current stable API version
})
