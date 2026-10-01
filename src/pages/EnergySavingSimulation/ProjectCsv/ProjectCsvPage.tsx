import OneSectionStyled from "@/components/gridLayout/SectionLayout";
import { Box, Button } from "@mui/material";
import SearchBar from "@/components/SearchBar";
import TitleText from "@/components/TitleText";
import { useState } from "react";

export const ProjectCsvPage = () => {
    return (
        <OneSectionStyled sx={{ height: "100%", display: "flex", flexDirection: "column", minHeight: 0 }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1
            }}>
                <TitleText title="專案CSV" />
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