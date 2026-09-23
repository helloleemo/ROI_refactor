import { SearchBar, Tabs, TitleText } from "@/components";
import { useEffect, useState } from "react"
import equipmentService from "@/api/services/equipment";
import type { EquipementResponse, EquipmentCategory, EquipmentField } from "@/api/types/equipment";
import { Box, Button } from "@mui/material";

import SectionLayout from "@/components/gridLayout/SectionLayout.tsx"
import useSearchFilter from "@/hooks/useSearchFilter";
import useOpenDialog from "@/hooks/useOpenDialog";
import { useTranslation } from "react-i18next";
import EquipmentDatagrid from "./EquipmentDatagrid";
import EquipmentAddDialog from "./components/EquipmentAddDialog";
import SetApproachTempDialog from "./components/SetApproachTempDialog";
import EquipmentViewDialog from "./components/EquipmentViewDialog";
import EquipmentEditDialog from "./components/EquipmentEditDialog";


const EquipmentListPage = () => {

    const { t } = useTranslation()
    const [categories, setCategories] = useState<EquipmentCategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("1");
    const [renderedFields, setRenderedFields] = useState<EquipmentField[]>([]);
    const [exceptionFields, setExceptionFields] = useState<Record<string, unknown>>({});
    const [equipmentList, setEquipmentList] = useState<EquipementResponse[]>([]);
    const [approachTemp, setApproachTemp] = useState<number | undefined>();
    const [selectedEquipment, setSelectedEquipment] = useState<EquipementResponse | null>(null);
    const { open, openDialog, closeDialog } = useOpenDialog({
        add: false,
        edit: false,
        view: false,
        setApproachTemp: false,
    });

    const selectedCategoryData = categories.find(
        category => String(category.equipment_type) === selectedCategory
    );

    const { searchValue, handleSearchChange, filteredItems: searchedEquipment } = useSearchFilter({
        items: equipmentList,
        fields: ["equipment_name"],
    });

    // const filteredEquipment = selectedCategory === "冰水主機 (CH)"
    //     ? searchedEquipment
    //     : searchedEquipment.filter((item) => String(item) === selectedCategory);

    const getCategories = async () => {
        const categoryData = await equipmentService.getCategories();
        setCategories(categoryData);

        const defaultCategory = categoryData.find(
            (category) => String(category.equipment_type) === selectedCategory,
        );

        setRenderedFields(defaultCategory?.fields ?? []);
    };

    const getEquipmentData = async (categoryValue: string) => {
        const equipmentData = await equipmentService.getList({
            equipment_type: Number(categoryValue),
        });

        setEquipmentList(equipmentData);

        const category = categories.find(
            (item) => String(item.equipment_type) === categoryValue,
        );

        setRenderedFields(category?.fields ?? []);
    };
    const handleSelectedCategoryChange = (value: string) => {
        setSelectedCategory(value);
        // setRenderedFields(categories.find(category => String(category.equipment_type) === value)?.fields || []);
        // getEquipmentData(value);
    }

    const getApproachTemp = async () => {
        try {
            const response = await equipmentService.getApproachTemp();
            const approachTempValue = response.design_approach_temp;
            setApproachTemp(approachTempValue);
            setExceptionFields((previous) => ({
                ...previous,
                design_approach_temp: approachTempValue,
            }));
        } catch (error) {
            console.error("Failed to get approach temp:", error);
        }
    }

    const handleApproachTempChange = (value: number) => {
        const newApproachTemp = value;
        setApproachTemp(newApproachTemp);
        setExceptionFields(prev => ({ ...prev, design_approach_temp: newApproachTemp }));
        equipmentService.updateApproachTemp({ design_approach_temp: newApproachTemp }).catch(error => {
            console.error("Failed to update approach temp:", error);
        });
    };

    const handleCopy = async (equipment: EquipementResponse) => {
        try {
            await equipmentService.create({
                equipment_type: equipment.equipment_type,
                equipment_name: `${equipment.equipment_name}(copy)`,
                remarks: equipment.remarks,
                specs: equipment.specs,
            });
            await getEquipmentData(selectedCategory);
        } catch (error) {
            console.error("Failed to copy equipment:", error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        getEquipmentData(selectedCategory);
    }, [selectedCategory]);

    useEffect(() => {
        getEquipmentData("1");
        getApproachTemp();
    }, []);

    useEffect(() => {
        setSelectedCategory("5");
        getEquipmentData("5");
    }, [approachTemp])

    return (
        <SectionLayout sx={{ height: "100%", display: "flex", flexDirection: "column", minHeight: 0 }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2
            }}>
                <TitleText title={t("equipment-list.title")} />
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
                        ...categories.map((category) => ({
                            value: String(category.equipment_type),
                            label: t(`equipment-list.categories.${category.code}`, {
                                defaultValue: category.name,
                            }),
                        })),
                    ]}
                    value={selectedCategory}
                    onChange={(_, value: string) => handleSelectedCategoryChange(value)}
                />
                <Box sx={{ display: "flex", gap: 2 }}>
                    <SearchBar
                        value={searchValue}
                        onChange={handleSearchChange}
                        placeholder={t("equipment-list.search-placeholder")}
                        sx={{ width: 280 }}
                    />
                    <Button
                        variant="outlined"
                        onClick={() => openDialog("add")}
                        disabled={!selectedCategoryData}
                    >
                        + {t("equipment-list.add")}
                    </Button>
                </Box>
            </Box>
            <Box sx={{ flex: 1, minHeight: 0 }}>
                {/* {filteredEquipment.map((item) => (
                        <Box key={item.id} sx={{ py: 1, borderBottom: 1, borderColor: "divider" }}>
                            <Typography>{item.equipment_name}</Typography>
                        </Box>
                    ))} */}

                {selectedCategory === "5" && (
                    <Box sx={{ display: "flex", justifyContent: "start", gap: 2, mb: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={() => openDialog("setApproachTemp")}
                            disabled={!selectedCategoryData}
                        >
                            設定趨近溫度
                        </Button>
                    </Box>
                )}
                <EquipmentDatagrid
                    selectedCategory={selectedCategory}
                    renderFields={renderedFields}
                    equipmentList={searchedEquipment}
                    onView={(equipment) => {
                        setSelectedEquipment(equipment);
                        openDialog("view");
                    }}
                    onEdit={(equipment) => {
                        setSelectedEquipment(equipment);
                        openDialog("edit");
                    }}
                    onCopy={handleCopy}
                    onDeleted={() => getEquipmentData(selectedCategory)}
                />
            </Box>
            <EquipmentAddDialog
                exceptionFields={exceptionFields}
                open={open.add}
                category={selectedCategoryData}
                onClose={() => {
                    closeDialog("add");
                }}
                onSuccess={() => getEquipmentData(selectedCategory)}
            />
            <SetApproachTempDialog
                open={open.setApproachTemp}
                value={approachTemp}
                onClose={() => closeDialog("setApproachTemp")}
                onConfirm={(value) => handleApproachTempChange(value)}
            />
            <EquipmentViewDialog
                open={open.view}
                equipment={selectedEquipment}
                category={categories.find(
                    (category) => category.equipment_type === selectedEquipment?.equipment_type,
                )}
                onClose={() => {
                    closeDialog("view");
                    setSelectedEquipment(null);
                }}
            />
            <EquipmentEditDialog
                open={open.edit}
                equipment={selectedEquipment}
                category={categories.find(
                    (category) => category.equipment_type === selectedEquipment?.equipment_type,
                )}
                onClose={() => {
                    closeDialog("edit");
                    setSelectedEquipment(null);
                }}
                onSuccess={() => getEquipmentData(selectedCategory)}
            />
        </SectionLayout>

    );
};

export default EquipmentListPage;