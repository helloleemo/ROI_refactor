import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

type ConfirmDeleteDialogProps = {
    open: boolean;
    title?: string;
    description?: string;
    itemName?: string;
    isDeleting?: boolean;
    errorMessage?: string;
    cancelText?: string;
    confirmText?: string;
    onCancel: () => void;
    onConfirm: () => void;
};

const ConfirmDeleteDialog = ({
    open,
    title,
    description,
    itemName,
    isDeleting = false,
    errorMessage = "",
    cancelText,
    confirmText,
    onCancel,
    onConfirm,
}: ConfirmDeleteDialogProps) => {
    const { t } = useTranslation();

    return (
        <Dialog
            open={open}
            onClose={isDeleting ? undefined : onCancel}
            fullWidth
            maxWidth="xs"
        >
            <DialogTitle sx={{ pb: 1 }}>{title}</DialogTitle>
            <DialogContent sx={{ pt: 0.5 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
                    <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                        {description}
                    </Typography>
                    {itemName && (
                        <Typography sx={{ color: "text.primary", fontSize: 13 }}>
                            {t("common.name")}：{itemName}
                        </Typography>
                    )}
                    {errorMessage && (
                        <Alert severity="error" variant="outlined">
                            {errorMessage}
                        </Alert>
                    )}
                </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
                <Button onClick={onCancel} color="inherit" disabled={isDeleting}>
                    {cancelText ?? t("common.cancel")}
                </Button>
                <Button
                    onClick={onConfirm}
                    color="error"
                    variant="contained"
                    disabled={isDeleting}
                    startIcon={isDeleting ? <CircularProgress size={20} /> : undefined}
                >
                    {confirmText ?? t("common.delete")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDeleteDialog;