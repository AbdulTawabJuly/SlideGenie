"use client";

import { useSlideStore } from "@/store/useSlideStore";
import { MasterRecursiveComponent } from "./editor/MasterRecursiveComponent";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

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
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: currentTheme.slideBackgroundColor,
        color: currentTheme.accentColor,
        fontFamily: currentTheme.fontFamily,
      }}
    >
      <div
        className={cn(
          "w-full h-full max-w-4xl mx-auto rounded-lg shadow-lg flex flex-col",
          currentSlideData.className
        )}
        style={{
          backgroundImage: currentTheme.gradientBackground,
        }}
      >
        <div className="h-full w-full flex-grow overflow-hidden">
          <MasterRecursiveComponent
            content={currentSlideData.content}
            isPreview={true}
            slideId={currentSlideData.id}
            isEditable={false}
            onContentChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default PresentationMode;
