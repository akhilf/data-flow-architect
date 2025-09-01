import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded-full"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") setDark(!dark);
      }}
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
