

const chartInfoTransition = (
    value: unknown,
    unit?: string,
    i18n?: any,
) => {
    if (value === null || value === undefined) return "-";

    if (typeof value === "boolean") {
        return i18n
            ? i18n.t(value ? "common.yes" : "common.no")
            : String(value);
    }

    const formattedValue = typeof value === "number"
        ? value.toLocaleString(i18n?.resolvedLanguage)
        : String(value);

    return `${formattedValue}${unit ? ` ${unit}` : ""}`;
};

export default chartInfoTransition;