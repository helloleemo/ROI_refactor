export default interface EvalSetting {
    id: number,
    project_id: number,
    power_unit: string,
    flow_unit: string,
    head_unit: string,
    temp_unit: string,
    available_units: {
        power_units: string[],
        flow_units: string[],
        head_units: string[],
        temp_units: string[]
    }
}


export interface UpdateAvailableUnits {
    power_unit: string[],
    flow_unit: string[],
    head_unit: string[],
    temp_unit: string[]
}