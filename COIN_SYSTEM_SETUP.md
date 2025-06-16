# 🪙 Coin System Setup Guide

## Environment Variables Required

Add these variables to your `.env.local` file:

```env
# Coin Package Variant IDs (Get these from Lemon Squeezy Dashboard)
STARTER_PACK_LEMON_SQUEEZY_VARIANT_ID="12345"     # Replace with actual variant ID
VALUE_PACK_LEMON_SQUEEZY_VARIANT_ID="12346"       # Replace with actual variant ID  
PRO_PACK_LEMON_SQUEEZY_VARIANT_ID="12347"         # Replace with actual variant ID

```

## Lemon Squeezy Dashboard Setup

### Step 1: Create Products

1. **Starter Pack (5 Coins)**
   - Name: `5 Coins - Starter Pack`
   - Price: `$2.00`
   - Description: `Get 5 coins to create presentations`

2. **Value Pack (12 Coins)**
   - Name: `12 Coins - Value Pack`
   - Price: `$5.00`
   - Description: `Get 12 coins (20% bonus!) - Best value`

3. **Pro Pack (25 Coins)**
   - Name: `25 Coins - Pro Pack`
   - Price: `$10.00`
   - Description: `Get 25 coins (25% bonus!) - For power users`



### Step 2: Copy Variant IDs

For each product:
1. Go to Product → Variants
2. Copy the Variant ID
3. Add to your environment variables

### Step 3: Update Webhook

1. Go to Webhooks in Lemon Squeezy
2. Update webhook events to include:
   - `order_created`
   - `subscription_payment_success`

## Coin Rate Calculation

- **Rate:** 1 coin = $0.40
- **Examples:**
  - $1.00 = 2.5 coins (rounded down to 2)
  - $2.00 = 5 coins
  - $5.00 = 12.5 coins (rounded down to 12)
  - $10.00 = 25 coins

## Database Migration

The system automatically:
1. Sets default coins to 5 (instead of 10)
2. Sets subscription default to false
3. Adds CoinTransaction model for tracking purchases

## Testing

1. Create a test product with $0.40 price
2. Make a test purchase
3. Check if coins are added to user account
4. Verify coin deduction works when creating presentations

## Production Checklist

- [ ] All variant IDs added to environment variables
- [ ] Webhook URL updated in Lemon Squeezy
- [ ] Database migration completed
- [ ] Test purchases working
- [ ] Coin deduction working
- [ ] Animation working in UI

## Error Resolution

### ✅ Server Actions Error Fixed
The `calculateCoinsFromAmount` function has been moved to `/src/lib/coinUtils.ts` to avoid the "Server Actions must be async functions" error. This utility function doesn't need to be a server action since it's just a calculation. 