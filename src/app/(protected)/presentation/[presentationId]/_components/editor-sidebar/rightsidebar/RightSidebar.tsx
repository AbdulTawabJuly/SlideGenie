"use client";

import { ContentItem } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import DraggableComponent from "./DraggableComponent";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid"; // Import uuid for generating unique IDs

const components: { label: string; type: string; content: ContentItem }[] = [
  {
    label: "Paragraph",
    type: "paragraph",
    content: {
      id: uuidv4(), // Assign a unique ID
      type: "paragraph",
      name: "Paragraph",
      content: "Enter text here",
      placeholder: "Type your paragraph here",
    },
  },
  {
    label: "Column",
    type: "resizable-column",
    content: {
      id: uuidv4(), // Assign a unique ID
      type: "resizable-column",
      name: "Columns",
      content: [
        {
          id: uuidv4(), // Assign a unique ID to nested ContentItem
          type: "paragraph",
          name: "Column 1",
          content: "Column 1 content",
          placeholder: "Type in column 1",
        },
        {
          id: uuidv4(), // Assign a unique ID to nested ContentItem
          type: "paragraph",
          name: "Column 2",
          content: "Column 2 content",
          placeholder: "Type in column 2",
        },
      ],
      columns: 2,
    },
  },
  {
    label: "Heading",
    type: "heading1",
    content: {
      id: uuidv4(), // Assign a unique ID
      type: "heading1",
      name: "Heading 1",
      content: "Heading",
      placeholder: "Type your heading",
    },
  },
  {
    label: "Table",
    type: "table",
    content: {
      id: uuidv4(), // Assign a unique ID
      type: "table",
      name: "Table",
      content: [
        ["Header 1", "Header 2"],
        ["Row 1", "Row 2"],
      ],
      initialRows: 2,
      intialColumns: 2,
    },
  },
  {
    label: "Numbered List",
    type: "numberedList",
    content: {
      id: uuidv4(), // Assign a unique ID
      type: "numberedList",
      name: "Numbered List",
      content: ["Item 1", "Item 2"],
    },
  },
  {
    label: "Bulleted List",
    type: "bulletList",
    content: {
      id: uuidv4(), // Assign a unique ID
      type: "bulletList",
      name: "Bulleted List",
      content: ["Item 1", "Item 2"],
    },
  },
  {
    label: "To-Do List",
    type: "todoList",
    content: {
      id: uuidv4(), // Assign a unique ID
      type: "todoList",
      name: "To-Do List",
      content: ["Task 1", "Task 2"],
    },
  },
  {
    label: "Divider",
    type: "divider",
    content: {
      id: uuidv4(), // Assign a unique ID
      type: "divider",
      name: "Divider",
      content: "",
    },
  },
];

const RightSidebar = () => {
  return (
    <div
      className={cn(
        "w-64 h-full fixed right-0 top-16 bg-background border-l border-border",
        "flex flex-col p-4"
      )}
    >
      <h2 className="text-lg font-semibold mb-4">Add Components</h2>
      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {components.map((comp) => (
            <DraggableComponent
              key={comp.type}
              type={comp.type}
              label={comp.label}
              component={comp.content}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RightSidebar;
