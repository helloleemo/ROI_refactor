
import { getBearerToken, buildApiUrl, getCurrentProjectId, getCurrentLanguage } from "./helpers";
import type { GetParams, PostParams, PutParams, DeleteParams, ApiResponse } from "./types";

const formatApiError = (payload: any): string => {
    if (!payload) return "An error occurred";

    if (typeof payload === "string") {
        return payload;
    }

    const detail = payload.detail;

    const formatDetailItem = (item: any): string => {
        if (typeof item === "string") {
            return item;
        }

        if (!item || typeof item !== "object") {
            return "";
        }

        const parts = [] as string[];

        if (item.type) {
            parts.push(`type: ${item.type}`);
        }

        if (Array.isArray(item.loc) && item.loc.length > 0) {
            parts.push(`loc: ${item.loc.join(" > ")}`);
        }

        if (item.msg) {
            parts.push(`msg: ${item.msg}`);
        }

        if (item.input !== undefined) {
            parts.push(`input: ${item.input}`);
        }

        return parts.join("；");
    };

    if (typeof detail === "string" && detail.trim() !== "") {
        return detail;
    }

    if (Array.isArray(detail)) {
        const messages = detail.map(formatDetailItem).filter(Boolean);
        if (messages.length > 0) {
            return messages.join("；");
        }
    }

    if (detail && typeof detail === "object") {
        const formatted = formatDetailItem(detail);
        if (formatted) {
            return formatted;
        }

        if (typeof detail.msg === "string") {
            return detail.msg;
        }
    }

    if (typeof payload.message === "string" && payload.message.trim() !== "") {
        return payload.message;
    }

    return "An error occurred";
};

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

    const projectId = getCurrentProjectId();
    if (projectId) {
        headers.append("X-Project-Id", projectId);
    }

    headers.append("Accept-Language", getCurrentLanguage());

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
        const errorPayload = await res.json().catch(() => null);
        throw new Error(formatApiError(errorPayload));
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

const GET_FILE = async ({ endpoint, query, fallbackFileName = "download" }: GetParams & { fallbackFileName?: string }) => {
    const url = buildApiUrl(endpoint, query);
    const headers = createHeaders(false);
    const response = await fetch(url, {
        method: "GET",
        headers,
    });

    if (!response.ok) {
        const errorPayload = await response.json().catch(() => null);
        throw new Error(formatApiError(errorPayload));
    }

    const contentDisposition = response.headers.get("content-disposition");
    const encodedFileName = contentDisposition?.match(/filename\*=UTF-8''([^;]+)/i)?.[1];
    const fileName = contentDisposition?.match(/filename="?([^";]+)"?/i)?.[1];

    console.log("Content-Disposition:", response.headers.get("content-disposition"));

    return {
        blob: await response.blob(),
        fileName: encodedFileName
            ? decodeURIComponent(encodedFileName)
            : fileName || fallbackFileName,
    };
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

export { GET, GET_FILE, POST, PUT, DELETE }