import { useState } from "react";
import { DataGrid, type GridColDef, type GridPaginationModel } from "@mui/x-data-grid";
import { ConfirmDeleteDialog, N30x30OptionsDelete, N30x30OptionsEyesclose, N30x30OptionsEyesopen } from "@/components";
import { Box, IconButton } from "@mui/material";
// import CsvReviewDialog from "./CsvReviewDialog";
import importFileService from "@/api/services/importFile";
import type { ImportFile } from "@/api/types/index.ts";



type CsvDataGridProps = {
    // searchValue?: string;
    rows?: ImportFile[];
    onDeleted?: () => Promise<void> | void;
    onReview?: (row: ImportFile) => void;
}




const CsvDataGrid = ({
    // searchValue = "",
    rows = [],
    onDeleted,
    onReview,
}: CsvDataGridProps) => {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deletingRow, setDeletingRow] = useState<ImportFile | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteErrorMessage, setDeleteErrorMessage] = useState("");
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 10 });

    // const normalizedSearch = searchValue.trim().toLowerCase();
    // const filteredRows = !normalizedSearch
    //     ? rows
    //     : rows.filter((row) =>
    //         row.file_name.toLowerCase().includes(normalizedSearch)
    //         // row.fieldCount.toString().toLowerCase().includes(normalizedSearch) ||
    //         // row.rowCount.toString().toLowerCase().includes(normalizedSearch),
    //     );

    const handleDeleteClick = (row: ImportFile) => {
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
            await importFileService.deleteFile(String(deletingRow.id));
            setIsDeleteOpen(false);
            setDeletingRow(null);
            await onDeleted?.();
        } catch (error: any) {
            setDeleteErrorMessage(`刪除失敗：${error?.message ?? "請稍後再試"}`);
        } finally {
            setIsDeleting(false);
        }
    };

    const columns: GridColDef<ImportFile>[] = [
        {
            field: "no", headerName: "序號", width: 90, renderCell: (params) => {
                const rowIndexInPage = params.api.getRowIndexRelativeToVisibleRows(params.row.id);
                const rowNo = paginationModel.page * paginationModel.pageSize + rowIndexInPage + 1;
                return <span>{rowNo}</span>;
            }
        },
        { field: "id", headerName: "ID", width: 90 },
        // { field: "name", headerName: "名稱", width: 90 },
        { field: "file_name", headerName: "CSV檔名", width: 300 },

        {
            field: "tags", headerName: "欄位數", width: 120, renderCell: ({ value }) => {
                const tagCount = value.split(",").filter(Boolean).length;
                return <span>{tagCount}</span>;
            }
        },
        { field: "row_count", headerName: "行數", width: 120 },
        {
            field: "status", headerName: "狀態", width: 120,
            renderCell: ({ value }) => {
                return (
                    <Box sx={{ display: "flex", height: "100%", alignItems: "center", gap: 0.5 }}>
                        {value}
                        {/* <CustomChips type="statuses" value={value} /> */}
                    </Box>
                );
            },
        },
        {
            field: "action", headerName: "操作", width: 140,
            filterable: false,
            sortable: false,
            renderCell: ({ row }) => {
                const isReviewDisabled = row.status === 1;

                return (
                    <Box sx={{ display: "flex", height: "100%", alignItems: "center", gap: 0.5 }}>
                        <IconButton
                            onClick={() => onReview?.(row)}
                            size="small"
                            sx={{ p: 0.5 }}
                            disabled={isReviewDisabled}
                        >
                            {isReviewDisabled ? <N30x30OptionsEyesclose /> : <N30x30OptionsEyesopen />}
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
                )
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
                title="確認刪除 CSV"
                description="這個操作無法復原，確定要刪除這筆 CSV 嗎？"
                itemName={deletingRow?.file_name}
                isDeleting={isDeleting}
                errorMessage={deleteErrorMessage}
                onCancel={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
            />

        </>
    );
};
export default CsvDataGrid;