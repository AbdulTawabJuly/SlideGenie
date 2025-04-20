"use client";
import { getProjectById } from "@/actions/project";
import { themes } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Navbar from "./_components/Navbar/Navbar";
import LayoutPreview from "./_components/editor-sidebar/leftsidebar/LayoutPreview";
import Editor from "./_components/editor/Editor";

const Page = () => {
  const params = useParams();
  const { setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const { setSlides, setProject, setCurrentTheme, currentTheme } =
    useSlideStore();

  useEffect(() => {
    (async () => {
      try {
        const res = await getProjectById(params.presentationId as string);
        if (res.status !== 200 || !res.data) {
          toast.error("Error", {
            description: "Unable to retrieve Project",
          });
          redirect("/dashboard");
        }

        const findTheme = themes.find(
          (theme) => theme.name === res.data.themeName
        );
        setCurrentTheme(findTheme || themes[0]);
        // setTheme(findTheme?.type === "dark" ? "dark" : "light");
        setTheme("dark");
        setProject(res.data);
        setSlides(JSON.parse(JSON.stringify(res.data.slides)));
      } catch (error) {
        console.log(error);
        toast.error("Error", {
          description: "An Unexpected Error Occured",
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen flex flex-col">
        <Navbar presentationId={params.presentation as string} />
        <div
          className="flex-1 flex overflow-hidden pt-16"
          style={{
            backgroundColor: currentTheme.backgroundColor,
            fontFamily: currentTheme.fontFamily,
            color: currentTheme.accentColor,
          }}
        >
          <LayoutPreview />
          <div className="flex-1 ml-64 pr-16">
            <Editor isEditable={true} />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Page;
