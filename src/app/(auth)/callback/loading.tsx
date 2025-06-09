"use client";
import { Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

const AuthLoading = () => {
  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-black overflow-hidden">
      {/* Background glow and floating sparkles */}
      <motion.div
        className="absolute w-72 h-72 bg-gradient-to-br from-orange-400/20 to-yellow-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Spinning loader with sparkle pulse */}
      <motion.div
        className="flex flex-col items-center space-y-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
        >
          <Loader2 className="w-12 h-12 text-white" />
        </motion.div>

        <motion.div
          className="flex items-center space-x-2"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <span className="text-white text-sm tracking-wider">Authenticating...</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthLoading;
