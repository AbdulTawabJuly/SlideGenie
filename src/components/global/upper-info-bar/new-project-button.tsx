"use client";

import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

const NewProjectButton = ({ user }: { user: User }) => {
  const router = useRouter();
  const isDisabled = user.coins < 5;

  return (
    <TooltipProvider>
      {isDisabled ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="rounded-lg font-semibold bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
              aria-disabled={true}
              onClick={(e) => e.preventDefault()}
            >
              <Plus />
              New Project
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            You need at least 5 coins to create a new project.
          </TooltipContent>
        </Tooltip>
      ) : (
        <Button
          className="rounded-lg font-semibold"
          onClick={() => router.push("/create-page")}
        >
          <Plus />
          New Project
        </Button>
      )}
    </TooltipProvider>
  );
};

export default NewProjectButton;