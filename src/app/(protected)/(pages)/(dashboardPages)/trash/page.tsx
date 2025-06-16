import React from "react";
import { getDeletedProjects } from "@/actions/project";
import ProjectNotFound from "@/components/global/not-found";
import TrashClient from "./TrashClient";

const Page = async () => {
  const deletedProjects = await getDeletedProjects();
  
  if (!deletedProjects.data) return <ProjectNotFound />;
  
  return <TrashClient projects={deletedProjects.data} />;
};

export default Page;
