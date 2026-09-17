
export interface SystemSettings {
    system_title: string;
    default_locale: string;
    enabled_locales: string[];
    timezone: string;
    date_format: string;
    updated_at: string;
}

export interface SupportedLocales {
    value: string;
    name: string;
    label: string;
}