"use client"

import { ScrollArea } from "@/components/ui/scroll-area";
import { useSlideStore } from "@/store/useSlideStore";
import React from "react";

type Props = {};

const LayoutChooser = (props: Props) => {
  const { currentTheme } = useSlideStore();
  return <ScrollArea>
    <div className="flex flex-col items-center justify-center p-4 space-y-4">
      <h2 className="text-lg font-semibold">Choose a Layout</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {currentTheme.layouts.map((layout) => (
          <div
            key={layout.id}
            className="p-4 border rounded-lg hover:shadow-lg transition-shadow duration-200"
          >
            <h3 className="font-medium">{layout.name}</h3>
            <p className="text-sm text-muted-foreground">{layout.description}</p>
          </div>
        ))}
      </div>
    </div>
  </ScrollArea>
};

export default LayoutChooser;
