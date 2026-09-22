import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectService } from "@/api/services/project";
import type { ProjectCreateRequest } from "@/api/types/project";
import { useProject } from "@/contexts/ProjectContext";

type ProjectDialogProps = {
    open: boolean;
    onClose: () => void;
};

const EMPTY_FORM: ProjectCreateRequest = {
    name: "",
    description: "",
};

const ProjectDialog = ({ open, onClose }: ProjectDialogProps) => {
    const navigate = useNavigate();
    const { setCurrentProject, refreshProjects } = useProject();
    const [form, setForm] = useState<ProjectCreateRequest>(EMPTY_FORM);
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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
            setErrorMessage("請輸入專案名稱");
            return;
        }

        try {
            setSubmitting(true);
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
            setErrorMessage("建立專案失敗，請稍後再試");
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
            <DialogTitle>新增專案</DialogTitle>
            <DialogContent>
                <Stack spacing={2.5} sx={{ pt: 1 }}>
                    <TextField
                        label="名稱"
                        value={form.name}
                        onChange={(event) => handleChange("name", event.target.value)}
                        size="small"
                        fullWidth
                        required
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
                    />
                    {errorMessage && (
                        <Typography variant="body2" color="error.main">
                            {errorMessage}
                        </Typography>
                    )}
                </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose} color="inherit" disabled={submitting}>
                    取消
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={submitting}
                >
                    {submitting ? "建立中..." : "建立"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProjectDialog;



