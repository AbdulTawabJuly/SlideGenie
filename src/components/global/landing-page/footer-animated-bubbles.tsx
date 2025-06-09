import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";


export default function FooterAnimatedBubbles() {
  const [bubbleXs, setBubbleXs] = useState<number[]>([]);

  useEffect(() => {
    setBubbleXs([...Array(6)].map(() => Math.random() * 400 - 200));
  }, []);

  if (bubbleXs.length === 0) return null;

  return (
    <div className="relative h-32 overflow-hidden">
      {bubbleXs.map((x, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full"
          animate={{
            y: [-20, -100],
            x: [x, x],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.5,
            ease: "easeOut",
          }}
          style={{
            left: `${20 + i * 12}%`,
            bottom: 0,
          }}
        />
      ))}
    </div>
  );
}