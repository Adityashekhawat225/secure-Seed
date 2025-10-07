"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { api } from "../utils/api";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.login(form);

      // ✅ Fix: backend returns { message, token }
      if (res && res.token) {
        login({ email: form.email, token: res.token });
        router.push("/dashboard");
      } else {
        alert(res?.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
          SecureSeed Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-purple-600 hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}
