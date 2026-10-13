import { Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

interface IplvNplvRow {
    load_ratio?: string;
    cw_temp_in?: number | string;
    kw_per_rt?: number | string;
}

interface IplvNplvDataFieldProps {
    value: unknown;
    disabled: boolean;
    mode: unknown;
    onChange: (value: IplvNplvRow[]) => void;
}

const getRows = (value: unknown): IplvNplvRow[] =>
    Array.isArray(value) ? value as IplvNplvRow[] : [];

const IplvNplvDataField = ({ value, disabled, mode, onChange }: IplvNplvDataFieldProps) => {
    const { t } = useTranslation();
    const rows = getRows(value);
    const selectedModes = (Array.isArray(mode) ? mode : mode ? [mode] : [])
        .map((item) => String(item).toUpperCase());
    const isIplvOnly = selectedModes.includes("IPLV") && !selectedModes.includes("NPLV");

    if (selectedModes.length === 0) return null;

    const updateCell = (index: number, key: "cw_temp_in" | "kw_per_rt", cellValue: string) => {
        const nextRows = rows.map((row, rowIndex) =>
            rowIndex === index ? { ...row, [key]: cellValue } : row,
        );
        onChange(nextRows);
    };

    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>{t("equipment-list.fields1.load_rate")}</TableCell>
                    <TableCell>{t("equipment-list.fields1.cw_temp_in")}</TableCell>
                    <TableCell>{t("equipment-list.fields1.kw_per_rt")}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row, index) => (
                    <TableRow key={`${row.load_ratio ?? "row"}-${index}`}>
                        <TableCell>{row.load_ratio ?? ""}</TableCell>
                        <TableCell>
                            <TextField
                                variant="standard"
                                type="number"
                                required
                                value={row.cw_temp_in ?? ""}
                                onChange={(event) => updateCell(index, "cw_temp_in", event.target.value)}
                                disabled={disabled || isIplvOnly}
                                fullWidth
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                variant="standard"
                                type="number"
                                required

                                value={row.kw_per_rt ?? ""}
                                onChange={(event) => updateCell(index, "kw_per_rt", event.target.value)}
                                disabled={disabled}
                                fullWidth
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default IplvNplvDataField;