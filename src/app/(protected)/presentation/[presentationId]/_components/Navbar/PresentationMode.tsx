import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSlideStore } from "@/store/useSlideStore";
import { MasterRecursiveComponent } from "../editor/MasterRecursiveComponent";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Props = {
  onClose: () => void;
};

const PresentationMode = ({ onClose }: Props) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const { getOrderedSlides, currentTheme } = useSlideStore();
  const slides = getOrderedSlides();

  const goToPreviousSlide = () => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  };
  const isLastSlide = currentSlideIndex === slides.length - 1;
  const goToNextSlide = () => {
    if (currentSlideIndex == slides.length - 1) {
      onClose();
    } else {
      setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") {
        if (currentSlideIndex === slides.length - 1) {
          onClose();
        } else {
          setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
        }
      } else if (event.key === "ArrowLeft") {
        setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
      } else if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [slides.length, currentSlideIndex]);

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      style={{ backgroundColor: currentTheme.slideBackgroundColor }}
    >
      <div
        className="relative shadow-2xl"
        style={{
          aspectRatio: "16/9",
          height: "70vh",
          width: "auto",
          maxWidth: "90vw",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.5 }}
            className={`w-full h-full pointer-events-none ${slides[currentSlideIndex].className}`}
            style={{
              backgroundColor: currentTheme.slideBackgroundColor,
              color: currentTheme.accentColor,
              backgroundImage: currentTheme.gradientBackground,
              fontFamily: currentTheme.fontFamily,
              transform: "scale(0.8)",
              transformOrigin: "center",
            }}
          >
            <MasterRecursiveComponent
              content={slides[currentSlideIndex].content}
              onContentChange={() => {}}
              slideId={slides[currentSlideIndex].id}
              isPreview={false}
              isEditable={false}
            />
          </motion.div>
        </AnimatePresence>

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPreviousSlide}
            disabled={currentSlideIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {!isLastSlide && (
            <Button variant="outline" size="icon" onClick={goToNextSlide}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PresentationMode;
