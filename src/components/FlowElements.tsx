import { useTheme, type Theme } from "@mui/material/styles";
import { Handle, MarkerType, Position, type DefaultEdgeOptions, type NodeProps } from "@xyflow/react";
import type { CSSProperties } from "react";

const handleStyle: CSSProperties = {
    width: 6,
    height: 6,
    background: "#1976d2",
    border: "none",
};

const equipmentStyle = (theme: Theme): CSSProperties => ({
    width: 150,
    padding: "8px 12px",
    borderRadius: 8,
    border: `1px solid ${theme.palette.primary.main}`,
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    fontSize: 13,
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    boxShadow: theme.shadows[1],
});

const junctionStyle: CSSProperties = {
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "1px solid #90caf9",
    background: "#e3f2fd",
    color: "#1565c0",
    fontSize: 12,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

// 設備名稱
const EquipmentNode = ({ data }: NodeProps) => {
    const theme = useTheme();

    return (
        <div style={equipmentStyle(theme)} title={String(data.label ?? "")}>
            <Handle type="target" position={Position.Left} style={handleStyle} />
            {String(data.label ?? "")}
            <Handle type="source" position={Position.Right} style={handleStyle} />
        </div>
    );
};

// 節點
const JunctionNode = ({ data }: NodeProps) => (
    <div style={junctionStyle}>
        <Handle type="target" position={Position.Left} style={handleStyle} />
        {String(data.label ?? "")}
        <Handle type="source" position={Position.Right} style={handleStyle} />
    </div>
);

export const nodeTypes = {
    equipment: EquipmentNode,
    junction: JunctionNode,
};

export const defaultEdgeOptions: DefaultEdgeOptions = {
    type: "smoothstep",
    // type: "straight",
    // type: "step",
    // type: "simplebezier",

    animated: true,
    style: { stroke: "#90caf9", strokeWidth: 1.5, strokeDasharray: "6 4" },
    markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#90caf9",
        width: 16,
        height: 16
    },

};
