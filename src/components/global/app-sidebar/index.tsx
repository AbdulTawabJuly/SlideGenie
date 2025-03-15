"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Project, User } from "@prisma/client";
import { Presentation } from "lucide-react";

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
            <Avatar className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Presentation className="h-6 w-6 text-black" />
              {/* <AvatarFallback className="rounded-lg">SG</AvatarFallback> */}
            </Avatar>
          </div>
          {/* <span className="truncate text-primary text-xl font-semibold ml-2">
            Slide Genie
          </span> */}
          <span
            className=" text-primary text-2xl font-semibold ml-2 mb-2"
            style={{
              fontFamily: "var(--font-noto-nastaliq-urdu)",
              fontWeight: 700,
              direction: "rtl",
              display: "inline-block", // Ensure the span behaves like a block for width control
              width: "fit-content", // Allow the span to size itself based on content
              overflow: "visible", // Ensure no text is cut off
            }}
          >
            سلائیڈ جینی
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
