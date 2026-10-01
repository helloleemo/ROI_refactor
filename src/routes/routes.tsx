import { createBrowserRouter, Navigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { ProjectCsvPage } from "../pages/EnergySavingSimulation/ProjectCsv/ProjectCsvPage";
import PATHS from "./paths"
import Index from "../pages/Index"
import ModelManagement from "@/pages/Models/ModelManagement"
import CsvList from "@/pages/Models/CsvList"
import OptimizationListPage from "@/pages/Optimization/OptmizationStrategiesList/OptimizationListPage";
import LanguageSettings from "@/pages/LanguageSettings/LanguageSettings";
import NoSidebarLayout from "@/components/layout/NoSidebarLayout";


// 設備管理
import EquipmentListPage from "@/pages/EquipmentManagement/EquipmentList/EquipmentListPage";
import MappingDiagramPage from "@/pages/EquipmentManagement/MappingDiagram/MappingDiagramPage";
import ProjectSettingsPage from "@/pages/overview/ProjectSettings/ProjectSettingsPage";

const PlaceholderPage = ({ title }: { title: string }) => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h6">{title}</Typography>
  </Box>
);

export const router = createBrowserRouter([
  {
    path: "/:projectId?",
    element: <Index />,
    children: [
      {
        index: true,
        element: <Navigate to={`${PATHS.overview}/${PATHS.projectSettings}`} replace />
      },

      // overview
      // {
      //   path: `${PATHS.overview}/${PATHS.kpiOverview}`,
      //   element: <KpiOverview />
      // },
      {
        path: `${PATHS.overview}/${PATHS.projectSettings}`,
        element: <ProjectSettingsPage />
      },

      // 設備管理
      {
        path: `${PATHS.equipmentManagement}/${PATHS.equipmentList}`,
        element: <EquipmentListPage />

      },
      {
        path: `${PATHS.equipmentManagement}/${PATHS.mapping}`,
        element: <MappingDiagramPage />
      },

      // 節能模擬
      {
        path: PATHS.energySavingOverview,
        element: <PlaceholderPage title="Energy Saving Overview" />
      },
      {
        path: `${PATHS.energySavingOverview}/${PATHS.projectCsv}`,
        element: <ProjectCsvPage />
      },
      {
        path: `${PATHS.energySavingOverview}/${PATHS.dataCleaning}`,
        element: <PlaceholderPage title="Data Cleaning" />
      },
      {
        path: `${PATHS.energySavingOverview}/${PATHS.mAndVBaseline}`,
        element: <PlaceholderPage title="M&V Baseline" />
      },
      {
        path: `${PATHS.energySavingOverview}/${PATHS.simulationResultReport}`,
        element: <PlaceholderPage title="Simulation Result Report" />
      },

      // 模型管理
      {
        path: `${PATHS.model}/${PATHS.modelList}`,
        element: <ModelManagement />
      },
      {
        path: `${PATHS.model}/${PATHS.csvList}`,
        element: <CsvList />
      },
      {
        path: PATHS.overview,
        element: <PlaceholderPage title="Overview" />
      },

      // 最佳化策略
      {
        path: `${PATHS.optimization}/${PATHS.optimizationStrategiesList}`,
        element: <OptimizationListPage />
      },
      {
        path: `${PATHS.optimization}/${PATHS.addOptimizationStrategies}`,
        element: <PlaceholderPage title="Add Optimization Strategy" />
      },
    ]
  },
  {
    path: `${PATHS.languageSettings}`,
    element: <NoSidebarLayout />,
    children: [
      {
        index: true,
        element: <LanguageSettings />
      }
    ]
  }
])

export default router