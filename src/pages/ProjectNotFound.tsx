import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProject } from "@/contexts/ProjectContext";

const ProjectNotFound = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { invalidProjectId, projects, setCurrentProject } = useProject();
    // const hasProjects = projects.length > 0;

    const handleGoHome = () => {
        const firstProject = projects[0];

        if (!firstProject) {
            navigate("/", { replace: true });
            return;
        }

        setCurrentProject(firstProject);
        navigate(`/${firstProject.id}`, { replace: true });
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                p: 3,
                textAlign: "center",
            }}
        >
            <Typography variant="h4">{t("project.not_found_title")}</Typography>
            <Typography color="text.secondary">
                {invalidProjectId
                    ? t("project.not_found_invalid", { projectId: invalidProjectId })
                    : t("project.not_found_empty")}
            </Typography>

            <Button variant="contained" onClick={handleGoHome}>
                {t("project.back_to_home")}
            </Button>

        </Box>
    );
};

export default ProjectNotFound;