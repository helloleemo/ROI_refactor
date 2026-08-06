
import { GET, POST, DELETE } from "@/api/base/apiMethods";
import { API_ENDPOINTS } from "@/api/base/apiEndpoint";
import type { ImportFile } from "@/api/types";


const importFileService = {
    getList: async () => {
        return GET<ImportFile[]>({
            endpoint: API_ENDPOINTS.IMPORT_FILE.LIST,
        });
    },
    uploadFile: async (formData: FormData) => {
        return POST<FormData>({
            endpoint: API_ENDPOINTS.IMPORT_FILE.UPLOAD,
            body: formData
        });
    },
    deleteFile: async (upload_id: string) => {
        return DELETE({
            endpoint: API_ENDPOINTS.IMPORT_FILE.DELETE(upload_id),
        });
    },
}

export default importFileService;