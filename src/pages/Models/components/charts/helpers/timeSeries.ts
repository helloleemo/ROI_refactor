type PrepareTimeSeriesInput = {
    times: string[];
    actual: number[];
    predict: number[];
};

type PreparedTimeSeries = {
    categories: string[];
    actualSeries: Array<number | null>;
    predictSeries: Array<number | null>;
};

const normalizeNumber = (value: number | undefined): number | null => {
    return Number.isFinite(value) ? Number(value) : null;
};

export const formatToHourMinute = (time: string): string => {
    const trimmed = String(time ?? "").trim();
    if (!trimmed) return "";

    const parsed = new Date(trimmed);
    if (!Number.isNaN(parsed.getTime())) {
        const hh = String(parsed.getHours()).padStart(2, "0");
        const mm = String(parsed.getMinutes()).padStart(2, "0");
        return `${hh}:${mm}`;
    }

    const hhmmMatch = trimmed.match(/^(\d{2}):(\d{2})(:\d{2})?$/);
    if (hhmmMatch) {
        return `${hhmmMatch[1]}:${hhmmMatch[2]}`;
    }

    return trimmed;
};

export const prepareTimeSeries = ({ times, actual, predict }: PrepareTimeSeriesInput): PreparedTimeSeries => {
    const maxLength = Math.max(times.length, actual.length, predict.length);

    const categories = Array.from({ length: maxLength }, (_, index) => {
        return formatToHourMinute(times[index] ?? "");
    });

    const actualSeries = Array.from({ length: maxLength }, (_, index) => {
        return normalizeNumber(actual[index]);
    });

    const predictSeries = Array.from({ length: maxLength }, (_, index) => {
        return normalizeNumber(predict[index]);
    });

    return {
        categories,
        actualSeries,
        predictSeries,
    };
};
