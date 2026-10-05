import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "../components/layout/Layout"
import { useProject } from "@/contexts/ProjectContext";
import ProjectNotFound from "./ProjectNotFound";


const Index = () => {
    const { invalidProjectId, projects } = useProject();

    // project settings
    const { projectSettings } = useLanguage();
    console.log("projectSettings", projectSettings)

    const hasNoProjects = projects.length === 0;

    return invalidProjectId || hasNoProjects ? <ProjectNotFound /> : <Layout />;
}

export default Index