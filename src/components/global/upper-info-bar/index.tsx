"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { User } from "@prisma/client";
import React from "react";
import SearchBar from "./upper-info-searchbar";
import ThemeSwitcher from "../mode-toggle";
import NewProjectButton from "./new-project-button";
import CoinDisplay from "./coin-display";
import { useUserStore } from "@/store/useUserStore";

type Props = {
  user: User;
};

const UpperInfoBar = ({ user }: Props) => {
  const storeUser = useUserStore((state) => state.user);
  
  // Use store user coins if available, otherwise fallback to props
  const currentCoins = storeUser?.coins ?? user.coins;
  
  return (
    <header className="sticky top-0 z-[10] flex shrink-0 flex-wrap items-center gap-2 bg-background p-4 justify-between">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />

      <div className="w-full max-w-[95%] flex items-center justify-between gap-4 flex-wrap">
        <SearchBar />
        <ThemeSwitcher />
        <div className="flex flex-wrap gap-4 items-center justify-end">
          <CoinDisplay coins={currentCoins} />
          <NewProjectButton user={user} />
        </div>
      </div>
    </header>
  );
};

export default UpperInfoBar;
