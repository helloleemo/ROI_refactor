import { GET, POST, DELETE, PUT } from "@/api/base/apiMethods";
import { API_ENDPOINTS } from "@/api/base/apiEndpoint";
import type { AiModel, CreateAiModel, CreateAiModelResponse } from "../types/aiModel";



const aiModelService = {
    create: async (body: CreateAiModel) => {
        return POST<CreateAiModelResponse>({
            endpoint: API_ENDPOINTS.AI_MODEL.CREATE,
            body: body
        });
    },
    getList: async () => {
        return GET<AiModel[]>({
            endpoint: API_ENDPOINTS.AI_MODEL.LIST
        })
    },
    delete: async (id: string | number) => {
        return DELETE({
            endpoint: API_ENDPOINTS.AI_MODEL.DELETE(id)
        })
    },
    // 設定 AI Model 啟用的 Algorithm
    setActiveAlgorithm: async (model_id: string | number, model_algorithm_id: string | number) => {
        return PUT({
            endpoint: API_ENDPOINTS.AI_MODEL.ACTIVE_ALGORITHM(model_id, model_algorithm_id)
        })
    },
    // 設定 AI Model 的 設備
    setEquipment: async (model_id: string | number, equipment_id: string | number) => {
        return PUT({
            endpoint: API_ENDPOINTS.AI_MODEL.SETTING_EQUIPMENT(model_id, equipment_id)
        })
    }
}

export default aiModelService;