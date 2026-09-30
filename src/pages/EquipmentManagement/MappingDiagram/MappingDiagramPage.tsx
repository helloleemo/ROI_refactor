import SectionLayout from "@/components/gridLayout/SectionLayout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { SearchBar, Tabs, TitleText } from "@/components/index";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useSearchFilter } from "@/hooks";
import MappingDatgrid from "./MappingDatgrid";
import { hydronicDiagramService } from "@/api/services/hydronicDiagram";
import { Typography } from "@mui/material";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import NodeEditMode from "./components/NodeEditMode";

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

        if (!diagram) return;
        const payload = diagram;

        if (selectedCategory === "chw_table") {
            try {
                await hydronicDiagramService.update({
                    chw_table: payload.chw_table,
                    num_load: payload.num_load
                })
            } catch (error) {
                console.error("Error saving diagram:", error);
            }
        } else if (selectedCategory === "cw_table") {
            try {
                await hydronicDiagramService.update({
                    cw_table: payload.cw_table,
                    // num_load: payload.num_load
                })
            } catch (error) {
                console.error("Error saving diagram:", error);
            }
        }


    }
    const handleAddLoad = () => {
        // console.log("Add load clicked");
        console.log("diagram1", diagram)
        setNotice("表單已更新，儲存後生效");
        setDiagram((prev) => {
            if (!prev) return prev;


            const newNumLoad = prev.num_load + 1;
            const sequenceNum = newNumLoad - 1;
            const outLoadNum = 1

            if (prev.chw_table.length <= sequenceNum) {
                prev.chw_table.push({ load_name: `Load-${sequenceNum + 1}`, in_load: sequenceNum + 1, out_load: outLoadNum });
            } else {
                prev.chw_table[sequenceNum] = { ...prev.chw_table[sequenceNum], in_load: sequenceNum + 1, load_name: `Load-${sequenceNum + 1}`, out_load: outLoadNum };
            }

            return {
                ...prev,
                num_load: newNumLoad,
                chw_table: [...prev.chw_table]
            };
        })
        console.log("diagram2", diagram)


    }

    const handleUpdateDiagram = (updatedDiagram: {
        chw_table: Record<string, any>[];
        cw_table: Record<string, any>[];
        raw_nodes: Record<string, number[]>;
        num_load: number;
    }) => {
        setDiagram(updatedDiagram);
        setNotice("表單已更新，儲存後生效");
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
                        圖形檢視
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={handleSave}
                    // disabled={!selectedCategoryData}
                    >
                        更新後儲存
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
                        : (<MappingDatgrid
                            selectedCategory={selectedCategory}
                            diagram={diagram}
                            onClickAddLoad={handleAddLoad}
                            onUpdateDiagram={handleUpdateDiagram}
                        />)
                }


            </Box>
        </SectionLayout>
    );
};

export default MappingDiagramPage;