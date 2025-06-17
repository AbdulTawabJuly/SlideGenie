"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import useCreativeAIStore from "@/store/useCreativeAIStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import CardList from "../Common/CardList";
import usePromptStore from "@/store/usePromptStore";
import RecentPrompts from "./RecentPrompts";
import { toast } from "sonner";
import { generateCreativePrompt } from "@/actions/chatgpt";
import { v4 as uuid } from "uuid";
import { OutlineCard } from "@/lib/types";
import { createProject } from "@/actions/project";
import { useSlideStore } from "@/store/useSlideStore";
import { useRouter } from "next/navigation";
import { deductCoinsForOutline, deductCoinsForSlides } from "@/actions/user";
import { useUserStore } from "@/store/useUserStore";

type Props = {
  onBack: () => void;
};

const CreativeAI = ({ onBack }: Props) => {
  const router = useRouter();
  const { setProject } = useSlideStore();
  const {
    currentAiPrompt,
    setCurrentAiPrompt,
    outlines,
    resetOutlines,
    addOutline,
    addMultipleOutlines,
  } = useCreativeAIStore();
  const [noOfCards, setNoOfCards] = useState(0);
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const { prompts, addPrompt } = usePromptStore();
  const { updateUserCoins } = useUserStore();

  const handleBack = () => {
    onBack();
  };

  const resetCards = () => {
    setEditingCard(null);
    setSelectedCard(null);
    setEditText("");

    setCurrentAiPrompt("");
    resetOutlines();
  };
  const generateOutline = async () => {
    if (currentAiPrompt === "") {
        toast.error("Bruh 💀", {
          description:
            "You really thought I could read your mind? Drop a prompt first! 🤦‍♂️",
        });
      return;
    }
    setIsGenerating(true);
    const res = await generateCreativePrompt(currentAiPrompt);
    if (res.status === 200 && res?.data?.outlines) {
      const cardsData: OutlineCard[] = [];
      res.data?.outlines.map((outline: string, idx: number) => {
        const newCard = {
          id: uuid(),
          title: outline,
          order: idx + 1,
        };
        cardsData.push(newCard);
      });
      addMultipleOutlines(cardsData);
      setNoOfCards(cardsData.length);
      toast.success("W move 🚀", {
        description:
          "Outline cooked to perfection! 🔥 Now go be productive... or not 😎",
      });
      
      // Deduct coins and update store
      const deductResult = await deductCoinsForOutline();
      if (deductResult.status === 200 && deductResult.user) {
        updateUserCoins(deductResult.user.coins);
        console.log("💰 Coins updated:", deductResult.user.coins);
      } else if (deductResult.status === 400) {
        toast.error("Insufficient Coins!", {
          description: deductResult.error || "You don't have enough coins for this operation.",
        });
      }
    } else {
      toast.error("L moment 💀", {
        description:
          "Couldn't generate the outline... Maybe try manifesting it? ✨",
      });
    }
    setIsGenerating(false);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    if (outlines.length === 0) {
      toast.error("L move 💀", {
        description:
          "No outlines, no slides 🤡 Add at least one card to cook! 🔥",
      });
      setIsGenerating(false);
      return;
    }
    
    try {
      // First, check if user has enough coins without deducting yet
      const { getUser } = useUserStore.getState();
      const currentUser = getUser();
      if (!currentUser || currentUser.coins < 4) {
        toast.error("Insufficient Coins!", {
          description: "You need 4 coins to generate slides.",
        });
        setIsGenerating(false);
        return;
      }

      // Proceed with project creation first
      const res = await createProject(
        currentAiPrompt,
        outlines.slice(0, noOfCards)
      );

      if (res.status !== 200 || !res.data) {
        throw new Error("Unable to Create Project");
      }

      // Only deduct coins AFTER successful project creation
      const deductResult = await deductCoinsForSlides();
      if (deductResult.status === 200 && deductResult.user) {
        // Update user store with new coin count
        updateUserCoins(deductResult.user.coins);
        console.log("💰 Coins deducted after successful project creation:", deductResult.user.coins);
      } else {
        console.warn("Project created but coin deduction failed:", deductResult);
        // Project was created successfully, so we still proceed
      }
      
      router.push(`/presentation/${res.data.id}/select-theme`);
      setProject(res.data);

      addPrompt({
        id: uuid(),
        title: currentAiPrompt || outlines?.[0]?.title,
        outlines: outlines,
        createdAt: new Date().toISOString(),
      });

      toast.success("W move 🚀", {
        description:
          "Project Successfully Created! 🎉 Your slides are ready to slay! 📊💥",
      });
      setCurrentAiPrompt("");
      resetOutlines();
    } catch (error) {
      console.log(error);
      toast.error("L moment 💀", {
        description:
          "Bummer! Project creation didn't go as planned. 😢 Retry later! 🔄",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    setNoOfCards(outlines.length);
  }, [outlines.length]);

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
      <motion.div className="text-center space-y-2" variants={itemVariants}>
        <h1 className="text-4xl font-bold text-primary">
          Generate with <span className=" text-vivid">AI</span>
        </h1>
      </motion.div>

      <motion.div
        className="bg-primary/10 p-4 rounded-xl"
        variants={itemVariants}
      >
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl">
          <Input
            placeholder="Enter Prompt and add to the cards ....."
            className="text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 bg-transparent flex-grow"
            required
            value={currentAiPrompt || ""}
            onChange={(e) => setCurrentAiPrompt(e.target.value)}
          />
          <div className="flex items-center gap-3">
            <Select
              value={noOfCards.toString()}
              onValueChange={(value) => setNoOfCards(parseInt(value))}
            >
              <SelectTrigger className="w-fit gap-2 font-semibold shadow-xl">
                <SelectValue placeholder="Select Number of Cards" />
                <SelectContent className="w-fit">
                  {outlines.length === 0 ? (
                    <SelectItem value="0" className="font-semibold">
                      No Cards{" "}
                    </SelectItem>
                  ) : (
                    Array.from(
                      { length: outlines.length },
                      (_, index) => index + 1
                    ).map((num) => (
                      <SelectItem
                        key={num}
                        value={num.toString()}
                        className="font-semibold"
                      >
                        {num} {num === 1 ? "Card" : "Cards"}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </SelectTrigger>
            </Select>
            <Button
              variant="destructive"
              onClick={resetCards}
              size="icon"
              aria-label="Reset Cards"
            >
              <RotateCcw className="w-4 h-4 animate-pulse" />
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="w-ful flex justify-center items-center">
        <Button
          className="font-medium text-lg flex gap-2 items-center"
          onClick={generateOutline}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin mr-2" />
            </>
          ) : (
            "Generate Outline "
          )}
        </Button>
      </div>

      <CardList
        outlines={outlines}
        addOutline={addOutline}
        addMultipleOutlines={addMultipleOutlines}
        editingCard={editingCard}
        selectedCard={selectedCard}
        editText={editText}
        onEditChange={setEditText}
        onCardSelect={setSelectedCard}
        setEditText={setEditText}
        setEditingCard={setEditingCard}
        setSelectedCard={setSelectedCard}
        onCardDoubleClick={(id, title) => {
          setEditingCard(id);
          setEditText(title);
        }}
      />
      {outlines.length > 0 && (
        <Button
          className="w-full"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 animate-spin" /> Generating ...
            </>
          ) : (
            "Generate "
          )}
        </Button>
      )}

      {prompts?.length > 0 && <RecentPrompts />}
    </motion.div>
  );
};

export default CreativeAI;
