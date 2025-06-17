"use client";

import { useUserStore } from "@/store/useUserStore";
import { useEffect, useState } from "react";
import { Coins } from "lucide-react";
import { motion, useAnimation } from "framer-motion";

const CoinDisplay = () => {
  const { user, shouldAnimateCoins } = useUserStore();
  const [displayCoins, setDisplayCoins] = useState(user?.coins || 0);
  const controls = useAnimation();

  useEffect(() => {
    if (user?.coins !== undefined && shouldAnimateCoins) {
      const startCoins = displayCoins;
      const endCoins = user.coins;
      const duration = 1; // Animation duration in seconds

      controls.start({
        scale: [1, 1.2, 1],
        color: ["#000", "#ef4444", "#000"], // Adjust colors to match 'text-vivid'
        transition: { duration },
      });

      // Smoothly increment coins
      const startTime = performance.now();
      const animate = (currentTime: number) => {
        const elapsed = (currentTime - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        const newCoins = Math.floor(startCoins + (endCoins - startCoins) * progress);
        setDisplayCoins(newCoins);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    } else {
      setDisplayCoins(user?.coins || 0);
    }
  }, [user?.coins, shouldAnimateCoins, displayCoins, controls]);

  return (
    <div className="flex items-center gap-2">
      <motion.span
        animate={controls}
        className="font-sm font-sans font-bold bg-primary text-primary-foreground hover:bg-primary/90 px-2 py-1 rounded-lg flex items-center gap-1"
      >
        <Coins className="h-5 w-5 text-vivid" />
        {displayCoins} Coins
      </motion.span>
    </div>
  );
};

export default CoinDisplay;