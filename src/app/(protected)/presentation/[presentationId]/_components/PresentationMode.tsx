"use client";

import { useSlideStore } from "@/store/useSlideStore";
import { DraggableSlide } from "./editor/Editor";
import { useEffect, useState } from "react";

type Props = {
  onExit: () => void;
};

const PresentationMode = ({ onExit }: Props) => {
  const { getOrderedSlides, currentTheme, currentSlide, setCurrentSlide } =
    useSlideStore();
  const slides = getOrderedSlides();
  const [isMounted, setIsMounted] = useState(false);

  // Handle keyboard navigation
  useEffect(() => {
    setIsMounted(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && currentSlide < slides.length - 1) {
        setCurrentSlide(currentSlide + 1);
      } else if (e.key === "ArrowLeft" && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      } else if (e.key === "Escape") {
        onExit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, slides.length, setCurrentSlide, onExit]);

  if (!isMounted || slides.length === 0) {
    return null;
  }

  const currentSlideData = slides[currentSlide];

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{
        backgroundColor: currentTheme.slideBackgroundColor,
        color: currentTheme.accentColor,
        fontFamily: currentTheme.fontFamily,
      }}
    >
      <div
        className="w-full max-w-4xl mx-auto px-4 flex-grow"
        style={{ backgroundImage: currentTheme.gradientBackground }}
      >
        <DraggableSlide
          slide={currentSlideData}
          index={currentSlide}
          isEditable={false}
          handleDelete={() => {}}
          moveSlide={() => {}}
        />
      </div>
    </div>
  );
};

export default PresentationMode;
