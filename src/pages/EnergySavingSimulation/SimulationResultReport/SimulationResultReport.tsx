import { Box, Button, Typography } from "@mui/material";
import OneSectionStyled from "@/components/gridLayout/SectionLayout";
import TitleText from "@/components/TitleText";
import { t } from "i18next";





export const SimulationResultReport = () => {
    return (
        <OneSectionStyled sx={{ height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
                flexShrink: 0,
            }}>
                <Box sx={{ minWidth: 0 }}>
                    <TitleText title={t("dataCleaning.title")} />
                    <Typography sx={{ fontSize: 12, color: "text.secondary" }} noWrap>
                        {/* {file?.file_name ?? t("projectCsv.description")}1111 */}
                        {t("dataCleaning.file_change_notice")}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexShrink: 0 }}>
                    <Button
                        sx={{
                            whiteSpace: "nowrap"
                        }}
                        variant="outlined"
                        onClick={() => { }}
                    // disabled={!tagMappingData || isSaving}
                    >
                        + {t("dataCleaning.physical_unit_and_system_boundary")}
                    </Button>
                </Box>
            </Box>
        </OneSectionStyled>
    )
}