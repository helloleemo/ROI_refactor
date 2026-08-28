import { SearchBar, TitleText } from "@/components";
import { useState, useEffect } from "react"
import { Box, Button } from "@mui/material";

import SectionLayout from "@/components/gridLayout/SectionLayout.tsx";
import aiModelService from "@/api/services/aiModel";
import type { AiModel } from "@/api/types/aiModel";
import type { algorithmListResponse } from "@/api/types/modelAlgorithm";
import { aiModelListMock } from "@/mock/aiModelList";
import useSearchFilter from "@/hooks/useSearchFilter";
import modelAlgorithmService from "@/api/services/modelAlgorithm";
import AiModelDatagrid from "./components/AiModelDatagrid.tsx";
import AiModelReviewDialog from "./components/AiModelReviewDialog";


const ModelManagement = () => {
    const [modelList, setModelList] = useState<AiModel[]>([]);
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<AiModel | undefined>(undefined);
    const [algorithmList, setAlgorithmList] = useState<algorithmListResponse[]>([]);
    const [isLoadingAlgorithms, setIsLoadingAlgorithms] = useState(false);
    const [reviewErrorMessage, setReviewErrorMessage] = useState("");

    const { searchValue, handleSearchChange, filteredItems: filteredModelList } = useSearchFilter({
        items: modelList,
        fields: ["model_name", "id"],
    });

    const handleReview = async (row: AiModel) => {
        setSelectedRow(row);
        setIsReviewOpen(true);
        setIsLoadingAlgorithms(true);
        setReviewErrorMessage("");

        try {
            const data = await modelAlgorithmService.getList(row.id);
            setAlgorithmList(data);
            console.log("Fetched algorithm list for model ID", row.id, ":", data);
        } catch (error: any) {
            setAlgorithmList([]);
            setReviewErrorMessage(`取得演算法列表失敗：${error?.message ?? "請稍後再試"}`);
        } finally {
            setIsLoadingAlgorithms(false);
        }
    };

    const handleReviewOpenChange = (open: boolean) => {
        setIsReviewOpen(open);
        if (!open) {
            setSelectedRow(undefined);
            setAlgorithmList([]);
            setReviewErrorMessage("");
            setIsLoadingAlgorithms(false);
        }
    };


    const getData = async () => {
        try {
            const data = await aiModelService.getList()
            console.log("modelList", data);
            setModelList(data);

        } catch (error) {
            console.error("Failed to fetch model list:", error);
            setModelList(aiModelListMock);

        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <SectionLayout sx={{ height: "100%", display: "flex", flexDirection: "column", minHeight: 0 }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2
                }}>
                    <TitleText title="模型列表" />
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <SearchBar
                            value={searchValue}
                            onChange={handleSearchChange}
                            placeholder="搜尋模型名稱、ID"
                            sx={{ width: 280 }}
                        />
                        <Button
                            variant="outlined"
                            // onClick={() => setIsUploadOpen(true)}
                            onClick={() => { }}
                        >
                            + 新增
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ flex: 1, minHeight: 0 }}>
                    <AiModelDatagrid
                        rows={filteredModelList}
                        onDeleted={getData}
                        onReview={handleReview}
                    />
                </Box>

                <AiModelReviewDialog
                    open={isReviewOpen}
                    setOpen={handleReviewOpenChange}
                    selectedRow={selectedRow}
                    algorithms={algorithmList}
                    isLoading={isLoadingAlgorithms}
                    errorMessage={reviewErrorMessage}
                    onUpdated={getData}
                />

            </SectionLayout>




        </>
    )
}

export default ModelManagement;