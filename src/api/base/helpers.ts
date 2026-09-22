import { API_URLS } from "./apiBaseUrl";

const getBearerToken = () => {
    return localStorage.getItem("accessToken") || "";
}

const getCurrentProjectId = () => {
    return sessionStorage.getItem("projectId") || "";
}

const getCurrentLanguage = () => {
    return localStorage.getItem("language") || "en-US";
}

const buildApiUrl = (endpoint: string, query?: Record<string, any>) => {
    const baseUrl = API_URLS.BASE_URL;
    let url = `${baseUrl}${endpoint}`;
    if (query) {
        Object.entries(query).forEach(([key, value]) => {
            if (value === undefined || value === null) {
                return;
            }

            const values = Array.isArray(value) ? value : [value];
            values.forEach((item) => {
                if (item !== undefined && item !== null) {
                    url += (url.includes('?') ? '&' : '?') + `${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`;
                }
            });
        })
    }

    return url.toString()

}




export { buildApiUrl, getBearerToken, getCurrentProjectId, getCurrentLanguage }