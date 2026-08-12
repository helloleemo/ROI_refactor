import { type ChangeEvent, forwardRef, useMemo, useState, type ReactElement, type Ref } from "react";
import { TitleText } from "@/components";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    Divider,
    IconButton,
    Paper,
    Slide,
    Typography,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import importFileService from "@/api/services/importFile";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<unknown>;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type UploadCsvDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    onUploaded?: () => Promise<void> | void;
};

const formatFileSize = (bytes: number) => {
    if (!Number.isFinite(bytes) || bytes <= 0) return "0 KB";
    const sizeInKb = bytes / 1024;
    if (sizeInKb < 1024) return `${sizeInKb.toFixed(1)} KB`;
    return `${(sizeInKb / 1024).toFixed(2)} MB`;
};

const constructFormData = (file: File): FormData => {
    const formData = new FormData();
    formData.append("file", file);
    return formData;
}

const UploadCsvDialog = ({ open, setOpen, onUploaded }: UploadCsvDialogProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const selectedFileLabel = useMemo(() => {
        if (!selectedFile) return "尚未選擇檔案";
        return `${selectedFile.name} (${formatFileSize(selectedFile.size)})`;
    }, [selectedFile]);

    const resetDialog = () => {
        setSelectedFile(null);
        setErrorMessage("");
        setIsUploading(false);
    };

    const handleClose = () => {
        if (isUploading) return;
        resetDialog();
        setOpen(false);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        setErrorMessage("");

        if (!file) {
            setSelectedFile(null);
            return;
        }

        if (!file.name.toLowerCase().endsWith(".csv")) {
            setSelectedFile(null);
            setErrorMessage("請選擇 .csv 檔案");
            return;
        }

        setSelectedFile(file);
    };


    const handleUpload = async () => {

        try {
            if (!selectedFile) {
                setErrorMessage("請先選擇要上傳的 CSV 檔案");
                return;
            }
            setIsUploading(true);
            const formData = constructFormData(selectedFile);
            await importFileService.uploadFile(formData);
            await onUploaded?.();
            setSelectedFile(null);
            setErrorMessage("");
            setOpen(false);
        } catch (error: any) {
            setErrorMessage(`上傳失敗：請檢查名稱是否重複、並稍後再試 (${error.message})`);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            slots={{ transition: Transition }}
            slotProps={{
                paper: {
                    sx: (theme) => ({
                        backgroundColor: theme.palette.background.default,
                    }),
                },
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <Box
                    sx={(theme) => ({
                        px: 2,
                        py: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        backgroundColor: theme.palette.background.paper,
                    })}
                >
                    <Box>
                        <TitleText
                            title="新增 CSV"
                        />
                        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                            僅支援 .csv 格式檔案
                        </Typography>
                    </Box>
                    <IconButton onClick={handleClose} aria-label="close" size="small" disabled={isUploading}>
                        <CloseIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                </Box>

                <Box
                    sx={{
                        p: 2,
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <Paper
                        variant="outlined"
                        sx={(theme) => ({
                            borderRadius: 2,
                            borderStyle: "dashed",
                            borderColor: theme.palette.semantic.borderSubtle,
                            backgroundColor: theme.palette.background.paper,
                            p: 3,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            gap: 1.5,
                            minHeight: 280,
                        })}
                    >
                        <UploadFileRoundedIcon sx={{ fontSize: 42, color: "text.secondary" }} />
                        <Typography sx={{ fontSize: 14, fontWeight: 700, color: "text.primary" }}>
                            選擇要上傳的 CSV 檔案
                        </Typography>
                        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                            {selectedFileLabel}
                        </Typography>

                        <Button
                            variant="outlined"
                            onClick={() => {
                                const fileInput = document.getElementById("csv-upload-input");
                                fileInput?.click();
                            }}
                            disabled={isUploading}
                        >
                            選擇檔案
                        </Button>

                        <input
                            id="csv-upload-input"
                            type="file"
                            accept=".csv,text/csv"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                            disabled={isUploading}
                        />
                    </Paper>

                    {errorMessage && (
                        <Alert severity="error" variant="outlined">
                            {errorMessage}
                        </Alert>
                    )}
                </Box>

                <Divider />

                <Box
                    sx={(theme) => ({
                        px: 2,
                        py: 1,
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 1,
                        backgroundColor: theme.palette.background.paper,
                    })}
                >
                    <Button variant="text" onClick={handleClose} disabled={isUploading}>取消</Button>
                    <Button
                        variant="contained"
                        onClick={() => handleUpload()}
                        disabled={isUploading || !selectedFile}
                    >
                        {isUploading ? "上傳中..." : "上傳"}
                    </Button>
                    {isUploading && <CircularProgress size={20} sx={{ alignSelf: "center", ml: 0.5 }} />}
                </Box>
            </Box>
        </Dialog>
    );
};

export default UploadCsvDialog;