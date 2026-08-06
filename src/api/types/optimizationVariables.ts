// get variables

import type { CommonIdType } from "./shared";

interface OptimizationVariableResponse {
    id: CommonIdType;
    project_id: CommonIdType;
    tag_name: string;
    role: number;
    min_value: number;
    max_value: number;
    default_value: number;
    remarks: string;
}

// save variables

interface OptimizationVariableSaveRequest {
    variables: {
        tag_name: string;
        role: number;
        min_value: number;
        max_value: number;
        default_value: number;
        remarks: string;
    }[];
}


export type { OptimizationVariableResponse, OptimizationVariableSaveRequest };