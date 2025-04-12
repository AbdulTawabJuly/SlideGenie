import { Theme } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
  selectedThemes: Theme;
  themes: Theme[];
  onThemeSelect: (theme: Theme) => void;
};

const ThemePicker = ({ selectedThemes, themes, onThemeSelect }: Props) => {
  const router = useRouter();
  const params = useParams();
  const { project, setSlides, currentTheme } = useSlideStore();
  const [loading, setLoading] = useState(false);

  return (
    <div
      className="w-[400px] overflow-hidden sticky top-0 h-screen flex flex-col"
      style={{
        backgroundColor:
          selectedThemes.sidebarColor || selectedThemes.backgroundColor,
        borderLeft: `1px solid ${selectedThemes.accentColor}20`,
      }}
    >
      <div className="p-8 space-y-6 flex-shrink-0">
        <div className=" space-y-2"></div>
      </div>
    </div>
  );
};

export default ThemePicker;
