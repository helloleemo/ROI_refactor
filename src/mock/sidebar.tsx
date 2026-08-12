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
                route: `${PATHS.overview}`,
            }
        ]
    },
    {
        key: "modelManagement",
        label: "模型管理",
        icon: <SiteManagement width={30} height={30} />,
        children: [
            {
                key: "model",
                label: "模型",
                icon: <CustomLine width={20} height={20} />,
                children: [
                    {
                        key: "model-list",
                        label: "模型列表",
                        route: `${PATHS.model}/${PATHS.modelList}`,
                        icon: <CustomLine width={20} height={20} />,
                    }
                ]
            },
            {
                key: "csv-list",
                label: "CSV列表",
                route: `${PATHS.model}/${PATHS.csvList}`,
                icon: <CustomLine width={20} height={20} />,
            },
        ],
    },
    {
        key: "optimization",
        label: "最佳化策略",
        icon: <DocManagement width={26} height={26} />,
        children: [
            {
                key: "optimization-strategies",
                label: "策略清單",
                route: `${PATHS.model}/${PATHS.csvList}`,
                icon: <CustomLine width={20} height={20} />,
            },
            {
                key: "optimization-simulator",
                label: "模擬器",
                route: `${PATHS.model}/${PATHS.csvList}`,
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
