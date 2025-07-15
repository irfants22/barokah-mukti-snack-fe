"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { axiosInstance } from "@/lib/axios";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    try {
      const { data } = await axiosInstance.post(
        "/api/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = data?.data?.token;
      if (!token) {
        throw new Error("Token tidak ditemukan dalam respons");
      }

      // Simpan token ke localStorage
      localStorage.setItem("token", token);

      // Redirect ke halaman utama
      router.push("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response);

        const message = err.response?.data?.errors || "Login gagal";
        setError(message);
      } else {
        setError("Terjadi kesalahan saat login");
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Judul Form */}
        <div className="text-left mb-8">
          <h2 className="text-base font-bold text-white bg-blue-400 rounded-lg py-3 px-6">
            Masuk
          </h2>
        </div>

        {/* Form Login */}
        <div className="space-y-6">
          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@mail.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-colors pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Tombol Login */}
          <button
            onClick={handleSubmit}
            className="w-full bg-white hover:bg-blue-400 text-blue-400 hover:text-white ring-1 ring-blue-400 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Masuk
          </button>
        </div>

        {/* Link Register */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Belum punya akun?{" "}
            <Link
              href="/auth/register"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Daftar disini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
