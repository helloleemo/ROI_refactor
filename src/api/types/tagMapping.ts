import type { CommonIdType } from "./shared"

export interface TagMapping {
    project_id: CommonIdType,
    upload_id: CommonIdType,
    csv_datasets: CsvDataset[],
    available_tags: string[],
    data_settings: DataSettingsType,
    global_mapping: GlobalMappingType,
    chiller_mappings: ChillerMapping[],
    chp_mappings: PowerMapping[],
    zp_mappings: PowerMapping[],
    cwp_mappings: PowerMapping[],
    ct_mappings: DualPowerMapping[],
    pump_mappings: PumpMappings,
    load_mappings: LoadMapping[],
    calculation_results: CalculationResults,
    updated_at: string
}

export interface RequestTagMapping {
    upload_id: CommonIdType,
    data_settings: DataSettingsType | null,
    global_mapping: GlobalMappingType | null,
    chiller_mappings: ChillerMapping[] | null,
    chp_mappings: PowerMapping[] | null,
    zp_mappings: PowerMapping[] | null,
    cwp_mappings: PowerMapping[] | null,
    ct_mappings: DualPowerMapping[] | null,
    pump_mappings: PumpMappings | null,
    load_mappings: LoadMapping[] | null,
    calculation_results: CalculationResults | null
}


export interface PatchTagMapping {
    category: string,
    target_id: CommonIdType,
    field: string,
    value: string
}

export interface CalculateLoad {
    data_quality: DataQuality,
    system_kpis: SystemKpis,
    energy_breakdown: EnergyBreakdown[],
    pie_chart: PieChart,
    calculated_at: string
}

export interface CsvDataset {
    id: CommonIdType,
    name: string,
    file_name: string,
    row_count: number,
    created_at: string
}

export interface DataSettingsType {
    unit_flow: string,
    unit_temp: string,
    unit_pressure: string,
    data_interval: number,
    sys_design_rt: number,
    sys_design_kw: number
}

export interface GlobalMappingType {
    col_t_out: string,
    col_t_wb: string,
    col_flow: string,
    col_chw_in: string,
    col_chw_out: string,
    col_chw_setpoint: string,
    col_cw_in: string,
    col_cw_out: string
}

export interface ChillerMapping {
    equipment_name: string,
    kw_tag: string,
    st_tag: string,
    rt_tag: string,
    flow_tag: string,
    min_chw_flow_pct: number,
    cw_in_tag: string,
    cw_out_tag: string,
    cw_flow_tag: string,
    min_cw_flow_pct: number
}

export interface PowerMapping {
    equipment_name: string,
    power_tag: string
}

export interface DualPowerMapping {
    equipment_name: string,
    power_tag_1: string,
    power_tag_2: string
}

export interface PumpMappings {
    chp: PowerMapping[],
    zp: PowerMapping[],
    cwp: PowerMapping[],
    ct: DualPowerMapping[]
}

export interface LoadMapping {
    load_name: string,
    st_tag: string,
    rt_tag: string,
    flow_tag: string,
    dp_tag: string
}

export interface CalculationResults {
    data_quality: DataQuality,
    system_kpis: SystemKpis,
    energy_breakdown: EnergyBreakdown[],
    pie_chart: PieChart,
    calculated_at: string
}

export interface DataQuality {
    total_raw_rows: number,
    running_rows: number,
    final_valid_len: number,
    yield_rate: number,
    nan_dropped: number,
    outlier_dropped: number
}

export interface SystemKpis {
    total_kwh: number,
    total_rth: number,
    avg_kw_rt: number,
    avg_plr: number,
    avg_chw_dt: number,
    sys_design_chw_dt: number,
    avg_cw_dt: number,
    sys_design_cw_dt: number
}

export interface EnergyBreakdown {
    category: string,
    total_kwh: number,
    avg_kw_rt: number,
    percentage: number
}

export interface PieChart {
    labels: string[],
    values: number[]
}