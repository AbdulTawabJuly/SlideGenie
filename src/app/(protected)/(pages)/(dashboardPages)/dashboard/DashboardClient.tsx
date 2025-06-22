"use client";

import { onAuthenticateUser } from "@/actions/user";
import { useUserStore } from "@/store/useUserStore";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Project } from "@prisma/client";
import Projects from "@/components/global/projects";
import ProjectNotFound from "@/components/global/not-found";
import { useUser } from "@clerk/nextjs";

type Props = {
  projects: Project[];
};

const DashboardClient = ({ projects }: Props) => {
  const searchParams = useSearchParams();
  const { setUser } = useUserStore();
  const purchaseStatus = searchParams.get("purchase");
  const searchQuery = searchParams.get("search") || "";
  const [isLoadingUser, setIsLoadingUser] = useState(purchaseStatus === "success");
  const { user, isLoaded } = useUser();

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) {
      return projects;
    }
    
    return projects.filter(project => 
      project.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [projects, searchQuery]);

  console.log("Clerk Entities : ",user , isLoaded);

  // useEffect(() => {
  //   if (purchaseStatus === "success") {
  //     const refreshUserData = async () => {
  //       try {
  //         const auth = await onAuthenticateUser();
  //         if (auth.user) {
  //           useUserStore.getState().updateUserCoins(auth.user.coins, true);
  //           setUser(auth.user);
  //           toast.success("Payment successful! Your coins have been added to your account.");
  //         }
  //       } catch (error) {
  //         const errorMessage = error instanceof Error ? error.message : String(error);
  //         if (!errorMessage.includes('chrome-extension://')) {
  //           console.error("Error refreshing user data:", error);
  //         }
  //       } finally {
  //         setIsLoadingUser(false);
  //       }
  //     };

  //     refreshUserData();

  //     const url = new URL(window.location.href);
  //     url.searchParams.delete("purchase");
  //     window.history.replaceState({}, "", url.toString());
  //   } else {
  //     const ensureUserData = async () => {
  //       try {
  //         const auth = await onAuthenticateUser();
  //         if (auth.user) {
  //           setUser(auth.user);
  //         }
  //       } catch (error) {
  //         console.error("Error ensuring user data:", error);
  //       } finally {
  //         setIsLoadingUser(false);
  //       }
  //     };
  //     ensureUserData();
  //   }
  // }, [purchaseStatus, setUser]);

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      window.location.href = "/sign-in?error=no_user";
      return;
    }

    const refreshUserData = async () => {
      try {
        const response = await fetch("/api/user"); // Create an API route to fetch user data
        const auth = await response.json();
        if (auth.user) {
          setUser(auth.user);
          if (purchaseStatus === "success") {
            toast.success("Payment successful! Your coins have been added to your account.");
          }
        }
      } catch (error) {
        console.error("Error refreshing user data:", error);
      } finally {
        setIsLoadingUser(false);
      }
    };

    refreshUserData();

    if (purchaseStatus === "success") {
      const url = new URL(window.location.href);
      url.searchParams.delete("purchase");
      window.history.replaceState({}, "", url.toString());
    }
  }, [isLoaded, user, purchaseStatus, setUser]);

  if (isLoadingUser) {
    return (
      <div className="w-full flex flex-col gap-6 relative md:p-0 p-4">
        <div className="flex flex-col-reverse items-start w-full gap-6 sm:flex-row sm:justify-between sm:items-center">
          <div className="flex flex-col items-start ml-2">
            <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">
              Projects
            </h1>
            <p className="text-base font-normal dark:text-secondary">
              Loading your dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 relative md:p-0 p-4">
      <div className="flex flex-col-reverse items-start w-full gap-6 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex flex-col items-start ml-2">
          <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">
            Projects
          </h1>
          <p className="text-base font-normal dark:text-secondary">
            {searchQuery 
              ? `Search results for "${searchQuery}" (${filteredProjects.length} found)`
              : "All of your work in one place"
            }
          </p>
        </div>
      </div>

      {filteredProjects && filteredProjects.length > 0 ? (
        <Projects projects={filteredProjects} />
      ) : searchQuery ? (
        <div className="text-center">
          <ProjectNotFound className="py-8" />
          <p className="text-sm text-muted-foreground -mt-28">
            Try adjusting your search terms or create a new project.
          </p>
        </div>
      ) : (
        <ProjectNotFound />
      )}
    </div>
  );
};

export default DashboardClient;