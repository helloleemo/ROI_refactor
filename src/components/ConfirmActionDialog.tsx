import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";

type ConfirmActionDialogProps = {
    open: boolean;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    isSubmitting?: boolean;
    errorMessage?: string;
    onCancel: () => void;
    onConfirm: () => void;
};

const ConfirmActionDialog = ({
    open,
    title = "確認操作",
    description = "請確認是否要執行此操作。",
    confirmText = "確認",
    cancelText = "取消",
    isSubmitting = false,
    errorMessage = "",
    onCancel,
    onConfirm,
}: ConfirmActionDialogProps) => {
    return (
        <Dialog
            open={open}
            onClose={isSubmitting ? undefined : onCancel}
            fullWidth
            maxWidth="xs"
        >
            <DialogTitle sx={{ pb: 1 }}>{title}</DialogTitle>
            <DialogContent sx={{ pt: 0.5 }}>
                <Box>
                    <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                        {description}
                    </Typography>
                </Box>
                {errorMessage && (
                    <Alert severity="error" variant="outlined" sx={{ mt: 1.5 }}>
                        {errorMessage}
                    </Alert>
                )}
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
                <Button onClick={onCancel} color="inherit" disabled={isSubmitting}>
                    {cancelText}
                </Button>
                <Button
                    onClick={onConfirm}
                    color="primary"
                    variant="contained"
                    disabled={isSubmitting}
                >
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmActionDialog;