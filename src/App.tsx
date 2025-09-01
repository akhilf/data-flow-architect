import LandingPage from "./pages/Landing";
import Chat from "./components/Chat";
import Canvas from "./components/Canvas";
import { useState } from "react";

function App() {
  const [started, setStarted] = useState(false);
  const [prompt, setPrompt] = useState("");

  // Handler for starting pipeline from landing page
  const handleStart = (desc: string) => {
    setPrompt(desc);
    setStarted(true);
  };

  if (!started) {
    return <LandingPage onStart={handleStart} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-row" role="main" aria-label="Main application area">
      {/* Chat Panel */}
      <div className="w-full md:w-1/3 border-r border-gray-200 dark:border-gray-700 h-screen overflow-y-auto" role="region" aria-label="Chat panel">
        <Chat initialPrompt={prompt} />
      </div>
      {/* Canvas Panel */}
      <div className="hidden md:block w-2/3 h-screen overflow-y-auto" role="region" aria-label="Canvas panel">
        <Canvas />
      </div>
    </div>
  );
}

export default App;
