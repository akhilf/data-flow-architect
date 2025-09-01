import { create } from "zustand";

export type Message = {
  id: string;
  author: "user" | "ai";
  text: string;
};

export type Node = {
  id: string;
  type: "source" | "transform" | "destination";
  label: string;
  status: "pending" | "partial" | "complete" | "error";
  config?: Record<string, any>;
};

type AppState = {
  messages: Message[];
  nodes: Node[];
  addMessage: (msg: Message) => void;
  setPipelineFromPrompt: (prompt: string) => void;
  updateNodeStatus: (id: string, status: Node["status"]) => void;
  updateNodeConfig: (id: string, config: Record<string, any>) => void;
};

export const useAppStore = create<AppState>((set, get) => ({
  messages: [],
  nodes: [],
  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),
  setPipelineFromPrompt: (prompt: string) => {
    const lower = prompt.toLowerCase();
    if (lower.includes("shopify") && lower.includes("snowflake")) {
      set({
        nodes: [
          { id: "n1", type: "source", label: "Shopify", status: "pending", config: {} },
          { id: "n2", type: "transform", label: "Transform", status: "pending", config: {} },
          { id: "n3", type: "destination", label: "Snowflake", status: "pending", config: {} },
        ],
      });
      return;
    }
    if (lower.includes("shopify") && lower.includes("bigquery")) {
      set({
        nodes: [
          { id: "n1", type: "source", label: "Shopify", status: "pending", config: {} },
          { id: "n2", type: "transform", label: "Transform", status: "pending", config: {} },
          { id: "n3", type: "destination", label: "BigQuery", status: "pending", config: {} },
        ],
      });
      return;
    }
    if (lower.includes("salesforce") && lower.includes("mailchimp")) {
      set({
        nodes: [
          { id: "n1", type: "source", label: "Salesforce", status: "pending", config: {} },
          { id: "n2", type: "transform", label: "Transform", status: "pending", config: {} },
          { id: "n3", type: "destination", label: "Mailchimp", status: "pending", config: {} },
        ],
      });
      return;
    }
    if (lower.includes("stripe") && lower.includes("google sheets")) {
      set({
        nodes: [
          { id: "n1", type: "source", label: "Stripe", status: "pending", config: {} },
          { id: "n2", type: "transform", label: "Transform", status: "pending", config: {} },
          { id: "n3", type: "destination", label: "Google Sheets", status: "pending", config: {} },
        ],
      });
      return;
    }
    // fallback: empty
    set({ nodes: [] });
  },
  updateNodeStatus: (id, status) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, status } : node
      ),
    }));
  },
  updateNodeConfig: (id, config) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, config: { ...node.config, ...config } } : node
      ),
    }));
  },
}));
