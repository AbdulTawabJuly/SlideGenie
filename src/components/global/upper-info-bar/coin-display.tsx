"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Coins } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "@/store/useUserStore";

const CoinDisplay = ({ coins }: { coins: number | undefined }) => {
  const [displayCoins, setDisplayCoins] = useState(coins);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Listen to store changes for real-time updates - use the reactive selector
  const storeUser = useUserStore((state) => state.user);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const newCoins = storeUser?.coins ?? coins;
      
      if (newCoins !== displayCoins && newCoins !== undefined) {
        setIsAnimating(true);
        setTimeout(() => {
          setDisplayCoins(newCoins);
          setTimeout(() => setIsAnimating(false), 300);
        }, 150);
      }
    } else {
      setDisplayCoins(coins);
    }
  }, [storeUser?.coins, coins, displayCoins, isMounted]);

  // Prevent hydration mismatch by showing a simple version on first render
  if (!isMounted) {
    return (
      <Button className="rounded-lg font-semibold hover:cursor-default">
        <Coins />
        {coins}
      </Button>
    );
  }

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
