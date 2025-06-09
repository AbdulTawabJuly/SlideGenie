"use client";
import { buySubscription } from "@/actions/lemonSqueezy";
import { UserButton } from "@/app/(auth)/user-button/page";
import { Button } from "@/components/ui/button";
import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SignedIn, useUser } from "@clerk/nextjs";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const NavFooter = ({ prismaUser }: { prismaUser: User }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const handleUpgrading = async () => {
    setLoading(true);
    try {
      const res = await buySubscription(prismaUser.id);
      if (res.status !== 200) {
        throw new Error("Failed to upgrade subscription");
      }
      router.push(res.url);
    } catch (error) {
      console.error(error);
      toast.error("Error", {
        description: "Failed to upgrade subscription. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className=" flex flex-col gap-y-6 items-start group-data-[collapsible=icon]:hidden">
          {!prismaUser.subscription && (
            <div className=" flex flex-col items-start p-2 pb-3 gap-4 bg-background-80 rounded-xl">
              <div className=" flex flex-col items-start gap-1">
                <p className=" text-base font-bold">
                  Get <span className="text-vivid">Full Access</span>
                </p>
                <span className=" text-sm dark:text-secondary">
                  Unlock All Premium Features
                </span>
              </div>
              <div className=" w-full bg-vivid-gradient p-[1px] rounded-full">
                <Button
                  className="w-full border-vivid bg-background-80 hover:bg-background-90 text-primary rounded-full font-bold"
                  variant={"default"}
                  size={"lg"}
                  onClick={handleUpgrading}
                >
                  {loading ? "Upgrading ..." : "Upgrade"}
                </Button>
              </div>
            </div>
          )}
          <SignedIn>
            <div className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 h-12 text-sm group-data-[collapsible=icon]:!size-8">
              <UserButton />
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">{user?.fullName}</span>
                <span className=" truncate text-secondary">
                  {user?.emailAddresses[0].emailAddress}
                </span>
              </div>
            </div>
          </SignedIn>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavFooter;
