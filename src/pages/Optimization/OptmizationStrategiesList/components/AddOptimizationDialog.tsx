import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TitleText from "@/components/TitleText";
import { type OptimizerList } from "@/api/types/shared";
import useFormState from "@/hooks/useFormState";
import { useEffect } from "react";
import optimizationService from "@/api/services/optimization";

interface AddOptimizationDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void | Promise<void>;
}

const initialForm = {
    optimization_name: "",
    optimizer: "particle_swarm_optimization" as OptimizerList,
    objective: "MIN_POWER" as const,
    remarks: "",
};

const optimizerOptions: Array<{ value: OptimizerList; label: string }> = [
    { value: "differential_evolution", label: "差分進化" },
    { value: "genetic_algorithm", label: "遺傳演算法" },
    { value: "particle_swarm_optimization", label: "粒子群最佳化" },
    { value: "cma_es", label: "CMA-ES" },
    { value: "slsqp", label: "SLSQP" },
    { value: "gwo", label: "灰狼最佳化" },
];

const AddOptimizationDialog = ({ open, onClose, onSuccess }: AddOptimizationDialogProps) => {
    const { form, submitting, errorMessage, handleChange, resetForm, setSubmitting, setErrorMessage } = useFormState(initialForm);

    useEffect(() => {
        if (!open) {
            resetForm();
        }
    }, [open]);

    const handleClose = () => {
        if (submitting) return;
        resetForm();
        onClose();
    };

    const canSubmit = !submitting && form.optimization_name.trim() !== "";

    const handleSubmit = async () => {
        if (!canSubmit) return;

        const payload = {
            optimization_name: form.optimization_name.trim(),
            optimizer: form.optimizer,
            objective: form.objective,
            remarks: form.remarks.trim(),
        };

        try {
            setSubmitting(true);
            setErrorMessage("");

            await optimizationService.create({
                ...payload,
            });

            // console.log(payload);

            resetForm();
            await onSuccess?.();
            onClose();
        } catch (error: any) {
            setErrorMessage(`新增失敗：${error?.message ?? "請稍後再試"}`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <TitleText title="新增最佳化" />
                <IconButton onClick={handleClose} disabled={submitting} size="small">
                    <CloseIcon fontSize="small" />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 2 }}>
                <Box sx={{ display: "grid", gap: 2, mt: 1 }}>
                    <TextField
                        fullWidth
                        required
                        label="最佳化名稱"
                        value={form.optimization_name}
                        onChange={(event) => handleChange("optimization_name", event.target.value)}
                        disabled={submitting}
                        slotProps={{ htmlInput: { maxLength: 100 } }}
                    />

                    <TextField
                        select
                        fullWidth
                        label="最佳化方法"
                        value={form.optimizer}
                        onChange={(event) => handleChange("optimizer", event.target.value as OptimizerList)}
                        disabled={submitting}
                    >
                        {optimizerOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        fullWidth
                        label="目標"
                        value={form.objective}
                        onChange={(event) => handleChange("objective", event.target.value as "MIN_POWER")}
                        disabled={submitting}
                    >
                        <MenuItem value="MIN_POWER">最小功率</MenuItem>
                    </TextField>

                    <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        label="備註"
                        value={form.remarks}
                        onChange={(event) => handleChange("remarks", event.target.value)}
                        disabled={submitting}
                        slotProps={{ htmlInput: { maxLength: 500 } }}
                    />

                    {errorMessage && (
                        <Typography variant="body2" color="error">
                            {errorMessage}
                        </Typography>
                    )}
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={handleClose} disabled={submitting}>取消</Button>
                <Button variant="contained" onClick={handleSubmit} disabled={submitting || !canSubmit}>
                    {submitting ? "新增中..." : "新增"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddOptimizationDialog;