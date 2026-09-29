import type { CommonIdType } from "./shared"

export default interface HydronicDiagram {
    project_id: CommonIdType,
    num_load: number,
    chw_table: Record<string, any>[]
    cw_table: Record<string, any>[],
    raw_nodes: Record<string, number[]>
}