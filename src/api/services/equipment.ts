import { API_ENDPOINTS, POST } from "../base"
import type { EquipementRequest } from "../types/equipment"
import type { CommonIdType } from "../types/shared"

const equipmentService = {
    create: async (body: EquipementRequest) => {
        return POST<{ id: CommonIdType }>({
            endpoint: API_ENDPOINTS.EQUIPMENT.CREATE,
            body: body
        })
    },
}

export default equipmentService