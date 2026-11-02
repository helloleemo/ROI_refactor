

export type ExportDiagnosticsResponse = {
    title: string,
    diagnostics: {
        module_code: string,
        module_name: string,
        status_code: string,
        status_label: string,
        confidence: string,
        theme_color: string,
        symptoms: string[],
        actions: string[]
    }[]
}

export type SimulationModuleARequest = {
    vpf_mode: string, // 系統架構代碼: SECONDARY_VPF (單純二次變流量) 或 PRIMARY_SECONDARY_VPF (一/二次雙變頻流量)
    pump_affinity_exponent: number,
    min_frequency_hz: number,
    target_delta_t: number,
    soo_a9: boolean
}

export type SimulationModuleBRequest = {
    optimal_staging: boolean,
    asymmetric_dispatch: boolean,
    asym_method: string, // 非對稱機制: temperature (出水溫) 或 flow (一次側流量)
    chwst_reset: boolean,
    sweet_spot_band: number[],
    chwst_reset_deg: number
}

export type SimulationModuleBResponse = {
    status: string,
    msg: string,
    chiller_saved_kwh: number,
    savings_pct: number,
    chiller_assessment: AssessmentItem[],
    control_logic: ControlLogicItems
}

export type SimulationModuleCRequest = {
    cwst_reset: boolean,
    ct_fan_vfd: boolean,
    cwp_vpf: boolean,
    affinity_exponent: number
}

export type SimulationModuleDResponse = {
    module_name: string,
    notice: string,
    guardrails: GuardrailItem[]
}

export type SimulationModuleResponse = {
    vpf_mode: string,
    total_saved_kwh: number,
    savings_pct: number,
    zp_assessment: AssessmentItem[],
    chp_assessment: AssessmentItem[],
    overall_summary: AssessmentItem[],
    control_logic: ControlLogicItems
}

export type FullPlant = {
    total_base_kwh: number,
    total_sim_kwh: number,
    total_saved_kwh: number,
    sys_savings_pct: number,
    base_kw_per_rt: number,
    sim_kw_per_rt: number,
    diff_kw_per_rt: number,
    breakdown_baseline: {
        category: string,
        kwh: number,
        percentage: number
    }[],
    breakdown_optimized: {
        category: string,
        kwh: number,
        percentage: number
    }[],
    device_metrics_table: {
        device_category: string,
        baseline_kwh: number,
        simulated_kwh: number,
        saved_kwh: number,
        baseline_kw_per_rt: number,
        simulated_kw_per_rt: number,
        savings_pct: number
    }[]
}

type AssessmentItem = {
    metric_key: string,
    metric_name: string,
    baseline_value: number,
    baseline_display: string,
    optimized_value: number,
    optimized_display: string,
    description: string
}

type SubItem = {
    name: string,
    status: string,
    details: string[]
}

type ControlLogicItems = {
    title: string,
    items: SubItem[],
    notes: string[]
}

type GuardrailItem = {
    key: string,
    name: string,
    enabled: true,
    status: string,
    description: string
}