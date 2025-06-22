import { getAllProjects } from "@/actions/project";
import React from "react";
import DashboardClient from "./DashboardClient";

const DashboardPage = async () => {
  const allProjects = await getAllProjects();
  console.log("All Projects on Dashboard Page : ",allProjects);
  
  return (
    <DashboardClient projects={allProjects.data || []} />
  );
};

export default DashboardPage;