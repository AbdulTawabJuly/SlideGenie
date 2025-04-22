import { ContentItem } from "@/lib/types";
import React from "react";

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

const ColumnComponent = (props: Props) => {
  return <div>ColumnComponent</div>;
};

export default ColumnComponent;
