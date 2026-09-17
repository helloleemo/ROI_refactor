
import { GET, POST } from "../base";
import { API_ENDPOINTS } from "../base/apiEndpoint";
import type {
    CreateOptimizationRequest,
    CreateOptimizationListResponse,
    OptimizationInfoResponse,
    OptimizationAddModelRequest,
    OptimizationGetModelsResponse,
} from "../types/optimization";
import type { CommonIdType } from "../types/shared";

const optimizationService = {
    create: async (body: CreateOptimizationRequest) => {
        return POST<{ id: CommonIdType }>({
            endpoint: API_ENDPOINTS.OPTIMIZATION.CREATE,
            body,
        });
    },
    getList: async () => {
        return GET<CreateOptimizationListResponse[]>({
            endpoint: API_ENDPOINTS.OPTIMIZATION.LIST,
        });
    },
    getDetail: async (optimization_id: CommonIdType) => {
        return GET<OptimizationInfoResponse>({
            endpoint: API_ENDPOINTS.OPTIMIZATION.DETAIL(optimization_id),
        });
    },
    addModels: async (optimization_id: CommonIdType, body: OptimizationAddModelRequest) => {
        return POST<void>({
            endpoint: API_ENDPOINTS.OPTIMIZATION.ADD_MODELS(optimization_id),
            body,
        });
    },
    getModels: async (optimization_id: CommonIdType) => {
        return GET<OptimizationGetModelsResponse[]>({
            endpoint: API_ENDPOINTS.OPTIMIZATION.GET_MODELS(optimization_id),
        });
    },
};

export default optimizationService;