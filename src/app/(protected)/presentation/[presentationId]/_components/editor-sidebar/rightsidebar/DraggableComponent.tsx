import { ContentItem } from "@/lib/types";
import { useDrag } from "react-dnd";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

interface DraggableComponentProps {
  type: string;
  label: string;
  component: ContentItem;
}

const DraggableComponent = ({
  type,
  label,
  component,
}: DraggableComponentProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: "CONTENT_ITEM",
    item: {
      type: "component",
      componentType: type,
      label,
      component,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag as any}
      className={cn(
        "flex items-center p-2 rounded-md bg-muted hover:bg-muted-foreground/20 cursor-grab",
        isDragging && "opacity-50"
      )}
    >
      <GripVertical className="w-4 h-4 mr-2" />
      <span>{label}</span>
    </div>
  );
};

export default DraggableComponent;
