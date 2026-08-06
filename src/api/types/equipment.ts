import type { CommonIdType } from "./shared";

interface EquipementRequest {
    equipment_type: CommonIdType;
    equipment_name: string;
    remarks: string;
}


export type { EquipementRequest };