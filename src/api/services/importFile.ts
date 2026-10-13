
import { GET, POST, DELETE } from "@/api/base/apiMethods";
import { API_ENDPOINTS } from "@/api/base/apiEndpoint";
import type { ImportFile } from "@/api/types";
import type { CommonIdType, DatasetType } from "@/api/types/shared";


const importFileService = {
    getList: async (query?: { upload_type: DatasetType | null }) => {
        return GET<ImportFile[]>({
            endpoint: API_ENDPOINTS.IMPORT_FILE.LIST,
            query,
        });
    },
    uploadFile: async (file: File, upload_type: DatasetType) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_type", String(upload_type));

        return POST<{ upload_id: CommonIdType }>({
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