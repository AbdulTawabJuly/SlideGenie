import { getAllProjects } from "@/actions/project";
import React from "react";
import DashboardClient from "./DashboardClient";

const DashboardPage = async () => {
  console.log("DashboardPage is rendering");
  const allProjects = await getAllProjects();
  
  return (
    <DashboardClient projects={allProjects.data ? allProjects.data : []} />
  );
};

export default DashboardPage;