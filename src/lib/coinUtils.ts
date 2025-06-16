// Coin calculation utilities

export const calculateCoinsFromAmount = (amount: number): number => {
    // 1 coin = $0.40, so coins = amount / 0.40
    return Math.floor(amount / 0.40);
};

export const calculateAmountFromCoins = (coins: number): number => {
    // 1 coin = $0.40
    return coins * 0.40;
};

export const COIN_RATE = 0.40; // $0.40 per coin

// Coin package configurations
export const COIN_PACKAGES = {
    STARTER: { coins: 5, price: 2.00, name: "Starter Pack", variantId: process.env.STARTER_PACK_LEMON_SQUEEZY_VARIANT_ID },
    VALUE: { coins: 12, price: 5.00, name: "Value Pack", variantId: process.env.VALUE_PACK_LEMON_SQUEEZY_VARIANT_ID },
    PRO: { coins: 25, price: 10.00, name: "Pro Pack", variantId: process.env.PRO_PACK_LEMON_SQUEEZY_VARIANT_ID }
}; 