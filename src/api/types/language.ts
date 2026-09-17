
import type { LanguageList } from "./shared";

export interface NestedLanguage {
    [key: string]: string;
}

export interface LanguageItem {
    id: number | string;
    locale: string;
    text_key: string;
    text_value: string;
    category: string;
    created_at: string;
    updated_at: string;
}

export interface LanguageNestedRequest {
    locale: LanguageList;
    fallback_locale: LanguageList;
}

export interface LanguageListRequest {
    locale: LanguageList;
    category: string;
    keyword: string; // 關鍵字搜尋 (text_key 或 text_value)
}

export interface LanguageUpdateRequest {
    id: number | string;
    text_value: string;
    category: string;
}

export interface LanguageImportRequest {
    total_rows: number;
    updated_count: number;
    inserted_count: number;
    skipped_count: number;
    errors: string[];
}