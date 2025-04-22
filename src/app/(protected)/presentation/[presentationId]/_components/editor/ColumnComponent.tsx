import { ResizablePanelGroup } from "@/components/ui/resizable";
import { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

type Props = {
  content: ContentItem[];
  className?: string;
  isPreview?: boolean;
  slideId: string;
  onContentChange: (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
  isEditable?: boolean;
};

const ColumnComponent = ({
  content,
  className,
  isPreview,
  slideId,
  onContentChange,
  isEditable,
}: Props) => {
  const [columns, setColumns] = useState<ContentItem[]>([]);
  return (
    <div className="relative w-full h-full">
      <ResizablePanelGroup
        direction="horizontal"
        className={cn(
          "h-full w-full flex",
          !isEditable && "!border-0",
          className
        )}
      ></ResizablePanelGroup>
    </div>
  );
};

export default ColumnComponent;
