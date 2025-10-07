import "./styles/globals.css";
import ClientLayout from "./ClientLayout";
import Navbar from "./components/Navbar";
import { AuthProvider } from "../context/AuthContext";

export const metadata = {
  title: "SecureSeed",
  description: "Password Generator + Secure Vault",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <ClientLayout>
            <Navbar />
            <main className="p-4">{children}</main>
          </ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}