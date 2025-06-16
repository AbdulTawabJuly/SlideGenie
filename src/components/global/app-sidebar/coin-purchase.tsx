"use client";

import { buyCoinPackage } from "@/actions/lemonSqueezy";
import { COIN_PACKAGES } from "@/lib/coinUtils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Coins } from "lucide-react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const CoinPurchase = ({ prismaUser }: { prismaUser: User }) => {
  const [loading, setLoading] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handlePackagePurchase = async (packageType: keyof typeof COIN_PACKAGES) => {
    setLoading(packageType);
    try {
      const res = await buyCoinPackage(prismaUser.id, packageType);
      if (res.status !== 200) {
        throw new Error("Failed to initiate coin purchase");
      }
      router.push(res.url);
    } catch (error) {
      console.error(error);
      toast.error("Error", {
        description: "Failed to initiate coin purchase. Please try again later.",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full border-vivid bg-background-80 hover:bg-background-90 text-primary rounded-full font-bold"
          variant={"default"}
          size={"lg"}
        >
          <Coins className="mr-2 h-4 w-4" />
          Buy Coins
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-vivid" />
            Purchase Coins
          </DialogTitle>
          <DialogDescription>
            Choose from our coin packages to power your presentations.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid gap-3">
            {Object.entries(COIN_PACKAGES).map(([key, pkg]) => (
              <div
                key={key}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <div>
                  <div className="font-medium">{pkg.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {pkg.coins} coins for ${pkg.price.toFixed(2)}
                  </div>
                  {key === 'VALUE' && (
                    <div className="text-xs text-vivid font-medium">Most Popular</div>
                  )}
                </div>
                <Button
                  onClick={() => handlePackagePurchase(key as keyof typeof COIN_PACKAGES)}
                  disabled={loading !== null}
                  size="sm"
                >
                  {loading === key ? "Processing..." : `$${pkg.price.toFixed(2)}`}
                </Button>
              </div>
            ))}
          </div>
          
          <div className="text-center text-sm text-muted-foreground pt-2">
            <p>• 1 coin = Outline generation</p>
            <p>• 4 coins = Full slide generation</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CoinPurchase; 