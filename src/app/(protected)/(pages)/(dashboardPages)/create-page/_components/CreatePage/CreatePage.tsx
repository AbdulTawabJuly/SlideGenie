"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  containerVariants,
  CreatePageCard,
  itemVariants,
} from "@/lib/constants";

type Props = {
  onSlectOption: (option: string) => void;
};

const CreatePage = (props: Props) => {
  return (
    <motion.div initial="hidden" animate="visible" className="space-y-8">
      <motion.div variants={itemVariants} className=" text-center space-y-2">
        <h1 className="text-4xl font-bold text-primary">
          How would you like to get started
        </h1>
      </motion.div>
      <motion.div
        variants={containerVariants}
        className=" grid gap-6 md:grid-cols-3"
      >
        {CreatePageCard.map((option) => (
          <motion.div
            key={option.type}
            variants={itemVariants}
            whileHover={{
              scale: 0.1,
              rotate: 1,
              transition: { duration: 0.1 },
            }}
            className={`${
              option.highlight
                ? "bg-vivid-gradient"
                : "hover:bg-vivid-gradient border"
            } rounded-xl p-[1px] transition-all duration-300 ease-in-out`}
          >
            <motion.div>
                
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CreatePage;
