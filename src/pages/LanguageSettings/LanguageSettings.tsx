import SectionLayout from "@/components/gridLayout/SectionLayout";
import useOpenDialog from "@/hooks/useOpenDialog";
import { Box, Button } from "@mui/material";
import LanguageList from "./LanguageList";
import LanguageSelectDialog from "./components/LanguageSelectDialog";
import ImportTranslation from "./components/ImportTranslation";
import { useEffect, useState } from "react";
import TitleText from "@/components/TitleText";
import SearchBar from "@/components/SearchBar";
import useSearchFilter from "@/hooks/useSearchFilter";
import languageService from "@/api/services/languages";
import { groupLanguageItems, type LanguageTableRow } from "@/utils/language";
import { useLanguage } from "@/contexts/LanguageContext";


const LanguageSettings = () => {
    const [languageList, setLanguageList] = useState<LanguageTableRow[]>([]);
    const [selectedLocales, setSelectedLocales] = useState<string[]>([]);
    const { enabledLocales, updateEnabledLocales } = useLanguage();
    const { searchValue, handleSearchChange, filteredItems: filteredLanguageList } = useSearchFilter({
        items: languageList,
        fields: ["category"],
    });
    const { open, openDialog, closeDialog } = useOpenDialog({
        exportDialog: false,
        importDialog: false,
        selectDisplayLanguageDialog: false,
    });

    useEffect(() => {
        setSelectedLocales(enabledLocales);
    }, [enabledLocales]);

    const getData = async () => {
        try {
            const data = await languageService.getList();
            setLanguageList(groupLanguageItems(data));
        } catch (error) {
            console.error(error);
            setLanguageList([]);
        }
    };

    const handleSelectDisplayLanguage = () => {
        openDialog("selectDisplayLanguageDialog");
    };

    const handleEnabledLocalesConfirm = async (locales: string[]) => {
        await updateEnabledLocales(locales);
    };

    const handleExportTemplate = async () => {
        try {
            const { blob, fileName } = await languageService.export({
                locale: selectedLocales,
            });


            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(downloadUrl);
            // window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
        } catch (error) {
            console.error(error);
        } finally {
        }
    };



    useEffect(() => {
        void getData();
    }, [selectedLocales]);

    return (
        <SectionLayout sx={{ height: "100%", display: "flex", flexDirection: "column", minHeight: 0 }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2
            }}>
                <TitleText title="語言設定" />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <SearchBar
                        value={searchValue}
                        onChange={handleSearchChange}
                        placeholder="搜尋名稱"
                        sx={{ width: 280 }}
                    />
                    <Button
                        variant="outlined"
                        onClick={handleExportTemplate}
                    >
                        匯出模板
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => openDialog("importDialog")}
                    >
                        匯入翻譯
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handleSelectDisplayLanguage}
                    >
                        選取顯示語言
                    </Button>
                </Box>

            </Box>
            <Box sx={{ flex: 1, minHeight: 0, height: "100%", display: "flex", flexDirection: "column" }}>
                <LanguageList
                    rows={filteredLanguageList}
                    selectedLocales={selectedLocales}
                    onUpdated={getData}
                />
            </Box>
            <LanguageSelectDialog
                open={open.selectDisplayLanguageDialog}
                selectedLocales={selectedLocales}
                onClose={() => closeDialog("selectDisplayLanguageDialog")}
                onConfirm={handleEnabledLocalesConfirm}
            />
            <ImportTranslation
                open={open.importDialog}
                onClose={() => closeDialog("importDialog")}
                onImported={getData}
            />


        </SectionLayout>
    );
}

export default LanguageSettings;