import { API_URLS } from "./apiBaseUrl";

const getBearerToken = () => {
    return localStorage.getItem("accessToken") || "";
}

const buildApiUrl = (endpoint: string, query?: Record<string, any>) => {
    const baseUrl = API_URLS.BASE_URL;
    let url = `${baseUrl}${endpoint}`;
    if (query) {
        Object.entries(query).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url += (url.includes('?') ? '&' : '?') + `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
            }
        })
    }

    return url.toString()

}


export { buildApiUrl, getBearerToken }