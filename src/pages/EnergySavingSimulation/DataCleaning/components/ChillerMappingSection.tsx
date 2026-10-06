import { Box, MenuItem, Select, Typography } from "@mui/material";
import { DataGrid, type GridColDef, useGridApiRef } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import DataGridNoRowsOverlay from "@/components/DataGridNoRowsOverlay";
import { showToast } from "@/components/ToasterCustom";
import type { ChillerMapping } from "@/api/types/tagMapping";
import { tagMappingService } from "@/api/services/tagMapping";

interface ChillerMappingSectionProps {
    chillerMappings: ChillerMapping[];
    tags: string[];
    // onMappingsChange: (mappings: ChillerMapping[]) => void;
    onLoading: (loading: boolean) => void;
    onError: (error: Error) => void;
}

type ChillerMappingRow = ChillerMapping & { id: number };

const ChillerMappingSection = ({ chillerMappings, tags, // onMappingsChange, 
    onLoading, onError }: ChillerMappingSectionProps) => {

    // console.log("chillerMappings", chillerMappings)
    // console.log("tags", tags);

    const tagFields = chillerMappings[0] ? Object.keys(chillerMappings[0]).filter(key => key.endsWith("_tag")) as (keyof ChillerMapping)[] : [];
    const percentageFields = chillerMappings[0] ? Object.keys(chillerMappings[0]).filter(key => key.endsWith("_pct")) as (keyof ChillerMapping)[] : [];

    const { t } = useTranslation();
    const apiRef = useGridApiRef();
    const [openTagCell, setOpenTagCell] = useState<string | null>(null);
    const rows = useMemo<ChillerMappingRow[]>(
        () => chillerMappings.map((mapping, id) => ({ ...mapping, id })),
        [chillerMappings],
    );



    const handleTagChange = async (name: string, id: number, field: typeof tagFields[number], value: string) => {
        await apiRef.current?.setEditCellValue({ id, field, value });
        // onLoading(true);
        onLoading(true);
        try {
            await handleSaveChillerMappings(name, field, value);
            // onMappingsChange(chillerMappings.map((mapping, index) =>
            //     index === id ? { ...mapping, [field]: value } : mapping,
            // ));
            apiRef.current?.stopCellEditMode({ id, field });
        } catch (error) {
            onError(error as Error);
        } finally {
            onLoading(false);
        }
    };

    const handleSaveChillerMappings = async (target_id: string, field: string, value: string) => {
        await tagMappingService.patchCell({
            category: "chiller",
            target_id: target_id,
            field: field,
            value: value
        });
    };

    const columns = useMemo<GridColDef<ChillerMappingRow>[]>(() => [
        {
            field: "equipment_name",
            headerName: t("dataCleaning.chiller_sensor_mapping_and_boundary_conditions.columns.equipment_name"),
            minWidth: 180,
            flex: 1,
            sortable: false,
            disableColumnMenu: true,
        },
        ...tagFields.map((field): GridColDef<ChillerMappingRow> => ({
            field,
            headerName: t(`dataCleaning.chiller_sensor_mapping_and_boundary_conditions.columns.${field}`),
            type: "singleSelect",
            valueOptions: [
                {
                    value: "",
                    label: t("dataCleaning.chiller_sensor_mapping_and_boundary_conditions.columns.unselected"),
                },
                ...tags.filter((tag) => tag !== ""),
            ],
            minWidth: 180,
            flex: 1,
            editable: true,
            sortable: false,
            disableColumnMenu: true,
            renderEditCell: (params) => (
                <Select
                    autoFocus
                    fullWidth
                    size="small"
                    open={openTagCell === `${params.id}:${field}`}
                    onOpen={() => setOpenTagCell(`${params.id}:${field}`)}
                    onClose={() => setOpenTagCell(null)}
                    value={params.value ?? ""}
                    onChange={(event) => {
                        setOpenTagCell(null);
                        void handleTagChange(params.row.equipment_name, params.id as number, field, event.target.value)
                            .catch((error: Error) => showToast(error.message, "error"));
                    }}
                    sx={{
                        cursor: "pointer",
                    }}

                >
                    <MenuItem value="" disabled
                        sx={{
                            cursor: "not-allowed",
                        }}>
                        {t("dataCleaning.chiller_sensor_mapping_and_boundary_conditions.columns.unselected")}
                    </MenuItem>
                    {tags.filter((tag) => tag !== "").map((tag) => (
                        <MenuItem key={tag} value={tag}>{tag}</MenuItem>
                    ))}
                </Select>
            ),
            renderCell: (params) => params.value == null || params.value === ""
                ? (
                    <Typography
                        variant="body2"
                        color="grey.200"
                        sx={{ height: "100%", color: "grey.200", fontStyle: "italic", display: "flex", alignItems: "center", fontSize: "0.8rem", cursor: "pointer" }}
                    >
                        {t("dataCleaning.chiller_sensor_mapping_and_boundary_conditions.columns.unselected")}
                    </Typography>
                )
                : params.value,
        })),
        ...percentageFields.map((field): GridColDef<ChillerMappingRow> => ({
            field,
            headerName: t(`dataCleaning.chiller_sensor_mapping_and_boundary_conditions.columns.${field}`),
            type: "number",
            width: 170,
            editable: true,
            sortable: false,
            disableColumnMenu: true,

        })),
    ], [t, tags, openTagCell]);

    return (
        <Box sx={{ width: "100%", minWidth: 0, minHeight: 0 }}>
            <DataGrid
                apiRef={apiRef}
                rows={rows}
                columns={columns}
                getRowId={(row) => row.id}
                isCellEditable={(params) => params.field !== "equipment_name"}
                onCellClick={(params) => {
                    const gridApi = apiRef.current;
                    if (params.isEditable && gridApi?.getCellMode(params.id, params.field) === "view") {
                        const tagField = tagFields.find((field) => field === params.field);
                        setOpenTagCell(tagField ? `${params.id}:${tagField}` : null);
                        gridApi.startCellEditMode({ id: params.id, field: params.field });
                    }
                }}
                processRowUpdate={async (updatedRow, originalRow) => {
                    const { id, ...updatedMapping } = updatedRow;
                    const validPercentages = percentageFields.every((field) => {
                        const value = updatedMapping[field];
                        return Number.isFinite(value);
                    });
                    if (!validPercentages) throw new Error(t("MappingDiagram.invalid-number"));

                    const changedPercentageFields = percentageFields.filter((field) =>
                        updatedMapping[field] !== originalRow[field],
                    );
                    for (const field of changedPercentageFields) {
                        await handleSaveChillerMappings(updatedMapping.equipment_name, field, String(updatedMapping[field]));
                    }
                    if (changedPercentageFields.length > 0) {
                        // onMappingsChange(chillerMappings.map((mapping, index) =>
                        //     index === id ? updatedMapping as ChillerMapping : mapping,
                        // ));
                    }
                    return updatedRow;
                }}
                onProcessRowUpdateError={(error: Error) => showToast(error.message, "error")}
                slots={{ noRowsOverlay: DataGridNoRowsOverlay }}
                hideFooter
                disableRowSelectionOnClick
                showCellVerticalBorder
                showColumnVerticalBorder
                columnHeaderHeight={40}
                rowHeight={40}
                sx={{ width: "100%", height: "100%", minWidth: 0, minHeight: 0, "& .MuiDataGrid-cell--editable": { cursor: "pointer" } }}
            />
        </Box>
    );
};

export default ChillerMappingSection;