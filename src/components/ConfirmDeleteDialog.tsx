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

type ConfirmDeleteDialogProps = {
    open: boolean;
    title?: string;
    description?: string;
    itemName?: string;
    isDeleting?: boolean;
    errorMessage?: string;
    onCancel: () => void;
    onConfirm: () => void;
};

const ConfirmDeleteDialog = ({
    open,
    title = "確認刪除",
    description = "刪除後將無法復原，請再次確認。",
    itemName,
    isDeleting = false,
    errorMessage = "",
    onCancel,
    onConfirm,
}: ConfirmDeleteDialogProps) => {
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
                            檔案：{itemName}
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
                    取消
                </Button>
                <Button
                    onClick={onConfirm}
                    color="error"
                    variant="contained"
                    disabled={isDeleting}
                >
                    {isDeleting ? "刪除中..." : "確認刪除"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDeleteDialog;