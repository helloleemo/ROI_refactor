import { useState } from "react";

const useSearchValue = () => {
    const [searchValue, setSearchValue] = useState<string>('');

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
    };

    return {
        searchValue,
        setSearchValue,
        handleSearchChange,
    }
}

export default useSearchValue