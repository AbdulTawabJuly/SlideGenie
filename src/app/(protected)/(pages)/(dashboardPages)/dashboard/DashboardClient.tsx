"use client";

import { onAuthenticateUser } from "@/actions/user";
import { useUserStore } from "@/store/useUserStore";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
};

const DashboardClient = ({ children }: Props) => {
  const searchParams = useSearchParams();
  const { setUser } = useUserStore();
  const purchaseStatus = searchParams.get("purchase");

  useEffect(() => {
    if (purchaseStatus === "success") {
      // Refresh user data to get updated coin balance
      const refreshUserData = async () => {
        try {
          const auth = await onAuthenticateUser();
          if (auth.user) {
            setUser(auth.user);
            toast.success("Payment successful! Your coins have been added to your account.");
          }
        } catch (error) {
          // Only log errors that aren't from browser extensions
          const errorMessage = error instanceof Error ? error.message : String(error);
          if (!errorMessage.includes('chrome-extension://')) {
            console.error("Error refreshing user data:", error);
          }
        }
      };

      refreshUserData();

      // Clean up URL by removing the purchase parameter
      const url = new URL(window.location.href);
      url.searchParams.delete("purchase");
      window.history.replaceState({}, "", url.toString());
    }
  }, [purchaseStatus, setUser]);

  return <>{children}</>;
};

export default DashboardClient; 