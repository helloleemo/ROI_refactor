

import { type Edge, type Node } from "@xyflow/react";

type DiagramRow = Record<string, string | number | null | undefined>;

interface Segment {
    inKey: string;
    nameKey: string;
    outKey: string;
}


const SEGMENTS: Record<string, Segment[]> = {
    chw_table: [
        { inKey: "in_chp", nameKey: "chp_name", outKey: "out_chp" },
        { inKey: "in_ch", nameKey: "ch_name", outKey: "out_ch" },
        { inKey: "in_zp", nameKey: "zp_name", outKey: "out_zp" },
        { inKey: "in_load", nameKey: "load_name", outKey: "out_load" },
    ],
    cw_table: [
        { inKey: "in_cwp", nameKey: "cwp_name", outKey: "out_cwp" },
        { inKey: "in_ch", nameKey: "ch_name", outKey: "out_ch" },
        { inKey: "in_ct", nameKey: "ct_name", outKey: "out_ct" },
    ],
};

const COLUMN_WIDTH = 190;
const ROW_HEIGHT = 90;
const JUNCTION_SIZE = 40;

export const renderNodes = (
    originalData: DiagramRow[],
    tableType: string,
): { nodes: Node[]; edges: Edge[] } => {
    const segments = SEGMENTS[tableType] ?? [];
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    
    const junctions = new Map<string, { col: number; label: string; rowIndices: number[] }>();
    const edgeIds = new Set<string>();
    
    const junctionValues = new Map<string, Set<string>>();
    
    const segmentPairs = new Set<string>();

    const addEdge = (source: string, target: string) => {
        const id = `${source}->${target}`;
        if (edgeIds.has(id)) return;
        edgeIds.add(id);
        edges.push({ id, source, target });
    };

    const addJunction = (
        key: string,
        value: string,
        col: number,
        rowIndex: number,
    ) => {
        const id = `${key}-${value}`;
        const existing = junctions.get(id);
        if (existing) {
            existing.rowIndices.push(rowIndex);
        } else {
            junctions.set(id, { col, label: value, rowIndices: [rowIndex] });
        }

        const values = junctionValues.get(key);
        if (values) {
            values.add(value);
        } else {
            junctionValues.set(key, new Set([value]));
        }
    };

    originalData.forEach((row, rowIndex) => {
        let prevOutKey: string | null = null;

        segments.forEach((segment, segmentIndex) => {
            const inValue = row[segment.inKey];
            const name = row[segment.nameKey];
            const outValue = row[segment.outKey];

            if (inValue == null || name == null || outValue == null) {
                return;
            }

            const baseCol = segmentIndex * 3;
            const inId = `${segment.inKey}-${inValue}`;
            const outId = `${segment.outKey}-${outValue}`;
            const equipmentId = `${segment.nameKey}-row${rowIndex}`;

            addJunction(segment.inKey, String(inValue), baseCol, rowIndex);
            addJunction(segment.outKey, String(outValue), baseCol + 2, rowIndex);

            nodes.push({
                id: equipmentId,
                type: "equipment",
                position: {
                    x: (baseCol + 1) * COLUMN_WIDTH,
                    y: rowIndex * ROW_HEIGHT,
                },
                data: { label: String(name) },
            });

            addEdge(inId, equipmentId);
            addEdge(equipmentId, outId);

            
            if (prevOutKey) {
                segmentPairs.add(`${prevOutKey}=>${segment.inKey}`);
            }
            prevOutKey = segment.outKey;
        });
    });

    
    segmentPairs.forEach((pair) => {
        const [outKey, inKey] = pair.split("=>");
        const outValues = junctionValues.get(outKey);
        const inValues = junctionValues.get(inKey);
        if (!outValues || !inValues) return;

        outValues.forEach((value) => {
            if (inValues.has(value)) {
                addEdge(`${outKey}-${value}`, `${inKey}-${value}`);
            }
        });
    });

    junctions.forEach(({ col, label, rowIndices }, id) => {
        const avgRow =
            rowIndices.reduce((sum, index) => sum + index, 0) / rowIndices.length;
        nodes.push({
            id,
            type: "junction",
            position: {
                x: col * COLUMN_WIDTH + (COLUMN_WIDTH - JUNCTION_SIZE) / 2,
                y: avgRow * ROW_HEIGHT,
            },
            data: { label },
        });
    });

    return { nodes, edges };
};