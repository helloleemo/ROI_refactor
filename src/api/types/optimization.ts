import type { CommonIdType, ModelStatusTypes, OptimizerList } from "./shared";

interface CreateOptimizationRequest {
    optimization_name: string;
    optimizer: OptimizerList;
    objective: "MIN_POWER"; // 暫定??
    remarks: string;
}
interface CreateOptimizationListResponse extends CreateOptimizationRequest {
    id: CommonIdType;
    status: ModelStatusTypes;
    created_at: string;
}

interface OptimizationInfoResponse extends CreateOptimizationListResponse { }

interface OptimizationAddModelRequest {
    model_ids: CommonIdType[];
}

interface OptimizationGetModelsResponse {
    model_id: CommonIdType;
    model_name: string;
    equipment_id: CommonIdType;
    equipment_name: string;
}


export type {
    CreateOptimizationRequest,
    CreateOptimizationListResponse,
    OptimizationInfoResponse,
    OptimizationAddModelRequest,
    OptimizationGetModelsResponse
};