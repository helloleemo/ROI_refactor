import { API_ENDPOINTS, DELETE, GET, POST, PUT } from "../base"
import type { EquipementRequest, EquipementResponse, EquipmentCategory, EquipmentUpdateRequest, ApproachTempResponse } from "../types/equipment"
import type { CommonIdType } from "../types/shared"

const equipmentService = {
    getCategories: async () => {
        return GET<EquipmentCategory[]>({
            endpoint: API_ENDPOINTS.EQUIPMENT.CATEGORIES,
        })
    },
    create: async (body: EquipementRequest) => {
        return POST<{ id: CommonIdType }>({
            endpoint: API_ENDPOINTS.EQUIPMENT.CREATE,
            body: body
        })
    },
    getList: async (query: { equipment_type: number }) => {
        return GET<EquipementResponse[]>({
            endpoint: API_ENDPOINTS.EQUIPMENT.LIST,
            query: query
        })
    },
    update: async (body: EquipmentUpdateRequest) => {
        return PUT<{ id: CommonIdType }>({
            endpoint: API_ENDPOINTS.EQUIPMENT.UPDATE,
            body: body
        })
    },
    delete: async (id: CommonIdType) => {
        return DELETE<{ id: CommonIdType }>({
            endpoint: API_ENDPOINTS.EQUIPMENT.DELETE(id)
        })
    },
    getApproachTemp: async () => {
        return GET<ApproachTempResponse>({
            endpoint: API_ENDPOINTS.EQUIPMENT.APPROACH_TEMP,
        })
    },
    updateApproachTemp: async (body: { design_approach_temp: number }) => {
        return PUT<ApproachTempResponse>({
            endpoint: API_ENDPOINTS.EQUIPMENT.APPROACH_TEMP,
            body: body
        })
    }

}

export default equipmentService