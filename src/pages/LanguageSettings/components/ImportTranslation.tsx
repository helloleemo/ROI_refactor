import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    LinearProgress,
    Typography,
} from "@mui/material";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import languageService from "@/api/services/languages";

type ImportTranslationProps = {
    open: boolean;
    onClose: () => void;
    onImported?: () => void | Promise<void>;
};

const ImportTranslation = ({ open, onClose, onImported }: ImportTranslationProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!open) {
            setFile(null);
            setErrorMessage("");
            setIsSubmitting(false);
            if (inputRef.current) inputRef.current.value = "";
        }
    }, [open]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] ?? null;
        setErrorMessage("");

        if (!selectedFile) {
            setFile(null);
            return;
        }

        if (!/\.(csv|json)$/i.test(selectedFile.name)) {
            setFile(null);
            setErrorMessage("請選擇 CSV 或 JSON 格式的翻譯檔案。");
            return;
        }

        setFile(selectedFile);
    };

    const handleImport = async () => {
        if (!file) return;

        setIsSubmitting(true);
        setErrorMessage("");

        try {
            await languageService.import(file);
            await onImported?.();
            onClose();
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "匯入翻譯失敗，請稍後再試。");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={isSubmitting ? undefined : onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>匯入翻譯</DialogTitle>
            <DialogContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    請選擇要匯入的 CSV 或 JSON 翻譯檔案。
                </Typography>

                <input
                    ref={inputRef}
                    hidden
                    type="file"
                    accept=".csv,.json"
                    onChange={handleFileChange}
                />

                <Box
                    onClick={() => inputRef.current?.click()}
                    sx={{
                        border: "1px dashed",
                        borderColor: "divider",
                        borderRadius: 1,
                        px: 2,
                        py: 3,
                        textAlign: "center",
                        cursor: "pointer",
                        "&:hover": {
                            borderColor: "primary.main",
                            bgcolor: "action.hover",
                        },
                    }}
                >
                    <Typography>點擊選擇翻譯檔案</Typography>
                    <Typography variant="caption" color="text.secondary">
                        支援 .csv、.json
                    </Typography>
                </Box>

                {file && (
                    <Typography variant="body2" sx={{ mt: 2 }} noWrap>
                        已選擇：{file.name}
                    </Typography>
                )}

                {isSubmitting && <LinearProgress sx={{ mt: 2 }} />}
                {errorMessage && <Alert severity="error" sx={{ mt: 2 }}>{errorMessage}</Alert>}
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose} color="inherit" disabled={isSubmitting}>
                    取消
                </Button>
                <Button
                    onClick={() => void handleImport()}
                    variant="contained"
                    disabled={!file || isSubmitting}
                >
                    {isSubmitting ? "匯入中..." : "匯入"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImportTranslation;
