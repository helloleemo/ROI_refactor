// export const API_URLS = {
//     BASE_URL: "http://192.168.0.20:9090/api/"
// }

declare global {
    interface Window {
        __APP_CONFIG__?: {
            API_BASE_URL?: string;
        };
    }
}

const configuredBaseUrl = window.__APP_CONFIG__?.API_BASE_URL || "/api/";

export const API_URLS = {
    BASE_URL: `${configuredBaseUrl.replace(/\/+$/, "")}/`
}