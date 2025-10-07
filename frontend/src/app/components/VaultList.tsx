"use client";

import { useState } from "react"; // 
import VaultItem from "./VaultItem";

interface VaultItemType {
  _id: string;
  title: string;
  username: string;
  password: string;
  url?: string;
  notes?: string;
}

interface VaultListProps {
  vault: VaultItemType[];
  onUpdate?: () => void;
}

export default function VaultList({ vault, onUpdate }: VaultListProps) {
  const [search, setSearch] = useState(""); //

  const filteredVault = vault.filter((item) => {
    const q = search.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.username.toLowerCase().includes(q) ||
      (item.url?.toLowerCase().includes(q) ?? false)
    );
  });

  return (
    <div className="mt-4 space-y-4">
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search by title, username, or URL..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredVault.length === 0 ? (
        <p className="text-gray-400 text-center mt-2">
          {search ? "No items found." : "No vault items saved yet."}
        </p>
      ) : (
        <div className="space-y-3">
          {filteredVault.map((item) => (
            <VaultItem key={item._id} item={item} onUpdate={onUpdate} />
          ))}
        </div>
      )}
    </div>
  );
}
