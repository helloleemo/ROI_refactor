import { API_ENDPOINTS, DELETE, GET, POST, PUT } from "../base"
import type { SupportedLocales, SystemSettings } from "../types/systemSettings"


export const SystemSettingsService = {
    GET: async () => {
        return GET<SystemSettings>({
            endpoint: API_ENDPOINTS.SYSTEM_SETTINGS.INFO,
        })
    },
    UPDATE: async (body: Omit<SystemSettings, "updated_at">) => {
        return PUT<SystemSettings>({
            endpoint: API_ENDPOINTS.SYSTEM_SETTINGS.UPDATE,
            body
        })
    },
    SUPPORTED_LOCALES: async () => {
        return GET<SupportedLocales[]>({
            endpoint: API_ENDPOINTS.SYSTEM_SETTINGS.GET_SUPPORTED_LOCALES,
        })
    }


}