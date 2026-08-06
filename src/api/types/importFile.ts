import type { CommonIdType, StatusTypes } from "./shared";

interface ImportFile {
    id: CommonIdType
    name: string
    file_name: string
    tags: string
    file_size: number
    row_count: number
    status: StatusTypes
    remarks: string
    created_at: string
}

export type { ImportFile };