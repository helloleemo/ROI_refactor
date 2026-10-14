import { API_ENDPOINTS } from "@/api/base/apiEndpoint";
import type { CalculateLoad, PatchTagMapping, RequestTagMapping, TagMapping } from "../types/tagMapping";
import { GET, PATCH, POST, PUT } from "../base";

export const tagMappingService = {
    get: async () => {
        return GET<TagMapping>({
            endpoint: API_ENDPOINTS.TAG_MAPPING.TAG_MAPPING

        });

    },
    update: async (body: Partial<RequestTagMapping>) => {
        return PUT<TagMapping>({
            endpoint: API_ENDPOINTS.TAG_MAPPING.TAG_MAPPING,
            body
        });
    },
    patchCell: async (body: Partial<PatchTagMapping>) => {
        return PATCH<TagMapping>({
            endpoint: API_ENDPOINTS.TAG_MAPPING.TAG_MAPPING_CELL_UPDATE,
            body
        });
    },
    calculate: async () => {
        return POST<CalculateLoad>({
            endpoint: API_ENDPOINTS.TAG_MAPPING.TAG_MAPPING_CALCULATE,
        })
    },
    reset: async () => {
        return POST<void>({
            endpoint: API_ENDPOINTS.TAG_MAPPING.TAG_MAPPING_RESET,
        });
    }

}