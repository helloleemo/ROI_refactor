import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectService } from "@/api/services/project";
import type { ProjectListItem, ProjectUpdateRequest } from "@/api/types/project";
import { useProject } from "@/contexts/ProjectContext";

type ProjectEditDialogProps = {
    open: boolean;
    project: ProjectListItem | null;
    onClose: () => void;
};

const EMPTY_FORM: ProjectUpdateRequest = {
    name: "",
    description: "",
    status: 1,
};

const ProjectEditDialog = ({ open, project, onClose }: ProjectEditDialogProps) => {
    const navigate = useNavigate();
    const { refreshProjects, setCurrentProject } = useProject();
    const [form, setForm] = useState<ProjectUpdateRequest>(EMPTY_FORM);
    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (open && project) {
            setForm({
                name: project.name,
                description: project.description,
                status: project.status ?? 1,
            });
            setErrorMessage("");
        }
    }, [open, project]);

    const handleChange = (field: keyof ProjectUpdateRequest, value: string | number) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!project) return;

        const name = form.name.trim();
        if (!name) {
            setErrorMessage("請輸入專案名稱");
            return;
        }

        try {
            setSubmitting(true);
            setErrorMessage("");

            const updatedProject = await ProjectService.UPDATE(String(project.id), {
                name,
                description: form.description.trim(),
                status: form.status ?? 1,
            });

            await refreshProjects();
            setCurrentProject(updatedProject);
            onClose();
        } catch (error) {
            console.error("Failed to update project", error);
            setErrorMessage("更新專案失敗，請稍後再試");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!project) return;

        try {
            setDeleting(true);
            setErrorMessage("");

            await ProjectService.DELETE(String(project.id));
            const nextProjects = await refreshProjects();
            const fallbackProject = nextProjects.find((item) => String(item.id) !== String(project.id)) ?? nextProjects[0];

            if (fallbackProject) {
                setCurrentProject(fallbackProject);
                navigate(`/${fallbackProject.id}`, { replace: true });
            }

            onClose();
        } catch (error) {
            console.error("Failed to delete project", error);
            setErrorMessage("刪除專案失敗，請稍後再試");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={submitting || deleting ? undefined : onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>編輯專案</DialogTitle>
            <DialogContent>
                {project ? (
                    <Stack spacing={2.5} sx={{ pt: 1 }}>
                        <TextField
                            label="名稱"
                            value={form.name}
                            onChange={(event) => handleChange("name", event.target.value)}
                            size="small"
                            fullWidth
                            required
                            disabled={submitting || deleting}
                            error={Boolean(errorMessage && !form.name.trim())}
                        />
                        <TextField
                            label="描述"
                            value={form.description}
                            onChange={(event) => handleChange("description", event.target.value)}
                            size="small"
                            fullWidth
                            multiline
                            minRows={4}
                            disabled={submitting || deleting}
                        />
                        {errorMessage && (
                            <Typography variant="body2" color="error.main">
                                {errorMessage}
                            </Typography>
                        )}
                    </Stack>
                ) : null}
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button
                    color="error"
                    variant="outlined"
                    startIcon={<DeleteOutlineIcon />}
                    onClick={() => {
                        void handleDelete();
                    }}
                    disabled={submitting || deleting || !project}
                >
                    {deleting ? "刪除中..." : "刪除"}
                </Button>

                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button onClick={onClose} color="inherit" disabled={submitting || deleting}>
                        取消
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            void handleSubmit();
                        }}
                        disabled={submitting || deleting}
                    >
                        {submitting ? "更新中..." : "更新"}
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default ProjectEditDialog;
