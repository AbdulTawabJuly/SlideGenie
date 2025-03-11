import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { Plus } from "lucide-react";
import React from "react";

const NewProjectButton = ({ user }: { user: User }) => {
  return (
    <Button
      className="rounded-lg font-semibold"
      disabled={!user.subscription}
    >
      <Plus />
      New Project
    </Button>
  );
};

export default NewProjectButton;
