"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import VaultList from "../components/VaultList";
import PasswordGenerator from "../components/PasswordGenerator";
import toast, { Toaster } from "react-hot-toast";

const BASE_URL = "http://localhost:4000/api"; // backend base URL

export default function Dashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [vault, setVault] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: "",
    username: "",
    password: "",
    url: "",
    notes: "",
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  // Fetch Vault items
  const fetchVault = async () => {
    if (!user) return;
    try {
      const res = await fetch(`${BASE_URL}/vault/get`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setVault(data);
      } else {
        toast.error("Failed to fetch Vault");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while fetching Vault");
    }
  };

  useEffect(() => {
    if (user) fetchVault();
  }, [user]);

  // Handle password generation and add to Vault
  const handlePasswordGenerate = async (password: string) => {
    if (!user) return;
    try {
      // Validate required fields
      if (!form.title || !form.username) {
        toast.error("Title and username are required");
        return;
      }

      const res = await fetch(`${BASE_URL}/vault/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ ...form, password }),
      });

      if (res.ok) {
        toast.success("Password added to Vault!");
        setForm({ title: "", username: "", password: "", url: "", notes: "" });
        fetchVault(); // Refresh Vault list
      } else {
        const data = await res.json();
        toast.error(data?.message || "Failed to add password to Vault");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950 text-white">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <Toaster />
      <h1 className="text-3xl font-bold mb-6">Welcome to your Dashboard</h1>

      {/* 🔹 Input Form to Fill Title & Username */}
      <div className="mb-6 p-4 bg-gray-900 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2">Add Vault Entry</h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Enter Title (e.g. Gmail, Instagram)"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="p-2 rounded bg-gray-800 text-white focus:outline-none"
          />
          <input
            type="text"
            placeholder="Enter Username or Email"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="p-2 rounded bg-gray-800 text-white focus:outline-none"
          />
          <input
            type="text"
            placeholder="Optional URL"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            className="p-2 rounded bg-gray-800 text-white focus:outline-none"
          />
          <textarea
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="p-2 rounded bg-gray-800 text-white focus:outline-none"
          />
        </div>
      </div>

      {/* 🔹 Password Generator */}
      <PasswordGenerator onGenerate={handlePasswordGenerate} />

      {/* 🔹 Vault List */}
      <VaultList vault={vault} />

      {/* 🔹 Refresh Vault Button */}
      <button
        onClick={fetchVault}
        className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
      >
        Refresh Vault
      </button>
    </div>
  );
}
