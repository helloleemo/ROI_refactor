import { type CommonIdType } from "../types/shared";


export interface MAndVBaseline {
    project_id: CommonIdType;
    balance_mode: string;
    hb_threshold: number;
    eb_threshold: number;
    feasibility: Record<string, any>,
    data_quality: dataQualityType,
    system_kpis: SystemKpisType,
    model_config: Record<string, any>,
    model_results: Record<string, any>,
    deep_dive_options: Record<string, any>,
    updated_at: string
}

type dataQualityType = {
    total_raw_rows: number,
    running_rows: number,
    final_valid_len: number,
    yield_rate: number,
    nan_dropped: number,
    outlier_dropped: number
}

type SystemKpisType = {
    total_kwh: number,
    total_rth: number,
    avg_kw_rt: number,
    avg_plr: number,
    avg_chw_dt: number,
    sys_design_chw_dt: number,
    avg_cw_dt: number | null,
    sys_design_cw_dt: number
}

type ModelConfigType = {
    x1: string,
    x2: string | null,
    y: string
}

type DeepDiveOptionsType = {
    chillers: string[],
    pumps: string[],
    has_tower_data: boolean
}


export interface FilterRequest {
    balance_mode: string, // "none"
    hb_threshold?: number,
    eb_threshold?: number
}

export type TrainXType = "rt" | "outside_air_temperature" | "wet_bulb_temperature";
export type TrainYType = "system_kw" | "total_chiller_kw" | "total_chp_kw" | "total_zp_kw" | "total_cwp_kw" | "total_ct_kw";

export interface TrainRequest {
    x1: TrainXType,
    x2: TrainXType | "none", // 不可與 x1 重複
    y: TrainYType,
    train_split_ratio: number // 0.1 ~ 1.0
}


export interface DeepDiveChillerResponse {
    chiller_name: string,
    rated_rt: number,
    rated_dt: number,
    rated_cw_dt: number,
    efficiency_points: Record<string, any>[],
    cop_daily_trend: Record<string, any>[],
    chw_dt_points: Record<string, any>[],
    cw_dt_points: Record<string, any>[]
}

export interface DeepDivePumpResponse {
    pump_name: string,
    pump_type: string,
    is_total: boolean,
    rated_dt: number,
    rt_chart: Record<string, any>,
    flow_chart: Record<string, any>,
    dt_chart: Record<string, any>
}

export interface DeepDiveTowerResponse {
    design_approach: number,
    approach_vs_heat: Record<string, any>[],
    plr_vs_approach: Record<string, any>[],
    power_vs_approach: Record<string, any>[]
}

