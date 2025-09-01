import React, { useState, useEffect } from "react";
import { useAppStore } from "../store/useAppStore";
import MessageBubble from "./MessageBubble";
import { Send } from "lucide-react";

interface ChatProps {
  initialPrompt?: string;
}

export default function Chat({ initialPrompt }: ChatProps) {
  const { messages, addMessage, setPipelineFromPrompt, updateNodeStatus, updateNodeConfig, nodes } = useAppStore();
  const [input, setInput] = useState("");
  const [sentInitial, setSentInitial] = useState(false);
  const [step, setStep] = useState<null | "pipeline" | "shopifyUrl" | "fields" | "done">(null);
  const [pendingNode, setPendingNode] = useState<string | null>(null);

  useEffect(() => {
    if (initialPrompt && !sentInitial) {
      setInput(initialPrompt);
      setSentInitial(true);
      setTimeout(() => {
        sendMessage();
      }, 100);
    }
    // eslint-disable-next-line
  }, [initialPrompt, sentInitial]);

  function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { id: Date.now().toString(), author: "user" as const, text: input };
    addMessage(userMsg);

    const lower = input.toLowerCase();
    if (step === null && lower.includes("connect") && (lower.includes("to") || lower.includes("->"))) {
      setPipelineFromPrompt(input);
      setStep("shopifyUrl");
      setPendingNode("n1");
      addMessage({
        id: (Date.now()+1).toString(),
        author: "ai",
        text: "What's your Shopify store URL?",
      });
    } else if (step === "shopifyUrl" && pendingNode) {
      updateNodeConfig(pendingNode, { url: input });
      updateNodeStatus(pendingNode, "partial"); // Shopify node now partial
      setStep("fields");
      addMessage({
        id: (Date.now()+2).toString(),
        author: "ai",
        text: "Which data fields would you like to extract (e.g. Orders, Customers, Products)?",
      });
    } else if (step === "fields" && pendingNode) {
      updateNodeConfig(pendingNode, { fields: input });
      updateNodeStatus(pendingNode, "complete"); // Shopify node now complete
      updateNodeStatus("n2", "partial"); // Transform node now partial
      updateNodeStatus("n3", "pending"); // Destination node stays pending
      setStep("done");
      setPendingNode(null);
      addMessage({
        id: (Date.now()+3).toString(),
        author: "ai",
        text: "Thanks! Your pipeline is being configured."
      });
    } else {
      addMessage({
        id: (Date.now()+4).toString(),
        author: "ai",
        text: "I didn't understand that. Try 'Connect Shopify orders to Snowflake'.",
      });
    }

    setInput("");
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 flex flex-col">
        {messages.map((m: any) => (
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