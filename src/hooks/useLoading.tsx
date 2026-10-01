
import { useCallback, useState } from "react";

const DEFAULT_KEY = "default";


const useLoading = <K extends string = string>() => {
    const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

    const setLoading = useCallback((value: boolean, key: string = DEFAULT_KEY) => {
        setLoadingMap((prev) => {
            if (prev[key] === value) return prev;
            return { ...prev, [key]: value };
        });
    }, []);

    const startLoading = useCallback((key?: K) => setLoading(true, key), [setLoading]);
    const stopLoading = useCallback((key?: K) => setLoading(false, key), [setLoading]);
    const isLoading = useCallback((key?: K) => Boolean(loadingMap[key ?? DEFAULT_KEY]), [loadingMap]);

    const loading = Boolean(loadingMap[DEFAULT_KEY]);
    const anyLoading = Object.values(loadingMap).some(Boolean);

    return {
        loading,
        anyLoading,
        isLoading,
        setLoading,
        startLoading,
        stopLoading
    };
};

export default useLoading;