import { useState, useEffect, useMemo, useRef } from "react";
import { FORMULAS } from "@/settings/formulas";
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { tagDataService } from "@/api/services";
import type { ImportFile } from "@/api/types/importFile";
import N30x30OptionsDelete from "@/components/icons/generated/N30x30OptionsDelete";
import useFormState from "@/hooks/useFormState";

export type PhysicsConstraint = {
    id: number;
    selectedTags: string[];
    formula: string;
};

type AdvancedSettingsDialogProps = {
    open: boolean;
    onClose: () => void;
    onUpdate: (advancedSettings: Record<string, any>) => void;
    selectedCsv: { id: string; name: string } | null;
    csvList: ImportFile[];
    tags: string[];
    advancedSettings?: Record<string, any>;
};

const AdvancedSettingsDialog = ({ open, onClose, selectedCsv, onUpdate, csvList, tags, advancedSettings }: AdvancedSettingsDialogProps) => {

    const {
        errorMessage,
        setErrorMessage
    } = useFormState<Record<string, never>>({});


    const [physicsCsvId, setPhysicsCsvId] = useState<string>("");
    const [selectedFormulaTags, setSelectedFormulaTags] = useState<string[]>([]);
    const [formula, setFormula] = useState<string>("");
    const [constraints, setConstraints] = useState<PhysicsConstraint[]>([]);
    const formulaInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

    const [modelArchitectureCsvId, setModelArchitectureCsvId] = useState<string>("");
    const [equipmentSpecCsvId, setEquipmentSpecCsvId] = useState<string>("");

    const canAddConstraint = selectedFormulaTags.length > 0 && formula.trim() !== "";

    const nextConstraintId = useMemo(() => {
        if (constraints.length === 0) return 1;
        return Math.max(...constraints.map((item) => item.id)) + 1;
    }, [constraints]);

    const resetAllSettings = () => {
        setSelectedFormulaTags([]);
        setFormula("");
        setConstraints([]);
        setModelArchitectureCsvId("");
        setEquipmentSpecCsvId("");
        setErrorMessage("");
    };

    const handleClose = () => {
        resetAllSettings();
        onClose();
    };

    const handleUpdate = () => {
        onUpdate({
            ...advancedSettings,
            upload_id: selectedCsv?.id,
            constraints,
            modelStructure: modelArchitectureCsvId,
            equipmentSpec: equipmentSpecCsvId,
        });
        onClose();
    };

    const insertToFormulaAtCursor = (token: string) => {
        const input = formulaInputRef.current;
        const start = input?.selectionStart ?? formula.length;
        const end = input?.selectionEnd ?? start;

        let nextCaret = start;
        setFormula((prev) => {
            const before = prev.slice(0, start);
            const after = prev.slice(end);
            const needLeftSpace = before.length > 0 && !/\s$/.test(before);
            const needRightSpace = after.length > 0 && !/^\s/.test(after);
            const insertText = `${needLeftSpace ? " " : ""}${token}${needRightSpace ? " " : ""}`;
            const next = `${before}${insertText}${after}`;
            nextCaret = before.length + insertText.length;
            return next;
        });

        requestAnimationFrame(() => {
            const el = formulaInputRef.current;
            if (!el) return;
            el.focus();
            el.setSelectionRange(nextCaret, nextCaret);
        });
    };

    const handleSelectTag = (tag: string) => {
        // if (selectedFormulaTags.includes(tag)) return;
        setSelectedFormulaTags((prev) => [...prev, tag]);
        insertToFormulaAtCursor(tag);
    };

    const handleAddConstraint = ({ tag, formula }: { tag: string; formula: string }) => {

        setConstraints((prev) => [
            ...prev,
            {
                id: nextConstraintId,
                selectedTags: tag.split(", ").map(t => t.trim()),
                formula: formula.trim(),
            },
        ]);
        setFormula("");
        setSelectedFormulaTags([]);
        setErrorMessage("");

    };

    const handleRemoveConstraint = (id: number) => {
        setConstraints((prev) => prev.filter((item) => item.id !== id));
    };

    useEffect(() => {
        if (!open) return;


    }, [open]);

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle sx={{ pb: 1 }}>進階設定</DialogTitle>
            <DialogContent sx={{ pt: 1 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Paper variant="outlined" sx={{ p: 1.5 }}>
                        {/* 物理限制 */}
                        <Typography sx={{ fontSize: 14, fontWeight: 700, mb: 1.25 }}>物理限制</Typography>
                        {selectedCsv && (

                            <TextField
                                select
                                label="CSV"
                                size="small"
                                disabled
                                value={selectedCsv?.id}
                                onChange={(event) => setPhysicsCsvId(event.target.value)}
                                sx={{ mb: 1.25, maxWidth: 320 }}
                            >

                                {selectedCsv && (
                                    <MenuItem key={selectedCsv.id} value={String(selectedCsv.id)}>
                                        {selectedCsv.name}
                                    </MenuItem>
                                )}
                            </TextField>
                        )}
                        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1.2fr" }, gap: 2 }}>
                            <Box>
                                <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 1 }}>可用 Tags</Typography>

                                <Stack spacing={1} sx={{ maxHeight: 260, overflowY: "auto", p: 0.5 }}>
                                    {tags.length === 0 ? (
                                        <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                                            目前沒有可用 Tag
                                        </Typography>
                                    ) : (
                                        tags.map((tag) => {
                                            return (
                                                <Button
                                                    key={tag}
                                                    variant="outlined"
                                                    size="small"
                                                    onMouseDown={(event) => event.preventDefault()}
                                                    onClick={() => handleSelectTag(tag)}
                                                    sx={{ justifyContent: "flex-start", width: "fit-content" }}
                                                >
                                                    {tag}
                                                </Button>
                                            );
                                        })
                                    )}
                                </Stack>

                            </Box>

                            <Box>
                                <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 1 }}>公式輸入</Typography>
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
                                    {FORMULAS.map(({ value: operator }) => (
                                        <Button
                                            key={operator}
                                            variant="outlined"
                                            size="small"
                                            onMouseDown={(event) => event.preventDefault()}
                                            onClick={() => insertToFormulaAtCursor(operator)}
                                        >
                                            {operator}
                                        </Button>
                                    ))}
                                </Box>
                                <TextField
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    inputRef={formulaInputRef}
                                    label="公式"
                                    placeholder="例如: tag_1 + tag_2 <= 100"
                                    value={formula}
                                    onChange={(event) => setFormula(event.target.value)}
                                />
                                <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}>
                                    <Button variant="outlined" onClick={() => handleAddConstraint({ tag: selectedFormulaTags.join(", "), formula })} disabled={!canAddConstraint}>
                                        新增限制
                                    </Button>
                                </Box>
                            </Box>
                        </Box>

                        <Divider sx={{ my: 1.25 }} />

                        {constraints.length === 0 ? (
                            <Typography sx={{ fontSize: 13, color: "text.secondary" }}>尚未新增物理限制</Typography>
                        ) : (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                {constraints.map((item) => (
                                    <Box
                                        key={item.id}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            border: "1px solid",
                                            borderColor: "divider",
                                            borderRadius: 1,
                                            px: 1,
                                            py: 0.75,
                                        }}
                                    >
                                        <Typography sx={{ fontSize: 13 }}>
                                            {item.selectedTags.join(", ")}: {item.formula}
                                        </Typography>
                                        <IconButton size="small" onClick={() => handleRemoveConstraint(item.id)}>
                                            <N30x30OptionsDelete accentColor="semantic.errorAdaptive" />

                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Paper>

                    {/* 模型架構 */}
                    <Paper variant="outlined" sx={{ p: 1.5 }}>
                        <Typography sx={{ fontSize: 14, fontWeight: 700, mb: 1.25 }}>模型架構</Typography>
                        <TextField
                            select
                            fullWidth
                            size="small"
                            label="選擇 CSV"
                            value={modelArchitectureCsvId}
                            onChange={(event) => setModelArchitectureCsvId(event.target.value)}
                        >
                            {csvList.map((file) => (
                                <MenuItem key={file.id} value={String(file.id)}>
                                    {file.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Paper>

                    {/* 設備規格表 */}
                    <Paper variant="outlined" sx={{ p: 1.5 }}>
                        <Typography sx={{ fontSize: 14, fontWeight: 700, mb: 1.25 }}>設備規格表</Typography>
                        <TextField
                            select
                            fullWidth
                            size="small"
                            label="選擇 CSV"
                            value={equipmentSpecCsvId}
                            onChange={(event) => setEquipmentSpecCsvId(event.target.value)}
                        >
                            {csvList.map((file) => (
                                <MenuItem key={file.id} value={String(file.id)}>
                                    {file.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Paper>

                    {errorMessage && (
                        <Typography sx={{ fontSize: 13, color: "error.main" }}>{errorMessage}</Typography>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="inherit">
                    關閉
                </Button>
                <Button onClick={handleUpdate} variant="contained">
                    套用
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AdvancedSettingsDialog;