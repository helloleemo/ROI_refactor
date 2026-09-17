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
import { useEffect } from "react";
import equipmentService from "@/api/services/equipment";
import type { EquipementResponse } from "@/api/types/equipment";
import useFormState from "@/hooks/useFormState";
import TitleText from "@/components/TitleText";

interface EquipmentEditDialogProps {
    open: boolean;
    onClose: () => void;
    equipment: EquipementResponse | null;
    onSuccess?: () => void | Promise<void>;
}

const initialForm = {
    equipment_type: "",
    equipment_name: "",
    status: 1 as const,
    remarks: "",
};

const EquipmentEditDialog = ({ open, onClose, equipment, onSuccess }: EquipmentEditDialogProps) => {
    const { form, submitting, errorMessage, handleChange, resetForm, setSubmitting, setErrorMessage } = useFormState(initialForm);

    useEffect(() => {
        if (open && equipment) {
            resetForm();
            handleChange("equipment_type", equipment.equipment_type);
            handleChange("equipment_name", equipment.equipment_name);
            // handleChange("status", equipment.status ?? 1);
            handleChange("remarks", equipment.remarks);
            return;
        }

        if (!open) {
            resetForm();
        }
    }, [open, equipment]);

    const handleClose = () => {
        if (submitting) return;
        resetForm();
        onClose();
    };

    const canSubmit = !submitting && form.equipment_type !== "" && form.equipment_name.trim() !== "";

    const handleSubmit = async () => {
        if (!canSubmit || !equipment) return;

        try {
            setSubmitting(true);
            setErrorMessage("");

            await equipmentService.update({
                id: equipment.id,
                equipment_type: form.equipment_type,
                equipment_name: form.equipment_name,
                status: 1,
                remarks: form.remarks.trim(),
            });

            resetForm();
            await onSuccess?.();
            onClose();
        } catch (error: any) {
            setErrorMessage(`更新失敗：${error?.message ?? "請稍後再試"}`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <TitleText title="編輯設備" />
                <IconButton onClick={handleClose} disabled={submitting} size="small">
                    <CloseIcon fontSize="small" />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 2 }}>
                <Box sx={{ display: "grid", gap: 2, mt: 1 }}>
                    <TextField
                        fullWidth
                        required
                        label="設備類型"
                        value={form.equipment_type}
                        onChange={(event) => handleChange("equipment_type", event.target.value)}
                        disabled={submitting}
                        slotProps={{ htmlInput: { maxLength: 100 } }}
                    />

                    <TextField
                        fullWidth
                        required
                        label="設備名稱"
                        value={form.equipment_name}
                        onChange={(event) => handleChange("equipment_name", event.target.value)}
                        disabled={submitting}
                        slotProps={{ htmlInput: { maxLength: 100 } }}
                    />

                    {/* <TextField
                        select
                        fullWidth
                        label="狀態"
                        value={form.status}
                        onChange={(event) => handleChange("status", Number(event.target.value) as 1 | 2)}
                        disabled={submitting}
                    >
                        <MenuItem value={1}>啟用</MenuItem>
                        <MenuItem value={2}>停用</MenuItem>
                    </TextField> */}

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
                    {submitting ? "更新中..." : "更新"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EquipmentEditDialog;