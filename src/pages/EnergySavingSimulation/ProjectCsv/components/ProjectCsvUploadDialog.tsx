import CloseIcon from "@mui/icons-material/Close";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
} from "@mui/material";
import { useRef, useState, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import importFileService from "@/api/services/importFile";
import { DatasetTypeNum, type CommonIdType } from "@/api/types/shared";
import TitleText from "@/components/TitleText";
import type { ImportFile } from "@/api/types";
import { tagMappingService } from "@/api/services/tagMapping";
import type { RequestTagMapping } from "@/api/types/tagMapping";

interface ProjectCsvUploadDialogProps {
    open: boolean;
    onClose: () => void;
    onUploaded: () => Promise<void> | void;
    projectFile?: ImportFile | null;
}

const resetData: Omit<RequestTagMapping, "upload_id"> = {
    data_settings: null,
    global_mapping: null,
    chiller_mappings: null,
    chp_mappings: null,
    zp_mappings: null,
    cwp_mappings: null,
    ct_mappings: null,
    pump_mappings: null,
    load_mappings: null,
    calculation_results: null
};

const ProjectCsvUploadDialog = ({ open, onClose, onUploaded, projectFile }: ProjectCsvUploadDialogProps) => {

    // console.log("projectFile:", projectFile);

    const { t } = useTranslation();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [isUploading, setIsUploading] = useState(false);



    const resetDialog = () => {
        setSelectedFile(null);
        setErrorMessage("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleClose = () => {
        if (isUploading) return;
        resetDialog();
        onClose();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        setErrorMessage("");

        if (file && !file.name.toLowerCase().endsWith(".csv")) {
            setSelectedFile(null);
            setErrorMessage(t("projectCsv.upload_invalid_file"));
            event.target.value = "";
            return;
        }

        setSelectedFile(file);
    };

    const resetDataCleaning = async (id: CommonIdType) => {
        await tagMappingService.update({ upload_id: id, ...resetData });
    }

    const handleUpload = async () => {
        if (!selectedFile || isUploading) return;

        try {
            setIsUploading(true);
            setErrorMessage("");
            await importFileService.uploadFile(selectedFile, DatasetTypeNum.SIMULATION);
            if (projectFile) await resetDataCleaning(projectFile.id);
            await onUploaded();
            resetDialog();



            onClose();
        } catch (error) {
            const message = error instanceof Error ? error.message : "";
            setErrorMessage(t("projectCsv.upload_error", { message }));
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                    <TitleText title={t("projectCsv.upload_title")} />
                    <Typography sx={{ fontSize: 12, color: "text.secondary", mt: 0.5 }}>
                        {t("projectCsv.upload_description")}
                    </Typography>
                </Box>
                <IconButton onClick={handleClose} aria-label={t("common.close")} size="small" disabled={isUploading}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 2 }}>
                <Box sx={{ display: "grid", gap: 1, mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        {t("projectCsv.file_name")}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
                        <Button variant="outlined" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                            {t("projectCsv.choose_file")}
                        </Button>
                        <Typography variant="body2" color={selectedFile ? "text.primary" : "text.secondary"} noWrap>
                            {selectedFile?.name ?? t("projectCsv.no_file_selected")}
                        </Typography>
                    </Box>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv,text/csv"
                        hidden
                        onChange={handleFileChange}
                        disabled={isUploading}
                    />
                    {errorMessage && <Alert severity="error" variant="outlined">{errorMessage}</Alert>}
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={handleClose} disabled={isUploading}>{t("common.cancel")}</Button>
                <Button
                    variant="contained"
                    onClick={() => void handleUpload()}
                    disabled={isUploading || !selectedFile}
                    startIcon={isUploading ? <CircularProgress size={16} color="inherit" /> : undefined}
                >
                    {isUploading ? t("projectCsv.uploading") : t("projectCsv.upload")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProjectCsvUploadDialog;