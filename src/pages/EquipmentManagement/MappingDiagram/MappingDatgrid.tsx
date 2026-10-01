import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid, GridRemoveIcon, useGridApiRef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Tooltip } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { showToast } from "@/components/ToasterCustom";

interface MappingDatgridProps {
    selectedCategory: string;
    diagram?: {
        chw_table: Record<string, any>[];
        cw_table: Record<string, any>[];
        raw_nodes: Record<string, number[]>;
        num_load: number;
    };
    onClickAddLoad: () => void;
    onClickDeleteLoad: () => void;
    onUpdateDiagram: (diagram: {
        chw_table: Record<string, any>[];
        cw_table: Record<string, any>[];
        raw_nodes: Record<string, number[]>;
        num_load: number;
    }) => void;
}

const MappingDatgrid = ({
    selectedCategory,
    diagram,
    onClickAddLoad,
    onClickDeleteLoad,
    onUpdateDiagram,
}: MappingDatgridProps) => {
    const apiRef = useGridApiRef();

    // console.log("selectedCategory", selectedCategory);
    // console.log("diagram", diagram);

    const { t } = useTranslation();
    const theme = useTheme();

    const [columns, setColumns] = useState<GridColDef[]>([]);
    const [rows, setRows] = useState<Record<string, any>[]>([]);

    const getValueColor = (value: number) => {
        const colors = theme.palette.chart.seriesColors;
        const base = colors[Math.abs(Math.round(value)) % colors.length];
        return { bg: alpha(base, 0.2), text: base };
    };

    const validateValue = (value: number): boolean => {
        return typeof value === "number" && !isNaN(value) && value >= 0;
    };


    const renderData = () => {
        switch (selectedCategory) {
            case "chw_table": {
                const columns = Object.keys(diagram?.chw_table?.[0] || []).join(",").split(",");
                setColumns(
                    columns.map((col) => {
                        const column: GridColDef = {
                            field: col,
                            headerName: t(`MappingDiagram.${selectedCategory}.${col}`),
                            width: 90,
                            align: "center",
                            editable: true,
                            sortable: false,
                            hideSortIcons: true,
                            disableColumnMenu: true,
                            renderCell: (params) => {
                                if (params.value == null || isNaN(Number(params.value))) return params.value;
                                const { bg, text } = getValueColor(Number(params.value));
                                return (
                                    <Box sx={{
                                        width: 25,
                                        height: 25,
                                        borderRadius: "50%",
                                        backgroundColor: bg,
                                        color: text,
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 12,
                                        margin: "auto",
                                        cursor: "pointer",
                                    }}>
                                        {params.value}
                                    </Box>
                                );
                            },
                        };

                        if (col === "out_load") {
                            column.width = 200;
                            column.hideSortIcons = true;
                            column.sortable = false;
                            // column.editable = false;
                            column.renderHeader = () => (
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: "8px",
                                    fontWeight: "bold"
                                }}>
                                    {t(`MappingDiagram.${selectedCategory}.out_load`)}
                                    <Tooltip title="新增負載數量">
                                        <Button
                                            onClick={onClickAddLoad}
                                            sx={{ minWidth: "auto", padding: "4px", round: "50%" }}>
                                            <AddIcon />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="減少負載數量">
                                        <Button
                                            onClick={onClickDeleteLoad}
                                            sx={{ minWidth: "auto", padding: "4px", round: "50%", color: "error.main" }}>
                                            <GridRemoveIcon />
                                        </Button>
                                    </Tooltip>
                                </Box>
                            );
                        }
                        if (col.endsWith("name")) {
                            column.width = 200;
                            column.align = "left"
                            column.editable = false;
                            column.renderCell = (params) => (
                                <>
                                    {params.value}
                                </>
                            );

                        }
                        return column;
                    })
                );
                // console.log("columns", columns)

                const rows = (diagram?.chw_table || []).map((item, index) => ({
                    id: index,
                    ...item,
                }));

                setRows(rows);
                break;
            }
            case "cw_table": {
                const columns = Object.keys(diagram?.cw_table?.[0] || [])
                setColumns(
                    columns.map((col) => {

                        const column: GridColDef = {
                            field: col,
                            headerName: t(`MappingDiagram.${selectedCategory}.${col}`),
                            width: 90,
                            align: "center",
                            editable: true,
                            sortable: false,
                            hideSortIcons: true,
                            disableColumnMenu: true,
                            renderCell: (params) => {
                                if (params.value == null || isNaN(Number(params.value))) return params.value;
                                const { bg, text } = getValueColor(Number(params.value));
                                return (
                                    <Box sx={{
                                        width: 25,
                                        height: 25,
                                        borderRadius: "50%",
                                        backgroundColor: bg,
                                        color: text,
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 12,
                                        margin: "auto",
                                        cursor: "pointer",
                                    }}>
                                        {params.value}
                                    </Box>
                                );
                            },
                        };

                        if (col.endsWith("name")) {
                            column.width = 200;
                            column.align = "left"
                            column.editable = false;
                            column.renderCell = (params) => (
                                <>
                                    {params.value}
                                </>
                            );

                        }

                        return column;
                    })
                );

                const rows =
                    (diagram?.cw_table || []).map((item, index) => ({ id: index, ...item }));

                // console.log("cw_table rows:", rows);

                setRows(rows);
                break;
            }
        }

    }


    useEffect(() => {
        renderData();
    }, [selectedCategory, diagram]);



    return (
        <DataGrid
            apiRef={apiRef}
            rows={rows}
            columns={columns}
            isCellEditable={(params) => params.value !== null}
            sx={{ height: "100%", minHeight: 0, "& .MuiDataGrid-cell--editable": { cursor: "pointer" } }}
            onCellClick={(params) => {
                const gridApi = apiRef.current;
                if (params.isEditable && gridApi?.getCellMode(params.id, params.field) === "view") {
                    gridApi.startCellEditMode({ id: params.id, field: params.field });
                }
            }}
            hideFooter
            disableRowSelectionOnClick
            showCellVerticalBorder
            showColumnVerticalBorder
            columnHeaderHeight={40}
            rowHeight={40}
            processRowUpdate={(updatedRow, oldRow) => {
                if (!diagram) return updatedRow;

                const changedField = Object.keys(updatedRow).find(
                    (key) => key !== "id" && updatedRow[key] !== oldRow[key]
                );
                if (changedField) {
                    const value = updatedRow[changedField];
                    if (value === "" || !validateValue(Number(value))) {
                        throw new Error(t("MappingDiagram.invalid-number"));
                    }
                }

                if (selectedCategory === "chw_table") {

                    const { id, ...values } = updatedRow;
                    const updatedChwTable = diagram.chw_table.map((item, index) =>
                        index === id ? { ...item, ...values } : item
                    );

                    onUpdateDiagram({
                        ...diagram,
                        chw_table: updatedChwTable,
                    });
                    return updatedRow;

                } else {
                    const { id, ...values } = updatedRow;
                    const updatedCwTable = diagram.cw_table.map((item, index) =>
                        index === id ? { ...item, ...values } : item
                    );

                    onUpdateDiagram({
                        ...diagram,
                        cw_table: updatedCwTable,
                    });
                    return updatedRow;

                }

            }}
            onProcessRowUpdateError={(error: Error) => showToast(error.message, "error")}
        />
    );
};

export default MappingDatgrid;