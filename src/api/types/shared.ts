

// Shared types
// 1=UPLOADING, 2=SUCCESS, 3=FAILED
const StatusNum = {
    UPLOADING: 1,
    SUCCESS: 2,
    FAILED: 3
} as const;

type StatusTypes = typeof StatusNum[keyof typeof StatusNum];

type CommonIdType = string | number;

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

export type { StatusTypes, CommonIdType, algorithmList, ModelStatusTypes, OptimizerList, TranslationResponse };

