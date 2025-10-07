"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { generatePassword } from "../utils/passwordGenerator";

interface PasswordGeneratorProps {
  onGenerate: (password: string) => void;
}

export default function PasswordGenerator({ onGenerate }: PasswordGeneratorProps) {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  // Generate new password
  const handleGenerate = () => {
    const pwd = generatePassword(length, {
      numbers: includeNumbers,
      symbols: includeSymbols,
      lowercase: includeLowercase,
      uppercase: includeUppercase,
    });
    setPassword(pwd);
    onGenerate(pwd); // send to parent
  };

  // Safe copy to clipboard
  const handleCopy = () => {
    if (!password) return; // nothing to copy
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Password copied to clipboard!");
    } else {
      toast.error("Clipboard API not supported in this browser");
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-md mb-6">
      <h2 className="text-xl font-semibold mb-2">Password Generator</h2>

      {/* Options */}
      <div className="flex flex-wrap gap-2 mb-2">
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />{" "}
          Numbers
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />{" "}
          Symbols
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />{" "}
          Lowercase
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />{" "}
          Uppercase
        </label>
      </div>

      {/* Length */}
      <div className="mb-2">
        <label className="mr-2">Length:</label>
        <input
          type="number"
          min={4}
          max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="text-black px-2 rounded w-16"
        />
      </div>

      {/* Generated Password */}
      <div className="mb-2 flex items-center gap-2">
        <input
          type="text"
          readOnly
          value={password}
          placeholder="Generated password"
          className="flex-1 bg-gray-700 text-white px-2 py-1 rounded"
        />
        <button
          onClick={handleCopy}
          className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
      >
        Generate Password
      </button>
    </div>
  );
}
