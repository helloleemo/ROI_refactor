import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "../components/layout/Layout"


const Index = () => {

    // project settings
    const { projectSettings, enabledLocales, supportedLocales } = useLanguage();
    console.log("projectSettings", projectSettings)

    return (
        <Layout />
    )
}

export default Index