import { API_ENDPOINTS, GET, POST } from "../base"
import type { ExportDiagnosticsResponse, SimulationModuleARequest, SimulationModuleBRequest, SimulationModuleResponse } from "../types/simulationDiagnostics"


export const simulationDiagnosticsService = {
    exportDiagnostics: async () => {
        return GET<ExportDiagnosticsResponse>({
            endpoint: API_ENDPOINTS.SIMULATION_AND_DIAGNOSTICS.EXPORT_DIAGNOSTICS
        })
    },
    moduleA: async (body: SimulationModuleARequest) => {
        return POST<SimulationModuleResponse>({
            endpoint: API_ENDPOINTS.SIMULATION_AND_DIAGNOSTICS.MODULE_A,
            body: body
        })
    },
    moduleB: async (body: SimulationModuleBRequest) => {
        return POST<SimulationModuleResponse>({
            endpoint: API_ENDPOINTS.SIMULATION_AND_DIAGNOSTICS.MODULE_B,
            body: body
        })
    },

}