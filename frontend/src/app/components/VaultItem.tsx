"use client";

import { useState } from "react";
import { decryptData, encryptData } from "../utils/crypto";
import { copyToClipboard } from "../utils/clipboard";
import toast, { Toaster } from "react-hot-toast";

const BASE_URL = "http://localhost:4000/api";
const SECRET_KEY = "my-secret-key"; // same key as used in crypto.ts

interface VaultItemProps {
  item: any;
  onUpdate?: () => void;
}

export default function VaultItem({ item, onUpdate }: VaultItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    title: item.title,
    username: item.username,
    password: decryptData(item.password, SECRET_KEY),
    url: item.url || "",
    notes: item.notes ? decryptData(item.notes, SECRET_KEY) : "",
  });

  const handleCopy = () => {
    copyToClipboard(decryptData(item.password, SECRET_KEY));
    toast.success("Password copied! (clears in 15s)");
    setTimeout(() => navigator.clipboard.writeText(""), 15000);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    const res = await fetch(`${BASE_URL}/vault/${item._id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Item deleted!");
      if (onUpdate) onUpdate();
    } else toast.error("Failed to delete item");
  };

  const handleEdit = async (e: any) => {
    e.preventDefault();

    const encryptedPassword = encryptData(formData.password, SECRET_KEY);
    const encryptedNotes = encryptData(formData.notes, SECRET_KEY);

    const res = await fetch(`${BASE_URL}/vault/${item._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        password: encryptedPassword,
        notes: encryptedNotes,
      }),
    });

    if (res.ok) {
      toast.success("Item updated!");
      setIsEditing(false);
      if (onUpdate) onUpdate();
    } else toast.error("Failed to update item");
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="p-4 bg-gray-800 text-white rounded-lg flex justify-between items-center shadow-md hover:shadow-lg transition">
        <div>
          <p className="font-semibold">{item.title}</p>
          <p className="text-sm text-gray-300">{item.username}</p>
        </div>
        <div className="space-x-2">
          <button onClick={handleCopy} className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">
            Copy
          </button>
          <button onClick={() => setIsEditing(true)} className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600">
            Edit
          </button>
          <button onClick={handleDelete} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-gray-900 p-6 rounded-lg w-80">
            <h2 className="text-lg font-semibold mb-4 text-center">Edit Vault Item</h2>
            <form onSubmit={handleEdit} className="space-y-3">
              <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Title" className="w-full p-2 rounded bg-gray-800 border border-gray-600" />
              <input type="text" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} placeholder="Username" className="w-full p-2 rounded bg-gray-800 border border-gray-600" />
              <input type="text" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="Password" className="w-full p-2 rounded bg-gray-800 border border-gray-600" />
              <input type="text" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} placeholder="URL" className="w-full p-2 rounded bg-gray-800 border border-gray-600" />
              <input type="text" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder="Notes" className="w-full p-2 rounded bg-gray-800 border border-gray-600" />

              <div className="flex justify-between mt-3">
                <button type="submit" className="bg-green-500 px-3 py-1 rounded hover:bg-green-600">
                  Save
                </button>
                <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-600 px-3 py-1 rounded hover:bg-gray-700">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
