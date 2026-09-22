
import { useUiTextsNested } from "@/hooks/useUiTextsNested"
const KpiOverview = () => {

    const { query: { data, isLoading, isError } } = useUiTextsNested("sidebar")


    return (
        <div>
            KpiOverview Page
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error loading UI texts</p>}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    )
}

export default KpiOverview