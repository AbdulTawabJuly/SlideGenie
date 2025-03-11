"use client";
// import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";




const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isLight = theme === "light";


  return (
    // <div>
    //   <Switch checked ={theme === "light"} className="h-10 w-20 pl-1 data-[state=checked]:bg-primary-80" onCheckedChange={()=>setTheme(theme === "dark" ? "light":"dark")}
    //     aria-label="Toggle dark mode"
    //     />
    // </div>
    <div className="flex items-center justify-center">
      <SwitchPrimitives.Root
        checked={isLight}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={cn(
          "relative inline-flex h-10 w-20 rounded-full bg-gray-200/80 dark:bg-gray-800/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "data-[state=checked]:bg-primary-80"
        )}
        aria-label="Toggle dark mode"
      >
        <SwitchPrimitives.Thumb
          className={cn(
            "pointer-events-none block size-8 rounded-full shadow-lg ring-0 transition-transform duration-200",
            "flex items-center justify-center m-1",
            "data-[state=checked]:translate-x-10 data-[state=checked]:bg-white data-[state=unchecked]:translate-x-1 data-[state=unchecked]:bg-gray-700/90"
          )}
        >
          {isLight ? (
            <Sun className="size-5 text-amber-500" />
          ) : (
            <Moon className="size-5 text-blue-200" />
          )}
        </SwitchPrimitives.Thumb>
      </SwitchPrimitives.Root>
    </div>
  );
};

export default ThemeSwitcher;
