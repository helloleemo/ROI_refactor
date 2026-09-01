import { forwardRef, useCallback, useEffect, useMemo, useState, type ReactElement, type Ref } from "react";
import { ConfirmActionDialog, ConfirmDeleteDialog, TitleText } from "@/components";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    alpha,
    Alert,
    Box,
    Button,
    Collapse,
    Dialog,
    Divider,
    Grid,
    IconButton,
    Paper,
    Slide,
    Typography,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import aiModelService from "@/api/services/aiModel";
import modelAlgorithm from "@/api/services/modelAlgorithm";
import type { AiModel } from "@/api/types/aiModel";
import type { algorithmListResponse } from "@/api/types/modelAlgorithm";
import AlgorithmResultDialog from "./AlgorithmResultDialog";
import XTagsDialog from "./XTagsDialog";
import type { AlgorithmPreviewRow } from "./AlgorithmPreviewRow.types";
import { AlgorithmPreviewGrid, buildSummaryCards, createAlgorithmPreviewColumns, mapAlgorithmPreviewRows } from "./aiModelReview";
import useFormState from "@/hooks/useFormState";
import { useOpenDialog } from "@/hooks";
import AddAndCreateAlgorithms from "./AddAndCreateAlgorithms";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<unknown>;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type AiModelReviewDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedRow?: AiModel;
    algorithms?: algorithmListResponse[];
    isLoading?: boolean;
    errorMessage?: string;
    onUpdated?: () => Promise<void> | void;
    onDeleted?: () => Promise<void> | void;
};

const AiModelReviewDialog = ({
    open,
    setOpen,
    selectedRow,
    algorithms = [],
    isLoading = false,
    errorMessage = "",
    onUpdated,
}: AiModelReviewDialogProps) => {

    // console.log("selectedRow", selectedRow)
    // console.log("algorithms", algorithms)

    const { submitting, errorMessage: actionErrorMessage, setSubmitting, setErrorMessage } = useFormState({})
    const { open: subDialogOpen, setOpen: setSubDialogOpen } = useOpenDialog({
        infoDialog: true,
        XTagsDialog: false,
        detailDialog: false,
        enableConfirm: false,
    });
    const [split, setSplit] = useState<"view" | "create_and_edit">("view");

    const [selectedXTags, setSelectedXTags] = useState<string[]>([]);
    const [selectedAlgorithmName, setSelectedAlgorithmName] = useState<string>("-");
    const [enableTargetRow, setEnableTargetRow] = useState<AlgorithmPreviewRow | null>(null);
    const [activeAlgorithmId, setActiveAlgorithmId] = useState<number | null>(null);
    const [detailRow, setDetailRow] = useState<any | null>(null);
    const [editingRow, setEditingRow] = useState<AlgorithmPreviewRow | null>(null);
    const [deleteTargetRow, setDeleteTargetRow] = useState<AlgorithmPreviewRow | null>(null);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [isDeletingAlgorithm, setIsDeletingAlgorithm] = useState(false);
    const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

    useEffect(() => {
        setActiveAlgorithmId(selectedRow?.active_algorithm_id ?? null);
    }, [selectedRow?.active_algorithm_id]);

    useEffect(() => {
        if (open) return;
        setSplit("view");
        setEditingRow(null);
    }, [open]);

    const handleOpenXTagsDialog = useCallback((row: AlgorithmPreviewRow) => {
        setSelectedXTags(row.x_tags_list);
        setSelectedAlgorithmName(row.algorithm);
        setSubDialogOpen({ XTagsDialog: true });
    }, []);

    const handleOpenDetailDialog = useCallback((row: AlgorithmPreviewRow) => {
        setDetailRow(row);
        // console.log("detailRow:", detailRow);
        setSubDialogOpen({ detailDialog: true });
    }, []);

    const handleOpenEditForm = useCallback((row: AlgorithmPreviewRow) => {
        setEditingRow(row);
        setSplit("create_and_edit");
    }, []);

    const handleOpenDeleteConfirm = useCallback((row: AlgorithmPreviewRow) => {
        setDeleteTargetRow(row);
        setDeleteErrorMessage("");
        setIsDeleteConfirmOpen(true);
    }, []);

    const handleDeleteCancel = useCallback(() => {
        if (isDeletingAlgorithm) return;
        setIsDeleteConfirmOpen(false);
        setDeleteTargetRow(null);
        setDeleteErrorMessage("");
    }, [isDeletingAlgorithm]);

    const handleDeleteConfirm = async () => {
        if (!deleteTargetRow) return;

        try {
            setIsDeletingAlgorithm(true);
            setDeleteErrorMessage("");
            await modelAlgorithm.delete(deleteTargetRow.id);
            await onUpdated?.();
            setIsDeleteConfirmOpen(false);
            setDeleteTargetRow(null);
            if (editingRow && Number(editingRow.id) === Number(deleteTargetRow.id)) {
                setEditingRow(null);
            }
        } catch (error: any) {
            setDeleteErrorMessage(`刪除失敗：${error?.message ?? "請稍後再試"}`);
        } finally {
            setIsDeletingAlgorithm(false);
        }
    };

    // const handleCloseDetailDialog = () => {
    //     setSubDialogOpen({ detailDialog: false });
    // };

    const handleOpenEnableConfirm = useCallback((row: AlgorithmPreviewRow) => {
        setEnableTargetRow(row);
        setErrorMessage("");
        setSubDialogOpen({ enableConfirm: true });
    }, []);

    const handleConfirmEnableChange = async () => {
        if (!selectedRow || !enableTargetRow) return;

        const nextAlgorithmId = enableTargetRow.enabled ? 0 : enableTargetRow.id;

        try {
            setSubmitting(true);
            setErrorMessage("");
            await aiModelService.setActiveAlgorithm(selectedRow.id, nextAlgorithmId);
            setActiveAlgorithmId(nextAlgorithmId);
            await onUpdated?.();
            setSubDialogOpen({ enableConfirm: false });
        } catch (error: any) {
            setErrorMessage(`更新啟用狀態失敗：${error?.message ?? "請稍後再試"}`);
        } finally {
            setSubmitting(false);
        }
    };

    const activeAlgorithmName = useMemo(() => {
        const currentId = activeAlgorithmId ?? selectedRow?.active_algorithm_id;
        if (!currentId) return "-";
        const matched = algorithms.find((item) => Number(item.id) === Number(currentId));
        return matched?.algorithm ?? selectedRow?.active_algorithm?.algorithm ?? "-";
    }, [activeAlgorithmId, selectedRow?.active_algorithm_id, selectedRow?.active_algorithm?.algorithm, algorithms]);

    const summaryCards = useMemo(
        () =>
            buildSummaryCards({
                selectedRow,
                algorithmsCount: algorithms.length,
                activeAlgorithmName,
            }),
        [selectedRow, algorithms.length, activeAlgorithmName],
    );

    const previewColumns = useMemo(
        () =>
            createAlgorithmPreviewColumns({
                onOpenXTagsDialog: handleOpenXTagsDialog,
                onOpenEnableConfirm: handleOpenEnableConfirm,
                onOpenDetailDialog: handleOpenDetailDialog,
                onOpenEditForm: handleOpenEditForm,
                onOpenDeleteConfirm: handleOpenDeleteConfirm,
            }),
        [handleOpenXTagsDialog, handleOpenEnableConfirm, handleOpenDetailDialog, handleOpenEditForm, handleOpenDeleteConfirm],
    );

    const previewRows: AlgorithmPreviewRow[] = useMemo(
        () =>
            mapAlgorithmPreviewRows({
                algorithms,
                activeAlgorithmId,
                selectedRowActiveAlgorithmId: selectedRow?.active_algorithm_id,
            }),
        [algorithms, activeAlgorithmId, selectedRow?.active_algorithm_id],
    );

    const displayErrorMessage = errorMessage || actionErrorMessage;

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={() => setOpen(false)}
            slots={{ transition: Transition }}

            slotProps={{
                paper: {
                    elevation: 0,
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
                        backgroundColor: (theme) => theme.palette.background.paper,

                    })}
                >
                    <Box>
                        <TitleText title="AI Model 資料預覽" />
                        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                            {selectedRow?.model_name ?? "-"}
                        </Typography>
                    </Box>
                    <IconButton onClick={() => setOpen(false)} aria-label="close" size="small">
                        <CloseIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                </Box>

                <Box
                    sx={{
                        p: 1,
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        minHeight: 0,
                        // overflow: "hidden",
                    }}
                >
                    <Paper
                        variant="outlined"
                        sx={(theme) => ({
                            mb: 0.75,
                            borderRadius: 1.5,
                            borderColor: theme.palette.divider,
                            backgroundColor: theme.palette.background.paper,
                            flexShrink: 0,
                            // overflow: "hidden",
                        })}
                    >
                        <Button
                            fullWidth
                            onClick={() => setSubDialogOpen((prev) => ({ ...prev, infoDialog: !prev.infoDialog }))}
                            color="inherit"
                            sx={{
                                px: 1,
                                py: 1,
                                minHeight: 40,
                                justifyContent: "space-between",
                                textTransform: "none",
                                borderRadius: 0,
                                backgroundColor: (theme) => theme.palette.semantic.surfaceSubtle,

                            }}
                        >
                            <Typography sx={{ fontSize: 14, fontWeight: 700, color: "text.primary", lineHeight: 1 }}>
                                基本資訊
                            </Typography>
                            {subDialogOpen.infoDialog ? <ExpandLessIcon sx={{ fontSize: 20 }} /> : <ExpandMoreIcon sx={{ fontSize: 20 }} />}
                        </Button>
                        <Collapse in={subDialogOpen.infoDialog} timeout="auto" unmountOnExit>
                            <Divider />
                            <Box sx={{ p: 1.5 }}>
                                <Grid container spacing={1.5}>
                                    {summaryCards.map((card) => (
                                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={card.label}>
                                            <Paper
                                                variant="outlined"
                                                sx={(theme) => ({
                                                    px: 1,
                                                    py: 1,
                                                    borderRadius: 1.2,
                                                    borderColor: theme.palette.divider,
                                                    backgroundColor:
                                                        theme.palette.mode === "dark"
                                                            ? alpha(theme.palette.common.white, 0.04)
                                                            : theme.palette.semantic.surfaceSubtle,
                                                    height: "100%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    gap: 1,
                                                })}
                                            >
                                                <Typography sx={{ fontSize: 12, color: "text.secondary", lineHeight: 1.1 }}>
                                                    {card.label}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: 13,
                                                        color: "text.primary",
                                                        fontWeight: 600,
                                                        lineHeight: 1.2,
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    {card.value}
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Collapse>
                    </Paper>

                    {displayErrorMessage && (
                        <Alert severity="error" variant="outlined" sx={{ mb: 1 }}>
                            {displayErrorMessage}
                        </Alert>
                    )}

                    <Paper
                        variant="outlined"
                        sx={(theme) => ({
                            flex: 1,
                            minHeight: 0,
                            borderRadius: 1.5,
                            borderColor: theme.palette.divider,
                            backgroundColor: theme.palette.background.paper,
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                        })}
                    >
                        <Box
                            sx={(theme) => ({
                                px: 1,
                                py: 1,
                                borderBottom: `1px solid ${theme.palette.divider}`,
                            })}
                        >
                            <Typography sx={{ fontSize: 14, fontWeight: 700, color: "text.primary" }}>
                                演算法瀏覽
                            </Typography>
                        </Box>
                        <Box sx={{ flex: 1, minHeight: 0, scrollbarGutter: "stable", display: "flex", flexDirection: "column" }}>
                            {
                                split === "view" && (
                                    <Box sx={{ m: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <Typography sx={{ fontSize: 14, fontWeight: 700, color: "text.primary" }}>
                                            候選演算法列表
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            onClick={() => {
                                                setEditingRow(null);
                                                setSplit("create_and_edit");
                                            }}
                                        >
                                            新增候選演算法
                                        </Button>
                                    </Box>
                                )
                            }
                            <Box sx={{ position: "relative", flex: 1, minHeight: 0, overflow: "hidden", m: 1 }}>

                                {/* 演算法瀏覽區塊 */}
                                <AlgorithmPreviewGrid
                                    split={split}
                                    previewRows={previewRows}
                                    previewColumns={previewColumns}
                                    isLoading={isLoading}
                                />

                                {/* 新增/編輯候選演算法區塊 */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        inset: 0,
                                        display: "flex",
                                        flexDirection: "column",
                                        minHeight: 0,
                                        transition: "transform 0.3s ease",
                                        transform: split === "create_and_edit" ? "translateX(0)" : "translateX(100%)",
                                    }}
                                >
                                    <Box sx={{ m: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <Typography sx={{ fontSize: 14, fontWeight: 700, color: "text.primary" }}>
                                            新增/編輯候選演算法
                                        </Typography>
                                        <Button variant="text" onClick={() => setSplit("view")}>
                                            返回
                                        </Button>
                                    </Box>
                                    {selectedRow && (
                                        <AddAndCreateAlgorithms
                                            modelId={selectedRow.id}
                                            editingRow={editingRow}
                                            previewGridProps={{
                                                split,
                                                previewRows,
                                                previewColumns,
                                                isLoading,

                                            }}
                                            onUpdate={onUpdated}
                                        />
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
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
                    <Button variant="text" onClick={() => setOpen(false)}>關閉</Button>
                </Box>


                {/* Dialog */}
                <ConfirmActionDialog
                    open={subDialogOpen.enableConfirm}
                    title={enableTargetRow?.enabled ? "確認關閉啟用" : "確認啟用"}
                    description={
                        enableTargetRow?.enabled
                            ? `確定要關閉「${enableTargetRow?.algorithm ?? "-"}」的啟用嗎？`
                            : `確定要啟用「${enableTargetRow?.algorithm ?? "-"}」嗎？`
                    }
                    confirmText={enableTargetRow?.enabled ? "關閉啟用" : "啟用"}
                    isSubmitting={submitting}
                    errorMessage={errorMessage}
                    onCancel={() => setSubDialogOpen({ enableConfirm: false })}
                    onConfirm={handleConfirmEnableChange}
                />

                <XTagsDialog
                    open={subDialogOpen.XTagsDialog}
                    onClose={() => setSubDialogOpen({ XTagsDialog: false })}
                    algorithmName={selectedAlgorithmName}
                    xTags={selectedXTags}
                />

                <AlgorithmResultDialog
                    open={subDialogOpen.detailDialog}
                    onClose={() => setSubDialogOpen({ detailDialog: false })}
                    row={detailRow}
                    onEnable={handleOpenEnableConfirm}
                />

                <ConfirmDeleteDialog
                    open={isDeleteConfirmOpen}
                    title="確認刪除演算法"
                    description={`確定要刪除「${deleteTargetRow?.algorithm ?? "-"}」嗎？刪除後將無法復原。`}
                    isDeleting={isDeletingAlgorithm}
                    errorMessage={deleteErrorMessage}
                    onCancel={handleDeleteCancel}
                    onConfirm={handleDeleteConfirm}
                />
            </Box >
        </Dialog >
    );
};

export default AiModelReviewDialog;