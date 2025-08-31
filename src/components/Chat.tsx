import { useState } from "react";
import { useAppStore } from "../store/useAppStore";
import MessageBubble from "./MessageBubble";
import { Send } from "lucide-react";

export default function Chat() {
  const { messages, addMessage, setPipelineFromPrompt } = useAppStore();
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now().toString(), author: "user" as const, text: input };
    addMessage(userMsg);

    // simple mock AI behavior
    const lower = input.toLowerCase();
    if (lower.includes("connect") && (lower.includes("to") || lower.includes("->"))) {
      const aiMsg = {
        id: (Date.now()+1).toString(),
        author: "ai" as const,
        text: "Got it — building the pipeline. Can you provide specifics (e.g. store URL or fields)?",
      };
      addMessage(aiMsg);
      setPipelineFromPrompt(input);
    } else {
      const aiMsg = {
        id: (Date.now()+1).toString(),
        author: "ai" as const,
        text: "I didn't understand that. Try 'Connect Shopify to BigQuery'.",
      };
      addMessage(aiMsg);
    }

    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 flex flex-col">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
      </div>
      <div className="flex p-2 border-t">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 p-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white p-2 rounded-lg">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
