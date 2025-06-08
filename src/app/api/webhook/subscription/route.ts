export const dynamic = "force-dynamic";
import crypto from "node:crypto";
import { client } from "@/lib/prisma";
import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.text();
        const body = JSON.parse(rawBody);
        const { buyerUserId } = body.meta.custom_data;

        if (!buyerUserId) {
            throw new Error("Invalid buyerUserId or id doesn't exist");
        }

        const hmac = crypto.createHmac("sha256", process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!);

        const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
        const signature = Buffer.from(req.headers.get("X-Signature") || "", "utf8");

        console.log("Signature:", signature);
        console.log("Digest:", digest);

        if (!crypto.timingSafeEqual(digest, signature)) {
            throw new Error("Signature mismatch");
        }

        const buyer = await client.user.update({
            where: { id: buyerUserId },
            data: {
                subscription: true,
            },
        })

        if (!buyer) {
            return Response.json({
                message: "Something went wrong while updating the user's subscription status",
                status: 404
            })
        }

        return Response.json({
            message: "User subscription status updated successfully",
            status: 200,
            data: buyer
        });
    } catch (error) {
        console.error("Error in webhook subscription route:", error);
        return Response.json({ message: "Internal Server Error", status: 500 });
    }
}