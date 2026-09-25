import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ className = "" }) {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("evrst-theme") || "dark";
    setDark(stored === "dark");
    if (stored === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem("evrst-theme", next ? "dark" : "light");
    if (next) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`relative h-9 w-16 rounded-full border border-border bg-muted transition-colors ${className}`}
    >
      <span className={`absolute top-1 left-1 h-7 w-7 rounded-full bg-primary flex items-center justify-center transition-transform ${dark ? "translate-x-0" : "translate-x-7"}`}>
        {dark ? <Moon className="w-4 h-4 text-primary-foreground" /> : <Sun className="w-4 h-4 text-primary-foreground" />}
      </span>
    </button>
  );
}