import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectService } from "@/api/services/project";
import type { ProjectCreateRequest, ProjectListItem } from "@/api/types/project";
import { useProject } from "@/contexts/ProjectContext";
import { showToast } from "../ToasterCustom";
import toasterWording from "@/settings/toasterWording";

type ProjectDuplicateDialogProps = {
    open: boolean;
    project: ProjectListItem | null;
    onClose: () => void;
};

const EMPTY_FORM: ProjectCreateRequest = {
    name: "",
    description: "",
};

const ProjectDuplicateDialog = ({ open, project, onClose }: ProjectDuplicateDialogProps) => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const { refreshProjects, setCurrentProject } = useProject();
    const [form, setForm] = useState<ProjectCreateRequest>(EMPTY_FORM);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (open && project) {
            setForm({
                name: project.name,
                description: project.description,
            });
        }
    }, [open, project]);

    const handleChange = (field: keyof ProjectCreateRequest, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!project) return;

        const name = form.name.trim();
        if (!name) return;

        try {
            setSubmitting(true);

            const duplicatedProject = await ProjectService.DUPLICATE({
                project_id: project.id,
                name,
                description: form.description.trim(),
            });

            await refreshProjects();
            setCurrentProject(duplicatedProject);
            navigate(`/${duplicatedProject.id}`, { replace: true });
            showToast(t(toasterWording.success.project_duplicate), "success");
            onClose();
        } catch (error) {
            console.error("Failed to duplicate project", error);
            showToast(t(`${toasterWording.error.project_duplicate}: ${error}`), "error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={submitting ? undefined : onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>{t("project.duplicate_project")}</DialogTitle>
            <DialogContent>
                {project ? (
                    <Stack spacing={2.5} sx={{ pt: 1 }}>
                        <TextField
                            label={t("project.name")}
                            value={form.name}
                            onChange={(event) => handleChange("name", event.target.value)}
                            size="small"
                            fullWidth
                            required
                            disabled={submitting}
                            error={Boolean(!form.name.trim() && !submitting)}
                        />
                        <TextField
                            label={t("project.description")}
                            value={form.description}
                            onChange={(event) => handleChange("description", event.target.value)}
                            size="small"
                            fullWidth
                            multiline
                            minRows={4}
                            disabled={submitting}
                        />
                    </Stack>
                ) : null}
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose} color="inherit" disabled={submitting}>
                    {t("common.cancel")}
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        void handleSubmit();
                    }}
                    disabled={submitting || !form.name.trim()}
                >
                    {submitting ? t("common.duplicating") : t("common.duplicate")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProjectDuplicateDialog;
