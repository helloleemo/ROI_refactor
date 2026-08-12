import { useState } from "react";

type SearchMatcher<T> = (item: T) => string | number | null | undefined;
type SearchField<T> = Extract<keyof T, string>;

type UseSearchFilterOptions<T> = {
    items: T[];
    matchers?: SearchMatcher<T>[];
    fields?: SearchField<T>[];
    initialValue?: string;
};

const normalizeSearchValue = (value: string) => value.trim().toLowerCase();

const useSearchFilter = <T,>({
    items,
    matchers,
    fields,
    initialValue = "",
}: UseSearchFilterOptions<T>) => {
    const [searchValue, setSearchValue] = useState(initialValue);

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
    };

    const effectiveMatchers = matchers
        ?? fields?.map((field) => (item: T) => item[field] as string | number | null | undefined)
        ?? [];

    const normalizedSearchValue = normalizeSearchValue(searchValue);
    const filteredItems = !normalizedSearchValue
        ? items
        : items.filter((item) =>
            effectiveMatchers.some((matcher) =>
                String(matcher(item) ?? "").toLowerCase().includes(normalizedSearchValue)
            )
        );

    return {
        searchValue,
        setSearchValue,
        handleSearchChange,
        normalizedSearchValue,
        filteredItems,
    };
};

export default useSearchFilter;