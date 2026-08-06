import type { algorithmList, CommonIdType, OptimizerList, StatusTypes } from "./shared";


// create
interface CreateOptimizationJobCreateRequest {
    optimization_id: CommonIdType;
    optimization_algorithm: OptimizerList
    demand: number;
    parameters: Record<string, unknown>;
    remarks: string;
}

// re execute
interface ReExecuteOptimizationJobResponse {
    job_id: CommonIdType;
    status: StatusTypes;
}
type CreateOptimizationJobReExecuteRequest = Omit<ReExecuteOptimizationJobResponse, "status">;


// get job list
interface OptimizationJobListResponse {
    id: CommonIdType;
    optimization_id: CommonIdType;
    algorithm: algorithmList;
    status: StatusTypes;
    parameters: Record<string, unknown>;
    remarks: string;
    created_at: string;
    progress: number;
}

// get job info
interface OptimizationJobInfoResponse extends OptimizationJobListResponse {
    result: {
        objective: number,
        capacity: number,
        system_efficiency: number,
        system_cop: number,
        target_demand: number,
        savings: {
            baseline_power: number;
            saved_power: number;
            saving_rate: number;
        },
        solution: Record<string, number>;
        detail_equipments: Record<string, {
            status: string;
            mode: string;
            power: number;
            capacity: number;
            efficiency: number;
            cop: number;
            extra_metrics: Record<string, unknown>;
        }>;
    },
    optimizer: {
        success: boolean,
        message: string,
        fun: number,
        elapsed_time_seconds: number,
        nit: number,
        nfev: number
    }
    waiting_start_at: string;
    waiting_end_at: string;
    optimization_start_at: string;
    optimization_end_at: string;

}

export type {
    CreateOptimizationJobCreateRequest,
    CreateOptimizationJobReExecuteRequest,
    ReExecuteOptimizationJobResponse,
    OptimizationJobListResponse,
    OptimizationJobInfoResponse
}