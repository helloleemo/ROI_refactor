
import AdvancedSettingsDialog, { type PhysicsConstraint } from "./AdvancedSettingsDialog";
import importFileService from "@/api/services/importFile";
import { tagDataService } from "@/api/services";
import type { ImportFile } from "@/api/types/importFile";

import {
    Box,
    Button,
    MenuItem,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import useFormState from "@/hooks/useFormState";
import { ALGORITHM_OPTIONS } from "@/mock/algorithmOptions";
import { AlgorithmPreviewGrid } from "./aiModelReview";
import type { AlgorithmPreviewGridProps } from "./aiModelReview/AlgorithmPreviewGrid";
import modelAlgorithm from "@/api/services/modelAlgorithm";
import type { createModelAlgorithm } from "@/api/types/modelAlgorithm";
import type { AlgorithmPreviewRow } from "./AlgorithmPreviewRow.types";
import { useEffect, useState } from "react";
import useOpenDialog from "@/hooks/useOpenDialog";



type AddAndCreateAlgorithmsProps = {
    modelId: string | number;
    editingRow?: AlgorithmPreviewRow | null;
    previewGridProps?: AlgorithmPreviewGridProps;
    onUpdate?: () => void;
};

const AddAndCreateAlgorithms = ({ modelId, editingRow, previewGridProps, onUpdate }: AddAndCreateAlgorithmsProps) => {
    const { form, errorMessage, handleChange, resetForm, setErrorMessage } = useFormState({
        model_id: modelId,
        upload_id: "",
        algorithm: ALGORITHM_OPTIONS[0]?.name ?? "",
        x_tags: [] as string[],
        y_tag: "",
    });
    const [advancedSettings, setAdvancedSettings] = useState<Record<string, any>>({
        upload_id: "",
        constraints: [] as PhysicsConstraint[],
        modelStructure: "",
        equipmentSpec: ""
    });
    const [uploadFiles, setUploadFiles] = useState<ImportFile[]>([]);
    const [tagOptions, setTagOptions] = useState<string[]>([]);
    const { open, setOpen } = useOpenDialog({
        advancedDialog: false
    });

    const [selectedUploadedFile, setSelectedUploadedFile] = useState<{ id: string; name: string } | null>(null);

    const canSubmit = form.upload_id !== "" && form.y_tag.trim() !== "" && form.x_tags.length > 0 && form.algorithm.trim() !== "";

    const handleAdd = () => {
        if (!canSubmit) {
            setErrorMessage("請完整填寫所有欄位");
            return;
        }

        const selectedAlgorithm = ALGORITHM_OPTIONS.find((option) => option.name === form.algorithm);
        if (!selectedAlgorithm) {
            setErrorMessage("請選擇正確的演算法");
            return;
        }

        const payload = {
            model_id: form.model_id,
            upload_id: form.upload_id,
            algorithm: selectedAlgorithm.label as createModelAlgorithm["algorithm"],
            x_tags: form.x_tags,
            y_tag: form.y_tag,
        }

        console.log("Adding new algorithm with payload:", payload);
        addNewAlgorithm(payload);

        setErrorMessage("");
        resetForm();
    };

    const handleSelectFile = (value: string) => {
        handleChange("upload_id", value);
        handleChange("x_tags", []);
        handleChange("y_tag", "");
        getTags(value);

        setSelectedUploadedFile({
            id: value,
            name: uploadFiles.find(file => String(file.id) === String(value))?.name || ""
        })

    };

    const getFiles = async () => {
        try {
            const files = await importFileService.getList();
            setUploadFiles(files);
        }
        catch (error) {
            console.error("Failed to get data:", error);
        }
    };

    const getTags = async (
        id: string,
        prefill?: {
            yTag?: string;
            xTags?: string[];
        },
    ) => {
        try {
            const tagData = await tagDataService.getTagList(id);
            const tags = tagData.tags ?? [];
            setTagOptions(tags);

            const nextYTag = prefill?.yTag && tags.includes(prefill.yTag)
                ? prefill.yTag
                : (tags[0] ?? "");
            const nextXTags = (prefill?.xTags ?? []).filter((tag) => tags.includes(tag));

            handleChange("y_tag", nextYTag);
            handleChange("x_tags", nextXTags);
        } catch (error) {
            console.error("Failed to get tags:", error);
            setTagOptions([]);
        }
    };

    const addNewAlgorithm = async (payload: createModelAlgorithm) => {
        try {
            const data = await modelAlgorithm.create(payload)
            console.log("Successfully added new algorithm:", data);
            await onUpdate?.();
        } catch (error) {
            console.error("Failed to add new algorithm:", error);
        }
    }

    const handleAdvancedSettingsUpdate = (
        updates: Partial<typeof advancedSettings>
    ) => {
        setAdvancedSettings((prev) => ({
            ...prev,
            ...updates,
        }));

        console.log("Updated advanced settings:", updates);

    }

    useEffect(() => {
        getFiles();
    }, []);

    useEffect(() => {
        if (!editingRow) return;

        const matchedSource = uploadFiles.find((file) => String(file.id) === String(editingRow.source));

        if (!matchedSource) {
            setErrorMessage("找不到來源，請重新選擇來源");
            return;
        }

        setErrorMessage("");
        handleChange("upload_id", String(matchedSource.id));
        handleChange("algorithm", editingRow.algorithm);
        getTags(String(matchedSource.id), {
            yTag: editingRow.y_tag,
            xTags: editingRow.x_tags_list,
        });
    }, [editingRow, uploadFiles]);

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
                <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start", flexWrap: "wrap" }}>

                    {/* 選擇來源 */}
                    <TextField
                        onClick={() => { }}
                        select
                        label="選擇來源"
                        size="small"
                        value={form.upload_id}
                        onChange={(event) => handleSelectFile(event.target.value)}
                        sx={{ flex: 1, minWidth: 100 }}
                    >
                        {uploadFiles.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* 選擇模型目標Y */}
                    <TextField
                        select
                        label="選擇模型目標Y"
                        size="small"
                        disabled={!form.upload_id}
                        value={form.y_tag}
                        onChange={(event) => handleChange("y_tag", event.target.value)}
                        sx={{ flex: 1, minWidth: 100 }}
                    >
                        {tagOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* 選擇模型X變數(多選) */}
                    <TextField
                        select
                        label="選擇模型X變數(多選)"
                        size="small"
                        value={form.x_tags}
                        disabled={!form.upload_id}
                        onChange={(event) => {
                            const value = event.target.value;
                            handleChange("x_tags", typeof value === "string" ? value.split(",") : value);
                        }}
                        slotProps={{ select: { multiple: true } }}
                        sx={{ flex: 1, minWidth: 100 }}
                    >
                        {tagOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>


                    {/* 演算法 */}
                    <TextField
                        select
                        label="演算法"
                        size="small"
                        value={form.algorithm}
                        onChange={(event) => handleChange("algorithm", event.target.value)}
                        sx={{ flex: 1, minWidth: 140 }}
                    >
                        {ALGORITHM_OPTIONS.map((option) => (
                            <MenuItem key={option.id} value={option.name}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Button
                        disabled={!canSubmit}
                        variant="contained" onClick={handleAdd} sx={{ height: 40 }}>
                        新增
                    </Button>
                    {/* <Button
                    variant="text" onClick={handleClear} sx={{ height: 40 }}>
                    清空
                </Button> */}
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Button
                        disabled={!form.upload_id}
                        variant="text"
                        onClick={() => setOpen({ "advancedDialog": true })}
                        sx={{ height: 26, mt: 1, px: 2, py: 1, width: "fit-content" }}
                    >
                        進階設定
                    </Button>
                    {/* 進階設定的參數 */}
                    {
                        advancedSettings && (
                            <Typography variant="body2" color="text.secondary" sx={{
                                mt: 1, fontSize: 10, display: "inline", whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}>
                                {`advancedSettings: ${JSON.stringify(advancedSettings)}`}
                            </Typography>
                        )
                    }
                </Box>
                {
                    errorMessage && (
                        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                            {errorMessage}
                        </Typography>
                    )
                }

                <Box sx={{ mt: 2, flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
                    {/* <Typography sx={{ fontSize: 14, fontWeight: 700, color: "text.primary", mb: 1 }}>
                    已輸入的候選演算法
                </Typography> */}
                    {previewGridProps ? (
                        <Paper variant="outlined" sx={{ position: "relative", height: "100%", flex: 1, minHeight: 0 }}>
                            <AlgorithmPreviewGrid {...previewGridProps} split="view" />
                        </Paper>
                    ) : (
                        <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
                            尚無資料
                        </Typography>
                    )}


                </Box>

            </Box>
            <AdvancedSettingsDialog
                open={open.advancedDialog}
                advancedSettings={advancedSettings}
                onClose={() => setOpen({ "advancedDialog": false })}
                onUpdate={handleAdvancedSettingsUpdate}
                selectedCsv={selectedUploadedFile}
                csvList={uploadFiles}
                tags={tagOptions}
            />
        </>
    );
};

export default AddAndCreateAlgorithms;