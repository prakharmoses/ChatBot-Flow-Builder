import { useState, useCallback, useEffect } from "react";
import {
    ReactFlowProvider,
    ReactFlow,
    applyEdgeChanges,
    applyNodeChanges,
    addEdge,
    Controls,
    Background,
    MiniMap,
    onNodesChange,
    onEdgesChange,
    useNodesState,
    useEdgesState,
    MarkerType
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { nanoid } from "nanoid";
import NodesPanel from "./NodesPanel";
import SettingsPanel from "./SettingsPanel";
import { nodePalette, nodeTypes, nodeDefaultData } from "./nodes/nodeRegistry";

/**
 * FlowCanvas.jsx
 * 
 * This component renders the main flow canvas using @xyflow/react (React Flow).
 * It provides drag-and-drop node creation, edge connection, node selection, and node/edge deletion.
 * 
 * Key Features:
 * - Uses ReactFlowProvider to manage flow state.
 * - Supports dynamic node creation via drag-and-drop from a palette.
 * - Restricts each node to a single outgoing edge.
 * - Allows node and edge selection, with settings panel for selected node.
 * - Handles node/edge deletion via keyboard shortcuts and UI.
 * - Synchronizes flow data with parent via setFlowData.
 * 
 * Dependencies:
 * - @xyflow/react for flow rendering and state management.
 * - nanoid for unique node IDs.
 * - Custom node types and palette from nodeRegistry.
 * - NodesPanel and SettingsPanel for UI.
 */

const FlowCanvas = ({ setFlowData }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [selectedNode, setSelectedNode] = useState(null);

    const onNodeDataChange = useCallback((nodeId, newData) => {
        setNodes((nds) => {
            const updatedNodes = nds.map((node) =>
                node.id === nodeId ? { ...node, data: { ...newData }, } : node
            );

            const updatedNode = updatedNodes.find((n) => n.id === nodeId);

            setSelectedNode((prev) => {
                if (prev?.id === nodeId) {
                    return updatedNode;
                }
                return prev;
            });

            return updatedNodes;
        });
    }, [setNodes, selectedNode]);

    const onConnect = useCallback((connection) => {
        const sourceEdges = edges.filter((e) => e.source === connection.source);
        if (sourceEdges.length === 0) {
            setEdges((eds) => addEdge({ ...connection, markerEnd: { type: MarkerType.ArrowClosed, color: "#555" }, style: { strokeWidth: 2, stroke: "#555" } }, eds));
        } else {
            alert('Only one edge allowed from source');
        }
    }, [edges, setEdges]);

    const onDrop = useCallback((e) => {
        e.preventDefault();
        const type = e.dataTransfer.getData("application/reactflow");
        const position = {
            x: e.clientX - 250,
            y: e.clientY - 40,
        };

        // Getting label from NodePallette
        const paletteItem = nodePalette.find((node) => node.type === type);
        const label = paletteItem?.label || "New Node";
        const id = nanoid();

        const defaults = nodeDefaultData[type](id) || {};
        const newNode = {
            id,
            type,
            position,
            data: { label, ...defaults, onChange: onNodeDataChange, },
        };

        setNodes((nds) => nds.concat(newNode));
    }, [onNodeDataChange, setNodes]);

    const onDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const onNodeClick = useCallback((_, node) => {
        setSelectedNode(node);
    }, []);

    const onPaneClick = () => {
        setSelectedNode(null);
    }

    const deleteSelectedNode = () => {
        if (selectedNode) {
            setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
            setSelectedNode(null);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Delete" || e.key === "Backspace") {
                setNodes((nds) => nds.filter((n) => !n.selected));
                setEdges((eds) => eds.filter((e) => !e.selected));
            }
        }

        window.addEventListener("kkeydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        setFlowData({ nodes, edges });
    }, [nodes, edges]);

    return (
        <ReactFlowProvider>
            <div className="flex w-screen h-[calc(100vh-3.2rem)]">
                <div className="flex-1" onDrop={onDrop} onDragOver={onDragOver}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onNodeClick={onNodeClick}
                        onPaneClick={onPaneClick}
                        nodeTypes={nodeTypes}
                    >
                        <MiniMap />
                        <Controls />
                        <Background />
                    </ReactFlow>
                </div>
                {selectedNode ? <SettingsPanel node={selectedNode} onDelete={deleteSelectedNode} setSelectedNode={setSelectedNode} /> : <NodesPanel />}
            </div>
        </ReactFlowProvider>
    );
};

export default FlowCanvas;