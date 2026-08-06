import type { TagData, TagValueParam, TagValueResponse } from "../types/tagData"
import { GET } from "../base/apiMethods";
import { API_ENDPOINTS } from "../base/apiEndpoint";
import type { CommonIdType } from "../types/shared";

const tagDataService = {
    getTagList: async (upload_id: CommonIdType) => {
        return GET<TagData>({
            endpoint: API_ENDPOINTS.GET_TAG_DATA.LIST(upload_id)
        })
    },
    getTagValues: async (query: TagValueParam) => {
        return GET<TagValueResponse>({
            endpoint: API_ENDPOINTS.GET_TAG_DATA.TAGS,
            query: {
                ...query,
                page: query.page ?? 1,
                page_size: query.page_size ?? 10
            }
        })
    }

}

export default tagDataService;