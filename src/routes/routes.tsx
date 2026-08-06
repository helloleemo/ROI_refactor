import { createBrowserRouter } from "react-router-dom"
import PATHS from "./paths"
import Index from "../pages/Index"
import ModelManagement from "../pages/Models/ModelManagement"

export const router = createBrowserRouter([
  {
    path: PATHS.root,
    element: <Index />,
    children: [
      {
        path: PATHS.models,
        element: <ModelManagement />,
      },
    ]
  },
])

export default router