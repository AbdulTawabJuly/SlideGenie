"use client";
import React, { useEffect, useRef } from "react";

interface HeadingProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  styles?: React.CSSProperties;
  isPreview?: boolean;
}

const createHeading = (displayName: string, defaultClassName: string) => {
  const Heading = React.forwardRef<HTMLTextAreaElement, HeadingProps>(
    ({ children, styles, isPreview = false, ...prop }, ref) => {
      const textAreaRef = useRef<HTMLTextAreaElement>(null);
      useEffect(() => {
        const textarea = textAreaRef.current;
        if (textarea && !isPreview) {
          const adjustHeight = () => {
            textarea.style.height = "0";
            textarea.style.height = `${textarea.scrollHeight}px`;
          };
          textarea.addEventListener("input", adjustHeight);
          adjustHeight();
          return () => textarea.removeEventListener("input", adjustHeight);
        }
      }, [isPreview]);
    }
  );
};
const Heading1 = createHeading("Heading1", "text-4xl");

export { Heading1 };
