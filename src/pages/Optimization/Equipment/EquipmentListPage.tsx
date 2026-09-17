import { SearchBar, TitleText } from "@/components";
import OneSectionStyled from "@/components/gridLayout/SectionLayout";
import { Box, Button } from "@mui/material";
import equipmentService from "@/api/services/equipment";
import { useState, useEffect } from "react";
import { useOpenDialog, useSearchFilter } from "@/hooks";
import type { EquipementResponse } from "@/api/types/equipment";
import EquipmentDatagrid from "./EquipmentDatagrid";
import EquipmentEditDialog from "./components/EquipmentEditDialog";
import EquipmentAddDialog from "./components/EquipmentAddDialog";

const EquipmentListPage = () => {
    const [equipmentList, setEquipmentList] = useState<EquipementResponse[]>([]);
    const [editingEquipment, setEditingEquipment] = useState<EquipementResponse | null>(null);
    const { open, openDialog, closeDialog } = useOpenDialog({
        editDialog: false,
        addDialog: false,
    });

    const { searchValue, handleSearchChange, filteredItems: filteredEquipmentList } = useSearchFilter({
        items: equipmentList,
        fields: ["equipment_name"],
    });

    const getData = async () => {
        try {
            const data = await equipmentService.getList();
            setEquipmentList(data);
        } catch (error) {
            console.error(error);
            setEquipmentList([]);
        }
    };

    useEffect(() => {
        void getData();
    }, []);

    const handleEditOpen = (row: EquipementResponse) => {
        setEditingEquipment(row);
        openDialog("editDialog");
    };

    const handleEditClose = () => {
        setEditingEquipment(null);
        closeDialog("editDialog");
    };

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
                <TitleText title="設備列表" />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <SearchBar
                        value={searchValue}
                        onChange={handleSearchChange}
                        placeholder="搜尋設備名稱"
                        sx={{ width: 280 }}
                    />
                    <Button variant="outlined" onClick={() => openDialog("addDialog")}>
                        + 新增
                    </Button>
                </Box>
            </Box>

            <Box sx={{ flex: 1, minHeight: 0 }}>
                <EquipmentDatagrid
                    rows={filteredEquipmentList}
                    onDeleted={getData}
                    onEdit={handleEditOpen}
                />
            </Box>

            <EquipmentEditDialog
                open={open.editDialog}
                equipment={editingEquipment}
                onClose={handleEditClose}
                onSuccess={getData}
            />

            <EquipmentAddDialog
                open={open.addDialog}
                onClose={() => closeDialog("addDialog")}
                onSuccess={getData}
            />
        </OneSectionStyled>
    );
};

export default EquipmentListPage;