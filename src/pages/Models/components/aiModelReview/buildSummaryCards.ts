import type { AiModel } from "@/api/types/aiModel";

export type SummaryCard = {
    label: string;
    value: string;
};

export const buildSummaryCards = ({
    selectedRow,
    algorithmsCount,
    activeAlgorithmName,
}: {
    selectedRow?: AiModel;
    algorithmsCount: number;
    activeAlgorithmName: string;
}): SummaryCard[] => {
    return [
        { label: "模型名稱", value: selectedRow?.model_name ?? "-" },
        { label: "模型 ID", value: String(selectedRow?.id ?? "-") },
        { label: "演算法數量", value: `${algorithmsCount} 筆` },
        { label: "目前啟用演算法", value: activeAlgorithmName },
    ];
};
