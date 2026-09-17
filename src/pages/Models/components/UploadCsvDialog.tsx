import { type ChangeEvent, forwardRef, useState, type ReactElement, type Ref } from "react";
import { TitleText } from "@/components";
import CloseIcon from "@mui/icons-material/Close";
import {
    Alert,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
    IconButton,
    MenuItem,
    Slide,
    TextField,
    Typography,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import importFileService from "@/api/services/importFile";
import { DatasetTypeText, type DatasetType } from "@/api/types/shared";

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

const datasetTypeOptions = Object.entries(DatasetTypeText).map(([value, label]) => ({
    value: Number(value) as DatasetType,
    label,
}));

const UploadCsvDialog = ({ open, setOpen, onUploaded }: UploadCsvDialogProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedUploadType, setSelectedUploadType] = useState<DatasetType | "">("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const resetDialog = () => {
        setSelectedFile(null);
        setSelectedUploadType("");
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

    const handleUploadTypeChange = (value: string) => {
        setErrorMessage("");
        setSelectedUploadType(value === "" ? "" : Number(value) as DatasetType);
    };


    const handleUpload = async () => {

        try {
            if (!selectedFile) {
                setErrorMessage("請先選擇要上傳的 CSV 檔案");
                return;
            }

            if (selectedUploadType === "") {
                setErrorMessage("請先選擇上傳類型");
                return;
            }

            setIsUploading(true);
            await importFileService.uploadFile(selectedFile, selectedUploadType);
            await onUploaded?.();
            resetDialog();
            setOpen(false);
        } catch (error: any) {
            setErrorMessage(`上傳失敗：請檢查名稱是否重複、並稍後再試 (${error.message})`);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Dialog
            maxWidth="sm"
            fullWidth
            open={open}
            onClose={handleClose}
            slots={{ transition: Transition }}
        >
            <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                    <TitleText title="新增 CSV" />
                    <Typography sx={{ fontSize: 12, color: "text.secondary", mt: 0.5 }}>
                        僅支援 .csv 格式檔案
                    </Typography>
                </Box>
                <IconButton onClick={handleClose} aria-label="close" size="small" disabled={isUploading}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 2 }}>
                <Box sx={{ display: "grid", gap: 2, mt: 1 }}>
                    <TextField
                        select
                        label="上傳類型"
                        fullWidth
                        value={selectedUploadType}
                        onChange={(event) => handleUploadTypeChange(event.target.value)}
                        disabled={isUploading}
                        required
                    >
                        <MenuItem value="">請選擇類型</MenuItem>
                        {datasetTypeOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Box sx={{ display: "grid", gap: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            選擇檔案
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
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
                            <Typography variant="body2" color={selectedFile ? "text.primary" : "text.secondary"}>
                                {selectedFile ? selectedFile.name : "尚未選擇檔案"}
                            </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                            僅支援 .csv 格式檔案
                        </Typography>
                        <input
                            id="csv-upload-input"
                            type="file"
                            accept=".csv,text/csv"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                            disabled={isUploading}
                        />
                    </Box>

                    {errorMessage && (
                        <Alert severity="error" variant="outlined">
                            {errorMessage}
                        </Alert>
                    )}
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} disabled={isUploading}>取消</Button>
                <Button
                    variant="contained"
                    onClick={() => handleUpload()}
                    disabled={isUploading || !selectedFile || selectedUploadType === ""}
                >
                    {isUploading ? "上傳中..." : "上傳"}
                </Button>
                {isUploading && <CircularProgress size={20} sx={{ alignSelf: "center", ml: 0.5 }} />}
            </DialogActions>
        </Dialog>
    );
};

export default UploadCsvDialog;