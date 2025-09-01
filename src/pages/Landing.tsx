import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { useAppStore } from "../store/useAppStore";

const examplePrompts = [
  "Connect Shopify to BigQuery",
  "Sync Salesforce contacts to Mailchimp",
  "Stream Stripe payments to Google Sheets",
];


interface LandingPageProps {
  onStart?: (desc: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const { theme } = useAppStore();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (inputValue.trim() === "") return;
    if (onStart) onStart(inputValue);
    setInputValue("");
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-4 gap-8 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
      role="main"
      aria-label="Landing page"
    >
      {/* Hero Section */}
      <div className="text-center max-w-2xl" role="region" aria-label="Hero section">
        <h1 className="text-5xl font-bold mb-4">Nexla Data Flow Architect</h1>
        <p className="text-xl">Describe your data pipeline in plain English</p>
      </div>

      {/* Input Field */}
      <div className="flex flex-col md:flex-row w-full max-w-2xl gap-2">
        <input
          type="text"
          placeholder="Type your data pipeline here..."
          className="flex-1 border rounded p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Start
        </button>
      </div>

      {/* Example Prompts */}
      <div className="flex flex-wrap justify-center gap-4">
        {examplePrompts.map((prompt) => (
          <button
            key={prompt}
            className="px-4 py-2 bg-blue-200 hover:bg-blue-300 rounded transition"
            onClick={() => onStart && onStart(prompt)}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Theme Toggle */}
      <ThemeToggle />
    </div>
  );
};

export default LandingPage;
