import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProject } from "@/contexts/ProjectContext";
import ProjectDialog from "@/components/layout/ProjectDialog";

const ProjectNotFound = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { invalidProjectId, projects, setCurrentProject } = useProject();
    const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
    const hasNoProjects = projects.length === 0;

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
            <Typography variant="h4">
                {hasNoProjects ? t("project.empty_title") : t("project.not_found_title")}
            </Typography>
            <Typography color="text.secondary">
                {hasNoProjects
                    ? t("project.empty_description")
                    : t("project.not_found_invalid", { projectId: invalidProjectId })}
            </Typography>

            <Button
                variant="contained"
                onClick={hasNoProjects ? () => setCreateDialogOpen(true) : handleGoHome}
            >
                {hasNoProjects ? t("project.create_project") : t("project.back_to_home")}
            </Button>

            <ProjectDialog
                open={isCreateDialogOpen}
                onClose={() => setCreateDialogOpen(false)}
            />
        </Box>
    );
};

export default ProjectNotFound;