import { API_ENDPOINTS, DELETE, GET, POST, PUT } from "../base"
import type { EquipementRequest, EquipementResponse, EquipmentUpdateRequest } from "../types/equipment"
import type { CommonIdType } from "../types/shared"

const equipmentService = {
    create: async (body: EquipementRequest) => {
        return POST<{ id: CommonIdType }>({
            endpoint: API_ENDPOINTS.EQUIPMENT.CREATE,
            body: body
        })
    },
    getList: async () => {
        return GET<EquipementResponse[]>({
            endpoint: API_ENDPOINTS.EQUIPMENT.LIST,
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
    }

}

export default equipmentService