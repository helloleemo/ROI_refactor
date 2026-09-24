import { Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";

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
    const rows = getRows(value);
    const isIplv = String(mode).toUpperCase() === "IPLV";

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
                    <TableCell>負載率</TableCell>
                    <TableCell>冷卻水進水溫 (°C)</TableCell>
                    <TableCell>kW/RT</TableCell>
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
                                disabled={disabled || isIplv}
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