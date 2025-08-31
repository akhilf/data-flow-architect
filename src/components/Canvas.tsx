import { useAppStore } from "../store/useAppStore";

export default function Canvas() {
  const { nodes } = useAppStore();

  if (nodes.length === 0) {
    return <div className="p-4 text-gray-500">No pipeline yet. Try typing one in chat!</div>;
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="flex gap-4 items-center">
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`px-6 py-3 rounded-2xl shadow text-white ${
              node.type === "source" ? "bg-blue-500" : node.type === "transform" ? "bg-purple-500" : "bg-green-500"
            }`}
          >
            {node.label} - {node.status}
          </div>
        ))}
      </div>
    </div>
  );
}
