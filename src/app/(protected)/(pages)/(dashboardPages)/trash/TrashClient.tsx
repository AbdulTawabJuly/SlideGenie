"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Project } from "@prisma/client";
import Projects from "@/components/global/projects";
import ProjectNotFound from "@/components/global/not-found";
import DeleteAllButton from "./_components/DeleteAllButton";

type Props = {
  projects: Project[];
};

const TrashClient = ({ projects }: Props) => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // Filter projects based on search query
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) {
      return projects;
    }
    
    return projects.filter(project => 
      project.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [projects, searchQuery]);

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">
            Trash
          </h1>
          <p className="text-base font-normal dark:text-secondary">
            {searchQuery 
              ? `Search results for "${searchQuery}" (${filteredProjects.length} found)`
              : "All your Deleted Presentation"
            }
          </p>
        </div>

        <DeleteAllButton Projects={projects} />
      </div>
      
      {filteredProjects && filteredProjects.length > 0 ? (
        <Projects projects={filteredProjects} />
      ) : searchQuery ? (
        <div className="text-center">
          <ProjectNotFound className="py-8" />
          <p className="text-sm text-muted-foreground -mt-4">
            Try adjusting your search terms.
          </p>
        </div>
      ) : (
        <ProjectNotFound />
      )}
    </div>
  );
};

export default TrashClient; 