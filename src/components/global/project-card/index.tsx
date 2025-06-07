"use client";

import { itemVariants, themes } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { JsonValue } from "@prisma/client/runtime/library";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ThumbnailPreview from "./thumbnail-preview";
import { timeAgo } from "@/lib/utils";
import AlertDialogBox from "../alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteProject, recoverProject } from "@/actions/project";

type Props = {
  projectId: string;
  tittle: string;
  createdAt: string;
  isDeleted?: boolean;
  slideData: JsonValue;
  themeName: string;
};

const ProjectCard = ({
  projectId,
  tittle,
  createdAt,
  isDeleted,
  slideData,
  themeName,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { setSlides } = useSlideStore();
  const router = useRouter();
  const handleNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    router.push(`/presentation/${projectId}`);
  };

  const handleRecover = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast.error("Bruh 💀", {
        description: "Project not found... You sure it exists? 🤨",
      });
      return;
    }
    try {
      const res = await recoverProject(projectId);
      if (res.status !== 200) {
        toast.error("Uh-oh 😬", {
          description: res.error || "Something went wrong, not my fault tho 🤷‍♂️",
        });
        return;
      }
      setOpen(false);
      router.refresh();
      toast.success("Whew 😮‍💨", {
        description: "Project recovered! Crisis averted 🚀",
      });
    } catch (error) {
      console.log(error);
      toast.error("Yikes 😵", {
        description: "Error recovering project... Try again maybe? 🤔",
      });
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast.error("Bruh 💀", {
        description: "Project not found... You deleting ghosts now? 👻",
      });
      return;
    }
    try {
      const res = await deleteProject(projectId);
      if (res.status !== 200) {
        toast.error("Uh-oh 😬", {
          description:
            res.error || "Couldn't delete it... maybe it has plot armor? 🛡️",
        });
      }
      setOpen(false);
      router.refresh();
      toast.success("Gone. Poof! ✨", {
        description: "Project deleted successfully. No take-backs! 🚀",
      });
    } catch (error) {
      console.log(error);
      toast.error("Yikes 😵", {
        description: "Something went wrong... Guess it's immortal now 🤷‍♂️",
      });
    }
  };

  const theme = themes.find((theme) => theme.name === themeName) || themes[0];
  return (
    <motion.div
      className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${
        !isDeleted && "hover:bg-muted/50"
      }`}
      variants={itemVariants}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
        onClick={handleNavigation}
      >
        <ThumbnailPreview
          theme={theme}
          slide={JSON.parse(JSON.stringify(slideData))?.[0]}
        />
      </div>
      <div className="w-full">
        <div className="space-y-1">
          <h3 className="font-semibold text-base text-primary line-clamp-1">
            {tittle}
          </h3>
          <div className="flex w-full justify-between items-center gap-2">
            <p
              className="text-sm text-muted-foreground"
              suppressHydrationWarning
            >
              {timeAgo(createdAt)}
            </p>
            {isDeleted ? (
              <AlertDialogBox
                description="This will recover your project and restore your data"
                className="bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700"
                loading={loading}
                open={open}
                onClick={handleRecover}
                handleOpen={() => setOpen(!open)}
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-background-80 dark:hover:bg-background-90"
                  disabled={loading}
                >
                  Recover
                </Button>
              </AlertDialogBox>
            ) : (
              <AlertDialogBox
                description="This will delete your project and send to trash"
                className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
                loading={loading}
                open={open}
                onClick={handleDelete}
                handleOpen={() => setOpen(!open)}
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-background-80 dark:hover:bg-background-90"
                  disabled={loading}
                >
                  Delete
                </Button>
              </AlertDialogBox>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
