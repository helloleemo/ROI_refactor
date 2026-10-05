import { Box } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";

type CsvDatagridProps = {
    tags: string[];
    loading: boolean;
};

const CsvDatagrid = ({ tags, loading }: CsvDatagridProps) => {
    const { t } = useTranslation();
    const rows = tags.map((tag, index) => ({
        id: index + 1,
        no: index + 1,
        tag,
    }));

    const columns: GridColDef[] = [
        {
            field: "no",
            headerName: t("projectCsv.column_no"),
            width: 90,
        },
        {
            field: "tag",
            headerName: t("projectCsv.column_tags"),
            flex: 1,
            minWidth: 240,
        },
    ];

    return (
        <Box sx={{ flex: 1, minHeight: 0 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                disableRowSelectionOnClick
                columnHeaderHeight={36}
                loading={loading}
                hideFooter
                sx={{
                    border: 0,
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

export default CsvDatagrid;
