
import React, { createContext, useContext, useEffect, useState } from "react";
import i18n, { loadLanguages } from "i18next";
import { getStoredLanguage, normalizeLanguage } from "@/settings/i18n";
import { SystemSettingsService } from "@/api/services/systemSettings";
import type { SupportedLocales, SystemSettings } from "@/api/types/systemSettings";
import type { ProjectListItem } from "@/api/types/project";
import { ProjectService } from "@/api/services/project";

interface LanguageContextValue {
  locale: string;
  changeLocale: (nextLocale: string) => Promise<void>;
  supportedLocales: SupportedLocales[];
  projectSettings?: SystemSettings;
  enabledLocales: string[];
  projects?: ProjectListItem[];
}


const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState(getStoredLanguage());
  const [supportedLocales, setSupportedLocales] = useState<SupportedLocales[]>([]);
  const [projectSettings, setProjectSettings] = useState<SystemSettings>();
  const [enabledLocales, setEnabledLocales] = useState<string[]>([]);

  const loadSupportedLocals = async () => {
    try {
      const locales = await SystemSettingsService.SUPPORTED_LOCALES();
      // console.log("Supported locales loaded:", locales);
      setSupportedLocales(locales);
    }
    catch (error) {
      console.error("Failed to load supported locales", error);
    }
  }

  const loadProjectSettings = async () => {
    try {
      const settings = await SystemSettingsService.GET();
      console.log("Project settings loaded:", settings);
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
    const safeLocale = normalizeLanguage(nextLocale);
    localStorage.setItem("language", safeLocale);
    await i18n.changeLanguage(safeLocale);
    setLocale(safeLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, changeLocale, supportedLocales, projectSettings, enabledLocales }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}