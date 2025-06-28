"use server"

import { lemonSqueezyClient } from "@/lib/axios";
import { COIN_PACKAGES } from "@/lib/coinUtils";

export const buyCoinPackage = async (buyUserId: string, packageType: keyof typeof COIN_PACKAGES) => {
    try {
        const selectedPackage = COIN_PACKAGES[packageType];
        
        // Validate environment variables
        const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
        const storeId = process.env.LEMON_SQUEEZY_STORE_ID;
        const variantId = selectedPackage.variantId;
        
        if (!apiKey) {
            return { status: 500, error: "Missing LEMON_SQUEEZY_API_KEY" };
        }
        
        if (!storeId) {
            return { status: 500, error: "Missing LEMON_SQUEEZY_STORE_ID" };
        }
        
        if (!variantId) {
            return { status: 400, error: `Missing variant ID for package: ${packageType}` };
        }

        const requestPayload = {
            data: {
                type: "checkouts",
                attributes: {
                    custom_price: null,
                    product_options: {
                        redirect_url: `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard?purchase=success`,
                    },
                    checkout_data: {
                        custom: {
                            buyerUserId: buyUserId,
                            coinPackage: packageType,
                            coinsAmount: selectedPackage.coins.toString()
                        },
                    },
                },
                relationships: {
                    store: {
                        data: {
                            type: "stores",
                            id: storeId,
                        },
                    },
                    variant: {
                        data: {
                            type: "variants",
                            id: variantId,
                        }
                    }
                },
            },
        };
        
        console.log("📤 Request Payload:", JSON.stringify(requestPayload, null, 2));

        const res = await lemonSqueezyClient(apiKey).post("/checkouts", requestPayload);

        const checkoutUrl = res.data.data.attributes.url;
        console.log("✅ Checkout URL created:", checkoutUrl);
        return { url: checkoutUrl, status: 200 };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const errorResponse = (error as { response?: { status?: number; statusText?: string; data?: { errors?: unknown[] } } }).response;
        
        console.log("😶‍🌫️ Error details:", {
            message: errorMessage,
            status: errorResponse?.status,
            statusText: errorResponse?.statusText,
            data: errorResponse?.data,
            errors: errorResponse?.data?.errors,
        });
        
        // Log the full error details from Lemon Squeezy
        if (errorResponse?.data?.errors) {
            console.log("🚨 Lemon Squeezy Errors:");
            errorResponse.data.errors.forEach((err: unknown, index: number) => {
                console.log(`Error ${index + 1}:`, JSON.stringify(err, null, 2));
            });
        }
        
        return { status: 500, message: "Internal Server Error", error: errorResponse?.data || errorMessage }
    }
}



// Legacy function - keeping for backward compatibility
export const buySubscription = async (buyUserId: string) => {
    return await buyCoinPackage(buyUserId, "STARTER");
}