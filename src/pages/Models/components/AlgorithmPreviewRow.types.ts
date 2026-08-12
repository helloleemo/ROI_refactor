export type AlgorithmMetricPair = {
    r2: string;
    mae: string;
    mape: string;
};

export type AlgorithmPreviewRow = {
    id: number;
    source: string;
    upload_name: string;
    algorithm: string;
    y_tag: string;
    x_tags: string;
    x_tags_list: string[];
    r2: string;
    mae: string;
    mape: string;
    metricsTrain: AlgorithmMetricPair;
    metricsTest: AlgorithmMetricPair;
    status: string;
    enabled: boolean;
};
