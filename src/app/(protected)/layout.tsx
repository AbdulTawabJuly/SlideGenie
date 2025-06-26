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
      const auth = await onAuthenticateUser();
      if (!auth.user) {
        redirect("/sign-in");
      } else {
        setUser(auth.user);
      }
    };

    authenticateAndSetUser();
  }, [setUser]);

  return <div className="w-full min-h-screen">{children}</div>;
};

export default Layout;
