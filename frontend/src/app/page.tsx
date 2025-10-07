"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Page() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-4">
      <h1 className="text-4xl font-bold mb-4 text-blue-400">SecureSeed</h1>
      <p className="text-gray-300 mb-6 text-center">
        Your privacy-first password generator & secure vault.
      </p>

      {!user && (
        <div className="space-x-4">
          <Link
            href="/login"
            className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-green-600 px-6 py-3 rounded hover:bg-green-700"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
