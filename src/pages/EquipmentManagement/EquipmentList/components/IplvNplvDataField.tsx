import { Box, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getModeRows, getSelectedModes, updateModeCell, type IplvNplvData } from "../helpers/iplvNplv";

interface IplvNplvDataFieldProps {
    value: unknown;
    disabled: boolean;
    mode: unknown;
    onChange: (value: IplvNplvData) => void;
}

const IplvNplvDataField = ({ value, disabled, mode, onChange }: IplvNplvDataFieldProps) => {
    const { t } = useTranslation();
    const selectedModes = getSelectedModes(mode);

    if (selectedModes.length === 0) return null;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
            {selectedModes.map((selectedMode) => (
                <Box key={selectedMode} sx={{ minWidth: 0, overflowX: "auto" }}>
                    <Typography component="h3" variant="subtitle2" sx={{ mb: 1 }}>{selectedMode}</Typography>
                    <Table size="small" aria-label={selectedMode}>
                        <TableHead>
                            <TableRow>
                                <TableCell>{t("equipment-list.fields1.load_rate")}</TableCell>
                                <TableCell>{t("equipment-list.fields1.cw_temp_in")}</TableCell>
                                <TableCell>{t("equipment-list.fields1.kw_per_rt")}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {getModeRows(value, selectedMode).map((row, index) => (
                                <TableRow key={`${row.load_ratio ?? "row"}-${index}`}>
                                    <TableCell>{row.load_ratio ?? ""}</TableCell>
                                    <TableCell>
                                        <TextField
                                            autoComplete="off"
                                            variant="standard"
                                            type="number"
                                            required
                                            value={row.cw_temp_in ?? ""}
                                            onChange={(event) => onChange(updateModeCell(value, selectedModes, selectedMode, index, "cw_temp_in", event.target.value))}
                                            disabled={disabled}
                                            slotProps={{ htmlInput: { "aria-label": `${selectedMode} ${row.load_ratio} cw_temp_in`, step: "any" } }}
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            autoComplete="off"
                                            variant="standard"
                                            type="number"
                                            required
                                            value={row.kw_per_rt ?? ""}
                                            onChange={(event) => onChange(updateModeCell(value, selectedModes, selectedMode, index, "kw_per_rt", event.target.value))}
                                            disabled={disabled}
                                            slotProps={{ htmlInput: { "aria-label": `${selectedMode} ${row.load_ratio} kw_per_rt`, step: "any" } }}
                                            fullWidth
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            ))}
        </Box>
    );
};

export default IplvNplvDataField;