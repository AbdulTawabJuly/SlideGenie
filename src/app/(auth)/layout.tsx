import { AnimatedBackground } from "@/components/global/landing-page";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center relative">
      <AnimatedBackground />
      <div className="relative z-10 w-full flex justify-center">
        {children}
      </div>
    </div>
  );
};

export default Layout;
