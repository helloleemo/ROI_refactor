import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import useLoading from "../../../../hooks/useLoading";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();
    const {
        isLoading,
        startLoading,
        stopLoading } = useLoading();

    useEffect(() => {
        if (open) {
            setApproachTemp(value === undefined ? "" : String(value));
            stopLoading("submit");
        }
    }, [open, value]);

    const numericValue = Number(approachTemp);
    const isValid = approachTemp.trim() !== "" && Number.isFinite(numericValue);

    const handleConfirm = async () => {
        if (!isValid || isLoading("submit")) return;

        try {
            startLoading("submit");
            await onConfirm(numericValue);
            stopLoading("submit");
            onClose();
        } finally {
            stopLoading("submit");
        }
    };

    return (
        <Dialog open={open} onClose={isLoading("submit") ? undefined : onClose} maxWidth="xs" fullWidth>
            <DialogTitle>{t("equipment-list.fields5.setting_approach_temp")}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    fullWidth
                    required
                    type="number"
                    label={t("equipment-list.fields5.approach_temp") + " (°C)"}
                    value={approachTemp}
                    onChange={(event) => setApproachTemp(event.target.value)}
                    disabled={isLoading("submit")}
                    sx={{ mt: 1 }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={isLoading("submit")}>
                    {t("common.cancel")}
                </Button>
                <Button
                    onClick={handleConfirm}
                    variant="contained"
                    disabled={!isValid || isLoading("submit")}
                    startIcon={isLoading("submit") ? <CircularProgress size={16} color="inherit" /> : undefined}
                >
                    {t("common.save")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SetApproachTempDialog;
