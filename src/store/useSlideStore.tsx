import { Slide } from "@/lib/types";
import { Project } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SlideState {
  slides: Slide[];
  project: Project | null;
  setProject: (id: Project) => void;
  setSlides: (slides: Slide[]) => void;
}

export const useSlideStore = create(
  persist<SlideState>(
    (set) => ({
      slides: [],
      project: null,
      setSlides: (slides: Slide[]) =>
        set({
          slides,
        }),
      setProject: (project) => set({ project }),
    }),
    {
      name: "slides-storage",
    }
  )
);
