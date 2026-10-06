import { Box, MenuItem, Select, Typography } from "@mui/material";
import { DataGrid, type GridColDef, useGridApiRef } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import DataGridNoRowsOverlay from "@/components/DataGridNoRowsOverlay";
import type { LoadMapping } from "@/api/types/tagMapping";
import { tagMappingService } from "@/api/services/tagMapping";

interface LoadMappingSectionProps {
    loadMappings: LoadMapping[];
    tags: string[];
    // onMappingsChange: (mappings: LoadMapping[]) => void;
    onLoading: (loading: boolean) => void;
    onError: (error: Error) => void;
}

type LoadMappingRow = LoadMapping & { id: number };
type LoadTagField = "st_tag" | "rt_tag" | "flow_tag" | "dp_tag";

const tagFields: LoadTagField[] = ["st_tag", "rt_tag", "flow_tag", "dp_tag"];

const LoadMappingSection = ({ loadMappings, tags, /* onMappingsChange, */ onLoading, onError }: LoadMappingSectionProps) => {
    const { t } = useTranslation();
    const apiRef = useGridApiRef();
    const [openTagCell, setOpenTagCell] = useState<string | null>(null);
    const rows = useMemo<LoadMappingRow[]>(
        () => loadMappings.map((mapping, id) => ({ ...mapping, id })),
        [loadMappings],
    );

    const handleTagChange = async (row: LoadMappingRow, field: LoadTagField, value: string) => {
        await apiRef.current?.setEditCellValue({ id: row.id, field, value });
        onLoading(true);
        try {
            await tagMappingService.patchCell({
                category: "load",
                target_id: row.load_name,
                field,
                value,
            });
            // onMappingsChange(loadMappings.map((mapping) => mapping.load_name === row.load_name
            //     ? { ...mapping, [field]: value }
            //     : mapping));
            apiRef.current?.stopCellEditMode({ id: row.id, field });
        } catch (error) {
            onError(error instanceof Error ? error : new Error("Unable to save load mapping"));
        } finally {
            onLoading(false);
        }
    };

    const columns = useMemo<GridColDef<LoadMappingRow>[]>(() => [
        {
            field: "load_name",
            headerName: t("dataCleaning.load_side_sensor_mapping.columns.load_name"),
            minWidth: 180,
            flex: 1,
            sortable: false,
            disableColumnMenu: true,
        },
        ...tagFields.map((field): GridColDef<LoadMappingRow> => ({
            field,
            headerName: t(`dataCleaning.load_side_sensor_mapping.columns.${field}`),
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
                        void handleTagChange(params.row, field, event.target.value);
                    }}
                    sx={{ cursor: "pointer" }}
                >
                    <MenuItem value="" disabled>
                        {t("dataCleaning.load_side_sensor_mapping.columns.unselected")}
                    </MenuItem>
                    {tags.filter((tag) => tag !== "").map((tag) => (
                        <MenuItem key={tag} value={tag}>{tag}</MenuItem>
                    ))}
                </Select>
            ),
            renderCell: (params) => params.value == null || params.value === ""
                ? (
                    <Typography sx={{ height: "100%", display: "flex", alignItems: "center", color: "grey.200", fontStyle: "italic", fontSize: "0.8rem" }}>
                        {t("dataCleaning.load_side_sensor_mapping.columns.unselected")}
                    </Typography>
                )
                : params.value,
        })),
    ], [t, tags, openTagCell, loadMappings]);

    return (
        <Box sx={{ width: "100%", minHeight: 0 }}>
            <DataGrid
                apiRef={apiRef}
                rows={rows}
                columns={columns}
                getRowId={(row) => row.id}
                isCellEditable={(params) => params.field !== "load_name"}
                onCellClick={(params) => {
                    const gridApi = apiRef.current;
                    if (params.isEditable && gridApi?.getCellMode(params.id, params.field) === "view") {
                        const field = tagFields.find((tagField) => tagField === params.field);
                        setOpenTagCell(field ? `${params.id}:${field}` : null);
                        gridApi.startCellEditMode({ id: params.id, field: params.field });
                    }
                }}
                slots={{ noRowsOverlay: DataGridNoRowsOverlay }}
                hideFooter
                disableRowSelectionOnClick
                showCellVerticalBorder
                showColumnVerticalBorder
                columnHeaderHeight={40}
                rowHeight={40}
                sx={{
                    width: "100%",
                    border: "1px solid",
                    borderColor: "grey.100",
                    height: "100%", minWidth: 0, minHeight: 0, "& .MuiDataGrid-cell--editable": { cursor: "pointer" }
                }}
            />
        </Box>
    );
};

export default LoadMappingSection;