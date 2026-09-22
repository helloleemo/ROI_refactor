import { SearchBar, TitleText } from "@/components";
import { useState, useEffect } from "react"
import { Box, Button } from "@mui/material";

import SectionLayout from "@/components/gridLayout/SectionLayout.tsx"
import { aiModelListMock } from "@/mock/aiModelList";
import useSearchFilter from "@/hooks/useSearchFilter";
import { useTranslation } from "react-i18next";


const EquipmentListPage = () => {

    const { t } = useTranslation()

    const { searchValue, handleSearchChange, filteredItems: filteredModelList } = useSearchFilter({
        items: aiModelListMock,
        fields: ["model_name"],
    });



    return (
        <SectionLayout sx={{ height: "100%", display: "flex", flexDirection: "column", minHeight: 0 }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2
            }}>
                <TitleText title={t("equipment-list.title")} />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <SearchBar
                        value={searchValue}
                        onChange={handleSearchChange}
                        placeholder={t("equipment-list.searchPlaceholder")}
                        sx={{ width: 280 }}
                    />
                    <Button
                        variant="outlined"
                    // onClick={() => handleAddDialog("create")}
                    >
                        + 新增
                    </Button>
                </Box>
            </Box>
            <Box sx={{ flex: 1, minHeight: 0 }}>
                datagrids
            </Box>
        </SectionLayout>

    );
};

export default EquipmentListPage;