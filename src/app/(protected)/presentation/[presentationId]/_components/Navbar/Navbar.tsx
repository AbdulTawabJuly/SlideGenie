import { Button } from "@/components/ui/button";
import { useSlideStore } from "@/store/useSlideStore";
import { Home, Play, Loader2, CheckCircle, Download } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import PresentationMode from "./PresentationMode";

type Props = {
  presentationId: string;
};

const Navbar = ({ presentationId }: Props) => {
  const { currentTheme, isSaving, lastSavedAt } = useSlideStore();
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/share/${presentationId}`
    );
    toast.success("Link Copied", {
      description: "The Link has been copied to your clipboard",
    });
  };

  useEffect(() => {
    if (lastSavedAt) {
      setShowSaved(true);
      const t = setTimeout(() => setShowSaved(false), 2000);
      return () => clearTimeout(t);
    }
  }, [lastSavedAt]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 w-full h-20 flex justify-between items-center py-4 px-7 border-b"
      style={{
        backgroundColor:
          currentTheme.navbarColor || currentTheme.backgroundColor,
        color: currentTheme.accentColor,
      }}
    >
      <Link href={"/dashboard"} passHref>
        <Button
          variant="outline"
          className={`flex items-center gap-2`}
          style={{ backgroundColor: currentTheme.backgroundColor }}
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">Return Home</span>
        </Button>
      </Link>

      <div className="text-lg font-semibold hidden sm:block">
        Presentation Editor
      </div>
      <div className="flex items-center gap-4">
        <div className="ml-auto flex items-center space-x-4">
          {isSaving && (
            <Loader2 className="w-5 h-5 animate-spin text-red-500" />
          )}
          {!isSaving && showSaved && (
            <CheckCircle className="w-5 h-5 text-green-500" />
          )}
        </div>

        <Button
          style={{ backgroundColor: currentTheme.backgroundColor }}
          onClick={handleCopy}
          variant="outline"
        >
          <Download className="w-4 h-4" />
        </Button>
        <Button
          variant={"outline"}
          className="flex items-center gap-2"
          onClick={() => setIsPresentationMode(true)}
          style={{ backgroundColor: currentTheme.backgroundColor }}
        >
          <Play className="w-4 h-4" />
          <span className="hidden sm:inline">Present</span>
        </Button>
      </div>

      {isPresentationMode && (
        <PresentationMode onClose={() => setIsPresentationMode(false)} />
      )}
    </nav>
  );
};

export default Navbar;
