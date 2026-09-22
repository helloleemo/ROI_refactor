

import { useState } from "react";
import { Box, Tooltip } from "@mui/material";
import { DataGrid, type GridColDef, type GridPaginationModel } from "@mui/x-data-grid";
import type { LanguageTableRow } from "@/utils/language";
import languageService from "@/api/services/languages";
import { N36x36Information } from "@/components";

type LanguageListProps = {
    rows?: LanguageTableRow[];
    selectedLocales: string[];
    onUpdated?: () => Promise<void> | void;
};

const LanguageList = ({ rows = [], selectedLocales, onUpdated }: LanguageListProps) => {
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 10 });
    const locales = selectedLocales;

    const columns: GridColDef<LanguageTableRow>[] = [
        {
            field: "no",
            headerName: "序號",
            width: 50,
            sortable: false,
            renderCell: (params) => {
                const rowIndex = params.api.getRowIndexRelativeToVisibleRows(params.row.id);
                return paginationModel.page * paginationModel.pageSize + rowIndex + 1;
            },
        },
        // { field: "category", headerName: "分類", width: 140 },
        { field: "text_key", headerName: "key", flex: 1 },
        ...locales.map((locale) => ({
            field: locale,
            renderHeader: () => (
                <>
                    {locale}
                    <span>
                        <Tooltip title={"可滑鼠雙擊編輯此語言的翻譯"}>
                            <N36x36Information width={24} height={24} />
                        </Tooltip>
                    </span>
                </>
            ),
            flex: 1,
            editable: true,
            valueGetter: (_value: unknown, row: LanguageTableRow) =>
                `${row.translations[locale]?.text_value}` || row.text_key,
            valueSetter: (value: string, row: LanguageTableRow) => {
                const translation = row.translations[locale];

                // if (!translation) {
                //     return row;
                // }

                return {
                    ...row,
                    translations: {
                        ...row.translations,
                        [locale]: {
                            ...translation,
                            text_value: value,
                        },
                    },
                };
            },
            renderCell: ({ row }: { row: LanguageTableRow }) =>
                `${row.translations[locale]?.text_value}` || row.text_key,
        })),
    ];

    const processRowUpdate = async (
        updatedRow: LanguageTableRow,
        originalRow: LanguageTableRow,
    ) => {
        const changedLocale = locales.find((locale) =>
            updatedRow.translations[locale]?.text_value !== originalRow.translations[locale]?.text_value,
        );

        if (!changedLocale) {
            return originalRow;
        }

        const translation = updatedRow.translations[changedLocale];

        if (!translation) {
            return originalRow;
        }

        await languageService.update({
            id: translation.id,
            text_value: translation.text_value,
            category: updatedRow.category,
        });
        await onUpdated?.();

        return updatedRow;
    };

    return (
        <Box sx={{ width: "100%", height: "100%", minHeight: 0, display: "flex" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                sx={{ height: "100%", width: "100%" }}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                autoPageSize
                disableRowSelectionOnClick
                showCellVerticalBorder
                showColumnVerticalBorder
                processRowUpdate={processRowUpdate}
            />
        </Box>
    );
};

export default LanguageList;