import { Box } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { AlgorithmPreviewRow } from "../AlgorithmPreviewRow.types";

export type AlgorithmPreviewGridProps = {
    split: "view" | "create_and_edit";
    previewRows: AlgorithmPreviewRow[];
    previewColumns: GridColDef<AlgorithmPreviewRow>[];
    isLoading: boolean;
};

const AlgorithmPreviewGrid = ({ split, previewRows, previewColumns, isLoading }: AlgorithmPreviewGridProps) => {
    return (
        <Box
            sx={{
                position: "absolute",
                inset: 0,
                transition: "transform 0.3s ease",
                transform: split === "view" ? "translateX(0)" : "translateX(-100%)",
            }}
        >
            <DataGrid
                rows={previewRows}
                columns={previewColumns}
                loading={isLoading}
                disableRowSelectionOnClick
                columnHeaderHeight={36}
                sx={{
                    border: 0,
                    // px: 0,
                    height: "100%",
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
    );
};

export default AlgorithmPreviewGrid;