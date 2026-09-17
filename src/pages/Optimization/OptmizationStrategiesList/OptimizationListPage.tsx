import { SearchBar, TitleText } from "@/components";
import AddOptimizationDialog from "./components/AddOptimizationDialog";
import OneSectionStyled from "@/components/gridLayout/SectionLayout";
import { Box, Button } from "@mui/material";
import equipmentService from "@/api/services/equipment";
import { useState, useEffect } from "react";
import { useOpenDialog, useSearchFilter } from "@/hooks";
import type { EquipementResponse } from "@/api/types/equipment";
import RenderedCards from "./components/RenderedCards";
import optimizationService from "@/api/services/optimization";
import type { CreateOptimizationListResponse } from "@/api/types/optimization";

const OptimizationListPage = () => {
    const [optimizationList, setOptimizationList] = useState<CreateOptimizationListResponse[]>([]);
    const { open, openDialog, closeDialog } = useOpenDialog({
        editDialog: false,
        addDialog: false,
    });

    const { searchValue, handleSearchChange, filteredItems: filteredOptimizationList } = useSearchFilter({
        items: optimizationList,
        fields: ["optimization_name"],
    });

    const getData = async () => {
        try {
            const data = await optimizationService.getList();
            console.log(data);
            setOptimizationList(data);
        } catch (error) {
            console.error(error);
            setOptimizationList([]);
        }
    };

    useEffect(() => {
        void getData();
    }, []);

    return (
        <OneSectionStyled sx={{ height: "100%", display: "flex", flexDirection: "column", minHeight: 0 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <TitleText title="最佳化策略列表" />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <SearchBar
                        value={searchValue}
                        onChange={handleSearchChange}
                        placeholder="搜尋最佳化策略名稱"
                        sx={{ width: 280 }}
                    />
                    <Button variant="outlined" onClick={() => openDialog("addDialog")}>
                        + 新增
                    </Button>
                </Box>
            </Box>

            <Box sx={{ flex: 1, minHeight: 0, overflow: "auto" }}>
                <RenderedCards optimizationList={filteredOptimizationList} />
            </Box>

            <AddOptimizationDialog
                open={open.addDialog}
                onClose={() => closeDialog("addDialog")}
                onSuccess={() => void getData()}
            />
        </OneSectionStyled>
    );
};

export default OptimizationListPage;