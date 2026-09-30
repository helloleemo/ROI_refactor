import { useMemo } from "react";
import ReactFlowInit from "@/components/ReactFlowInit";
import { renderNodes } from "@/utils/renderNodes";

interface NodeEditModeProps {
    selectedCategory: string;
    diagram?: {
        chw_table: Record<string, any>[];
        cw_table: Record<string, any>[];
        raw_nodes: Record<string, number[]>;
        num_load: number;
    };
}

const NodeEditMode = ({ selectedCategory, diagram }: NodeEditModeProps) => {
    const rows = selectedCategory === "cw_table"
        ? diagram?.cw_table
        : diagram?.chw_table;

    const { nodes, edges } = useMemo(
        () => renderNodes(rows ?? [], selectedCategory),
        [rows, selectedCategory],
    );

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <ReactFlowInit
                key={selectedCategory}
                nodes={nodes}
                edges={edges}
            />
        </div>
    );
}

export default NodeEditMode;