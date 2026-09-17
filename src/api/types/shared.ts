

// Shared types
// 1=UPLOADING, 2=SUCCESS, 3=FAILED
const StatusNum = {
    UPLOADING: 1,
    SUCCESS: 2,
    FAILED: 3
} as const;

type StatusTypes = typeof StatusNum[keyof typeof StatusNum];

type CommonIdType = string | number;

//  1=ENABLED, 2=DISABLED
const StatusEnabledNum = {
    ENABLED: 1,
    DISABLED: 2
} as const;

type StatusEnabledTypes = typeof StatusEnabledNum[keyof typeof StatusEnabledNum];

// model statuses
// 狀態: 1=PENDING, 2=WAITING, 3=TRAINING, 4=SUCCESS, 5=FAILED
const ModelStatusNum = {
    PENDING: 1,
    WAITING: 2,
    TRAINING: 3,
    SUCCESS: 4,
    FAILED: 5
} as const;
export const ModelStatusText = {
    1: "PENDING",
    2: "WAITING",
    3: "TRAINING",
    4: "SUCCESS",
    5: "FAILED"
} as const;
type ModelStatusTypes = typeof ModelStatusNum[keyof typeof ModelStatusNum];

// Algorithms
const ModelAlgorithmNum = {
    linear_regression: 0,
    pls: 1,
    xgboost: 2,
    svr: 3,
    random_forest: 4,
    lightgbm: 5
} as const;

type algorithmList = keyof typeof ModelAlgorithmNum;


// Optimizations
// #0"differential_evolution"
// #1"genetic_algorithm"
// #2"particle_swarm_optimization"
// #3"cma_es"
// #4"slsqp"
// #5"gwo"
const OptimizerNum = {
    differential_evolution: 0,
    genetic_algorithm: 1,
    particle_swarm_optimization: 2,
    cma_es: 3,
    slsqp: 4,
    gwo: 5
} as const;

type OptimizerList = keyof typeof OptimizerNum;


type TranslationResponse = {
    [key: string]: string;
};


// 依資料集類型篩選: 1=訓練集, 2=測試集, 3=驗證集
const DatasetTypeNum = {
    TRAINING: 1,
    TEST: 2,
    VALIDATION: 3
} as const;

type DatasetType = typeof DatasetTypeNum[keyof typeof DatasetTypeNum];

export const DatasetTypeText = {
    1: "TRAINING",
    2: "TEST",
    3: "VALIDATION"
} as const;

const languageList = {
    "zh-TW": "zh-TW",
    "en-US": "en-US",
    "zh-CN": "zh-CN",
    "ja-JP": "ja-JP"
} as const;


export type LanguageList = keyof typeof languageList;


// #0"zh-TW" #1"en-US" #2"zh-CN" #3"ja-JP" #4"th-TH" #5"vi-VN"




export type { StatusTypes, CommonIdType, algorithmList, ModelStatusTypes, OptimizerList, TranslationResponse, StatusEnabledTypes, DatasetType };

