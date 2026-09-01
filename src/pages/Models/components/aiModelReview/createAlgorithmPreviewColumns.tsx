import { N30x30OptionsDelete, N30x30OptionsEdit, N30x30OptionsEyesopen, N30x30OptionsList } from "@/components";
import { Box, Button, IconButton, Typography } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import type { AlgorithmPreviewRow } from "../AlgorithmPreviewRow.types";

type CreateAlgorithmPreviewColumnsArgs = {
    onOpenXTagsDialog: (row: AlgorithmPreviewRow) => void;
    onOpenEnableConfirm: (row: AlgorithmPreviewRow) => void;
    onOpenDetailDialog: (row: AlgorithmPreviewRow) => void;
    onOpenEditForm: (row: AlgorithmPreviewRow) => void;
    onOpenDeleteConfirm: (row: AlgorithmPreviewRow) => void;
};

export const createAlgorithmPreviewColumns = ({
    onOpenXTagsDialog,
    onOpenEnableConfirm,
    onOpenDetailDialog,
    onOpenEditForm,
    onOpenDeleteConfirm,
}: CreateAlgorithmPreviewColumnsArgs): GridColDef<AlgorithmPreviewRow>[] => {
    return [
        { field: "upload_name", headerName: "檔案名稱", width: 120 },
        { field: "algorithm", headerName: "演算法", minWidth: 140 },
        { field: "y_tag", headerName: "模型目標 Y", minWidth: 180 },
        {
            field: "x_tags",
            headerName: "模型變數 X",
            minWidth: 260,
            flex: 1,
            sortable: false,
            renderCell: ({ row }) => (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        height: "100%",
                        width: "100%",
                        gap: 1,
                    }}
                >
                    <Typography
                        sx={{
                            flex: 1,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontSize: 13,
                            lineHeight: 1,
                            color: "text.primary",
                        }}
                    >
                        {row.x_tags}
                    </Typography>
                    <IconButton
                        size="small"
                        sx={{ p: 0.25 }}
                        aria-label="檢視全部 X Tags"
                        onClick={() => onOpenXTagsDialog(row)}
                    >
                        <N30x30OptionsList />
                    </IconButton>
                </Box>
            ),
        },
        { field: "r2", headerName: "R^2", width: 90 },
        { field: "mae", headerName: "MAE", width: 100 },
        { field: "mape", headerName: "MAPE", width: 110 },
        {
            field: "status",
            headerName: "狀態",
            width: 120,
            renderCell: ({ value }) => {
                const statusLabel = String(value ?? "-");
                return <span>{statusLabel}</span>;
            },
        },
        {
            field: "action",
            headerName: "操作",
            minWidth: 260,
            filterable: false,
            sortable: false,
            renderCell: ({ row }) => {
                const actionDisabled = row.statusCode !== 4;

                return (
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%", height: "100%", gap: 0.5 }}>
                        <Button
                            size="small"
                            variant={row.enabled ? "contained" : "outlined"}
                            color="primary"
                            sx={{ minWidth: 78, lineHeight: 2 }}
                            disabled={actionDisabled}
                            onClick={() => onOpenEnableConfirm(row)}
                        >
                            {row.enabled ? "已啟用" : "未啟用"}
                        </Button>
                        <IconButton
                            size="small"
                            sx={{ p: 0.5 }}
                            disabled={actionDisabled}
                            onClick={() => onOpenDetailDialog(row)}
                            aria-label="view details"
                        >
                            <N30x30OptionsEyesopen />
                        </IconButton>
                        <IconButton
                            size="small"
                            sx={{ p: 0.5 }}
                            disabled={actionDisabled}
                            onClick={() => onOpenEditForm(row)}
                        >
                            <N30x30OptionsEdit accentColor="primary.main" />
                        </IconButton>
                        <IconButton
                            size="small"
                            sx={{ p: 0.5 }}
                            disabled={actionDisabled}
                            onClick={() => onOpenDeleteConfirm(row)}
                            aria-label="delete algorithm"
                        >
                            <N30x30OptionsDelete accentColor="semantic.errorAdaptive" />
                        </IconButton>
                    </Box>
                );
            },
        },
    ];
};
