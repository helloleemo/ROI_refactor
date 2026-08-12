import { useState } from "react";
import { DataGrid, type GridColDef, type GridPaginationModel } from "@mui/x-data-grid";
import { ConfirmDeleteDialog, N30x30OptionsDelete, N30x30OptionsEdit, N30x30OptionsEyesclose, N30x30OptionsEyesopen } from "@/components";
import { Box, IconButton } from "@mui/material";
import aiModelService from "@/api/services/aiModel";
import type { AiModel } from "@/api/types/aiModel";
import { ModelStatusText } from "@/api/types/shared";

type AiModelDataGridProps = {
    rows?: AiModel[];
    onDeleted?: () => Promise<void> | void;
    onReview?: (row: AiModel) => void;
    onEdit?: (row: AiModel) => void;
};

const AiModelDatagrid = ({
    rows = [],
    onDeleted,
    onReview,
    onEdit,
}: AiModelDataGridProps) => {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deletingRow, setDeletingRow] = useState<AiModel | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteErrorMessage, setDeleteErrorMessage] = useState("");
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 10 });

    const handleDeleteClick = (row: AiModel) => {
        setDeletingRow(row);
        setDeleteErrorMessage("");
        setIsDeleteOpen(true);
    };

    const handleDeleteCancel = () => {
        if (isDeleting) return;
        setDeleteErrorMessage("");
        setDeletingRow(null);
        setIsDeleteOpen(false);
    };

    const handleDeleteConfirm = async () => {
        if (!deletingRow) return;

        try {
            setIsDeleting(true);
            setDeleteErrorMessage("");
            await aiModelService.delete(String(deletingRow.id));
            setIsDeleteOpen(false);
            setDeletingRow(null);
            await onDeleted?.();
        } catch (error: any) {
            setDeleteErrorMessage(`刪除失敗：${error?.message ?? "請稍後再試"}`);
        } finally {
            setIsDeleting(false);
        }
    };

    const columns: GridColDef<AiModel>[] = [
        {
            field: "no",
            headerName: "序號",
            width: 90,
            renderCell: (params) => {
                const rowIndexInPage = params.api.getRowIndexRelativeToVisibleRows(params.row.id);
                const rowNo = paginationModel.page * paginationModel.pageSize + rowIndexInPage + 1;
                return <span>{rowNo}</span>;
            },
            filterable: false,
            sortable: false,
        },
        { field: "id", headerName: "ID", width: 90 },
        { field: "model_name", headerName: "模型名稱", minWidth: 220, flex: 1 },
        {
            field: "algorithm",
            headerName: "演算法",
            minWidth: 160,
            valueGetter: (_, row) => row.active_algorithm?.algorithm ?? "-",
        },
        {
            field: "csv_name",
            headerName: "CSV檔名",
            minWidth: 220,
            flex: 1,
            valueGetter: (_, row) => row.active_algorithm?.csv_name ?? "-",
        },
        {
            field: "settings",
            headerName: "設定",
            minWidth: 220,
            flex: 1,
            valueGetter: (_, row) => {
                const activeAlgorithm = row.active_algorithm_id !== 0
                return (
                    activeAlgorithm ? `已完成設定` : `尚未完成設定`
                );
            }
        },
        {
            field: "status",
            headerName: "狀態",
            width: 140,
            valueGetter: (value) => ModelStatusText[value as keyof typeof ModelStatusText] ?? value,
        },
        { field: "created_at", headerName: "建立時間", minWidth: 180 },
        {
            field: "action",
            headerName: "操作",
            width: 190,
            filterable: false,
            sortable: false,
            renderCell: ({ row }) => {
                // const isReviewDisabled = !onReview;
                // const isReviewDisabled =
                //     row.active_algorithm_id === 0
                //     && row.active_algorithm.algorithm === null
                //     && row.active_algorithm.csv_name === null;

                return (
                    <Box sx={{ display: "flex", height: "100%", alignItems: "center", gap: 0.5 }}>
                        <IconButton
                            onClick={() => onReview?.(row)}
                            size="small"
                            sx={{ p: 0.5 }}
                        // disabled={isReviewDisabled}
                        >
                            {/* {isReviewDisabled ? <N30x30OptionsEyesclose /> : <N30x30OptionsEyesopen />} */}
                            <N30x30OptionsEyesopen />
                        </IconButton>
                        <IconButton
                            onClick={() => handleDeleteClick(row)}
                            size="small"
                            sx={{ p: 0.5 }}
                            disabled={isDeleting}
                        >
                            <N30x30OptionsDelete accentColor="semantic.errorAdaptive" />
                        </IconButton>
                    </Box>
                );
            }
        },
    ];

    return (
        <>
            <Box sx={{ width: "100%", height: "100%", minHeight: 0, display: "flex" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    sx={{ height: "100%", width: "100%" }}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    initialState={{
                        pagination: {
                            paginationModel: undefined,
                        },
                    }}
                    autoPageSize
                    disableRowSelectionOnClick
                    showCellVerticalBorder
                    showColumnVerticalBorder
                />
            </Box>

            <ConfirmDeleteDialog
                open={isDeleteOpen}
                title="確認刪除模型"
                description="這個操作無法復原，確定要刪除這筆模型嗎？"
                itemName={deletingRow?.model_name}
                isDeleting={isDeleting}
                errorMessage={deleteErrorMessage}
                onCancel={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
            />
        </>
    );
};

export default AiModelDatagrid;