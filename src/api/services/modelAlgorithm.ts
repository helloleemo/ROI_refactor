import { API_ENDPOINTS, DELETE, GET, POST } from "../base"
import type { algorithmListResponse, createModelAlgorithm, retrainingModelAlgorithmResponse, algorithmCompareListResponse, algorithmCompareListRequest } from "../types/modelAlgorithm"
import type { CommonIdType } from "../types/shared";


const modelAlgorithm = {
    create: async (body: createModelAlgorithm) => {
        return POST<{ id: CommonIdType }>({
            endpoint: API_ENDPOINTS.MODEL_ALGORITHM.CREATE,
            body: body
        });
    },
    retraining: async (algorithm_id: CommonIdType) => {
        return POST<retrainingModelAlgorithmResponse>({
            endpoint: API_ENDPOINTS.MODEL_ALGORITHM.RETRAIN(algorithm_id),
        });
    },
    getList: async (model_id: CommonIdType) => {
        return GET<algorithmListResponse[]>({
            endpoint: API_ENDPOINTS.MODEL_ALGORITHM.LIST(model_id),
        });
    },
    delete: async (id: CommonIdType) => {
        return DELETE<void>({
            endpoint: API_ENDPOINTS.MODEL_ALGORITHM.DELETE(id),
        });
    },
    comparisonList: async (body: algorithmCompareListRequest) => {
        return POST<algorithmCompareListResponse>({
            endpoint: API_ENDPOINTS.MODEL_ALGORITHM.PREDICT_COMPARISON,
            body: body
        });
    }

}

export default modelAlgorithm