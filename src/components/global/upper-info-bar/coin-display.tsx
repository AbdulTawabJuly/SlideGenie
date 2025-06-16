"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Coins } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CoinDisplay = ({ coins }: { coins: number | undefined }) => {
  const [displayCoins, setDisplayCoins] = useState(coins);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (coins !== displayCoins) {
      setIsAnimating(true);
      setTimeout(() => {
        setDisplayCoins(coins);
        setTimeout(() => setIsAnimating(false), 300);
      }, 150);
    }
  }, [coins, displayCoins]);

  return (
    <Button className="rounded-lg font-semibold hover:cursor-default relative overflow-hidden">
      <Coins className={`transition-all duration-300 ${isAnimating ? 'animate-bounce' : ''}`} />
      <AnimatePresence mode="wait">
        <motion.span
          key={displayCoins}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ 
            duration: 0.3,
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
          className={`inline-block ${isAnimating ? 'text-vivid' : ''} transition-colors duration-300`}
        >
          {displayCoins}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
};

export default CoinDisplay;
