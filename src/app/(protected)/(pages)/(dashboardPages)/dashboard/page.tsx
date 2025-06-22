import { getAllProjects } from "@/actions/project";
import React from "react";
import DashboardClient from "./DashboardClient";

const DashboardPage = async () => {
  console.log("Dashboard page: Starting to load...");
  const allProjects = await getAllProjects();
  console.log("Dashboard page - All Projects result:", allProjects);
  
  // Handle authentication failure
  if (allProjects.status === 403) {
    console.log("Dashboard page: User not authenticated, redirecting...");
    // Don't redirect here - let the protected layout handle it
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Authentication required. Please sign in.</p>
      </div>
    );
  }
  
  return (
    <DashboardClient projects={allProjects.data || []} />
  );
};

export default DashboardPage;