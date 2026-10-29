import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ReactFlow,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    Background,
    Panel,
    type Edge,
    type Node,
    type OnConnect,
    type OnEdgesChange,
    type OnNodesChange,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodeTypes, edgeTypes, defaultEdgeOptions } from './FlowElements';
import InstructionInfo from './InstructionInfo';
import { Box } from '@mui/material';

const initialNodes: Node[] = [
    { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
    { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
];

const initialEdges: Edge[] = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];

interface ReactFlowInitProps {
    nodes?: Node[];
    edges?: Edge[];
}

const ReactFlowInit = ({
    nodes: initialNodesProp = initialNodes,
    edges: initialEdgesProp = initialEdges,
}: ReactFlowInitProps
) => {
    const { t } = useTranslation();
    const [nodes, setNodes] = useState<Node[]>(initialNodesProp);
    const [edges, setEdges] = useState<Edge[]>(initialEdgesProp);

    useEffect(() => {
        setNodes(initialNodesProp);
        setEdges(initialEdgesProp);
    }, [initialNodesProp, initialEdgesProp]);

    const onNodesChange: OnNodesChange = useCallback((changes) => {
        setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot));
    }, []);

    const onEdgesChange: OnEdgesChange = useCallback((changes) => {
        setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot));
    }, []);

    const onConnect: OnConnect = useCallback((connection) => {
        setEdges((edgesSnapshot) => addEdge(connection, edgesSnapshot));
    }, []);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                defaultEdgeOptions={defaultEdgeOptions}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            // fitView
            >
                <Background />
                <Panel position="top-left" style={{ pointerEvents: 'all' }}>
                    <Box sx={{ pointerEvents: 'all' }}>
                        <InstructionInfo title={t("MappingDiagram.graphic_info")} />
                    </Box>
                </Panel>
            </ReactFlow>
        </div>
    );
};

export default ReactFlowInit;