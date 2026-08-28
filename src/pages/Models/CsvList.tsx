import { SearchBar, TitleText } from "@/components";
import OneSectionStyled from "@/components/gridLayout/SectionLayout";
import { Box, Button } from "@mui/material";
import { fileListMock } from "@/mock/filesList";
import importFileService from "@/api/services/importFile"
import type { ImportFile } from "@/api/types";
import { useState, useEffect } from "react"
import tagDataService from "@/api/services/tagData"
import { useSearchFilter } from "@/hooks";
import CsvDatagrid from './components/CsvDatagrid';
import CsvReviewDialog from "./components/CsvReviewDialog";
import UploadCsvDialog from "./components/UploadCsvDialog";


const CsvList = () => {
    const [csvList, setCsvList] = useState<ImportFile[]>([]);
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<ImportFile | undefined>(undefined);

    const { searchValue, handleSearchChange, filteredItems: filteredCsvList } = useSearchFilter({
        items: csvList,
        fields: ["file_name", "id", "row_count", "tags"],
    });

    const getData = async () => {
        try {
            const data = await importFileService.getList()
            const tagData = await tagDataService.getTagList("1")
            const tagValue = await tagDataService.getTagValues({ upload_id: 1, page: 1, page_size: 10 })

            console.log("tagData", tagData);
            console.log("tagValue", tagValue);
            console.log("data", data);
            setCsvList(data);
        } catch (error) {
            console.error(error);
            setCsvList(fileListMock);

        }
    }


    useEffect(() => {
        getData();
    }, []);


    return (
        <OneSectionStyled sx={{ height: "100%", display: "flex", flexDirection: "column", minHeight: 0 }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1
            }}>
                <TitleText title="CSV列表" />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <SearchBar
                        value={searchValue}
                        onChange={handleSearchChange}
                        placeholder="搜尋 CSV 檔名、欄位或行數"
                        sx={{ width: 280 }}
                    />
                    <Button
                        variant="outlined"
                        onClick={() => setIsUploadOpen(true)}
                    >
                        + 新增
                    </Button>
                </Box>
            </Box>

            <Box sx={{ flex: 1, minHeight: 0, height: "100%", display: "flex", flexDirection: "column" }}>
                <CsvDatagrid
                    rows={filteredCsvList}
                    onDeleted={getData}
                    onReview={(row) => {
                        setSelectedRow(row);
                        setIsReviewOpen(true);
                    }}
                />

            </Box>

            <CsvReviewDialog
                open={isReviewOpen}
                setOpen={setIsReviewOpen}
                selectedRow={selectedRow}
            />

            <UploadCsvDialog
                open={isUploadOpen}
                setOpen={setIsUploadOpen}
                onUploaded={getData}
            />


        </OneSectionStyled>

    )
}

export default CsvList;