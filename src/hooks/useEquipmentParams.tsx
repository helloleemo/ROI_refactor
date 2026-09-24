
import { equipmentDataKeys } from "@/api/queryKeys";
import { evalSettingService } from "@/api/services/evelSetting";
import type EvalSetting from "@/api/types/evalSetting";
import { useState, useMemo, useEffect } from "react";


export function useEquipmentParams() {

    const [units, setUnits] = useState<EvalSetting>()

    const getUnits = async () => {
        try {
            const unitsData = await evalSettingService.getEvalSetting();
            setUnits(unitsData);
        }
        catch (error) {
            console.error("Failed to get units:", error);
        }
    }

    useEffect(() => {
        getUnits();
    }, []);



    const unitQueryKey = equipmentDataKeys.unit
    const unitQueryFn = () => evalSettingService.getEvalSetting();


    return { units, unitQueryKey, unitQueryFn };
}