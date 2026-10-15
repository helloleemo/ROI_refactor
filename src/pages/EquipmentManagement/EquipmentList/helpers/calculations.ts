
export const calculateChwFlowLpm = (coolingCapacityRt: unknown, chwTempIn: unknown, chwTempOut: unknown) => {
    console.log("calculateChwFlowLpm called with:", coolingCapacityRt, chwTempIn, chwTempOut);

    if ([coolingCapacityRt, chwTempIn, chwTempOut].some((value) => value === "" || value === null || value === undefined)) {
        return "";
    }

    const power = Number(coolingCapacityRt);
    const tempIn = Number(chwTempIn);
    const tempOut = Number(chwTempOut);
    const deltaT = tempIn - tempOut;

    if (![power, tempIn, tempOut, deltaT].every(Number.isFinite) || deltaT === 0) return "";

    return Number((power * 3024 / 60 / deltaT).toFixed(1));
};

export const calculateCwFlowLpm = (heatRejectionKw: unknown, cwTempIn: unknown, cwTempOut: unknown) => {
    // Heat Rejection / 3.517* 3024/60/(CW Temp out - CW Temp in)
    if ([heatRejectionKw, cwTempIn, cwTempOut].some((value) => value === "" || value === null || value === undefined)) {
        return "";
    }

    const power = Number(heatRejectionKw);
    const tempIn = Number(cwTempIn);
    const tempOut = Number(cwTempOut);
    const deltaT = tempOut - tempIn;

    if (![power, tempIn, tempOut, deltaT].every(Number.isFinite) || deltaT === 0) return "";

    return Number(((power / 3.517) * 3024 / 60 / (deltaT)).toFixed(1));
};

export const calculateEfficiency = (ratedKw: unknown, coolingCapacityRt: unknown) => {
    if ([ratedKw, coolingCapacityRt].some((value) => value === "" || value === null || value === undefined)) {
        return "";
    }

    const power = Number(ratedKw);
    const capacity = Number(coolingCapacityRt);

    if (![power, capacity].every(Number.isFinite) || capacity === 0) return "";

    return Number((power / capacity).toFixed(3));
};


export const calculateCop = (efficiency_kw_per_rt: unknown) => {
    if (efficiency_kw_per_rt === "" || efficiency_kw_per_rt === null || efficiency_kw_per_rt === undefined) {
        return "";
    }

    const efficiency = Number(efficiency_kw_per_rt);
    if (!Number.isFinite(efficiency) || efficiency === 0) return "";

    return Number((1 / efficiency * 3.517).toFixed(3));
};

export const calculateMotorPower = (motorCount: unknown, heatRejectionKw: unknown) => {
    if ([motorCount, heatRejectionKw].some((value) => value === "" || value === null || value === undefined)) {
        return "";
    }

    const count = Number(motorCount);
    const heatRejection = Number(heatRejectionKw);

    if (![count, heatRejection].every(Number.isFinite) || count === 0) return "";

    return Number((heatRejection / count).toFixed(1));
};


export const calculateDesignWetBulbTemp = (designTempOut: unknown, designApproachTempC: unknown) => {
    if ([designTempOut, designApproachTempC].some((value) => value === "" || value === null || value === undefined)) {
        return "";
    }

    const designTempOutNum = Number(designTempOut);
    const designApproachTemp = Number(designApproachTempC);

    if (![designTempOutNum, designApproachTemp].every(Number.isFinite)) return "";

    return Number((designTempOutNum - designApproachTemp).toFixed(2));
};


export const calculateHeatRejection = (coolingCapacityRt: unknown, ratedPowerKw: unknown) => {
    if ([coolingCapacityRt, ratedPowerKw].some((value) => value === "" || value === null || value === undefined)) {
        return "";
    }

    const capacity = Number(coolingCapacityRt);
    const power = Number(ratedPowerKw);

    if (![capacity, power].every(Number.isFinite) || capacity === 0) return "";

    return Number((capacity * 3.517 + power).toFixed(3));
};

export const recalculateEquipmentSpecs = (
    specs: Record<string, unknown>,
    changedKey?: string,
) => {
    const next = { ...specs };
    const shouldRecalculate = (keys: string[]) => changedKey === undefined || keys.includes(changedKey);

    if (shouldRecalculate(["cooling_capacity_rt", "rated_power_kw"])) {
        next.heat_rejection_kw = calculateHeatRejection(
            next.cooling_capacity_rt,
            next.rated_power_kw,
        );
    }
    if (shouldRecalculate(["cooling_capacity_rt", "chw_temp_in", "chw_temp_out"])) {
        next.chw_flow_lpm = calculateChwFlowLpm(
            next.cooling_capacity_rt,
            next.chw_temp_in,
            next.chw_temp_out,
        );
    }
    if (shouldRecalculate(["heat_rejection_kw", "cooling_capacity_rt", "rated_power_kw", "cw_temp_in", "cw_temp_out"])) {
        next.cw_flow_lpm = calculateCwFlowLpm(
            next.heat_rejection_kw,
            next.cw_temp_in,
            next.cw_temp_out,
        );
    }
    if (shouldRecalculate(["rated_power_kw", "cooling_capacity_rt"])) {
        next.efficiency_kw_per_rt = calculateEfficiency(
            next.rated_power_kw,
            next.cooling_capacity_rt,
        );
    }
    if (shouldRecalculate(["rated_power_kw", "cooling_capacity_rt", "efficiency_kw_per_rt"])) {
        next.cop = calculateCop(next.efficiency_kw_per_rt);
    }
    if (shouldRecalculate(["motor_count", "heat_rejection_kw", "cooling_capacity_rt", "rated_power_kw"])) {
        next.motor_power_kw = calculateMotorPower(
            next.motor_count,
            next.heat_rejection_kw,
        );
    }
    if (shouldRecalculate(["design_temp_out", "design_approach_temp"])) {
        next.design_wet_bulb_temp = calculateDesignWetBulbTemp(
            next.design_temp_out,
            next.design_approach_temp,
        );
    }

    return next;
};
