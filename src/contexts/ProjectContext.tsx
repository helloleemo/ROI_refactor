import type { ProjectListItem } from "@/api/types/project";
import { createContext, useState, useEffect, useContext } from "react";
import { ProjectService } from "@/api/services/project";

interface ProjectContextValue {
    projects: ProjectListItem[];
    currentProject?: ProjectListItem;
    invalidProjectId?: string;
    setCurrentProject: (project: ProjectListItem) => void;
    refreshProjects: () => Promise<ProjectListItem[]>;
}


const ProjectContext = createContext<ProjectContextValue | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
    const [projects, setProjects] = useState<ProjectListItem[]>([]);
    const [currentProject, setCurrentProjectState] = useState<ProjectListItem>();
    const [invalidProjectId, setInvalidProjectId] = useState<string>();
    const [isReady, setIsReady] = useState(false);

    const setCurrentProject = (project: ProjectListItem) => {
        setCurrentProjectState(project);
        setInvalidProjectId(undefined);
        sessionStorage.setItem("projectId", String(project.id));
    };

    const getRouteProjectId = () => {
        const firstPathSegment = window.location.pathname.split("/")[1];
        return firstPathSegment || undefined;
    };

    const loadProjects = async () => {
        try {
            const allProjects = await ProjectService.GET();
            console.log("All projects loaded:", allProjects);
            setProjects(allProjects);

            if (allProjects.length === 0) {
                setCurrentProjectState(undefined);
                setInvalidProjectId(undefined);
                sessionStorage.removeItem("projectId");
                return allProjects;
            }

            const routeProjectId = getRouteProjectId();
            const storedProjectId = sessionStorage.getItem("projectId");
            const routeProject = allProjects.find(
                (project) => String(project.id) === routeProjectId,
            );
            const storedProject = allProjects.find(
                (project) => String(project.id) === storedProjectId,
            );

            if (routeProjectId && !routeProject) {
                setInvalidProjectId(routeProjectId);
            } else {
                setCurrentProject(routeProject ?? storedProject ?? allProjects[0]);
            }

            return allProjects;
        }
        catch (error) {
            console.error("Failed to load all projects", error);
            return [];
        }
        finally {
            setIsReady(true);
        }
    };

    const refreshProjects = async () => {
        const allProjects = await loadProjects();
        return allProjects;
    };

    useEffect(() => {
        void loadProjects();
    }, []);


    return (
        <ProjectContext.Provider value={{ projects, currentProject, invalidProjectId, setCurrentProject, refreshProjects }}>
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