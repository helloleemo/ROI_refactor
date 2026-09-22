import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "../components/layout/Layout"
import { useProject } from "@/contexts/ProjectContext";
import ProjectNotFound from "./ProjectNotFound";


const Index = () => {
    const { invalidProjectId } = useProject();

    // project settings
    const { projectSettings, enabledLocales, supportedLocales } = useLanguage();
    console.log("projectSettings", projectSettings)

    return invalidProjectId ? <ProjectNotFound /> : <Layout />;
}

export default Index