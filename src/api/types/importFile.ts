import type { CommonIdType, StatusTypes, DatasetType } from "./shared";

interface ImportFile {
    id: CommonIdType
    name: string
    file_name: string
    tags: string
    file_size: number
    row_count: number
    upload_type: DatasetType,
    status: StatusTypes
    remarks: string
    created_at: string
}

export type { ImportFile };