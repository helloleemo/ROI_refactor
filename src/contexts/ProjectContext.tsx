import type { ProjectListItem } from "@/api/types/project";
import { createContext, useState, useEffect, useContext } from "react";
import { ProjectService } from "@/api/services/project";

interface ProjectContextValue {
    projects: ProjectListItem[];
    currentProject?: ProjectListItem;
    setCurrentProject: (project: ProjectListItem) => void;
}


const ProjectContext = createContext<ProjectContextValue | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
    const [projects, setProjects] = useState<ProjectListItem[]>([]);
    const [currentProject, setCurrentProjectState] = useState<ProjectListItem>();
    const [isReady, setIsReady] = useState(false);

    const setCurrentProject = (project: ProjectListItem) => {
        setCurrentProjectState(project);
        sessionStorage.setItem("projectId", String(project.id));
    };

    const loadProjects = async () => {
        try {
            const allProjects = await ProjectService.GET();
            console.log("All projects loaded:", allProjects);
            setProjects(allProjects);

            if (allProjects.length === 0) {
                sessionStorage.removeItem("projectId");
                return;
            }

            const storedProjectId = sessionStorage.getItem("projectId");
            const storedProject = allProjects.find(
                (project) => String(project.id) === storedProjectId,
            );

            setCurrentProject(storedProject ?? allProjects[0]);
        }
        catch (error) {
            console.error("Failed to load all projects", error);
        }
        finally {
            setIsReady(true);
        }
    }




    useEffect(() => {
        loadProjects();
    }, []);


    return (
        <ProjectContext.Provider value={{ projects, currentProject, setCurrentProject }}>
            {isReady ? children : null}
        </ProjectContext.Provider>
    );
}

export function useProject() {
    const context = useContext(ProjectContext);

    if (!context) {
        throw new Error("useProject must be used within ProjectProvider");
    }

    return context;
}