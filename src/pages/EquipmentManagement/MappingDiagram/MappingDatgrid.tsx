import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";

interface MappingDatgridProps {
    selectedCategory: string;
    diagram?: {
        chw_table: Record<string, any>[];
        cw_table: Record<string, any>[];
        raw_nodes: Record<string, number[]>;
        num_load: number;
    };
    onClickAddLoad: () => void;
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
    onUpdateDiagram,
}: MappingDatgridProps) => {
    const apiRef = useGridApiRef();

    // console.log("selectedCategory", selectedCategory);
    // console.log("diagram", diagram);

    const [columns, setColumns] = useState<GridColDef[]>([]);
    const [rows, setRows] = useState<Record<string, any>[]>([]);


    const renderData = () => {
        switch (selectedCategory) {
            case "chw_table": {
                const columns = Object.keys(diagram?.chw_table?.[0] || [])
                setColumns(
                    columns.map((col) => {
                        const column: GridColDef = {
                            field: col,
                            headerName: col,
                            width: 80,
                            align: "center",
                            editable: true,
                            sortable: false,
                            hideSortIcons: true,
                            disableColumnMenu: true,
                            // renderCell: (params) => (
                            //     <Box sx={{
                            //         backgroundColor: "grey.50",
                            //         cursor: "pointer",
                            //     }}>
                            //         {params.value}
                            //     </Box>
                            // ),
                            // valueSetter: (params) => Number(params.value),
                        };

                        if (col === "out_load") {
                            column.width = 150;
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
                                    out_load
                                    <Tooltip title="新增負載數量">
                                        <Button
                                            onClick={onClickAddLoad}
                                            sx={{ minWidth: "auto", padding: "4px", round: "50%" }}>
                                            <AddIcon />
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
                            headerName: col,
                            width: 80,
                            align: "center",
                            editable: true,
                            sortable: false,
                            hideSortIcons: true,
                            disableColumnMenu: true,
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
            processRowUpdate={(updatedRow) => {
                if (!diagram) return updatedRow;

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
        />
    );
};

export default MappingDatgrid;