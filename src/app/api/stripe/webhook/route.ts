import { NextResponse } from "next/server"
import Stripe from "stripe"
import { PrismaClient } from "@prisma/client"
import { headers } from "next/headers"

const prisma = new PrismaClient()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil", // Use the current stable API version
})

// Disable body parsing for the webhook route
export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(req: Request) {
  const body = await req.text()
const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (error: any) {
    console.error(`Webhook signature verification failed: ${error.message}`)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.userId

    if (userId) {
      try {
        // Update the user's subscription status
        await prisma.user.update({
          where: { id: userId },
          data: { subscription: true },
        })
        console.log(`Updated subscription for user ${userId}`)
      } catch (error) {
        console.error("Failed to update user subscription:", error)
        return NextResponse.json({ error: "Database update failed" }, { status: 500 })
      }
    }
  }

  return NextResponse.json({ received: true })
}
