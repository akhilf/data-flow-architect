

import { useState } from "react";
import { useAppStore } from "../store/useAppStore";

type NodeType = "source" | "transform" | "destination";
type NodeStatus = "pending" | "partial" | "complete" | "error";
interface Node {
  id: string;
  label: string;
  type: NodeType;
  status: NodeStatus;
  config?: Record<string, any>;
}

const demoNodes: Node[] = [
  {
    id: "1",
    label: "Shopify",
    type: "source",
    status: "pending",
    config: { endpoint: "api.shopify.com", auth: "OAuth" },
  },
  {
    id: "2",
    label: "Transform Orders",
    type: "transform",
    status: "partial",
    config: { script: "filter orders > $100" },
  },
  {
    id: "3",
    label: "BigQuery",
    type: "destination",
    status: "complete",
    config: { dataset: "orders", project: "my-gcp-project" },
  },
];

const statusColors: Record<NodeStatus, string> = {
  pending: "bg-orange-400",
  partial: "bg-blue-400",
  complete: "bg-green-500",
  error: "bg-red-500",
};

const typeColors: Record<NodeType, string> = {
  source: "bg-blue-500",
  transform: "bg-purple-500",
  destination: "bg-green-500",
};

export default function Canvas() {
  // Use nodes from Zustand store
  const { nodes } = useAppStore();
  const [selected, setSelected] = useState<Node | null>(null);

  if (!nodes || nodes.length === 0) {
    return <div className="p-4 text-gray-500">No pipeline yet. Try typing one in chat!</div>;
  }

  return (
    <div className="flex flex-row gap-6 p-6 h-full">
      {/* Flow Diagram */}
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex gap-6 items-center">
          {nodes.map((node) => (
            <div
              key={node.id}
              className={`relative px-6 py-4 rounded-2xl shadow text-white cursor-pointer ${typeColors[node.type]}`}
              onClick={() => setSelected(node)}
            >
              <span className="font-bold">{node.label}</span>
              <span className={`absolute -top-2 -right-2 w-4 h-4 rounded-full border-2 border-white ${statusColors[node.status]}`}></span>
              <div className="text-xs mt-1">{node.type.charAt(0).toUpperCase() + node.type.slice(1)}</div>
              <div className="text-xs">Status: {node.status.charAt(0).toUpperCase() + node.status.slice(1)}</div>
            </div>
          ))}
        </div>
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
