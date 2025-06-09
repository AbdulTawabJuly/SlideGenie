"use client";

import { Avatar } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Project, User } from "@prisma/client";
import { Sparkles } from "lucide-react";

import React from "react";
import NavMain from "./nav-main";
import { data } from "@/lib/constants";
import RecentOpen from "./recent-open";
import NavFooter from "./nav-footer";

const AppSidebar = ({
  recentProjects,
  user,
  ...props
}: { recentProjects: Project[] } & { user: User } & React.ComponentProps<
    typeof Sidebar
  >) => {
  return (
    <Sidebar
      collapsible="icon"
      className="max-w-[212px] bg-background-90"
      {...props}
    >
      <SidebarHeader className="pt-6 px-2 pb-0">
        <SidebarMenuButton
          size={"lg"}
          className="data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
            <Avatar className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </Avatar>
          </div>
          <span
            className=" text-primary text-2xl font-semibold ml-2 mb-2 truncate"
            style={{
              fontFamily: "var(--font-noto-nastaliq-urdu)",
              fontWeight: 700,
              direction: "rtl",
              display: "inline-block", // Ensure the span behaves like a block for width control
              width: "fit-content", // Allow the span to size itself based on content
              overflow: "visible", // Ensure no text is cut off
            }}
          >
            Slide Genie
          </span>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className=" px-2 mt-10 gap-y-6">
        <NavMain items={data.navMain} />
        <RecentOpen recentProjects={recentProjects} />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter prismaUser={user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
