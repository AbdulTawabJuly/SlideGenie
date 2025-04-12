import { Theme } from "@/lib/types";
import { AnimationControls, motion } from "framer-motion";
import React from "react";

type Props = {
  title: string;
  description: string;
  content: React.ReactNode;
  variant: "left" | "main" | "right";
  theme: Theme;
  controls: AnimationControls;
};

const ThemeCard = ({
  title,
  description,
  content,
  variant,
  theme,
  controls,
}: Props) => {
  const variants = {
    left: {
      hidden: { opacity: 0, x: "-50%", y: "-50%", scale: 0.9, rotate: 0 },
      visible: {
        opacity: 1,
        x: "-25%",
        y: "-25%",
        scale: 0.95,
        rotate: -10,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 30,
          delay: 0.1,
        },
      },
    },
    right: {
      hidden: { opacity: 0, x: "50%", y: "50%", scale: 0.9, rotate: 0 },
      visible: {
        opacity: 1,
        x: "25%",
        y: "25%",
        scale: 0.95,
        rotate: 10,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 30,
          delay: 0.1,
        },
      },
    },
    main: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 30,
          delay: 0.2,
        },
      },
    },
  };
  return <div>ThemeCard</div>;
};

export default ThemeCard;
