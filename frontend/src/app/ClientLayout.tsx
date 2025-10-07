"use client";
import { useEffect, useState } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") setDarkMode(false);
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen transition-colors duration-300`}
    >
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-700">
        <button
          onClick={toggleTheme}
          className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
      {children}
    </div>
  );
}
