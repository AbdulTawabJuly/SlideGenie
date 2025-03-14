import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { containerVariants } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

type Props = {
  onBack: () => void;
};

const ScratchPage = ({ onBack }: Props) => {
  const handleBack = () => {
    resetOutlines()
    onBack();
  };
  return (
    <motion.div
      className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Button onClick={handleBack} variant="outline" className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
    </motion.div>
  );
};

export default ScratchPage;
