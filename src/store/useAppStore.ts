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
};

type AppState = {
  messages: Message[];
  nodes: Node[];
  addMessage: (msg: Message) => void;
  setPipelineFromPrompt: (prompt: string) => void;
};

export const useAppStore = create<AppState>((set) => ({
  messages: [],
  nodes: [],
  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),
  setPipelineFromPrompt: (prompt: string) => {
    const lower = prompt.toLowerCase();
    if (lower.includes("shopify") && lower.includes("bigquery")) {
      set({
        nodes: [
          { id: "n1", type: "source", label: "Shopify", status: "complete" },
          { id: "n2", type: "transform", label: "Transform", status: "pending" },
          { id: "n3", type: "destination", label: "BigQuery", status: "pending" },
        ],
      });
      return;
    }
    if (lower.includes("salesforce") && lower.includes("mailchimp")) {
      set({
        nodes: [
          { id: "n1", type: "source", label: "Salesforce", status: "complete" },
          { id: "n2", type: "transform", label: "Transform", status: "pending" },
          { id: "n3", type: "destination", label: "Mailchimp", status: "pending" },
        ],
      });
      return;
    }
    if (lower.includes("stripe") && lower.includes("google sheets")) {
      set({
        nodes: [
          { id: "n1", type: "source", label: "Stripe", status: "complete" },
          { id: "n2", type: "transform", label: "Transform", status: "pending" },
          { id: "n3", type: "destination", label: "Google Sheets", status: "pending" },
        ],
      });
      return;
    }

    // fallback: empty
    set({ nodes: [] });
  },
}));
