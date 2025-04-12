import { Theme } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";
import { Loader2, Wand2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { generateLayouts } from "@/actions/chatgpt";

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

  const handleGenerateLayouts = async () => {
    setLoading(true);
    if (!selectedThemes) {
      toast.error("Error", {
        description: "Please Select a Theme",
      });
      return;
    }

    if (project?.id === "") {
      toast.error("Error", {
        description: "Please Create a Project",
      });
      router.push("/create-page");
      return;
    }

    try {
      const res = await generateLayouts(
        params.presentationId as string,
        currentTheme.name
      );
    } catch (error) {}
  };

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
        <div className=" space-y-2">
          <h2
            className="text-3xl font-bold tracking-tight"
            style={{ color: selectedThemes.accentColor }}
          >
            Pick a theme
          </h2>
          <p
            className="text-sm"
            style={{ color: `${selectedThemes.accentColor}90` }}
          >
            Choose from our collection
          </p>
        </div>

        <Button
          className="w-full h-12 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          style={{
            backgroundColor: selectedThemes.accentColor,
            color: selectedThemes.backgroundColor,
          }}
          onClick={handleGenerateLayouts}
        >
          {loading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-5 w-5 animate-pulse" />
          )}
          {loading ? (
            <p className=" animate-pulse">Generating ...</p>
          ) : (
            "Generate Themes"
          )}
        </Button>
      </div>
    </div>
  );
};

export default ThemePicker;
