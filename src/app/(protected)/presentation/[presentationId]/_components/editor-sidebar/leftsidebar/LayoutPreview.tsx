import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useSlideStore } from "@/store/useSlideStore";
import React, { useEffect, useState } from "react";
import DraggableSlidePreview from "./DraggableSlidePreview";

const LayoutPreview = () => {
  const { getOrderedSlides, reorderSlides } = useSlideStore();
  const slides = getOrderedSlides();
  const [loading, setLoading] = useState(true);

  const moveSlide = (dragIndex: number, hoverIndex: number) => {
    reorderSlides(dragIndex, hoverIndex);
  };

  useEffect(() => {
    if (typeof window !== "undefined") setLoading(false);
  }, []);

  return (
    <div className=" w-72 h-full fixed left-0 top-20 border-r overscroll-y-auto">
      <ScrollArea className="h-full w-full" suppressHydrationWarning>
        {loading ? (
          <div className="w-full px-4 flex flex-col space-y-6 mt-20">
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
          </div>
        ) : (
          <div className="p-4 pb-32 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-medium dark:text-gray-100 text-gray-500">
                Slides
              </h2>
              <span
                className="text-xs dark:text-gray-200 text-gray-400"
                suppressHydrationWarning
              >
                {slides?.length} Slides
              </span>
            </div>
            {slides.map((slide, index) => (
              <DraggableSlidePreview
                key={slide.id || index}
                slide={slide}
                index={index}
                moveSlide={moveSlide}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default LayoutPreview;
