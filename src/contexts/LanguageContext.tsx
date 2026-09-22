
import React, { createContext, useContext, useEffect, useState } from "react";
import i18n from "i18next";
import { getStoredLanguage, normalizeLanguage } from "@/settings/i18n";
import { SystemSettingsService } from "@/api/services/systemSettings";
import type { SupportedLocales, SystemSettings } from "@/api/types/systemSettings";
import type { ProjectListItem } from "@/api/types/project";
import { ProjectService } from "@/api/services/project";
import type { LanguageList } from "@/api/types/shared";

interface LanguageContextValue {
  locale: LanguageList;
  changeLocale: (nextLocale: string) => Promise<void>;
  updateEnabledLocales: (locales: string[]) => Promise<void>;
  supportedLocales: SupportedLocales[];
  projectSettings?: SystemSettings;
  enabledLocales: string[];
  projects?: ProjectListItem[];
}


const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<LanguageList>(getStoredLanguage() as LanguageList);
  const [supportedLocales, setSupportedLocales] = useState<SupportedLocales[]>([]);
  const [projectSettings, setProjectSettings] = useState<SystemSettings>();
  const [enabledLocales, setEnabledLocales] = useState<string[]>([]);

  const loadSupportedLocals = async () => {
    try {
      const locales = await SystemSettingsService.SUPPORTED_LOCALES();
      const localeValues = locales.map((language) => language.value);
      i18n.options.supportedLngs = localeValues;
      setSupportedLocales(locales);

      // console.log("Supported locales loaded:", locales);

      const storedLocale = getStoredLanguage();
      if (localeValues.includes(storedLocale) && i18n.language !== storedLocale) {
        await i18n.changeLanguage(storedLocale);
        setLocale(storedLocale);
      }
    }
    catch (error) {
      console.error("Failed to load supported locales", error);
    }
  }

  const loadProjectSettings = async () => {
    try {
      const settings = await SystemSettingsService.GET();
      // console.log("Project settings loaded:", settings);
      setEnabledLocales(settings.enabled_locales);
      setProjectSettings(settings);
    }
    catch (error) {
      console.error("Failed to load project settings", error);
    }
  }




  useEffect(() => {
    void loadSupportedLocals();
    void loadProjectSettings();
  }, [setSupportedLocales, setProjectSettings]);


  const changeLocale = async (nextLocale: string) => {
    const isSupportedByApi = supportedLocales.some(
      (language) => language.value === nextLocale,
    );
    const safeLocale = (isSupportedByApi ? nextLocale : normalizeLanguage(nextLocale)) as LanguageList;
    localStorage.setItem("language", safeLocale);
    await i18n.changeLanguage(safeLocale);
    setLocale(safeLocale);
  };

  const updateEnabledLocales = async (locales: string[]) => {
    if (!projectSettings) {
      throw new Error("Project settings are not loaded");
    }

    const updatedSettings = await SystemSettingsService.UPDATE({
      system_title: projectSettings.system_title,
      default_locale: projectSettings.default_locale,
      enabled_locales: locales,
      timezone: projectSettings.timezone,
      date_format: projectSettings.date_format,
    });

    setProjectSettings(updatedSettings);
    setEnabledLocales(updatedSettings.enabled_locales);
  };

  return (
    <LanguageContext.Provider value={{ locale, changeLocale, updateEnabledLocales, supportedLocales, projectSettings, enabledLocales }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}