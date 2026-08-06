
import { getBearerToken, buildApiUrl } from "./helpers";
import type { GetParams, PostParams, PutParams, DeleteParams, ApiResponse } from "./types";


// HEADERS
const createHeaders = (includeJsonContentType = true) => {
    const headers = new Headers();

    if (includeJsonContentType) {
        headers.append("Content-Type", "application/json");
    }

    const bearer = getBearerToken();
    if (bearer && bearer !== "") {
        headers.append("Authorization", `Bearer ${bearer}`);
    }

    return headers;
}

// RESPONSE HANDLER
const handleResponse = async<T>(res: Response) => {
    if (res.ok) {
        const response = await res.json() as ApiResponse<T>;

        if (!response.success) {
            throw new Error(response.message || "An error occurred");
        }

        return response.data;
    } else {
        const error = await res.json();
        throw new Error(error.message || "An error occurred");
    }
}

// GET
const GET = async<T>({ endpoint, query }: GetParams) => {
    const url = buildApiUrl(endpoint, query);
    const headers = createHeaders();
    const response = await fetch(url, {
        method: "GET",
        headers,
    });

    return handleResponse<T>(response);
}

// POST

const POST = async<T>({ endpoint, body, query }: PostParams) => {
    const url = buildApiUrl(endpoint, query);
    const isFormDataBody = body instanceof FormData;
    const headers = createHeaders(!isFormDataBody);

    const response = await fetch(url, {
        method: "POST",
        headers,
        body: body ? (isFormDataBody ? body : JSON.stringify(body)) : undefined,
    });

    return handleResponse<T>(response);
}

// PUT
const PUT = async<T>({ endpoint, body, query }: PutParams) => {
    const url = buildApiUrl(endpoint, query);
    const headers = createHeaders();

    const response = await fetch(url, {
        method: "PUT",
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    return handleResponse<T>(response);
}

// DELETE
const DELETE = async<T>({ endpoint, query }: DeleteParams) => {
    const url = buildApiUrl(endpoint, query);
    const headers = createHeaders();

    const response = await fetch(url, {
        method: "DELETE",
        headers,
    });

    return handleResponse<T>(response);
}

export { GET, POST, PUT, DELETE }