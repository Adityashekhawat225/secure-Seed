"use client";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
      <Link href="/" className="font-bold text-lg text-blue-400">
        SecureSeed
      </Link>
      <div className="space-x-4">
        <Link href="/" className="hover:text-blue-300">
          Home
        </Link>
        {user ? (
          <>
            <Link href="/dashboard" className="hover:text-blue-300">
              Vault
            </Link>
            <button onClick={logout} className="hover:text-red-400">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-blue-300">
              Login
            </Link>
            <Link href="/register" className="hover:text-blue-300">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
