
import type { CommonIdType, ModelStatusTypes, StatusTypes, algorithmList } from './shared';

// create
type featureConfig = {
    name: string;
    formula: string;
    description: string;
};
interface createModelAlgorithm {
    model_id: number;
    train_upload_id: number;
    test_upload_id: number;
    val_upload_id: number;
    algorithm: string;
    x_tags: string[];
    y_tag: string;
    feature_config: featureConfig[];
    physics_config: Record<string, string>;
    pipeline_config: {
        resample: {
            enabled: boolean;
            freq: string;
        };
        missing: {
            enabled: boolean;
            max_gap: number;
        };
        outlier: {
            enabled: boolean;
            sigma: number;
            bounds: Record<string, number[]>;
        };
        physics: {
            enabled: boolean;
        };
        feature_eng: {
            enabled: boolean;
            lags: number[];
            rolling_windows: number[];
        };
    };
}

// update
interface updateModelAlgorithm {
    id: number;
    model_id: number;
    train_upload_id: number;
    upload_id: number;
    test_upload_id: number;
    val_upload_id: number;
    algorithm: string;
    x_tags: string[];
    y_tag: string;
    feature_config: featureConfig[];
    pipeline_config: {
        resample: {
            enabled: boolean;
            freq: string;
        };
        missing: {
            enabled: boolean;
            max_gap: number;
        };
        outlier: {
            enabled: boolean;
            sigma: number,
            bounds: Record<string, number[]>[]
        };
        physics: {
            enabled: boolean;
        };
        feature_eng: {
            enabled: boolean;
            lags: number[];
            rolling_windows: number[];
        };
    };
    status: ModelStatusTypes;
    remarks: string;
}

// retraining
interface retrainingModelAlgorithmResponse {
    algorithm_id: CommonIdType;
    status: StatusTypes;
}

// algorithm list
interface algorithmListResponse {
    id: number;
    train_upload_id: number;
    train_upload_name: string;
    upload_id: number;
    upload_name: string;
    test_upload_id: number;
    test_upload_name: string;
    val_upload_id: number;
    val_upload_name: string;
    algorithm: string;
    x_tags: string[];
    feature_x_tags: string[];
    y_tag: string;
    model_path: string;
    metrics: {
        train: algorithmParams,
        test: algorithmParams,
        val: algorithmParams,
        dataset: algorithmDataset,
        best_score: 0,
        feature_importance: Record<string, number>,
        custom_metrics: Record<string, number>,
        best_params: Record<string, any>,
        training_config: trainingConfig
    },
    status: StatusTypes,
    remarks: string;
    created_at: string;
    training_start_at: string;
    training_end_at: string;
    progress: number;
    feature_config: featureConfig[];
    physics_config: Record<string, string>;
    pipeline_config: {
        resample: {
            enabled: boolean;
            freq: string;
        };
        missing: {
            enabled: boolean;
            max_gap: number;
        };
        outlier: {
            enabled: boolean;
            sigma: number;
            bounds: Record<string, number[]>;
        };
        physics: {
            enabled: boolean;
        };
        feature_eng: {
            enabled: boolean;
            lags: number[];
            rolling_windows: number[];
        };
    };
}

type algorithmParams = {
    r2: number;
    mae: number;
    mse: number;
    rmse: number;
    mape: number;
    nmbe: number;
    nmbe_abs: number;
    nmbe_acc: number;
}

type algorithmDataset = {
    train_ratio: number,
    test_ratio: number;
    split_index: number;
    train_count: number;
    test_count: number;
    train_start_time: string;
    train_end_time: string;
    test_start_time: string;
    test_end_time: string;
    val_count: number;
    val_start_time: string;
    val_end_time: string;
    train_upload_id: number;
    test_upload_id: number;
    val_upload_id: number;
    is_custom_split: boolean;
}

type trainingConfig = {
    train_ratio: number;
    cv_method: string;
    n_splits: number;
    random_state: number;
    n_jobs: number;
    scoring: string;
    scaling_enabled: boolean;
    scaler_type: string;
    imputation_strategy: string;
}

interface algorithmCompareListResponse {
    algorithm_id: CommonIdType;
    y_tag: string;
    count: number;
    times: string[];
    actual: number[];
    predict: number[];
}

interface algorithmCompareListRequest {
    algorithm_id: CommonIdType;
    upload_id: CommonIdType;
    start_time: string;
    end_time: string;
}

interface predictComparisonFileResponse {
    algorithm_id: CommonIdType;
    y_tag: string;
    count: number;
    times: string[];
    actual: number[];
    predict: number[];
}

interface predictRequest {
    algorithm_id: CommonIdType;
    x_values: Record<string, number>[];
}

interface predictResponse {
    algorithm_id: CommonIdType;
    y_tag: string;
    predicted_value: number;
}

interface multiPredictResponse {
    algorithm_id: CommonIdType,
    y_tag: string,
    count: number,
    results: {
        filename: string;
        x_values: (number | string)[];
        predict_values: number[];
    }[];
}


interface forecastRequest {
    algorithm_id: CommonIdType;
    forecast_start_time: string;
    forecast_end_time: string;
    interval_minutes: number;
    x_values: Record<string, number>;
    min_clip_val: number;
    max_clip_val: number;
}

interface forecastResponse {
    algorithm_id: CommonIdType;
    y_tag: string;
    total_points: number;
    interval_minutes: number;
    predictions: {
        time: string;
        predicted_y: number;
    }[];
}

export type {
    createModelAlgorithm,
    retrainingModelAlgorithmResponse,
    algorithmListResponse,
    updateModelAlgorithm,
    algorithmCompareListResponse,
    algorithmCompareListRequest,
    predictComparisonFileResponse,
    predictRequest,
    predictResponse,
    multiPredictResponse,
    forecastRequest,
    forecastResponse
};