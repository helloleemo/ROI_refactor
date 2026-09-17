import { type ReactNode } from "react";
import {
    N36x36WidgetsCustomLine as CustomLine,
    N36x36SecondMenuDocManagement as DocManagement,
    N36x36FirstMeunOverview as Overview,
    N36x36FirstMeunSiteManagement as SiteManagement,
} from "../components/icons";

import PATHS from "@/routes/paths";

export type MenuItemProps = {
    key: string;
    label: string;
    icon: ReactNode;
    route?: string;
    children?: MenuItemProps[];
};

export const MenuItem: MenuItemProps[] = [
    {
        key: "overview",
        label: "總攬",
        icon: <Overview width={30} height={30} />,
        children: [
            {
                key: "overview-kpi",
                label: "KPI總覽",
                icon: <CustomLine width={20} height={20} />,
                route: `${PATHS.overview}/${PATHS.kpiOverview}`,
            },
            {
                key: "project-settings",
                label: "專案設定",
                icon: <CustomLine width={20} height={20} />,
                route: `${PATHS.overview}/${PATHS.projectSettings}`,
            }
        ],
    },
    {
        key: "equipment-management",
        label: "設備管理",
        icon: <CustomLine width={30} height={30} />,
        children: [
            {
                key: "equipment-list",
                label: "設備列表",
                icon: <CustomLine width={20} height={20} />,
                route: `${PATHS.equipmentManagement}/${PATHS.equipmentList}`,
            },
            {
                key: "water-system-diagram",
                label: "水路系統圖",
                icon: <CustomLine width={20} height={20} />,
                route: `${PATHS.equipmentManagement}/${PATHS.mapping}`,
            }
        ],
    },
    {
        key: "energy-simulation",
        label: "節能模擬",
        icon: <CustomLine width={30} height={30} />,
        children: [
            {
                key: "overview-data-cleaning",
                label: "總攬",
                icon: <CustomLine width={20} height={20} />,
                route: PATHS.energySavingOverview,
            },
            {
                key: "csv-project",
                label: "專案CSV",
                icon: <CustomLine width={20} height={20} />,
                route: `${PATHS.energySavingOverview}/${PATHS.projectCsv}`,
            },
            {
                key: "energy-simulation-settings",
                label: "數據清洗",
                icon: <CustomLine width={20} height={20} />,
                route: `${PATHS.energySavingOverview}/${PATHS.dataCleaning}`,
            },
            {
                key: "energy-simulation-results",
                label: "M&V基準線",
                icon: <CustomLine width={20} height={20} />,
                route: `${PATHS.energySavingOverview}/${PATHS.mAndVBaseline}`,
            }, {
                key: "energy-simulation-report",
                label: "模擬報告",
                icon: <CustomLine width={20} height={20} />,
                route: `${PATHS.energySavingOverview}/${PATHS.simulationResultReport}`,
            }
        ],
    },
    {
        key: "modelManagement",
        label: "模型管理",
        icon: <SiteManagement width={30} height={30} />,
        children: [
            {
                key: "csv-list",
                label: "CSV列表",
                route: `${PATHS.model}/${PATHS.csvList}`,
                icon: <CustomLine width={20} height={20} />,
            },
            {
                key: "model-list",
                label: "模型列表",
                route: `${PATHS.model}/${PATHS.modelList}`,
                icon: <CustomLine width={20} height={20} />,
            }
        ],
    },
    {
        key: "optimization",
        label: "最佳化策略",
        icon: <DocManagement width={26} height={26} />,
        children: [
            {
                key: "optimization-strategies-list",
                label: "最佳化策略列表",
                route: `${PATHS.optimization}/${PATHS.optimizationStrategiesList}`,
                icon: <CustomLine width={20} height={20} />,
            },
            {
                key: "add-optimization-strategies",
                label: "新增最佳化策略",
                route: `${PATHS.optimization}/${PATHS.addOptimizationStrategies}`,
                icon: <CustomLine width={20} height={20} />,
            },
        ],
    },
];

export const firstLevelItems = MenuItem.map((item) => ({
    key: item.key,
    label: item.label,
    icon: item.icon,
}));

export const secondLevelMenuMap: Record<string, MenuItemProps[]> = {
    overview: MenuItem.filter((item) => item.key === "overview"),
    modelManagement: MenuItem.filter((item) => item.key === "modelManagement"),
    optimization: MenuItem.filter((item) => item.key === "optimization"),
};

// export const secondLevelMenuMap: Record<string, SecondLevelMenuItem[]> = {
//     overview: [
//         {
//             key: "overview-kpi",
//             label: "KPI總覽",
//             icon: <CustomLine width={20} height={20} />,
//         },
//         {
//             key: "overview-reporting",
//             label: "報表中心",
//             icon: <CustomLine width={20} height={20} />,
//             children: [
//                 { key: "overview-daily", label: "每日日報" },
//                 { key: "overview-monthly", label: "每月彙整" },
//             ],
//         },
//     ],
//     modelManagement: [
//         {
//             key: "model-management-list",
//             label: "模型管理",
//             icon: <CustomLine width={20} height={20} />,
//             children: [
//                 { key: "model-list", label: "模型列表", route: `${PATHS.model}/${PATHS.modelList}` },
//                 { key: "csv-list", label: "CSV列表", route: `${PATHS.model}/${PATHS.csvList}` },
//                 // { key: "model-log", label: "模型紀錄" },
//             ],
//         },
//         // {
//         //     key: "training-tasks",
//         //     label: "訓練任務",
//         //     icon: <CustomLine width={20} height={20} />,
//         // },
//     ],
//     optimization: [
//         {
//             key: "optimization-strategies",
//             label: "策略清單",
//             icon: <CustomLine width={20} height={20} />,
//             children: [
//                 { key: "strategy-macc", label: "MACC策略" },
//                 { key: "strategy-mv", label: "M&V分析" },
//             ],
//         },
//         {
//             key: "optimization-simulator",
//             label: "模擬器",
//             icon: <CustomLine width={20} height={20} />,
//         },
//     ],
// };
