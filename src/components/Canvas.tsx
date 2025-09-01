
import React, { useState } from "react";
import { useAppStore } from "../store/useAppStore";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

export default function Canvas() {
  const { nodes } = useAppStore();
  const [selected, setSelected] = useState<any>(null);

  if (!nodes || nodes.length === 0) {
    return <div className="p-4 text-gray-500">No pipeline yet. Try typing one in chat!</div>;
  }

  // Map nodes to React Flow format
  const flowNodes = nodes.map((node, idx) => ({
    id: node.id,
    type: "default",
    data: {
      label: (
        <div onClick={() => setSelected(node)} style={{ cursor: "pointer" }}>
          <div className="font-bold">{node.label}</div>
          <div className="text-xs mt-1">{node.type.charAt(0).toUpperCase() + node.type.slice(1)}</div>
          <div className="text-xs">Status: {node.status.charAt(0).toUpperCase() + node.status.slice(1)}</div>
        </div>
      ),
    },
    position: { x: 100 + idx * 220, y: 100 },
    style: {
      border: `2px solid ${node.type === "source" ? "#3b82f6" : node.type === "transform" ? "#a855f7" : "#22c55e"}`,
      background: node.type === "source" ? "#eff6ff" : node.type === "transform" ? "#f3e8ff" : "#f0fdf4",
      color: "#222",
      minWidth: 160,
      minHeight: 60,
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    },
  }));

  // Connect nodes in sequence
  const flowEdges = nodes.slice(1).map((node, idx) => ({
    id: `e${nodes[idx].id}-${node.id}`,
    source: nodes[idx].id,
    target: node.id,
    animated: true,
    label: "Data Flow",
    style: { stroke: "#888", strokeWidth: 2 },
  }));

  return (
    <div className="flex flex-row gap-6 p-6 h-full">
      {/* Flow Diagram */}
      <div className="flex flex-col gap-4 flex-1" style={{ minHeight: 400 }}>
        <ReactFlow
          nodes={flowNodes}
          edges={flowEdges}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      {/* Properties Panel */}
      <div className="w-64 bg-white dark:bg-gray-800 rounded-xl shadow p-4 h-fit">
        {selected ? (
          <>
            <div className="font-bold text-lg mb-2">{selected.label} Properties</div>
            <div className="mb-2"><span className="font-semibold">Type:</span> {selected.type}</div>
            <div className="mb-2"><span className="font-semibold">Status:</span> {selected.status}</div>
            <div className="mb-2 font-semibold">Configuration:</div>
            <pre className="bg-gray-100 dark:bg-gray-900 rounded p-2 text-xs whitespace-pre-wrap">{JSON.stringify(selected.config, null, 2)}</pre>
          </>
        ) : (
          <div className="text-gray-500">Select a node to view properties</div>
        )}
      </div>
    </div>
  );
}
