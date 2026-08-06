
import type { CommonIdType, ModelStatusTypes, StatusTypes, algorithmList } from './shared';

// create
interface createModelAlgorithm {
    model_id: CommonIdType;
    upload_id: CommonIdType;
    algorithm: algorithmList;
    x_tags: string[];
    y_tag: string;
}

// retraining
interface retrainingModelAlgorithmResponse {
    algorithm_id: CommonIdType;
    status: StatusTypes;
}

// algorithm list
interface algorithmListResponse {
    id: CommonIdType;
    upload_id: CommonIdType;
    algorithm: algorithmList;
    x_tags: string[];
    y_tag: string;
    model_path: string;
    metrics: {
        train: algorithmParams,
        validation: algorithmParams,
        test: algorithmParams,
        dataset: algorithmDataset;
        best_score: number;
        feature_importance: Record<string, number>;
        custom_metrics: Record<string, number>;
        best_params: Record<string, number>;
    };
    status: ModelStatusTypes;
    remarks: string;
    created_at: string;
    training_start_at: string;
    training_end_at: string;
    progress: number;

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
    test_ratio: number,
    split_index: number,
    train_count: number,
    test_count: number,
    train_start_time: string;
    train_end_time: string;
    test_start_time: string;
    test_end_time: string;
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
    start_time: string;
    end_time: string;
}

export type {
    createModelAlgorithm,
    retrainingModelAlgorithmResponse,
    algorithmListResponse,
    algorithmCompareListResponse,
    algorithmCompareListRequest,
};