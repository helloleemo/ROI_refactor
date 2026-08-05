import { createBrowserRouter } from "react-router-dom"
import PATHS from "./paths"
import Index from "../pages/Index"

export const router = createBrowserRouter([
  {
    path: PATHS.root,
    element: <Index />,
  },
])

export default router