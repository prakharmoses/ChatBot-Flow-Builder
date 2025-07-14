import React, { useCallback, useState } from 'react';

// Importing components
import Navbar from './components/Navbar';
import ModelFlow from './components/FlowCanvas';

/**
 * App component for managing and saving a flow graph.
 *
 * - Maintains flow data state containing nodes and edges.
 * - Provides a saveFlow function to export the flow as a JSON file,
 *   ensuring all nodes are connected before saving.
 * - Checks graph connectivity using isGraphConnected, which treats edges as undirected
 *   to verify weak connectivity.
 * - Renders a Navbar with save functionality and a ModelFlow for editing the flow.
 *
 * @component
 */
const App = () => {
  const [flowData, setFlowData] = useState({ nodes: [], edges: [] });

  const saveFlow = useCallback(() => {
    if (!isGraphConnected()) {
      alert('Error: Some nodes are not connected to the flow.');
      return;
    }

    const blob = new Blob([JSON.stringify(flowData, null, 2)], { type: 'application/json' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my-flow.json';
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [flowData]);

  const isGraphConnected = useCallback(() => {
    const { nodes, edges } = flowData;
    if (nodes.length <= 1) return true;

    // Build undirected adjacency list
    const adjList = new Map();
    nodes.forEach(n => adjList.set(n.id, []));
    edges.forEach(e => {
      adjList.get(e.source)?.push(e.target);
      adjList.get(e.target)?.push(e.source); // <- IGNORE direction to check weak connectivity
    });

    const visited = new Set();
    const dfs = (nodeId) => {
      visited.add(nodeId);
      for (const neighbor of adjList.get(nodeId) || []) {
        if (!visited.has(neighbor)) dfs(neighbor);
      }
    };

    dfs(nodes[0]?.id);

    return visited.size === nodes.length;
  }, [flowData]);


  return (
    <>
      <div className="flex flex-col">
        <Navbar saveFlow={saveFlow} />
        <ModelFlow setFlowData={setFlowData} />
      </div>
    </>
  )
}

export default App;