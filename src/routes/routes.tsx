import { createBrowserRouter, Navigate } from "react-router-dom";
import PATHS from "./paths"
import Index from "../pages/Index"
import ModelManagement from "@/pages/Models/ModelManagement"
import CsvList from "@/pages/Models/CsvList"
import OverviewPage from "@/pages/overview/OverviewPage";
export const router = createBrowserRouter([
  {
    path: PATHS.root,
    element: <Index />,
    children: [
      {
        index: true,
        element: <Navigate to={`${PATHS.model}/${PATHS.modelList}`} replace />
      },
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
      }
    ]
  },
])

export default router