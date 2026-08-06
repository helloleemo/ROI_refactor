import type { CommonIdType } from "./shared"

interface TagData {
    upload_id: CommonIdType,
    tag_count: number,
    tags: string[]
}
interface TagValueParam {
    upload_id?: CommonIdType,
    tag_name?: string,
    start_time?: string,
    end_time?: string,
    page?: number,
    page_size?: number

}
interface TagValueResponse {
    total: number,
    page: number,
    page_size: number,
    data: TagValueResponseData[]
}

interface TagValueResponseData {
    time: string,
    upload_id: CommonIdType,
    tag_name: string,
    value: number
}

export type { TagData, TagValueParam, TagValueResponse };