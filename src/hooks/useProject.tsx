import { useQuery } from "@tanstack/react-query";
import { ProjectService } from "@/api/services/project"

export function useProject() {
    return useQuery({
        queryKey: ["project"],
        queryFn: () => ProjectService.GET({})
    })

}
