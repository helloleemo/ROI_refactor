import { API_ENDPOINTS, GET, GET_FILE, POST, PUT } from "../base"
import type { LanguageNestedRequest, LanguageListRequest, LanguageItem, LanguageUpdateRequest } from "../types/language"

const languageService = {
    getNested: async (query?: LanguageNestedRequest) => {
        return GET<LanguageNestedRequest>({
            endpoint: API_ENDPOINTS.UI_TEXTS.NESTED,
            query: query
        })
    },
    getList: async (query?: LanguageListRequest) => {
        return GET<LanguageItem[]>({
            endpoint: API_ENDPOINTS.UI_TEXTS.LIST,
            query: query
        })
    },
    update: async (body: LanguageUpdateRequest) => {
        return PUT<LanguageItem>({
            endpoint: API_ENDPOINTS.UI_TEXTS.UPDATE,
            body: body
        })
    },
    export: async (query: { locale: string[], category?: string }) => {
        return GET_FILE({
            endpoint: API_ENDPOINTS.UI_TEXTS.EXPORT,
            query,
            // fallbackFileName: "ui_texts_export.csv",
        });
    },
    import: async (file: File) => {
        const formData = new FormData()
        formData.append("file", file)
        return POST({
            endpoint: API_ENDPOINTS.UI_TEXTS.IMPORT,
            body: formData
        })
    }
}

export default languageService