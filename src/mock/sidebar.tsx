import { type ReactNode } from "react";
import {
    Dark136x36WidgetsCustomLine as CustomLine,
    Dark136x362ndMenuDocManagement as DocManagement,
    Dark136x361stMeunOverview as Overview,
    Dark136x361stMeunSiteManagement as SiteManagement,
} from "../components/icons";

export type FirstLevelItem = {
    key: string;
    label: string;
    icon: ReactNode;
};

export type SecondLevelLeafItem = {
    key: string;
    label: string;
    icon?: ReactNode;
};

export type SecondLevelMenuItem = {
    key: string;
    label: string;
    icon: ReactNode;
    children?: SecondLevelLeafItem[];
};

export const firstLevelItems: FirstLevelItem[] = [
    {
        key: "overview",
        label: "總攬",
        icon: <Overview width={30} height={30} />,
    },
    {
        key: "modelManagement",
        label: "模型管理",
        icon: <SiteManagement width={30} height={30} />,
    },
    {
        key: "optimization",
        label: "最佳化策略",
        icon: <DocManagement width={26} height={26} />,
    },
];

export const secondLevelMenuMap: Record<string, SecondLevelMenuItem[]> = {
    overview: [
        {
            key: "overview-kpi",
            label: "KPI總覽",
            icon: <CustomLine width={20} height={20} />,
        },
        {
            key: "overview-reporting",
            label: "報表中心",
            icon: <CustomLine width={20} height={20} />,
            children: [
                { key: "overview-daily", label: "每日日報" },
                { key: "overview-monthly", label: "每月彙整" },
            ],
        },
    ],
    modelManagement: [
        {
            key: "model-management-list",
            label: "模型管理",
            icon: <CustomLine width={20} height={20} />,
            children: [
                { key: "model-list", label: "模型列表" },
                { key: "csv-list", label: "CSV列表" },
                { key: "model-log", label: "模型紀錄" },
            ],
        },
        {
            key: "training-tasks",
            label: "訓練任務",
            icon: <CustomLine width={20} height={20} />,
        },
    ],
    optimization: [
        {
            key: "optimization-strategies",
            label: "策略清單",
            icon: <CustomLine width={20} height={20} />,
            children: [
                { key: "strategy-macc", label: "MACC策略" },
                { key: "strategy-mv", label: "M&V分析" },
            ],
        },
        {
            key: "optimization-simulator",
            label: "模擬器",
            icon: <CustomLine width={20} height={20} />,
        },
    ],
};
