import type { CommonIdType } from "../types/shared";

export const API_ENDPOINTS = {
    // Import File
    IMPORT_FILE: {
        LIST: "data-import/list",
        UPLOAD: "data-import/upload/",
        DELETE: (upload_id: CommonIdType) => `data-import/${upload_id}`,
    },

    // Get Tag Data
    GET_TAG_DATA: {
        LIST: (upload_id: CommonIdType) => `tag-data/list/${upload_id}`,
        TAGS: "tag-data/value"
    },

    // AI Model
    AI_MODEL: {
        CREATE: "model/create",
        LIST: "model/list",
        DELETE: (id: CommonIdType) => `model/${id}`,
        ACTIVE_ALGORITHM: (model_id: CommonIdType, model_algorithm_id: CommonIdType) => `model/algorithm/${model_id}/${model_algorithm_id}`,
        SETTING_EQUIPMENT: (model_id: CommonIdType, equipment_id: CommonIdType) => `model/equipment/${model_id}/${equipment_id}`
    },

    // Model Algorithm
    MODEL_ALGORITHM: {
        CREATE: "algorithm/create",
        RETRAIN: (algorithm_id: CommonIdType) => `algorithm/retraining/${algorithm_id}`,
        LIST: (model_id: CommonIdType) => `algorithm/list/${model_id}`,
        DELETE: (id: CommonIdType) => `algorithm/${id}`,
        PREDICT_COMPARISON: "algorithm/predict-comparison",
        UPDATE: "algorithm",
        PREDICT_COMPARISON_FILE: "algorithm/predict-comparison/file",
        POST_PREDICT: "algorithm/predict",
        MULTI_PREDICT: "algorithm/multi-predict",
        POST_FORECAST: "algorithm/forecast"
    },

    // Equipment
    EQUIPMENT: {
        CATEGORIES: "equipment/categories",
        CREATE: "equipment/create",
        LIST: "equipment/list",
        UPDATE: "equipment/",
        DELETE: (id: CommonIdType) => `equipment/${id}`,
        APPROACH_TEMP: "equipment/cooling-tower-approach-temp"
    },

    // Optimization
    OPTIMIZATION: {
        CREATE: "optimization/create",
        LIST: "optimization/list",
        DETAIL: (optimization_id: CommonIdType) => `optimization/detail/${optimization_id}`,
        ADD_MODELS: (optimization_id: CommonIdType) => `optimization/models/${optimization_id}`,
        GET_MODELS: (optimization_id: CommonIdType) => `optimization/models/${optimization_id}`
    },

    // Optimization Jobs
    OPTIMIZATION_JOB: {
        CREATE: "optimization-job/create",
        RE_EXECUTE: (job_id: CommonIdType) => `optimization-job/re-execute/${job_id}`,
        LIST: (optimization_id: CommonIdType) => `optimization-job/list/${optimization_id}`,
        INFO: (id: CommonIdType) => `optimization-job/info/${id}`
    },

    // Optimization Variables
    OPTIMIZATION_VARIABLE: {
        GET: (project_id: CommonIdType) => `optimization-variable/${project_id}`,
        SAVE: (project_id: CommonIdType) => `optimization-variable/${project_id}`
    },

    // UI Texts
    UI_TEXTS: {
        LIST: "ui-texts/list",
        NESTED: "ui-texts/nested",
        UPDATE: "ui-texts/",
        EXPORT: "ui-texts/export-csv",
        IMPORT: "ui-texts/import-csv"
    },

    // System Settings
    SYSTEM_SETTINGS: {
        INFO: "system-settings/",
        UPDATE: "system-settings/",
        GET_SUPPORTED_LOCALES: "system-settings/supported-locales"
    },

    // project
    PROJECT: {
        CREATE: "project/create",
        LIST: "project/list",
        UPDATE: "project/",
        INFO: (id: CommonIdType) => `project/${id}`,
    },




}