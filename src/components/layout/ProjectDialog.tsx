import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ProjectService } from "@/api/services/project";
import type { ProjectCreateRequest } from "@/api/types/project";
import { useProject } from "@/contexts/ProjectContext";
import useLoading from "@/hooks/useLoading";

type ProjectDialogProps = {
    open: boolean;
    onClose: () => void;
};

const EMPTY_FORM: ProjectCreateRequest = {
    name: "",
    description: "",
};

const ProjectDialog = ({ open, onClose }: ProjectDialogProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setCurrentProject, refreshProjects } = useProject();
    const [form, setForm] = useState<ProjectCreateRequest>(EMPTY_FORM);
    const [errorMessage, setErrorMessage] = useState("");
    const { loading, startLoading, stopLoading } = useLoading();

    useEffect(() => {
        if (open) {
            setForm(EMPTY_FORM);
            setErrorMessage("");
        }
    }, [open]);

    const handleChange = (field: keyof ProjectCreateRequest, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        const name = form.name.trim();
        const description = form.description.trim();

        if (!name) {
            setErrorMessage(t("project.name_required"));
            return;
        }

        try {
            startLoading();
            setErrorMessage("");

            const createdProject = await ProjectService.CREATE({
                name,
                description,
            });

            await refreshProjects();
            setCurrentProject(createdProject);
            navigate(`/${createdProject.id}`, { replace: true });
            onClose();
        } catch (error) {
            console.error("Failed to create project", error);
            setErrorMessage(t("project.create_failed"));
        } finally {
            stopLoading();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={loading ? undefined : onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>{t("project.create_project")}</DialogTitle>
            <DialogContent>
                <Stack spacing={2.5} sx={{ pt: 1 }}>
                    <TextField
                        label={t("project.name")}
                        value={form.name}
                        onChange={(event) => handleChange("name", event.target.value)}
                        size="small"
                        fullWidth
                        required
                        error={Boolean(errorMessage && !form.name.trim())}
                    />
                    <TextField
                        label={t("project.description")}
                        value={form.description}
                        onChange={(event) => handleChange("description", event.target.value)}
                        size="small"
                        fullWidth
                        multiline
                        minRows={4}
                    />
                    {errorMessage && (
                        <Typography variant="body2" color="error.main">
                            {errorMessage}
                        </Typography>
                    )}
                </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose} color="inherit" disabled={loading}>
                    {t("common.cancel")}
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={16} color="inherit" /> : undefined}

                >
                    {t("project.create")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProjectDialog;



