"use client";

import { onAuthenticateUser } from "@/actions/user";
import { useUserStore } from "@/store/useUserStore";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

export const dynamic = "force-dynamic";

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => {
  const { setUser } = useUserStore();

  useEffect(() => {
    const authenticateAndSetUser = async () => {
      console.log("Protected layout: Starting authentication check...");
      const auth = await onAuthenticateUser();
      console.log("Protected layout auth result:", auth, "User exists:", !!auth.user);
      
      if (!auth.user) {
        console.log("Protected layout: No user found, redirecting to sign-in");
        redirect("/sign-in");
      } else {
        console.log("Protected layout: User found, setting user in store");
        setUser(auth.user);
      }
    };

    authenticateAndSetUser();
  }, [setUser]);

  return <div className="w-full min-h-screen">{children}</div>;
};

export default Layout;