export type HierarchyNode = {
    id: string;
    label: string;
    groups: Record<string, string[]>;
};

export const hierarchyData: HierarchyNode[] = [
    {
        id: "delta-electronics-aaaa",
        label: "Delta Electronics",
        groups: {
            "Summary View": ["Delta Electronics Summary", "2", "3"],
            CN: ["CN Summary", "2", "3"],
            TH: ["TH Summary"],
            TW: ["TW Summary"],
        },
    },
    {
        id: "delta-electronics-bbbb",
        label: "Delta Electronics123",
        groups: {
            Summary2: ["Delta Electronics Summary123"],
            CN2: ["CN Summary123"],
            TH2: ["TH Summary123"],
            TW2: ["TW Summary123"],
        },
    },
];
