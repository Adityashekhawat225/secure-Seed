"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { api } from "../utils/api";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.register(form);

      // ✅ Fix: backend returns { message, user } (not success)
      if (res && (res.token || res.user)) {
        if (res.token) {
          login({ email: form.email, token: res.token });
          router.push("/dashboard");
        } else {
          router.push("/login");
        }
      } else {
        alert(res?.message || "Registration failed");
      }
    } catch (err) {
      console.error("Register error:", err);
      alert("Something went wrong");
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
          SecureSeed Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
          required
        />

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
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-purple-600 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
