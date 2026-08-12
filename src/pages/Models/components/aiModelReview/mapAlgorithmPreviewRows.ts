import type { algorithmListResponse } from "@/api/types/modelAlgorithm";
import { ModelStatusText } from "@/api/types/shared";
import type { AlgorithmPreviewRow } from "../AlgorithmPreviewRow.types";

const formatMetric = (value?: number) => {
    return Number.isFinite(value) ? Number(value).toFixed(3) : "-";
};

const formatPercentMetric = (value?: number) => {
    return Number.isFinite(value) ? `${(Number(value) * 100).toFixed(2)}%` : "-";
};

export const mapAlgorithmPreviewRows = ({
    algorithms,
    activeAlgorithmId,
    selectedRowActiveAlgorithmId,
}: {
    algorithms: algorithmListResponse[];
    activeAlgorithmId: number | null;
    selectedRowActiveAlgorithmId?: number | null;
}): AlgorithmPreviewRow[] => {
    return algorithms.map((item) => ({
        id: Number(item.id),
        source: String(item.upload_id ?? "-"),
        upload_name: String(item.upload_name ?? "-"),
        algorithm: item.algorithm,
        y_tag: item.y_tag,
        x_tags: item.x_tags?.join(", ") ?? "-",
        x_tags_list: item.x_tags ?? [],
        r2: formatMetric(item.metrics?.test?.r2),
        mae: formatMetric(item.metrics?.test?.mae),
        mape: formatPercentMetric(item.metrics?.test?.mape),
        dataset: item.metrics.dataset,
        metricsTrain: {
            r2: formatMetric(item.metrics?.train?.r2),
            mae: formatMetric(item.metrics?.train?.mae),
            mape: formatPercentMetric(item.metrics?.train?.mape),
        },
        metricsTest: {
            r2: formatMetric(item.metrics?.test?.r2),
            mae: formatMetric(item.metrics?.test?.mae),
            mape: formatPercentMetric(item.metrics?.test?.mape),
        },
        status: String(ModelStatusText[item.status as keyof typeof ModelStatusText] ?? item.status),
        enabled: Number(item.id) === Number(activeAlgorithmId ?? selectedRowActiveAlgorithmId),
    }));
};
