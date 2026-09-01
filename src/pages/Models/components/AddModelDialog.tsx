import { Dialog, Box, Typography, IconButton, DialogTitle, DialogContent, TextField, Button, DialogActions } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import TitleText from "../../../components/TitleText"
import { useState } from "react";
import aiModelService from "@/api/services/aiModel";
import useFormState from "@/hooks/useFormState";

interface AddModelDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onClose: () => void;
    onConfirm: () => void;

}

const AddModelDialog = ({
    open,
    setOpen,
    onClose,
    onConfirm
}: AddModelDialogProps) => {

    const { form, submitting, errorMessage, handleChange, resetForm, setSubmitting, setErrorMessage } = useFormState({
        model_name: "",
        equipment_id: 0,
        remarks: ""
    });

    const handleClose = () => {
        if (submitting) return;
        resetForm();
        onClose();
    };

    const canSubmit = !submitting && form.model_name.trim() !== "";

    const handleSubmit = async () => {
        if (!canSubmit) return;

        setSubmitting(true);
        setErrorMessage("");

        const payload = {
            model_name: form.model_name.trim(),
            equipment_id: 0,
            remarks: form.remarks.trim(),
        }

        try {
            await aiModelService.create({
                ...payload,
            });
            resetForm();
            onConfirm();
            setOpen(false);
            onClose();
        } catch (error: any) {
            setErrorMessage(`新增失敗：${error?.message}`);
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <TitleText title="新增模型" />
                <IconButton onClick={handleClose} disabled={submitting} size="small">
                    <CloseIcon fontSize="small" />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ pt: 2 }}>
                <Box sx={{ display: "grid", gap: 2, mt: 1 }}>
                    <TextField
                        fullWidth
                        required
                        label="顯示名稱"
                        value={form.model_name}
                        onChange={(event) => handleChange("model_name", event.target.value)}
                        disabled={submitting}
                        slotProps={{ htmlInput: { maxLength: 100 } }}
                    />

                    <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        label="描述"
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
            <DialogActions>
                <Button onClick={handleClose} disabled={submitting}>取消</Button>
                <Button
                    disabled={submitting || !canSubmit}
                    variant="contained" onClick={handleSubmit} >新增</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddModelDialog;