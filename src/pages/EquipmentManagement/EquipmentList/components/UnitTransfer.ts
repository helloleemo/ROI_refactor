interface UnitTransferProps {
    originalUnit: string;
    targetUnit: string;
    value: number;
}

export const getTargetUnit = (unit: string | null): string | null => {
    if (!unit) return null;

    const unitCategory = unit.replace(/_units?$/, "");

    switch (unitCategory) {
        case "power":
            return "kW";
        case "flow":
            return "LPM";
        case "head":
            return "m";
        case "temp":
            return "°C";
        default:
            return null;
    }
};

const UnitTransfer = ({ originalUnit, targetUnit, value }: UnitTransferProps): number | null => {
    if (originalUnit === targetUnit) return null;

    if (targetUnit === "LPM") {
        switch (originalUnit) {
            case "LPS":
                return value * 60;
            case "CMH":
                return value * 16.6667;
            case "GPM":
                return value * 3.78541;
            default:
                return null;
        }
    } else if (targetUnit === "kW") {
        switch (originalUnit) {
            case "HP":
                return value * 0.7457;
            default:
                return null;
        }
    } else if (targetUnit === "m") {
        switch (originalUnit) {
            case "ft":
                return value * 0.3048;
            default:
                return null;
        }
    } else if (targetUnit === "°C") {
        switch (originalUnit) {
            case "°F":
                return (value - 32) * 5 / 9;
            default:
                return null;
        }
    }
    return null;
};

interface ConvertUnitValueProps {
    originalUnit: string;
    unitCategory: string | null;
    value: number | null;
}

export const convertUnitValue = ({
    originalUnit,
    unitCategory,
    value,
}: ConvertUnitValueProps): number | null => {
    if (value === null || !Number.isFinite(value)) return value;

    const targetUnit = getTargetUnit(unitCategory);
    if (!targetUnit) return value;

    return UnitTransfer({ originalUnit, targetUnit, value }) ?? value;
};

export default UnitTransfer;


