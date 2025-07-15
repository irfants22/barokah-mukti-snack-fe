import { User } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-400 shadow-sm px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center">
            <img
              className="w-full h-full object-cover rounded-full"
              alt="logo"
              src="https://res.cloudinary.com/dtscrzs6m/image/upload/v1752108376/BMS_qwhbcc.jpg"
            ></img>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Barokah</h1>
            <p className="text-sm text-white">Mukti Snack</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/" className="text-white">
            Beranda
          </Link>
          <Link
            href="/auth/register"
            className="flex items-center space-x-2 text-white"
          >
            <User className="w-5 h-5" />
            <span>Daftar</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        {children}
      </main>
    </div>
  );
}
