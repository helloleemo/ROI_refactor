
import type { UpdateAvailableUnits } from "@/api/types/evalSetting";
import { API_ENDPOINTS, GET, POST } from "../base";
import type EvalSetting from "@/api/types/evalSetting";


export const evalSettingService = {
    getEvalSetting: async () => {
        return GET<EvalSetting>({
            endpoint: API_ENDPOINTS.UNIT_SETTINGS.EVAL_SETTINGS
        });
    },
    saveEvalSetting: async (body: UpdateAvailableUnits) => {
        return POST<EvalSetting>({
            endpoint: API_ENDPOINTS.UNIT_SETTINGS.EVAL_SETTINGS,
            body
        });

    }
}