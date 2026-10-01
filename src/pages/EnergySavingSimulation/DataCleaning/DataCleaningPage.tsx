import OneSectionStyled from "@/components/gridLayout/SectionLayout";
import { Box } from "@mui/material";
import TitleText from "@/components/TitleText";
import { useTranslation } from "react-i18next";

export const DataCleaningPage = () => {
    const { t } = useTranslation();

    return (
        <OneSectionStyled sx={{ height: "100%", display: "flex", flexDirection: "column", minHeight: 0 }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1
            }}>
                <TitleText title={t("dataCleaning.title")} />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    {/* <SearchBar
                        value={searchValue}
                        onChange={handleSearchChange}
                        placeholder="搜尋 CSV 檔名"
                        sx={{ width: 280 }}
                    />
                    <Button
                        variant="outlined"
                        onClick={() => setIsUploadOpen(true)}
                    >
                        + 新增
                    </Button> */}
                </Box>
            </Box>
        </OneSectionStyled>
    );
};