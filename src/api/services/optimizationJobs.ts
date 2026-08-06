import { GET, POST } from "../base";
import { API_ENDPOINTS } from "../base/apiEndpoint";
import type {
    CreateOptimizationJobCreateRequest,
    CreateOptimizationJobReExecuteRequest,
    OptimizationJobInfoResponse,
    OptimizationJobListResponse,
    ReExecuteOptimizationJobResponse,
} from "../types/optimizationJobs";
import type { CommonIdType } from "../types/shared";

const optimizationJobService = {
    create: async (body: CreateOptimizationJobCreateRequest) => {
        return POST<{ job_id: CommonIdType }>({
            endpoint: API_ENDPOINTS.OPTIMIZATION_JOB.CREATE,
            body,
        });
    },
    reExecute: async (job_id: CommonIdType) => {
        return POST<ReExecuteOptimizationJobResponse>({
            endpoint: API_ENDPOINTS.OPTIMIZATION_JOB.RE_EXECUTE(job_id)
        });
    },
    getList: async (optimization_id: CommonIdType) => {
        return GET<OptimizationJobListResponse[]>({
            endpoint: API_ENDPOINTS.OPTIMIZATION_JOB.LIST(optimization_id),
        });
    },
    getInfo: async (id: CommonIdType) => {
        return GET<OptimizationJobInfoResponse>({
            endpoint: API_ENDPOINTS.OPTIMIZATION_JOB.INFO(id),
        });
    },
};

export default optimizationJobService;
