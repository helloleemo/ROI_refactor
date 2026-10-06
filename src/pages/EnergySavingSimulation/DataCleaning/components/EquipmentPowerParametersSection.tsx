

import { Box, MenuItem, Select, Typography } from "@mui/material";
import ElectricBoltOutlinedIcon from "@mui/icons-material/ElectricBoltOutlined";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { PumpMappings } from "@/api/types/tagMapping";
import { tagMappingService } from "@/api/services/tagMapping";
import { showToast } from "@/components/ToasterCustom";
import DataGridNoRowsOverlay from "@/components/DataGridNoRowsOverlay";

interface EquipmentPowerParametersSectionProps {
    pumpMappings?: PumpMappings;
    tags: string[];
    onMappingsChange: (mappings: PumpMappings) => void;
    onLoading: (loading: boolean) => void;
}

type PumpCategory = keyof PumpMappings;
type PowerTagField = "power_tag" | "power_tag_1" | "power_tag_2";

interface PowerMappingRow {
    id: string;
    category: PumpCategory;
    index: number;
    equipment_name: string;
    power_tag: string;
    power_tag_1: string;
    power_tag_2: string;
}

const categories: PumpCategory[] = ["chp", "zp", "cwp", "ct"];

const EquipmentPowerParametersSection = ({
    pumpMappings,
    tags,
    onMappingsChange,
    onLoading,
}: EquipmentPowerParametersSectionProps) => {


    console.log("pumpMappings:", pumpMappings);

    const { t } = useTranslation();
    const [openTagCell, setOpenTagCell] = useState<string | null>(null);
    const rows: PowerMappingRow[] = categories.flatMap((category) =>
        (pumpMappings?.[category] ?? []).map((mapping, index) => ({
            id: `${category}:${index}`,
            category,
            index,
            equipment_name: mapping.equipment_name,
            power_tag: "power_tag" in mapping ? mapping.power_tag ?? "" : "",
            power_tag_1: "power_tag_1" in mapping ? mapping.power_tag_1 ?? "" : "",
            power_tag_2: "power_tag_2" in mapping ? mapping.power_tag_2 ?? "" : "",
        })),
    );


    const powerLabel = t("dataCleaning.equipment_power_parameters.columns.power_tag");
    const unselected = t("dataCleaning.equipment_power_parameters.columns.unselected");
    const tagOptions = Array.from(new Set(tags.filter((tag) => tag !== "")));


    const handleSavePumpMapping = async (category: PumpCategory, target_id: string, field: PowerTagField, value: string) => {
        await tagMappingService.patchCell({ category, target_id, field, value });
    };

    const handleTagChange = async (row: PowerMappingRow, field: PowerTagField, value: string) => {
        if (!pumpMappings || row[field] === value) return;

        const { category, index } = row;
        const updatedMappings: PumpMappings = category === "ct"
            ? {
                ...pumpMappings,
                ct: pumpMappings.ct.map((mapping, mappingIndex) => mappingIndex === index
                    ? { ...mapping, [field]: value }
                    : mapping),
            }
            : {
                ...pumpMappings,
                [category]: pumpMappings[category].map((mapping, mappingIndex) => mappingIndex === index
                    ? { ...mapping, power_tag: value }
                    : mapping),
            };
        onLoading(true);
        try {
            await handleSavePumpMapping(category, row.equipment_name, field, value);
            onMappingsChange(updatedMappings);
        } finally {
            onLoading(false);
        }
    };





    const columns: GridColDef<PowerMappingRow>[] = [
        {
            field: "equipment_name",
            headerName: t("equipment-list.fields2.equipment_name"),
            minWidth: 180,
            flex: 1,
            sortable: false,
            disableColumnMenu: true,
        },
        {
            field: "power_tags",
            headerName: powerLabel,
            minWidth: 220,
            flex: 1,
            sortable: false,
            disableColumnMenu: true,
            renderCell: ({ row }) => (
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 0.5, height: "100%", width: "100%" }}>
                    {(row.category === "ct" ? ["power_tag_1", "power_tag_2"] as const : ["power_tag"] as const).map((field) => (
                        <Box key={field} sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
                            {row.category === "ct" && <Typography sx={{ fontSize: 12, flexShrink: 0 }}>{field.endsWith("_1") ? "1" : "2"}</Typography>}
                            {openTagCell === `${row.id}:${field}` ? (
                                <Select
                                    autoFocus
                                    fullWidth
                                    size="small"
                                    displayEmpty
                                    open
                                    onClose={() => setOpenTagCell(null)}
                                    value={row[field]}
                                    inputProps={{ "aria-label": `${row.equipment_name} ${field}` }}
                                    onChange={(event) => {
                                        void handleTagChange(row, field, event.target.value)
                                            .catch((error: unknown) => showToast(error instanceof Error ? error.message : "Unable to save mapping", "error"));
                                        setOpenTagCell(null);
                                    }}
                                    renderValue={(value) => value || unselected}
                                    sx={{ minWidth: 0, cursor: "pointer", "& .MuiSelect-select": { py: 0.5 } }}
                                >
                                    <MenuItem value="">{unselected}</MenuItem>
                                    {row[field] && !tagOptions.includes(row[field]) && <MenuItem value={row[field]}>{row[field]}</MenuItem>}
                                    {tagOptions.map((tag) => <MenuItem key={tag} value={tag}>{tag}</MenuItem>)}
                                </Select>
                            ) : (
                                <Box
                                    component="button"
                                    type="button"
                                    aria-label={`${row.equipment_name} ${field}`}
                                    aria-haspopup="listbox"
                                    onClick={() => setOpenTagCell(`${row.id}:${field}`)}
                                    sx={{
                                        display: "flex", alignItems: "center", width: "100%", minWidth: 0,
                                        height: 34, p: 0, border: 0, bgcolor: "transparent",
                                        color: "inherit", font: "inherit", textAlign: "left", cursor: "pointer",
                                    }}
                                >
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        noWrap
                                        title={row[field] || unselected}
                                        sx={{
                                            fontSize: row[field] ? "inherit" : "0.8rem",
                                            color: row[field] ? "inherit" : "grey.200",
                                            fontStyle: row[field] ? "normal" : "italic",
                                        }}
                                    >
                                        {row[field] || unselected}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    ))}
                </Box>
            ),
        },
    ];

    return (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0, 1fr)", lg: "repeat(2, minmax(0, 1fr))" }, gap: 2, minWidth: 0 }}>
            {categories.map((category) => {
                const categoryRows = rows.filter((row) => row.category === category);
                const rowHeight = category === "ct" ? 80 : 40;

                return (
                    <Box key={category} sx={{ minWidth: 0 }}>
                        <Typography sx={{ display: "flex", alignItems: "center", gap: 0.75, fontSize: 14, fontWeight: 700, mb: 1 }}>
                            <ElectricBoltOutlinedIcon sx={{ fontSize: 18, color: "primary.main", flexShrink: 0 }} />
                            {t(`equipment-list.categories.${category.toUpperCase()}`)}
                        </Typography>
                        <Box sx={{ minWidth: 0, p: 0, mx: 1, my: 2, border: "1px solid", borderColor: "divider", borderRadius: 1 }}>
                            <DataGrid<PowerMappingRow>
                                rows={categoryRows}
                                columns={columns}
                                slots={{ noRowsOverlay: DataGridNoRowsOverlay }}
                                hideFooter
                                disableRowSelectionOnClick
                                showCellVerticalBorder
                                showColumnVerticalBorder
                                columnHeaderHeight={40}
                                rowHeight={rowHeight}
                                sx={{
                                    height: "100%",
                                    minHeight: 0
                                }}
                            />
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
};

export default EquipmentPowerParametersSection;