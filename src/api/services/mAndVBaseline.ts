import { API_ENDPOINTS, GET, POST } from "../base"
import type { DeepDiveChillerResponse, DeepDivePumpResponse, DeepDiveTowerResponse, FilterRequest, MAndVBaseline, TrainRequest } from "../types/mAndVBaseline"


export const mAndVBaselineService = {
    get: async () => {
        return GET<MAndVBaseline>({
            endpoint: API_ENDPOINTS.M_AND_V_BASELINE.BASELINE,
        })
    },

    filter: async (body: FilterRequest) => {
        return POST<MAndVBaseline>({
            endpoint: API_ENDPOINTS.M_AND_V_BASELINE.FILTER,
            body
        })
    },
    train: async (body: TrainRequest) => {
        return POST<MAndVBaseline>({
            endpoint: API_ENDPOINTS.M_AND_V_BASELINE.TRAIN,
            body
        })
    },
    deepDiveChiller: async (query: string) => {
        return GET<DeepDiveChillerResponse>({
            endpoint: API_ENDPOINTS.M_AND_V_BASELINE.DEEP_DIVE_CHILLER,
            query: { chiller_name: query }
        })
    },
    deepDivePump: async (query: string) => {
        return GET<DeepDivePumpResponse>({
            endpoint: API_ENDPOINTS.M_AND_V_BASELINE.DEEP_DIVE_PUMP,
            query: { pump_name: query }
        })
    },
    deepDiveTower: async () => {
        return GET<DeepDiveTowerResponse>({
            endpoint: API_ENDPOINTS.M_AND_V_BASELINE.DEEP_DIVE_TOWER
        })
    },
    exportCsv: async () => {
        return GET({
            endpoint: API_ENDPOINTS.M_AND_V_BASELINE.EXPORT_CSV
        })
    }



}