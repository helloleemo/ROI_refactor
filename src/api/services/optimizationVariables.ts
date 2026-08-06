import { GET, PUT } from "../base";
import { API_ENDPOINTS } from "../base/apiEndpoint";
import type {
    OptimizationVariableResponse,
    OptimizationVariableSaveRequest,
} from "../types/optimizationVariables";
import type { CommonIdType } from "../types/shared";

const optimizationVariablesService = {
    getVariables: async (project_id: CommonIdType) => {
        return GET<OptimizationVariableResponse[]>({
            endpoint: API_ENDPOINTS.OPTIMIZATION_VARIABLE.GET(project_id),
        });
    },
    saveVariables: async (project_id: CommonIdType, body: OptimizationVariableSaveRequest) => {
        return PUT<void>({
            endpoint: API_ENDPOINTS.OPTIMIZATION_VARIABLE.SAVE(project_id),
            body,
        });
    },
};

export default optimizationVariablesService;
