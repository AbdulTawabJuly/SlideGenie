"use client";

// Testing Commit for the new branch

import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { LayoutSlides, Slide } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { MasterRecursiveComponent } from "./MasterRecursiveComponent";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Trash } from "lucide-react";
import { updateSlides } from "@/actions/project";
import { toast } from "sonner";

interface DropZoneProps {
  index: number;
  onDrop: (
    item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index?: number;
    },
    dropIndex: number
  ) => void;
  isEditable: boolean;
}

export const DropZone: React.FC<DropZoneProps> = ({
  index,
  onDrop,
  isEditable,
}) => {
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: ["SLIDE", "layout"],
    drop: (item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index?: number;
    }) => {
      onDrop(item, index);
    },
    canDrop: () => isEditable,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
  if (!isEditable) return null;
  return (
    <div
      ref={dropRef as unknown as React.RefObject<HTMLDivElement>}
      className={cn(
        "border-border h-4 my-2 rounded-md transition-all duration-200",
        isOver && canDrop ? "border-green-500 bg-green-100" : "border-gray-300",
        canDrop ? "border-blue-300" : ""
      )}
    >
      {isOver && canDrop && (
        <div className="h-full flex items-center justify-center text-green-600">
          Drop Here
        </div>
      )}
    </div>
  );
};

interface DraggableSlideProps {
  index: number;
  slide: Slide;
  moveSlide: (dragIndex: number, hoverIndex: number) => void;
  isEditable: boolean;
  handleDelete: (id: string) => void;
}

export const DraggableSlide: React.FC<DraggableSlideProps> = ({
  slide,
  index,
  moveSlide,
  handleDelete,
  isEditable,
}) => {
  const ref = useRef(null);
  const { currentSlide, setCurrentSlide, currentTheme, updateContentItem } =
    useSlideStore();
  const [{ isDragging }, drag] = useDrag({
    type: "SLIDE",
    item: {
      index,
      type: "SLIDE",
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isEditable,
  });

  const [_, drop] = useDrop({
    accept: ["SLIDE", "LAYOUT"],
    hover(item: { index: number; type: string }) {
      if (!ref.current || !isEditable) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (item.type === "SLIDE") {
        if (dragIndex === hoverIndex) {
          return;
        }
        // Perform the move
        moveSlide(dragIndex, hoverIndex);
        // Update the dragged item's index
        item.index = hoverIndex;
      }
    },
  });

  drag(drop(ref));

  const handleContentChange = (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => {
    // console.log("Content Changed", slide, contentId, newContent);
    if (isEditable) {
      updateContentItem(slide.id, contentId, newContent);
    }
  };
  return (
    <div
      ref={ref}
      className={cn(
        "w-full rounded-lg shadow-lg relative p-6 min-h-[400px] max-h-[800px]",
        "shadow-xl transition-shadow duration-300",
        "flex flex-col",
        index === currentSlide ? "ring-2 ring-blue-500 ring-offset-2" : "",
        slide.className,
        isDragging ? "opacity-50" : "opacity-100"
      )}
      style={{
        backgroundImage: currentTheme.gradientBackground,
      }}
      onClick={() => setCurrentSlide(index)}
    >
      <div className="h-full w-full flex-grow overflow-hidden">
        <MasterRecursiveComponent
          content={slide.content}
          isPreview={false}
          slideId={slide.id}
          isEditable={isEditable}
          onContentChange={handleContentChange}
        />
      </div>
      {isEditable && index === currentSlide && (
        <Popover>
          <PopoverTrigger asChild className="absolute top-2 left-2">
            <Button size="sm" variant="outline">
              <EllipsisVertical className=" w-5 h-5" />
              <span className="sr-only">Slide Options</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-0">
            <Button variant="ghost" onClick={() => handleDelete(slide.content.id)}>
              <Trash className="w-5 h-5 text-red-900" />
              <span className="sr-only">Delete Slide</span>
            </Button>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

type Props = {
  isEditable: boolean;
};

const Editor = ({ isEditable }: Props) => {
  const {
    getOrderedSlides,
    currentSlide,
    removeSlide,
    addSlideAtIndex,
    reorderSlides,
    slides,
    project,
    setIsSaving,
    setLastSavedAt,
  } = useSlideStore();

  const orderedSlides = getOrderedSlides();
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [loading, setLoading] = useState(true);
  const moveSlide = (dragIndex: number, hoverIndex: number) => {
    if (isEditable) {
      reorderSlides(dragIndex, hoverIndex);
    }
  };

  const autoSaveTimeOutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDrop = (
    item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index?: number;
    },
    dropIndex: number
  ) => {
    // handle drop event here
    if (!isEditable) return;
    if (item.type === "layout") {
      addSlideAtIndex(
        {
          ...item.component,
          id: uuidv4(),
          slideOrder: dropIndex,
        },
        dropIndex
      );
    } else if (item.type === "SLIDE" && item.index !== undefined) {
      moveSlide(item.index, dropIndex);
    }
  };

  const handleDelete = (id: string) => {
    if (isEditable) {
      console.log("handleDelete called with id:", id);
      
      if (!id) {
        console.error("No ID provided to handleDelete");
        toast.error("Bruh 💀", {
          description:
            "ID is Undefined 🤦‍♂️",
        });
        return;
      }
      
      removeSlide(id);
      toast.success("W move 🚀", {
        description:
          "Slide Deleted Successfully 😎",
      });
    } else {
      console.log("Not editable, delete ignored");
      toast.error("Bruh 💀", {
        description:
          "The Slide is not Editable 🤦‍♂️",
      });
    }
  };

  useEffect(() => {
    if (slideRefs.current[currentSlide]) {
      slideRefs.current[currentSlide]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentSlide]);

  useEffect(() => {
    if (typeof window !== "undefined") setLoading(false);
  }, []);

  const saveSlide = useCallback(async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 100));
    if (isEditable && project) {
      (async () => {
        await updateSlides(project.id, JSON.parse(JSON.stringify(slides)));
      })();
    }
    setIsSaving(false);
    setLastSavedAt(Date.now());
  }, [isEditable, project, slides, setIsSaving, setLastSavedAt]);

  useEffect(() => {
    if (autoSaveTimeOutRef.current) {
      clearTimeout(autoSaveTimeOutRef.current);
    }

    if (isEditable) {
      autoSaveTimeOutRef.current = setTimeout(() => {
        saveSlide();
      }, 2000);
    }

    return () => {
      if (autoSaveTimeOutRef.current) {
        clearTimeout(autoSaveTimeOutRef.current);
      }
    };
  }, [slides, isEditable, project]);

  return (
    <div className="flex-1 flex flex-col h-full w-full max-w-4xl mx-auto mb-20">
      {loading ? (
        <div className="w-full px-4 flex flex-col space-y-6">
          <Skeleton className="w-full h-52" />
          <Skeleton className="w-full h-52" />
          <Skeleton className="w-full h-52" />
        </div>
      ) : (
        <ScrollArea className="flex-1 mt-8">
          <div className="px-4 pb-4 space-y-4 pt-2">
            {isEditable && (
              <DropZone index={0} onDrop={handleDrop} isEditable={isEditable} />
            )}
            {orderedSlides.map((slide, index) => (
              <React.Fragment key={slide.id || index}>
                <DraggableSlide
                  slide={slide}
                  index={index}
                  isEditable={isEditable}
                  handleDelete={handleDelete}
                  moveSlide={moveSlide}
                />
                {isEditable && (
                  <DropZone
                    index={index + 1}
                    onDrop={handleDrop}
                    isEditable={isEditable}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default Editor;
