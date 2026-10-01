import SectionLayout from "@/components/gridLayout/SectionLayout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { showToast, Tabs, TitleText } from "@/components/index";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import useLoading from "@/hooks/useLoading";
import MappingDatgrid from "./MappingDatgrid";
import { hydronicDiagramService } from "@/api/services/hydronicDiagram";
import { Typography } from "@mui/material";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import NodeEditMode from "./components/NodeEditMode";
import toasterWording from "@/settings/toasterWording";

const tabs = [{
    value: "chw_table",
    label: "MappingDiagram.tabs.chw_table"
}, {
    value: "cw_table",
    label: "MappingDiagram.tabs.cw_table"
}
]


const MappingDiagramPage = () => {
    const { t } = useTranslation();
    // const [categories, setCategories] = useState([]);
    const { loading, startLoading, stopLoading } = useLoading();
    const [isNodeEditMode, setIsNodeEditMode] = useState(false);
    const [notice, setNotice] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("chw_table");
    const [diagram, setDiagram] = useState<{
        chw_table: Record<string, any>[];
        cw_table: Record<string, any>[];
        raw_nodes: Record<string, number[]>;
        num_load: number
    }>();

    // const { searchValue, handleSearchChange, filteredItems } = useSearchFilter({
    //     items: [],
    //     fields: ["equipment_name"],
    // });

    const getDiagram = async () => {
        const data = await hydronicDiagramService.get();
        setDiagram(data);

        // console.log("diagram", diagram);
        // console.log("diagram?.chw_table", diagram?.chw_table)
        // console.log(diagram)
    }

    const handleSelecteChange = (value: string) => {
        setSelectedCategory(value);
    };

    const handleSave = async () => {
        console.log("Saving:", diagram);
        setNotice("");

        const payload = { ...diagram };
        if (!diagram) return;

        startLoading();

        if (selectedCategory === "chw_table") {
            try {
                await hydronicDiagramService.update({
                    chw_table: payload.chw_table,
                    num_load: payload.num_load
                })
                showToast(t(toasterWording.success.update_diagram), "success");
            } catch (error) {
                console.error("Error saving diagram:", error);
                showToast(`${t(toasterWording.error.update_diagram)}: ${error}`, "error");
            } finally {
                stopLoading();
            }
        } else if (selectedCategory === "cw_table") {
            try {
                await hydronicDiagramService.update({
                    cw_table: payload.cw_table,
                    // num_load: payload.num_load
                })
                showToast(t(toasterWording.success.update_diagram), "success");
            } catch (error) {
                console.error("Error saving diagram:", error);
                showToast(t(toasterWording.error.update_diagram), "error");
            } finally {
                stopLoading();
            }
        }

        stopLoading();

    }
    const handleAddLoad = () => {
        // console.log("Add load clicked");
        // console.log("diagram1", diagram)
        setNotice(t("MappingDiagram.info"));

        setDiagram((prev) => {
            if (!prev) return prev;

            const newNumLoad = prev.num_load + 1;
            const sequenceNum = newNumLoad - 1;
            const outLoadNum = 1

            if (prev.chw_table.length <= sequenceNum) {
                prev.chw_table.push({
                    load_name: `Load-${sequenceNum + 1}`,
                    in_load: sequenceNum + 1,
                    out_load: outLoadNum
                });
            } else {
                prev.chw_table[sequenceNum] = {
                    ...prev.chw_table[sequenceNum],
                    in_load: sequenceNum + 1,
                    load_name: `Load-${sequenceNum + 1}`,
                    out_load: outLoadNum
                };
            }

            showToast(t(toasterWording.success.add_load), "info");
            return {
                ...prev,
                num_load: newNumLoad,
                chw_table: [...prev.chw_table]
            };
        })
        // console.log("diagram2", diagram)


    }

    const handleDeleteLoad = () => {
        setDiagram((prev) => {
            if (!prev) return prev;

            const newNumLoad = Math.max(prev.num_load - 1, 0);
            const sequenceNum = newNumLoad;

            const clearedRow = {
                ...prev.chw_table[sequenceNum],
                load_name: null,
                in_load: null,
                out_load: null
            }
            prev.chw_table[sequenceNum] = clearedRow;

            const isRowEmpty = Object.values(clearedRow).every((value) => value === null);
            if (isRowEmpty) {
                prev.chw_table.splice(sequenceNum, 1);
            }

            console.log("Delete load:", clearedRow);


            showToast(t(toasterWording.success.delete_load), "info");

            return {
                ...prev,
                num_load: newNumLoad,
                chw_table: [...prev.chw_table]
            };
        });
    }

    const handleUpdateDiagram = (updatedDiagram: {
        chw_table: Record<string, any>[];
        cw_table: Record<string, any>[];
        raw_nodes: Record<string, number[]>;
        num_load: number;
    }) => {
        setDiagram(updatedDiagram);
        setNotice(t("MappingDiagram.info"));
    };

    const handleEditDiagram = () => {
        console.log("Edit diagram clicked");
        setIsNodeEditMode((prev) => !prev);
    }


    useEffect(() => {
        getDiagram();
    }, []);

    useEffect(() => {
        // getDiagram();
    }, [diagram, handleSave]);

    return (
        <SectionLayout sx={{ height: "100%", display: "flex", flexDirection: "column", minHeight: 0 }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2
            }}>
                <TitleText title={t("MappingDiagram.title")} />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Tabs
                    items={[
                        ...tabs.map((category) => ({
                            value: String(category.value),
                            label: t(category.label),
                        })),
                    ]}
                    value={selectedCategory}
                    onChange={(_, value: string) => handleSelecteChange(value)}
                />
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Typography
                        variant="body2" sx={{ color: "grey.400" }}>
                        {notice}
                    </Typography>
                    <Button
                        variant="text"
                        onClick={handleEditDiagram}
                        startIcon={<AccountTreeOutlinedIcon />}
                        sx={{
                            color: isNodeEditMode ? "primary.main" : "grey.300",
                            backgroundColor: isNodeEditMode ? "grey.100" : "transparent",
                            padding: "6px 12px"
                        }}
                    // disabled={!selectedCategoryData}
                    >
                        {t("MappingDiagram.buttons.graph_view")}
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={handleSave}
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={16} color="inherit" /> : undefined}
                    >
                        {t("MappingDiagram.buttons.save_after_update")}
                    </Button>


                </Box>
            </Box>
            <Box sx={{ flex: 1, minHeight: 0 }}>
                {
                    isNodeEditMode
                        ? (
                            <NodeEditMode
                                selectedCategory={selectedCategory}
                                diagram={diagram}
                            />
                        )
                        : (
                            <MappingDatgrid
                                selectedCategory={selectedCategory}
                                diagram={diagram}
                                onClickAddLoad={handleAddLoad}
                                onClickDeleteLoad={handleDeleteLoad}
                                onUpdateDiagram={handleUpdateDiagram}
                            />
                        )
                }


            </Box>
        </SectionLayout>
    );
};

export default MappingDiagramPage;