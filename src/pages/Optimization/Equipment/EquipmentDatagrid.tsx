import { useState } from "react";
import { DataGrid, type GridColDef, type GridPaginationModel } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import { ConfirmDeleteDialog, N30x30OptionsDelete, N30x30OptionsEdit } from "@/components";
import equipmentService from "@/api/services/equipment";
import type { EquipementResponse } from "@/api/types/equipment";

type EquipmentDatagridProps = {
    rows?: EquipementResponse[];
    onDeleted?: () => Promise<void> | void;
    onEdit?: (row: EquipementResponse) => void;
};

const EquipmentDatagrid = ({ rows = [], onDeleted, onEdit }: EquipmentDatagridProps) => {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deletingRow, setDeletingRow] = useState<EquipementResponse | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteErrorMessage, setDeleteErrorMessage] = useState("");
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 10 });

    const handleDeleteClick = (row: EquipementResponse) => {
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
            await equipmentService.delete(deletingRow.id);
            setIsDeleteOpen(false);
            setDeletingRow(null);
            await onDeleted?.();
        } catch (error: any) {
            setDeleteErrorMessage(`刪除失敗：${error?.message ?? "請稍後再試"}`);
        } finally {
            setIsDeleting(false);
        }
    };

    const columns: GridColDef<EquipementResponse>[] = [
        {
            field: "no",
            headerName: "序號",
            width: 90,
            sortable: false,
            filterable: false,
            renderCell: (params) => {
                const rowIndexInPage = params.api.getRowIndexRelativeToVisibleRows(params.row.id);
                const rowNo = paginationModel.page * paginationModel.pageSize + rowIndexInPage + 1;
                return <span>{rowNo}</span>;
            },
        },
        { field: "id", headerName: "ID", width: 100 },
        { field: "equipment_name", headerName: "設備名稱", minWidth: 220, flex: 1 },
        { field: "equipment_type", headerName: "設備類型", width: 140 },
        {
            field: "status",
            headerName: "狀態",
            width: 120,
            valueGetter: (value) => (value === 1 ? "啟用" : value === 2 ? "停用" : value ?? "-"),
        },
        {
            field: "remarks",
            headerName: "備註",
            minWidth: 220,
            flex: 1,
            renderCell: ({ value }) => (
                <Box sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {value || "-"}
                </Box>
            ),
        },
        {
            field: "action",
            headerName: "操作",
            width: 140,
            sortable: false,
            filterable: false,
            renderCell: ({ row }) => (
                <Box sx={{ display: "flex", height: "100%", alignItems: "center", gap: 0.5 }}>
                    <IconButton size="small" sx={{ p: 0.5 }} onClick={() => onEdit?.(row)}>
                        <N30x30OptionsEdit accentColor="primary.main" />
                    </IconButton>
                    <IconButton size="small" sx={{ p: 0.5 }} onClick={() => handleDeleteClick(row)} disabled={isDeleting}>
                        <N30x30OptionsDelete accentColor="semantic.errorAdaptive" />
                    </IconButton>
                </Box>
            ),
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
                title="確認刪除設備"
                description="這個操作無法復原，確定要刪除這筆設備嗎？"
                itemName={deletingRow?.equipment_name}
                isDeleting={isDeleting}
                errorMessage={deleteErrorMessage}
                onCancel={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
            />
        </>
    );
};

export default EquipmentDatagrid;
