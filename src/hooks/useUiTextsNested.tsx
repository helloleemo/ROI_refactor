import { useQuery } from "@tanstack/react-query"
import { uiTextsKeys } from "@/api/queryKeys"
import { useEffect, useState } from "react"
import languageService from "@/api/services/languages"
import { SystemSettingsService } from "@/api/services/systemSettings"
import { useLanguage } from "@/contexts/LanguageContext"
import type { LanguageList } from "@/api/types/shared"



export function useUiTextsNested(category?: string) {

    const [enabledLocales, setEnabledLocales] = useState<string[]>([])
    const { locale } = useLanguage()
    const currentLocale: LanguageList = locale

    const getEnabledlocales = async () => {
        try {
            const data = await SystemSettingsService.GET()
            // console.log("data", data)
            setEnabledLocales(data.enabled_locales)

        }
        catch (error) {
            console.error("Failed to get current enabled locales:", error)
        }
    }

    useEffect(() => {
        getEnabledlocales()
    }, [])

    const queryKey = uiTextsKeys.nested(currentLocale, category)
    const queryFn = () => languageService.getList({ locale: currentLocale, category })

    return {
        enabledLocales,
        currentLocale,
        query: useQuery({
            queryKey: queryKey,
            queryFn: queryFn,
        })
    }
}