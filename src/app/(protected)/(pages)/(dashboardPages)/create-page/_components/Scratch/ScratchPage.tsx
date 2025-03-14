import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import useScratchStore from "@/store/useStartScratchStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  onBack: () => void;
};

const ScratchPage = ({ onBack }: Props) => {
  const { outlines, addMultipleOutlines, addOutlines, resetOutlines } =
    useScratchStore();
  const handleBack = () => {
    resetOutlines();
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
      <h1 className="text-2xl sm:text-3xl font-bold text-primary text-left">
        Prompt
      </h1>
      <motion.div
        className="bg-primary/10 p-4 rounded-xl"
        variants={itemVariants}
      >
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl">
          <Select
            value={outlines.length > 0 ? outlines.length.toString() : "0"}
          >
            <SelectTrigger className="w-fit gap-2 font-semibold shadow-xl">
              <SelectValue placeholder="Select Number of Cards" />
            </SelectTrigger>
            <SelectContent className="w-fit">
              {outlines.length === 0 ? (
                <SelectItem value="0" className="font-semibold">
                  No Cards
                </SelectItem>
              ) : (
                Array.from(
                  { length: outlines.length },
                  (_, idx) => idx + 1
                ).map((num) => (
                  <SelectItem
                    key={num}
                    value={num.toString()}
                    className="font-semibold"
                  >
                    {num}
                    {num === 1 ? "Card" : "Cards"}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ScratchPage;
