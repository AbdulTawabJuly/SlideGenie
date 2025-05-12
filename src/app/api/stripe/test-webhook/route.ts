import { NextResponse } from "next/server"

export async function POST(req: Request) {
  console.log("Test webhook endpoint hit!")
  return NextResponse.json({ received: true })
}
