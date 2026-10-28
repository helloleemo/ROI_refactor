


export const formatOneDecimal = (value: unknown) => {
    if (value === null || value === undefined || value === "") return "-";

    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? Number(numericValue.toFixed(1)) : String(value);
};

export const formatTwoDecimals = (value: unknown) => {
    if (value === null || value === undefined || value === "") return "-";

    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? Number(numericValue.toFixed(2)) : String(value);
};

export const formatThreeDecimals = (value: unknown) => {
    if (value === null || value === undefined || value === "") return "-";

    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? Number(numericValue.toFixed(3)) : String(value);
};


export const normalizeLeadingZeros = (input: string) =>
    input.replace(/^([+-]?)0+(?=\d)/, "$1");

export const getEquipmentDecimalPlaces = (fieldKey: string) =>
    ["efficiency_kw_per_rt", "cop"].includes(fieldKey.toLowerCase()) ? 3 : 1;

export const normalizeEquipmentDecimalInput = (input: string, fieldKey: string) => {
    if (!/^[+-]?\d*\.?\d*$/.test(input)) return null;

    const [integerPart, decimalPart] = normalizeLeadingZeros(input).split(".");
    return decimalPart === undefined
        ? integerPart
        : `${integerPart}.${decimalPart.slice(0, getEquipmentDecimalPlaces(fieldKey))}`;
};

export const normalizeDecimalInput = (input: string) => {
    if (input === "") return "";

    if (!/^\d*\.?\d*$/.test(input)) return null;

    const [integerPart, decimalPart] = input.split(".");
    const normalizedInteger = integerPart.replace(/^0+(?=\d)/, "") || "0";

    return decimalPart === undefined
        ? normalizedInteger
        : `${normalizedInteger}.${decimalPart.slice(0, 3)}`;
};