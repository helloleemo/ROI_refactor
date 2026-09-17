import type { CommonIdType, StatusEnabledTypes } from "./shared";

interface EquipementRequest {
    equipment_type: CommonIdType;
    equipment_name: string;
    remarks: string;
}

interface EquipementResponse extends EquipementRequest {
    id: CommonIdType;
    status: StatusEnabledTypes;
}

interface EquipmentUpdateRequest {
    id: CommonIdType;
    equipment_name?: string;
    equipment_type?: CommonIdType;
    status?: StatusEnabledTypes;
    remarks?: string;
}



export type { EquipementRequest, EquipementResponse, EquipmentUpdateRequest };