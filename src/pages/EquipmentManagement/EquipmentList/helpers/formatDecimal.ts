


export const formatOneDecimal = (value: unknown) => {
    if (value === null || value === undefined || value === "") return "-";

    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? Number(numericValue.toFixed(1)) : String(value);
};
