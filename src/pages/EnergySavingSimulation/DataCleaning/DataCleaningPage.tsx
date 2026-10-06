import OneSectionStyled from "@/components/gridLayout/SectionLayout";
import ChillerMappingSection from "./components/ChillerMappingSection";
import { Box, Button, CircularProgress, Collapse, Divider, Paper, Typography } from "@mui/material";
import useLoading from "@/hooks/useLoading";
import { useEffect } from "react";
import { useState } from "react";
import TitleText from "@/components/TitleText";
import { useTranslation } from "react-i18next";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { tagMappingService } from "@/api/services/tagMapping";
import type { TagMapping } from "@/api/types/tagMapping";
import GlobalMappingSection from "./components/GlobalMappingSection";
import { showToast } from "@/components/ToasterCustom";
import EquipmentPowerParametersSection from "./components/EquipmentPowerParametersSection";
import LoadMappingSection from "./components/LoadMappingSection";
import type { CommonIdType } from "@/api/types/shared";

export const DataCleaningPage = () => {
    const { t } = useTranslation();
    const [isSectionOpen, setIsSectionOpen] = useState<Record<string, boolean>>({
        environmentAndLoadParameters: false,
        chillerSensorMappingAndBoundaryConditions: false,
        equipmentPowerParameters: false,
        loadSideSensorMapping: false,

    });
    const [tagMappingData, setTagMappingData] = useState<TagMapping | null>(null);
    const [contentChanged, setContentChanged] = useState<Record<string, boolean>>({
        environmentAndLoadParameters: false,
        chillerSensorMappingAndBoundaryConditions: false,
        equipmentPowerParameters: false,
    });
    const {
        loading,
        anyLoading,
        isLoading,
        startLoading,
        stopLoading,
        error,
        setError,
        isSaving,
        setIsSaving
    } = useLoading();

    const handleSectionToggle = (section: string) => {
        setIsSectionOpen((previous) => ({
            ...previous, [section]: !previous[section]
        }));
    };

    const setContentChangedForSection = (section: string, changed: boolean) => {
        setContentChanged((previous) => ({ ...previous, [section]: changed }));        // if (section === "chillerSensorMappingAndBoundaryConditions") {
        //     setIsSectionOpen((previous) => {
        //         setTimeout(() => setIsSectionOpen((prev) => ({ ...prev, [section]: false })), 0);
        //         return previous;
        //     });
        // }
    };

    const handleEnvironmentAndLoadParametersMappingChange = (key: keyof TagMapping["global_mapping"], tag: string) => {
        setTagMappingData((previous) => {
            if (!previous) return previous;
            return {
                ...previous,
                global_mapping: {
                    ...previous.global_mapping,
                    [key]: tag,
                }
            };
        });
        setContentChangedForSection("environmentAndLoadParameters", true);
    }

    const handleError = (error: Error) => {
        if (error) setError(true);
        showToast(error.message, "error");
    };

    const handleSaveGlobalMapping = async () => {
        if (!tagMappingData || isSaving) return;
        console.log("Saving global mapping", tagMappingData.global_mapping);

        try {
            setIsSaving(true);
            const savedData = await tagMappingService.update({
                upload_id: tagMappingData.upload_id,
                // data_settings: tagMappingData.data_settings,
                global_mapping: tagMappingData.global_mapping,
                // chiller_mappings: tagMappingData.chiller_mappings,
                // chp_mappings: tagMappingData.chp_mappings,
                // zp_mappings: tagMappingData.zp_mappings,
                // cwp_mappings: tagMappingData.cwp_mappings,
                // ct_mappings: tagMappingData.ct_mappings,
                // pump_mappings: tagMappingData.pump_mappings,
                // load_mappings: tagMappingData.load_mappings,
                // calculation_results: tagMappingData.calculation_results,
            });
            setTagMappingData(savedData);

            showToast("Saved successfully", "success");
            setContentChangedForSection("environmentAndLoadParameters", false);

        } catch (error) {
            showToast(error instanceof Error ? error.message : "Unable to save mapping", "error");
        } finally {
            setIsSaving(false);
            setContentChangedForSection("environmentAndLoadParameters", false);
        }


    };



    const getData = async () => {
        try {
            const data = await tagMappingService.get();
            setTagMappingData(data);

            console.log("data", data);
        }
        catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        getData();
    }, []);

    return (
        <OneSectionStyled sx={{ height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
            {/* <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1
            }}>
                <TitleText title={t("dataCleaning.title")} />
            </Box>
             */}
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
                    // onClick={() => openDialog("upload")}
                    // disabled={isLoading("upload")}
                    // startIcon={isLoading("upload") ? <CircularProgress size={16} color="inherit" /> : undefined}
                    >
                        + {t("dataCleaning.physical_unit_and_system_boundary")}
                    </Button>
                </Box>
            </Box>


            {/* 1 - 環境與負載參數對應 */}
            <Paper
                variant="outlined"
                sx={(theme) => ({
                    borderRadius: 1.5,
                    borderColor: theme.palette.divider,
                    backgroundColor: theme.palette.background.paper,
                    flex: isSectionOpen.environmentAndLoadParameters ? "1 1 0%" : "0 0 auto",
                    transition: "flex 225ms cubic-bezier(0.4, 0, 0.2, 1)",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0,
                    width: "100%",
                    minWidth: 0,
                    overflow: "hidden",
                })}
            >
                <Box sx={{ display: "flex", alignItems: "center", minHeight: 48 }}>
                    <Box
                        // fullWidth
                        onClick={() => handleSectionToggle("environmentAndLoadParameters")}
                        color="inherit"
                        sx={{
                            px: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                            cursor: "pointer",
                            py: 1, minHeight: 40, textTransform: "none", borderRadius: 0,
                            "&:hover": {
                                backgroundColor: "grey.50",
                                transition: "background-color 0.18s",
                            },
                        }}
                    >
                        <Typography sx={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: "text.primary",
                            lineHeight: 1,
                            cursor: "pointer",
                        }}>
                            {t("dataCleaning.environment_and_load_parameters.title")}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Typography sx={{ fontSize: 14, color: "error.main", lineHeight: 1, cursor: "pointer" }}>
                                {contentChanged.environmentAndLoadParameters && t("dataCleaning.remember_to_save")}
                            </Typography>
                            <Button
                                size="small"
                                variant="outlined"
                                startIcon={isSaving ? <CircularProgress size={16} color="inherit" sx={{ cursor: "pointer" }} /> : <SaveOutlinedIcon sx={{ cursor: "pointer" }} />}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    handleSaveGlobalMapping();
                                }}
                                disabled={!tagMappingData || isSaving}
                                sx={{ whiteSpace: "nowrap", }}
                            >
                                {t("common.save")}
                            </Button>

                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                zIndex: 1,
                            }}>

                                {isSectionOpen.environmentAndLoadParameters ? (
                                    <ExpandLessIcon sx={{ fontSize: 20, cursor: "pointer" }} />
                                ) : <ExpandMoreIcon sx={{ fontSize: 20, cursor: "pointer" }} />}
                            </Box>
                        </Box>

                    </Box>

                </Box>
                <Collapse
                    in={isSectionOpen.environmentAndLoadParameters}
                    timeout="auto"
                    unmountOnExit
                    sx={{
                        flex: 1,
                        minHeight: 0,
                        display: "flex",
                        flexDirection: "column",
                        "& .MuiCollapse-wrapper": { minHeight: 0 },
                        "& .MuiCollapse-wrapperInner": { minHeight: 0, display: "flex", flexDirection: "column" },
                    }}
                >
                    <Divider />
                    <Box sx={{ p: 1.5, flex: 1, minHeight: 0, width: "100%", minWidth: 0, overflow: "auto", overscrollBehavior: "contain" }}>
                        <GlobalMappingSection
                            globalMapping={tagMappingData?.global_mapping}
                            tags={tagMappingData?.available_tags}
                            onMappingChange={handleEnvironmentAndLoadParametersMappingChange}
                        />
                    </Box>
                </Collapse>
            </Paper>


            {/* 2 - 冰機 Sensor Mapping 與邊界條件 */}
            <Paper
                variant="outlined"
                sx={(theme) => ({
                    mt: 0.75,
                    borderRadius: 1.5,
                    borderColor: theme.palette.divider,
                    backgroundColor: theme.palette.background.paper,
                    flex: isSectionOpen.chillerSensorMappingAndBoundaryConditions ? "1 1 0%" : "0 0 auto",
                    transition: "flex 225ms cubic-bezier(0.4, 0, 0.2, 1)",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0,
                    minWidth: 0,
                    overflow: "hidden",
                })}
            >
                <Button
                    fullWidth
                    onClick={() => { handleSectionToggle("chillerSensorMappingAndBoundaryConditions") }}
                    color="inherit"
                    sx={{ px: 1, py: 1, minHeight: 40, justifyContent: "space-between", textTransform: "none", borderRadius: 0 }}
                >

                    <Typography sx={{ fontSize: 14, fontWeight: 700, color: "text.primary", lineHeight: 1, cursor: "pointer" }}>
                        {t("dataCleaning.chiller_sensor_mapping_and_boundary_conditions.title")}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography sx={{ fontSize: 14, color: "grey.300", lineHeight: 1 }}>
                            {!isLoading("ChillerMapping") && error && t("dataCleaning.error")}
                            {isLoading("ChillerMapping") && t("dataCleaning.chiller_sensor_mapping_and_boundary_conditions.auto_saving")}
                        </Typography>
                        {isSectionOpen.chillerSensorMappingAndBoundaryConditions ? <ExpandLessIcon sx={{ fontSize: 20, cursor: "pointer" }} /> : <ExpandMoreIcon sx={{ fontSize: 20, cursor: "pointer" }} />}
                    </Box>
                </Button>
                <Collapse
                    in={isSectionOpen.chillerSensorMappingAndBoundaryConditions}
                    timeout="auto"
                    unmountOnExit
                    sx={{
                        flex: 1,
                        minHeight: 0,
                        display: "flex",
                        flexDirection: "column",
                        "& .MuiCollapse-wrapper": { minHeight: 0 },
                        "& .MuiCollapse-wrapperInner": { minHeight: 0, display: "flex", flexDirection: "column" },
                    }}
                >
                    <Divider />
                    <Box sx={{ p: 1.5, flex: 1, minHeight: 0, width: "100%", minWidth: 0, overflow: "auto", overscrollBehavior: "contain" }}>
                        <ChillerMappingSection
                            chillerMappings={tagMappingData?.chiller_mappings ?? []}
                            tags={tagMappingData?.available_tags ?? []}
                            // onMappingsChange={handleChillerMappingsChange}
                            onLoading={(loading) => {
                                loading ? startLoading("ChillerMapping") : stopLoading("ChillerMapping");
                            }}
                            onError={(error) => handleError(error)}
                        />
                    </Box>
                </Collapse>
            </Paper>


            {/* 3 -設備耗電參數 (kW)*/}
            <Paper
                variant="outlined"
                sx={(theme) => ({
                    mt: 0.75,
                    borderRadius: 1.5,
                    borderColor: theme.palette.divider,
                    backgroundColor: theme.palette.background.paper,
                    flex: isSectionOpen.equipmentPowerParameters ? "1 1 0%" : "0 0 auto",
                    transition: "flex 225ms cubic-bezier(0.4, 0, 0.2, 1)",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0,
                    minWidth: 0,
                    overflow: "hidden",
                })}
            >
                <Button
                    fullWidth
                    onClick={() => { handleSectionToggle("equipmentPowerParameters") }}
                    color="inherit"
                    sx={{ px: 1, py: 1, minHeight: 40, justifyContent: "space-between", textTransform: "none", borderRadius: 0 }}
                >

                    <Typography sx={{ fontSize: 14, fontWeight: 700, color: "text.primary", lineHeight: 1, cursor: "pointer" }}>
                        {t("dataCleaning.equipment_power_parameters.title")}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography sx={{ fontSize: 14, color: "grey.300", lineHeight: 1 }}>
                            {isLoading("EquipmentPowerParameters") && t("dataCleaning.chiller_sensor_mapping_and_boundary_conditions.auto_saving")}
                        </Typography>
                        {isSectionOpen.equipmentPowerParameters ? <ExpandLessIcon sx={{ fontSize: 20, cursor: "pointer" }} /> : <ExpandMoreIcon sx={{ fontSize: 20, cursor: "pointer" }} />}
                    </Box>
                </Button>
                <Collapse
                    in={isSectionOpen.equipmentPowerParameters}
                    timeout="auto"
                    unmountOnExit
                    sx={{
                        flex: 1,
                        minHeight: 0,
                        display: "flex",
                        flexDirection: "column",
                        "& .MuiCollapse-wrapper": { minHeight: 0 },
                        "& .MuiCollapse-wrapperInner": { minHeight: 0, display: "flex", flexDirection: "column" },
                    }}
                >
                    <Divider />
                    <Box sx={{ p: 1.5, flex: 1, minHeight: 0, width: "100%", minWidth: 0, overflow: "auto", overscrollBehavior: "contain" }}>
                        <EquipmentPowerParametersSection
                            pumpMappings={tagMappingData?.pump_mappings}
                            tags={tagMappingData?.available_tags ?? []}
                            onMappingsChange={(pumpMappings) => {
                                setTagMappingData((previous) => previous
                                    ? { ...previous, pump_mappings: pumpMappings }
                                    : previous);
                                setContentChangedForSection("equipmentPowerParameters", true);
                            }}
                            onLoading={(loading) => {
                                loading ? startLoading("EquipmentPowerParameters") : stopLoading("EquipmentPowerParameters");
                            }}
                        />
                    </Box>
                </Collapse>
            </Paper>

            {/* 4 -負載端 Sensor Mapping*/}
            <Paper
                variant="outlined"
                sx={(theme) => ({
                    mt: 0.75,
                    borderRadius: 1.5,
                    borderColor: theme.palette.divider,
                    backgroundColor: theme.palette.background.paper,
                    flex: isSectionOpen.loadSideSensorMapping ? "1 1 0%" : "0 0 auto",
                    transition: "flex 225ms cubic-bezier(0.4, 0, 0.2, 1)",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0,
                    minWidth: 0,
                    overflow: "hidden",
                })}
            >
                <Button
                    fullWidth
                    onClick={() => { handleSectionToggle("loadSideSensorMapping") }}
                    color="inherit"
                    sx={{ px: 1, py: 1, minHeight: 40, justifyContent: "space-between", textTransform: "none", borderRadius: 0 }}
                >

                    <Typography sx={{ fontSize: 14, fontWeight: 700, color: "text.primary", lineHeight: 1, cursor: "pointer" }}>
                        {t("dataCleaning.load_side_sensor_mapping.title")}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography sx={{ fontSize: 14, color: "grey.300", lineHeight: 1 }}>
                            {isLoading("LoadMapping") && t("dataCleaning.chiller_sensor_mapping_and_boundary_conditions.auto_saving")}
                        </Typography>
                        {isSectionOpen.loadSideSensorMapping ? <ExpandLessIcon sx={{ fontSize: 20, cursor: "pointer" }} /> : <ExpandMoreIcon sx={{ fontSize: 20, cursor: "pointer" }} />}
                    </Box>
                </Button>
                <Collapse
                    in={isSectionOpen.loadSideSensorMapping}
                    timeout="auto"
                    unmountOnExit
                    sx={{
                        flex: 1,
                        minHeight: 0,
                        display: "flex",
                        flexDirection: "column",
                        "& .MuiCollapse-wrapper": { minHeight: 0 },
                        "& .MuiCollapse-wrapperInner": { minHeight: 0, display: "flex", flexDirection: "column" },
                    }}
                >
                    <Divider />
                    <Box sx={{ p: 1.5, flex: 1, minHeight: 0, width: "100%", minWidth: 0, overflow: "auto", overscrollBehavior: "contain" }}>
                        <LoadMappingSection
                            loadMappings={tagMappingData?.load_mappings ?? []}
                            tags={tagMappingData?.available_tags ?? []}
                            // onMappingsChange={(loadMappings) => {
                            //     setTagMappingData((previous) => previous
                            //         ? { ...previous, load_mappings: loadMappings }
                            //         : previous);
                            // }}
                            onLoading={(loading) => {
                                loading ? startLoading("LoadMapping") : stopLoading("LoadMapping");
                            }}
                            onError={handleError}
                        />
                    </Box>
                </Collapse>
            </Paper>
        </OneSectionStyled>
    );
};