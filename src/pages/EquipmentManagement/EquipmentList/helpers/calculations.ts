
export const calculateChwFlowLpm = (ratedPowerKw: unknown, chwTempIn: unknown, chwTempOut: unknown) => {
    if ([ratedPowerKw, chwTempIn, chwTempOut].some((value) => value === "" || value === null || value === undefined)) {
        return "";
    }

    const power = Number(ratedPowerKw);
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

    return Number((power / 3.517 * 3024 / 60 / (deltaT)).toFixed(1));
};

export const calculateEfficiency = (ratedKw: unknown, cooingCapacityRt: unknown) => {
    if ([ratedKw, cooingCapacityRt].some((value) => value === "" || value === null || value === undefined)) {
        return "";
    }

    const power = Number(ratedKw);
    const capacity = Number(cooingCapacityRt);

    if (![power, capacity].every(Number.isFinite) || capacity === 0) return "";

    return Number((power / capacity).toFixed(1));
};


export const calculateCop = (efficiency_kw_per_rt: unknown) => {
    if (efficiency_kw_per_rt === "" || efficiency_kw_per_rt === null || efficiency_kw_per_rt === undefined) {
        return "";
    }

    const efficiency = Number(efficiency_kw_per_rt);
    if (!Number.isFinite(efficiency) || efficiency === 0) return "";

    return Number((1 / efficiency).toFixed(1));
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
