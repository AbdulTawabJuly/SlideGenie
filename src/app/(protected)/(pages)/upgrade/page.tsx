"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const plans = [
  {
    id: "monthly",
    name: "Monthly Plan",
    description: "Perfect for individuals",
    price: 10,
    features: ["Unlimited slides", "Premium templates", "AI generation"],
    priceId: "price_1RNdOPRoaFE2CnrxPft5ezbE", // Replace with your actual Stripe Price ID
  },
  {
    id: "yearly",
    name: "Yearly Plan",
    description: "Save 16% compared to monthly",
    price: 100,
    features: [
      "Everything in Monthly",
      "Priority support",
      "Early access to new features",
    ],
    priceId: "price_1RNdP3RoaFE2Cnrx36X0DFY0", // Replace with your actual Stripe Price ID
  },
];

export default function UpgradePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (priceId: string, planName: string) => {
    try {
      setLoading(priceId);

      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Error",
        description: "Failed to process checkout. Please try again.",
        variant: "destructive",
      });
      setLoading(null);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">
          Upgrade Your SlideGenie Experience
        </h1>
        <p className="text-muted-foreground">
          Choose the plan that works best for you and unlock premium features
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className="flex flex-col h-full border-2 hover:border-primary/50 transition-all"
          >
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-6">
                <p className="text-4xl font-bold">
                  ${plan.price}
                  <span className="text-lg font-normal text-muted-foreground">
                    /{plan.id === "monthly" ? "month" : "year"}
                  </span>
                </p>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full py-6"
                onClick={() => handleCheckout(plan.priceId, plan.name)}
                disabled={loading !== null}
              >
                {loading === plan.priceId ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Subscribe to ${plan.name}`
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-center text-sm text-muted-foreground">
        <p>
          All plans include a 14-day money-back guarantee. No questions asked.
        </p>
      </div>
    </div>
  );
}
