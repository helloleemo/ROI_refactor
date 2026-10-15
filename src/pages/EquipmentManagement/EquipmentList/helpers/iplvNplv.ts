export interface IplvNplvRow {
    load_ratio?: string;
    cw_temp_in?: number | string;
    kw_per_rt?: number | string;
}

export type IplvNplvMode = "IPLV" | "NPLV";
export type IplvNplvData = Partial<Record<IplvNplvMode, IplvNplvRow[]>>;

export const getSelectedModes = (mode: unknown): IplvNplvMode[] => {
    const values = (Array.isArray(mode) ? mode : mode ? [mode] : [])
        .map((item) => String(item).toUpperCase());
    return (["IPLV", "NPLV"] as const).filter((item) => values.includes(item));
};

export const getModeRows = (value: unknown, mode: IplvNplvMode): IplvNplvRow[] => {
    const rows = Array.isArray(value)
        ? value
        : value && typeof value === "object"
            ? (value as IplvNplvData)[mode]
            : undefined;
    if (Array.isArray(rows) && rows.length > 0) {
        return rows.map((row) => row && typeof row === "object" ? { ...row } : {});
    }
    return ["100%", "75%", "50%", "25%"].map((load_ratio) => ({
        load_ratio,
        cw_temp_in: "",
        kw_per_rt: "",
    }));
};

export const updateModeCell = (
    value: unknown,
    selectedModes: IplvNplvMode[],
    mode: IplvNplvMode,
    index: number,
    key: "cw_temp_in" | "kw_per_rt",
    cellValue: string,
): IplvNplvData => {
    const data: IplvNplvData = Array.isArray(value)
        ? Object.fromEntries(selectedModes.map((item) => [item, getModeRows(value, item)]))
        : value && typeof value === "object" ? { ...value } : {};
    data[mode] = getModeRows(value, mode).map((row, rowIndex) =>
        rowIndex === index ? { ...row, [key]: cellValue } : row,
    );
    return data;
};

export const isModeDataEmpty = (value: unknown, mode: unknown) =>
    getSelectedModes(mode).some((selectedMode) =>
        getModeRows(value, selectedMode).some((row) =>
            [row.load_ratio, row.cw_temp_in, row.kw_per_rt].some((item) =>
                item === null || item === undefined || String(item).trim() === "",
            ),
        ),
    );

export const normalizeModeData = (value: unknown, mode: unknown): IplvNplvData =>
    Object.fromEntries(getSelectedModes(mode).map((selectedMode) => [
        selectedMode,
        getModeRows(value, selectedMode),
    ]));