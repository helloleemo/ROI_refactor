import { forwardRef, useCallback, useEffect, useMemo, useState, type ReactElement, type Ref } from "react";
import { ConfirmActionDialog, TitleText } from "@/components";
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
import { DataGrid } from "@mui/x-data-grid";
import aiModelService from "@/api/services/aiModel";
import type { AiModel } from "@/api/types/aiModel";
import type { algorithmListResponse } from "@/api/types/modelAlgorithm";
import AlgorithmResultDialog from "./AlgorithmResultDialog";
import XTagsDialog from "./XTagsDialog";
import type { AlgorithmPreviewRow } from "./AlgorithmPreviewRow.types";
import { buildSummaryCards, createAlgorithmPreviewColumns, mapAlgorithmPreviewRows } from "./aiModelReview";

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

    const [isInfoOpen, setIsInfoOpen] = useState(true);
    const [isXTagsDialogOpen, setIsXTagsDialogOpen] = useState(false);
    const [selectedXTags, setSelectedXTags] = useState<string[]>([]);
    const [selectedAlgorithmName, setSelectedAlgorithmName] = useState<string>("-");
    const [isEnableConfirmOpen, setIsEnableConfirmOpen] = useState(false);
    const [enableTargetRow, setEnableTargetRow] = useState<AlgorithmPreviewRow | null>(null);
    const [isUpdatingEnable, setIsUpdatingEnable] = useState(false);
    const [enableErrorMessage, setEnableErrorMessage] = useState("");
    const [activeAlgorithmId, setActiveAlgorithmId] = useState<number | null>(null);
    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
    const [detailRow, setDetailRow] = useState<any | null>(null);
    // const [selectedAlgorithm, setSelectedAlgorithm] = useState<algorithmListResponse | null>(null);

    useEffect(() => {
        setActiveAlgorithmId(selectedRow?.active_algorithm_id ?? null);
    }, [selectedRow?.active_algorithm_id]);

    const handleOpenXTagsDialog = useCallback((row: AlgorithmPreviewRow) => {
        setSelectedXTags(row.x_tags_list);
        setSelectedAlgorithmName(row.algorithm);
        setIsXTagsDialogOpen(true);
    }, []);

    const handleOpenDetailDialog = useCallback((row: AlgorithmPreviewRow) => {
        setDetailRow(row);
        // console.log("detailRow:", detailRow);
        setIsDetailDialogOpen(true);
    }, []);

    const handleCloseDetailDialog = () => {
        setIsDetailDialogOpen(false);
    };

    const handleOpenEnableConfirm = useCallback((row: AlgorithmPreviewRow) => {
        setEnableTargetRow(row);
        setEnableErrorMessage("");
        setIsEnableConfirmOpen(true);
    }, []);

    const handleConfirmEnableChange = async () => {
        if (!selectedRow || !enableTargetRow) return;

        const nextAlgorithmId = enableTargetRow.enabled ? 0 : enableTargetRow.id;

        try {
            setIsUpdatingEnable(true);
            setEnableErrorMessage("");
            await aiModelService.setActiveAlgorithm(selectedRow.id, nextAlgorithmId);
            setActiveAlgorithmId(nextAlgorithmId);
            await onUpdated?.();
            setIsEnableConfirmOpen(false);
        } catch (error: any) {
            setEnableErrorMessage(`更新啟用狀態失敗：${error?.message ?? "請稍後再試"}`);
        } finally {
            setIsUpdatingEnable(false);
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
            }),
        [handleOpenXTagsDialog, handleOpenEnableConfirm, handleOpenDetailDialog],
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
                            onClick={() => setIsInfoOpen((prev) => !prev)}
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
                            {isInfoOpen ? <ExpandLessIcon sx={{ fontSize: 20 }} /> : <ExpandMoreIcon sx={{ fontSize: 20 }} />}
                        </Button>
                        <Collapse in={isInfoOpen} timeout="auto" unmountOnExit>
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

                    {errorMessage && (
                        <Alert severity="error" variant="outlined" sx={{ mb: 1 }}>
                            {errorMessage}
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
                        <Box sx={{ flex: 1, minHeight: 0, scrollbarGutter: "stable" }}>
                            <DataGrid
                                rows={previewRows}
                                columns={previewColumns}
                                loading={isLoading}
                                disableRowSelectionOnClick
                                columnHeaderHeight={36}
                                sx={{
                                    border: 0,
                                    scrollbarGutter: "auto",

                                    "& .MuiDataGrid-columnHeaders": {
                                        borderBottom: "1px solid",
                                        borderColor: (theme) => theme.palette.semantic.borderSubtle,
                                        minHeight: "36px !important",
                                        maxHeight: "36px !important",
                                    },
                                    "& .MuiDataGrid-columnHeaderTitle": {
                                        fontWeight: "bold",
                                        fontSize: 13,
                                    },
                                }}
                            />
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
                    open={isEnableConfirmOpen}
                    title={enableTargetRow?.enabled ? "確認關閉啟用" : "確認啟用"}
                    description={
                        enableTargetRow?.enabled
                            ? `確定要關閉「${enableTargetRow?.algorithm ?? "-"}」的啟用嗎？`
                            : `確定要啟用「${enableTargetRow?.algorithm ?? "-"}」嗎？`
                    }
                    confirmText={enableTargetRow?.enabled ? "關閉啟用" : "啟用"}
                    isSubmitting={isUpdatingEnable}
                    errorMessage={enableErrorMessage}
                    onCancel={() => setIsEnableConfirmOpen(false)}
                    onConfirm={handleConfirmEnableChange}
                />

                <XTagsDialog
                    open={isXTagsDialogOpen}
                    onClose={() => setIsXTagsDialogOpen(false)}
                    algorithmName={selectedAlgorithmName}
                    xTags={selectedXTags}
                />

                <AlgorithmResultDialog
                    open={isDetailDialogOpen}
                    onClose={handleCloseDetailDialog}
                    row={detailRow}
                    onEnable={handleOpenEnableConfirm}
                />
            </Box>
        </Dialog >
    );
};

export default AiModelReviewDialog;