import { createBrowserRouter, Navigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import PATHS from "./paths"
import Index from "../pages/Index"
import ModelManagement from "@/pages/Models/ModelManagement"
import CsvList from "@/pages/Models/CsvList"
import OverviewPage from "@/pages/Overview/OverviewPage";
import EquipmentListPage from "@/pages/EquipmentManagement/EquipmentList/EquipmentListPage";
import OptimizationListPage from "@/pages/Optimization/OptmizationStrategiesList/OptimizationListPage";
import LanguageSettings from "@/pages/LanguageSettings/LanguageSettings";
import NoSidebarLayout from "@/components/layout/NoSidebarLayout";

const PlaceholderPage = ({ title }: { title: string }) => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h6">{title}</Typography>
  </Box>
);

export const router = createBrowserRouter([
  {
    path: PATHS.root,
    element: <Index />,
    children: [
      {
        index: true,
        element: <Navigate to={PATHS.overview} replace />
      },

      // overview
      {
        path: `${PATHS.overview}/${PATHS.kpiOverview}`,
        element: <PlaceholderPage title="KPI Overview" />
      },
      {
        path: `${PATHS.overview}/${PATHS.projectSettings}`,
        element: <PlaceholderPage title="Project Settings" />
      },

      // 設備管理
      {
        path: `${PATHS.equipmentManagement}/${PATHS.equipmentList}`,
        element: <PlaceholderPage title="Equipment List" />

      },
      {
        path: `${PATHS.equipmentManagement}/${PATHS.mapping}`,
        element: <PlaceholderPage title="Mapping" />
      },

      // 節能模擬
      {
        path: PATHS.energySavingOverview,
        element: <PlaceholderPage title="Energy Saving Overview" />
      },
      {
        path: `${PATHS.energySavingOverview}/${PATHS.projectCsv}`,
        element: <PlaceholderPage title="Project CSV" />
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
        element: <OverviewPage />
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