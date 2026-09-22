import type { ProjectCreateRequest, ProjectListItem, ProjectUpdateRequest } from "../types/project"
import { API_ENDPOINTS, DELETE, GET, POST, PUT } from "../base"


export const ProjectService = {
    CREATE: async (body: ProjectCreateRequest) => {
        return POST<ProjectListItem>({
            endpoint: API_ENDPOINTS.PROJECT.CREATE,
            body
        })
    },
    GET: async (query?: { keyword?: string, status?: number }) => {
        return GET<ProjectListItem[]>({
            endpoint: API_ENDPOINTS.PROJECT.LIST,
            query
        })
    },
    DETAIL: async (path: string) => {
        return GET<ProjectListItem>({
            endpoint: `${API_ENDPOINTS.PROJECT.INFO}/${path}`,
        })
    },
    UPDATE: async (path: string, body: ProjectUpdateRequest) => {
        return PUT<ProjectListItem>({
            endpoint: `${API_ENDPOINTS.PROJECT.INFO(path)}`,
            body
        })
    },
    DELETE: async (path: string) => {
        return DELETE({
            endpoint: `${API_ENDPOINTS.PROJECT.INFO(path)}`,
        })
    }


}