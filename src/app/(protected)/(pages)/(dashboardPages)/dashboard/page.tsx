import { getAllProjects } from "@/actions/project";
import React from "react";
import DashboardClient from "./DashboardClient";

const DashboardPage = async () => {
  try {
    console.log("Dashboard page: Starting to load...");
    const allProjects = await getAllProjects();
    console.log("Dashboard page - All Projects result:", allProjects);
    
    // Handle authentication failure
    if (allProjects.status === 403) {
      console.log("Dashboard page: User not authenticated");
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p>Authentication required. Please sign in.</p>
        </div>
      );
    }
    
    // Handle other errors
    if (allProjects.status !== 200) {
      console.log("Dashboard page: Error loading projects:", allProjects);
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p>Error loading dashboard.</p>
            <p className="text-sm text-gray-500">Status: {allProjects.status}</p>
          </div>
        </div>
      );
    }
    
    console.log("Dashboard page: Rendering DashboardClient with", allProjects.data?.length || 0, "projects");
    return (
      <DashboardClient projects={allProjects.data || []} />
    );
  } catch (error) {
    console.error("Dashboard page: Unexpected error:", error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p>Something went wrong loading the dashboard.</p>
          <p className="text-sm text-gray-500">Check the logs for details.</p>
        </div>
      </div>
    );
  }
};

export default DashboardPage;