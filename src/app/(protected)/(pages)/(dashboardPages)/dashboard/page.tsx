import { getAllProjects } from "@/actions/project";
import React from "react";

const DashboardPage = async () => {
  const allProjects = await getAllProjects();
  return <div>DashboardPage</div>;
};

export default DashboardPage;
  