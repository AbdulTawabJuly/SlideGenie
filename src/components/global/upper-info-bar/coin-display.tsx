"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { Coins } from "lucide-react";
import { User } from "@prisma/client";


const CoinDisplay = ({ user }: { user: User }) => {
  return (
    <Button className="rounded-lg font-semibold hover:cursor-default">
      <Coins />
      {user.coins}
    </Button>
  );
};

export default CoinDisplay;
