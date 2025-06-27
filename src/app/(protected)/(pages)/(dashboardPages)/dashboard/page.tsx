import { getAllProjects } from "@/actions/project";
import { onAuthenticateUser } from "@/actions/user";
import React from "react";
import DashboardClient from "./DashboardClient";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  console.log("Dashboard Rendering ... ")
  
  const auth = await onAuthenticateUser();
  
  if (!auth.user) {
    redirect("/sign-in");
  }
  
  const allProjects = await getAllProjects();
  
  const projects = allProjects.data || [];
  
  return (
    <DashboardClient 
      projects={projects} 
      user={auth.user}
    />
  );
};

export default DashboardPage;