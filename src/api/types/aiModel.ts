import type { CommonIdType } from "./shared";


interface CreateAiModel {
    model_name: string,
    equipment_id?: CommonIdType,
    remarks?: string
}

interface CreateAiModelResponse {
    id: CommonIdType
}

interface AiModel {
    id: CommonIdType,
    model_name: string,
    active_algorithm_id: number,
    status: number,
    remarks: string,
    created_at: string,
    active_algorithm: ActiveAlgorithm
}
interface ActiveAlgorithm {
    algorithm?: string,
    csv_name?: string
}




export type { CreateAiModel, CreateAiModelResponse, AiModel };