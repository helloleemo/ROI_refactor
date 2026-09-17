import type { CommonIdType } from "../types/shared";


export interface ProjectCreateRequest {
    name: string;
    description: string;
}

export interface ProjectListItem {
    id: CommonIdType;
    name: string;
    description: string;
    status: number;
    created_at: string;
    updated_at: string;
}

export interface ProjectInfo {
    id: CommonIdType;
    name: string;
    description: string;
    status: number;
    created_at: string;
    updated_at: string;
}

export interface ProjectUpdateRequest {
    name: string;
    description: string;
    status: number;
}