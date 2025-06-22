// export const dynamic = "force-dynamic";
import crypto from "node:crypto";
import { NextRequest } from "next/server";
import { addCoins } from "@/actions/user";
import { calculateCoinsFromAmount } from "@/lib/coinUtils";

export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.text();
        const body = JSON.parse(rawBody);
        
        // Extract custom data
        const { buyerUserId, coinPackage, coinsAmount } = body.meta.custom_data;
        const orderTotal = body.data.attributes.total;
        const orderId = body.data.id;

        console.log("Webhook received:", { buyerUserId, coinPackage, coinsAmount, orderTotal });

        if (!buyerUserId) {
            throw new Error("Invalid buyerUserId or id doesn't exist");
        }

        // Verify webhook signature
        const hmac = crypto.createHmac("sha256", process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!);
        const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
        const signature = Buffer.from(req.headers.get("X-Signature") || "", "utf8");

        if (!crypto.timingSafeEqual(digest, signature)) {
            throw new Error("Signature mismatch");
        }

        // Check if this order has already been processed
        const { client } = await import("@/lib/prisma");
        const existingTransaction = await client.coinTransaction.findFirst({
            where: { lemonSqueezyOrderId: orderId },
        });

        if (existingTransaction) {
            console.log(`Order ${orderId} already processed`);
            return Response.json({
                message: "Order already processed",
                status: 200,
                data: {
                    userId: buyerUserId,
                    coinsAdded: existingTransaction.coins,
                    amountPaid: existingTransaction.amount,
                },
            });
        }

        // Calculate coins to add
        const coinsToAdd = parseInt(coinsAmount) || calculateCoinsFromAmount(orderTotal / 100);

        // Find user by Clerk ID
        const user = await client.user.findUnique({
            where: { id: buyerUserId },
            select: { id: true },
        });

        if (!user) {
            throw new Error(`User not found with Clerk ID: ${buyerUserId}`);
        }

        // Add coins to user account
        const result = await addCoins(user.id, coinsToAdd, orderTotal / 100, orderId);

        if (result.status !== 200) {
            return Response.json({
                message: "Failed to add coins to user account",
                status: result.status,
                error: result.error,
            });
        }

        console.log(`Successfully added ${coinsToAdd} coins to user ${buyerUserId}`);

        return Response.json({
            message: "Coins added successfully to user account",
            status: 200,
            data: {
                userId: user.id,
                coinsAdded: coinsToAdd,
                amountPaid: orderTotal / 100,
                totalCoins: result.user?.coins,
            },
        });

    } catch (error) {
        console.error("Error in webhook coin purchase route:", error);
        return Response.json({
            message: "Internal Server Error",
            status: 500,
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}
