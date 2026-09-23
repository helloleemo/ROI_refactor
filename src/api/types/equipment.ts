import type { CommonIdType, StatusEnabledTypes } from "./shared";


interface EquipmentCategory {
    equipment_type: number,
    code: string,
    name: string,
    default_specs: Record<string, any>
    fields: EquipmentField[]
}

interface EquipmentField {
    key: string,
    label: string,
    field_type: string,
    unit: string,
    default: any,
    readonly: boolean,
    options: any[] | null
}

interface EquipementRequest {
    equipment_type: CommonIdType;
    equipment_name: string;
    remarks: string;
    specs: Record<string, any>;
}

interface EquipementResponse {
    id: number,
    project_id: number,
    equipment_type: number,
    equipment_type_name: string,
    equipment_name: string,
    status: number,
    remarks: string,
    specs: Record<string, any>
}


interface EquipmentUpdateRequest {
    id: CommonIdType;
    equipment_name?: string;
    equipment_type?: CommonIdType;
    status?: StatusEnabledTypes;
    remarks?: string;
    specs?: Record<string, any>;
}

interface ApproachTempResponse {
    design_approach_temp: number;
    updated_count: number;
}

interface SetApproachTempRequest {
    design_approach_temp: number;
}


export type { EquipementRequest, EquipementResponse, EquipmentUpdateRequest, EquipmentCategory, EquipmentField, ApproachTempResponse, SetApproachTempRequest };