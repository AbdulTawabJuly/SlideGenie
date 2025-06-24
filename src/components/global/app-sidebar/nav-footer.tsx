"use client";
import { UserButton } from "@/app/(auth)/user-button/_components/userButton";
import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SignedIn, useUser } from "@clerk/nextjs";
import { User } from "@prisma/client";
import React from "react";
import CoinPurchase from "./coin-purchase";

const NavFooter = ({ prismaUser }: { prismaUser: User }) => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className=" flex flex-col gap-y-6 items-start group-data-[collapsible=icon]:hidden">
          {/* Coin Purchase Section - Always show for users to buy more coins */}
          <div className=" flex flex-col items-start p-2 pb-3 gap-4 bg-background-80 rounded-xl">
            <div className=" flex flex-col items-start gap-1">
              <p className=" text-base font-bold">
                Need More <span className="text-vivid">Coins</span>?
              </p>
              <span className=" text-sm dark:text-secondary">
                Get coins to create amazing presentations
              </span>
            </div>
            <div className=" w-full bg-vivid-gradient p-[1px] rounded-full">
              <CoinPurchase prismaUser={prismaUser} />
            </div>
          </div>
          
          <SignedIn>
            {/* <div className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 h-12 text-sm group-data-[collapsible=icon]:!size-8">
              <UserButton />
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">{user?.fullName}</span>
                <span className=" truncate text-secondary">
                  {user?.emailAddresses[0].emailAddress}
                </span>
              </div>
            </div> */}
          </SignedIn>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavFooter;
