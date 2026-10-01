import type HydronicDiagram from "../types/hydronicDiagram"
import { API_ENDPOINTS, GET, PUT } from "../base";


export const hydronicDiagramService = {
    get: async () => {
        return GET<HydronicDiagram>({
            endpoint: API_ENDPOINTS.HYDRONIC_DIAGRAM.HYDRONIC_DIAGRAM
        })
    },
    update: async (data: Partial<HydronicDiagram>) => {
        return PUT<HydronicDiagram>({
            endpoint: API_ENDPOINTS.HYDRONIC_DIAGRAM.HYDRONIC_DIAGRAM,
            body: data
        })
    }
}