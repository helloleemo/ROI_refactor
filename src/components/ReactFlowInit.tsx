import { useCallback, useState } from 'react';
import {
    ReactFlow,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    Background,
    type Edge,
    type Node,
    type OnConnect,
    type OnEdgesChange,
    type OnNodesChange,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

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
    const [nodes, setNodes] = useState<Node[]>(initialNodesProp);
    const [edges, setEdges] = useState<Edge[]>(initialEdgesProp);

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
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            >
                <Background />
            </ReactFlow>
        </div>
    );
};

export default ReactFlowInit;