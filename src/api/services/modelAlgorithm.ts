import { API_ENDPOINTS, DELETE, GET, POST, PUT } from "../base"
import type { algorithmListResponse, createModelAlgorithm, retrainingModelAlgorithmResponse, algorithmCompareListResponse, algorithmCompareListRequest, updateModelAlgorithm, predictComparisonFileResponse, predictRequest, predictResponse, forecastResponse, forecastRequest, multiPredictResponse } from "../types/modelAlgorithm"
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
    },
    // 上傳 CSV 檔案 (包含 X & Y tag) 進行模型預測與真實 y 值之比較
    predictComparisonFile: async (file: File, algorithm_id: CommonIdType) => {
        const body = new FormData();
        body.append("file", file);
        body.append("algorithm_id", algorithm_id.toString());

        return POST<predictComparisonFileResponse>({
            endpoint: API_ENDPOINTS.MODEL_ALGORITHM.PREDICT_COMPARISON_FILE,
            body: body
        });
    },
    // 傳入 algorithm_id 及對應的 X Tag 值，預測 Y Tag 值
    predict: async (body: predictRequest) => {
        return POST<predictResponse>({
            endpoint: API_ENDPOINTS.MODEL_ALGORITHM.POST_PREDICT,
            body: body
        });
    },
    // 上傳 CSV 檔案進行多點預測，以 CSV 第一欄 (例如 RT) 由大至小排序回傳畫圖資料
    multiPredict: async (files: File[], algorithm_id: CommonIdType) => {
        const body = new FormData();
        files.forEach(file => body.append("files", file));
        body.append("algorithm_id", algorithm_id.toString());

        return POST<multiPredictResponse>({
            endpoint: API_ENDPOINTS.MODEL_ALGORITHM.MULTI_PREDICT,
            body: body
        });
    },
    // 未來時間序列預測：傳入時間區間 (start_time, end_time) 與點位間隔 (interval_minutes)，回傳預測 y 值序列
    forecast: async (body: forecastRequest) => {
        return POST<forecastResponse>({
            endpoint: API_ENDPOINTS.MODEL_ALGORITHM.POST_FORECAST,
            body: body
        });
    },
    update: async (body: updateModelAlgorithm) => {
        return PUT<{ data: any }>({
            endpoint: API_ENDPOINTS.MODEL_ALGORITHM.UPDATE,
            body: body
        });
    }
}

export default modelAlgorithm