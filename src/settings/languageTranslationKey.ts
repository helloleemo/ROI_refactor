export const sidebarTranslationKey = {
    overview: {
        overview: "sidebarMenu.overview.label",
        kpi: "sidebarMenu.overview.overview-kpi",
        projectSettings: "sidebarMenu.overview.project-settings",
    },
    equipmentManagement: {
        overview: "sidebarMenu.equipment-management.label",
        list: "sidebarMenu.equipment-management.equipment-list",
        waterSystemDiagram: "sidebarMenu.equipment-management.water-system-diagram",
    },
    energySimulation: {
        overview: "sidebarMenu.energy-simulation.label",
        overviewDataCleaning: "sidebarMenu.energy-simulation.overview-data-cleaning",
        csvProject: "sidebarMenu.energy-simulation.csv-project",
        settings: "sidebarMenu.energy-simulation.energy-simulation-settings",
        results: "sidebarMenu.energy-simulation.energy-simulation-results",
        report: "sidebarMenu.energy-simulation.energy-simulation-report",
    },
    modelManagement: {
        overview: "sidebarMenu.modelManagement.label",
        csvList: "sidebarMenu.modelManagement.csv-list",
        modelList: "sidebarMenu.modelManagement.model-list",
    },
    optimization: {
        overview: "sidebarMenu.optimization.label",
        strategiesList: "sidebarMenu.optimization.optimization-strategies-list",
        addStrategies: "sidebarMenu.optimization.add-optimization-strategies",
    },
} as const;

export const headerTranslationKey = {
    profile: {
        profile: "header.profile.profile",
        theme: "header.profile.theme",
        logout: "header.profile.logout",
        about: "header.profile.about",
        languages: "header.profile.languages",
    },
} as const;

const translationKeySet = new Set<string>([
    ...Object.values(sidebarTranslationKey).flatMap((keys) => Object.values(keys)),
    ...Object.values(headerTranslationKey.profile),
]);

export const getTranslationKey = (...keys: string[]): string | undefined => {
    const translationKey = keys.join(".");

    return translationKeySet.has(translationKey)
        ? translationKey
        : undefined;
};

export const getSidebarTranslationKey = (...keys: string[]): string | undefined =>
    getTranslationKey("sidebarMenu", ...keys);