// API Response Structure
interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

// API Methods Parameters
interface GetParams {
    endpoint: string;
    query?: Record<string, any>;
}

interface PutParams {
    endpoint: string;
    body?: Record<string, any>;
    query?: Record<string, any>;
}

interface PostParams {
    endpoint: string;
    body?: Record<string, any> | FormData;
    query?: Record<string, any>;
}

interface DeleteParams {
    endpoint: string;
    query?: Record<string, any>;
}

export type { ApiResponse, GetParams, PutParams, PostParams, DeleteParams };