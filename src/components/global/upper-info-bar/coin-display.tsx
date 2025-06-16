"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Coins } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "@/store/useUserStore";

const CoinDisplay = ({ coins }: { coins: number | undefined }) => {
  const [displayCoins, setDisplayCoins] = useState(coins);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationType, setAnimationType] = useState<'increase' | 'decrease' | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  const storeUser = useUserStore((state) => state.user);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const newCoins = storeUser?.coins ?? coins;
      
      if (newCoins !== displayCoins && newCoins !== undefined && displayCoins !== undefined) {
        // Determine if coins increased or decreased
        const coinChange = newCoins - displayCoins;
        setAnimationType(coinChange > 0 ? 'increase' : 'decrease');
        
        setIsAnimating(true);
        setTimeout(() => {
          setDisplayCoins(newCoins);
          setTimeout(() => {
            setIsAnimating(false);
            setAnimationType(null);
          }, 500);
        }, 150);
      } else if (displayCoins === undefined) {
        setDisplayCoins(newCoins);
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

  // Get animation colors and directions based on type
  const getAnimationProps = () => {
    if (!isAnimating || !animationType) {
      return {
        textColor: '',
        iconRotation: 0,
        initialY: -20,
        exitY: 20
      };
    }

    if (animationType === 'increase') {
      return {
        textColor: 'text-green-500',
        iconRotation: 180, // Rotate down
        initialY: -30, // Come from above
        exitY: 30 // Exit downward
      };
    } else {
      return {
        textColor: 'text-red-500',
        iconRotation: -180, // Rotate up
        initialY: 30, // Come from below
        exitY: -30 // Exit upward
      };
    }
  };

  const animationProps = getAnimationProps();

  return (
    <motion.div
      animate={{
        backgroundColor: isAnimating 
          ? animationType === 'increase' 
            ? 'rgba(34, 197, 94, 0.1)' // green-500 with opacity
            : 'rgba(239, 68, 68, 0.1)'  // red-500 with opacity
          : 'transparent',
        scale: isAnimating ? 1.02 : 1
      }}
      transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
      className="rounded-lg"
    >
      <Button className="rounded-lg font-semibold cursor-default relative overflow-hidden">
        <motion.div
          animate={{ 
            rotate: isAnimating ? animationProps.iconRotation : 0,
            scale: isAnimating ? 1.1 : 1
          }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
        >
          <Coins className={`transition-all duration-300 ${
            isAnimating ? animationProps.textColor : ''
          }`} />
        </motion.div>
      <AnimatePresence mode="wait">
        <motion.span
          key={displayCoins}
          initial={{ y: animationProps.initialY, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: animationProps.exitY, opacity: 0 }}
          transition={{ 
            duration: 0.4,
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
          className={`inline-block transition-colors duration-300 ${
            isAnimating ? animationProps.textColor : ''
          }`}
        >
          {displayCoins}
        </motion.span>
      </AnimatePresence>
      </Button>
    </motion.div>
  );
};

export default CoinDisplay;
