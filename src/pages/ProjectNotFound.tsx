import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProject } from "@/contexts/ProjectContext";
import ProjectDialog from "@/components/layout/ProjectDialog";

const ProjectNotFound = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { invalidProjectId, projects, projectLoadError, refreshProjects, setCurrentProject } = useProject();
    const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
    const hasNoProjects = projects.length === 0;

    const handleGoHome = () => {
        const firstProject = projects[0];

        if (firstProject) {
            setCurrentProject(firstProject);
            navigate(`/${firstProject.id}`, { replace: true });
        } else {
            navigate("/", { replace: true });
        }
    };

    const page = projectLoadError
        ? {
            title: t("project.load_failed_title"),
            description: t("project.load_failed_description"),
            action: t("project.retry"),
            onAction: () => void refreshProjects(),
        }
        : hasNoProjects
            ? {
                title: t("project.empty_title"),
                description: t("project.empty_description"),
                action: t("project.create_project"),
                onAction: () => setCreateDialogOpen(true),
            }
            : {
                title: t("project.not_found_title"),
                description: t("project.not_found_invalid", { projectId: invalidProjectId }),
                action: t("project.back_to_home"),
                onAction: handleGoHome,
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
            <Typography variant="h4">{page.title}</Typography>
            <Typography color="text.secondary">{page.description}</Typography>
            <Button variant="contained" onClick={page.onAction}>{page.action}</Button>

            <ProjectDialog
                open={isCreateDialogOpen}
                onClose={() => setCreateDialogOpen(false)}
            />
        </Box>
    );
};

export default ProjectNotFound;