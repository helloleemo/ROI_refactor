import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Typography,
    Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import equipmentService from "@/api/services/equipment";
import useFormState from "@/hooks/useFormState";
import TitleText from "@/components/TitleText";

interface EquipmentAddDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void | Promise<void>;
}

const initialForm = {
    equipment_type: "",
    equipment_name: "",
    remarks: "",
};

const EquipmentAddDialog = ({ open, onClose, onSuccess }: EquipmentAddDialogProps) => {
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

    const canSubmit = !submitting && form.equipment_type.trim() !== "" && form.equipment_name.trim() !== "";

    const handleSubmit = async () => {
        if (!canSubmit) return;
        const payload = {
            equipment_type: form.equipment_type.trim(),
            equipment_name: form.equipment_name.trim(),
            remarks: form.remarks.trim(),
        };

        try {
            setSubmitting(true);
            setErrorMessage("");

            // console.log({
            //     ...payload,
            // });

            await equipmentService.create({
                ...payload,
            });


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
                <TitleText title="新增設備" />
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

export default EquipmentAddDialog;