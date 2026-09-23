import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { EquipmentField, EquipementResponse } from "@/api/types/equipment";
import { useTranslation } from "react-i18next";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import {
    ConfirmDeleteDialog,
    N30x30OptionsCopy,
    N30x30OptionsDelete,
    N30x30OptionsEdit,
    N30x30OptionsEyesopen,
} from "@/components";
import equipmentService from "@/api/services/equipment";
interface EquipmentDatagridProps {
    selectedCategory: string;
    renderFields: EquipmentField[];
    equipmentList: EquipementResponse[];
    onView?: (row: EquipementResponse) => void;
    onEdit?: (row: EquipementResponse) => void;
    onCopy?: (row: EquipementResponse) => void;
    onDeleted?: () => void | Promise<void>;
}

const EquipmentDatagrid = ({
    selectedCategory,
    renderFields,
    equipmentList,
    onView,
    onEdit,
    onCopy,
    onDeleted,
}: EquipmentDatagridProps) => {

    const renderRows = equipmentList.map((equipment) => ({
        id: equipment.id,
        equipment_name: equipment.equipment_name,
        ...equipment.specs,
    }));

    const { t } = useTranslation();
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [deletingRow, setDeletingRow] = useState<EquipementResponse | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

    const handleDeleteConfirm = async () => {
        if (!deletingRow) return;

        try {
            setIsDeleting(true);
            setDeleteErrorMessage("");
            await equipmentService.delete(deletingRow.id);
            setDeletingRow(null);
            await onDeleted?.();
        } catch (error: any) {
            setDeleteErrorMessage(`刪除失敗：${error?.message ?? "請稍後再試"}`);
        } finally {
            setIsDeleting(false);
        }
    };


    const columns: GridColDef[] = [
        {
            field: "equipment_name",
            headerName: `${t(`equipment-list.fields${selectedCategory}.equipment_name`)}`,
            width: 150,
        },
        ...renderFields.map((field) => {
            return (
                {
                    field: field.key,
                    headerName: `${t(`equipment-list.fields${selectedCategory}.${field.key}`)}`,
                    width: 150,
                }
            )
        }),
        {
            field: "actions",
            headerName: `${t(`equipment-list.actions`)}`,
            width: 180,
            sortable: false,
            filterable: false,
            renderCell: ({ row }) => (
                <Box sx={{ display: "flex", height: "100%", alignItems: "center", gap: 0.25 }}>
                    <Tooltip title="檢視">
                        <IconButton
                            size="small"
                            sx={{ p: 0.5 }}
                            onClick={() => {
                                const equipment = equipmentList.find((item) => item.id === row.id);
                                if (equipment) onView?.(equipment);
                            }}
                        >
                            <N30x30OptionsEyesopen />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="複製">
                        <IconButton
                            size="small"
                            sx={{ p: 0.5 }}
                            onClick={() => {
                                const equipment = equipmentList.find((item) => item.id === row.id);
                                if (equipment) onCopy?.(equipment);
                            }}
                        >
                            <N30x30OptionsCopy />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="編輯">
                        <IconButton
                            size="small"
                            sx={{ p: 0.5 }}
                            onClick={() => {
                                const equipment = equipmentList.find((item) => item.id === row.id);
                                if (equipment) onEdit?.(equipment);
                            }}
                        >
                            <N30x30OptionsEdit accentColor="primary.main" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="刪除">
                        <IconButton
                            size="small"
                            sx={{ p: 0.5 }}
                            onClick={() => {
                                setDeleteErrorMessage("");
                                setDeletingRow(row);
                            }}
                            disabled={isDeleting}
                        >
                            <N30x30OptionsDelete accentColor="semantic.errorAdaptive" />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        }
    ]

    return (
        <>
            <Box sx={{ width: "100%", height: "100%", minHeight: 0, display: "flex" }}>

                {/* Equipment Datagrid {selectedCategory}
            {renderFields.map((field) => (
                <div key={field.key}>
                    {field.label}
                </div>
            ))} */}

                <DataGrid
                    rows={renderRows}
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
                open={Boolean(deletingRow)}
                title="確認刪除設備"
                description="這個操作無法復原，確定要刪除這筆設備嗎？"
                itemName={deletingRow?.equipment_name}
                isDeleting={isDeleting}
                errorMessage={deleteErrorMessage}
                onCancel={() => {
                    if (!isDeleting) {
                        setDeletingRow(null);
                        setDeleteErrorMessage("");
                    }
                }}
                onConfirm={handleDeleteConfirm}
            />
        </>
    );
};

export default EquipmentDatagrid;