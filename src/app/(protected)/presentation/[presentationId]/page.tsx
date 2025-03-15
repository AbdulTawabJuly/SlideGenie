"use client";
import { getProjectById } from "@/actions/project";
import { useSlideStore } from "@/store/useSlideStore";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const Page = (props: Props) => {
  const params = useParams();
  const { setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const { setSlides, setProject, setCurrentTheme, currentTheme } =
    useSlideStore();

    useEffect(()   =>{
        (async () => {
            try {
                const res = await getProjectById(params.presentationId as string);
            } catch (error) {
                
            }
        })()
    })
    

  return <div>Page</div>;
};

export default Page;
