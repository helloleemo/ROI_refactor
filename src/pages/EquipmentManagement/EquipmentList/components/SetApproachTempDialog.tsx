import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

interface SetApproachTempDialogProps {
    open: boolean;
    value?: number;
    onClose: () => void;
    onConfirm: (value: number) => void | Promise<void>;
}

const SetApproachTempDialog = ({
    open,
    value,
    onClose,
    onConfirm,
}: SetApproachTempDialogProps) => {
    const [approachTemp, setApproachTemp] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (open) {
            setApproachTemp(value === undefined ? "" : String(value));
            setSubmitting(false);
        }
    }, [open, value]);

    const numericValue = Number(approachTemp);
    const isValid = approachTemp.trim() !== "" && Number.isFinite(numericValue);

    const handleConfirm = async () => {
        if (!isValid || submitting) return;

        try {
            setSubmitting(true);
            await onConfirm(numericValue);
            onClose();
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={submitting ? undefined : onClose} maxWidth="xs" fullWidth>
            <DialogTitle>設定趨近溫度</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    fullWidth
                    required
                    type="number"
                    label="趨近溫度 (°C)"
                    value={approachTemp}
                    onChange={(event) => setApproachTemp(event.target.value)}
                    disabled={submitting}
                    sx={{ mt: 1 }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={submitting}>
                    取消
                </Button>
                <Button onClick={handleConfirm} variant="contained" disabled={!isValid || submitting}>
                    {submitting ? "儲存中..." : "確認"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SetApproachTempDialog;
