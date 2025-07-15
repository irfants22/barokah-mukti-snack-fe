"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import {
  calculateTotalPrice,
  formatRupiah,
  formatWeight,
} from "@/utils/helper";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [process, setProcess] = useState(false);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("Anda harus login terlebih dahulu.");
        setLoading(false);
        return;
      }

      const { data } = await axiosInstance.get("/api/carts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(data.data);
    } catch (error) {
      console.error("Gagal memuat keranjang belanja:", error);
      console.log("Terjadi kesalahan saat mengambil data keranjang.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [cartItems]);

  const updateQuantity = async (cartId, newQuantity) => {
    try {
      setProcess(true);
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Anda harus login terlebih dahulu.");
        setProcess(false);
        return;
      }
      await axiosInstance.put(
        `/api/carts/${cartId}`,
        { quantity: newQuantity },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Gagal update kuantitas:", error);
    } finally {
      setProcess(false);
    }
  };

  // Fungsi untuk menghapus item
  const removeItem = async (cartId) => {
    try {
      setProcess(true);
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Anda harus login terlebih dahulu.");
        setProcess(false);
        return;
      }
      const { data } = await axiosInstance.delete(`/api/carts/${cartId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
    } catch (error) {
      console.error("Gagal menghapus item:", error);
    } finally {
      setProcess(false);
    }
  };

  // Menghitung total
  const calculateTotal = (data) => {
    return data.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Keranjang Belanja
          </h1>
          <p className="text-gray-600">Kelola produk dalam keranjang Anda</p>
        </div>

        {/* Cart Items */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-32">
          {/* Table Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            {/* Table Menu */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-5">
                <h3 className="font-semibold text-gray-800">Produk</h3>
              </div>
              <div className="col-span-2 text-center">
                <h3 className="font-semibold text-gray-800">Harga Satuan</h3>
              </div>
              <div className="col-span-2 text-center">
                <h3 className="font-semibold text-gray-800">Kuantitas</h3>
              </div>
              <div className="col-span-2 text-center">
                <h3 className="font-semibold text-gray-800">Total Harga</h3>
              </div>
              <div className="col-span-1 text-center">
                <h3 className="font-semibold text-gray-800">Aksi</h3>
              </div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div key={item.id} className="px-6 py-4">
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Product Info */}
                  <div className="col-span-5">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <img
                          alt="Gambar Produk"
                          src={item.product?.image}
                          className="w-full hfull bg-cover"
                        ></img>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 capitalize">
                          {item.product?.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {formatWeight(item.product?.weight)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-center">
                    <span className="text-gray-800">
                      {formatRupiah(item.price)}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="col-span-2 flex items-center justify-center">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-2 hover:bg-gray-100 rounded-l-lg"
                        disabled={item.quantity === 1 || process}
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="px-4 py-2 bg-white text-center min-w-[60px]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-2 hover:bg-gray-100 rounded-r-lg"
                        disabled={
                          item.quantity === item.product?.stock || process
                        }
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="col-span-2 text-center">
                    <span className="font-semibold text-gray-800">
                      {formatRupiah(item.price * item.quantity)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 text-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {cartItems.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-gray-300 rounded"></div>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Keranjang Anda Kosong
              </h3>
              <p className="text-gray-600 mb-4">
                Belum ada produk yang ditambahkan ke keranjang
              </p>
              <button className="bg-blue-400 text-white px-6 py-2 rounded-lg hover:bg-blue-500">
                Mulai Belanja
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Total & Checkout */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Keranjang Belanja
                </h3>
                <div className="h-6 w-px bg-gray-300"></div>
                <span className="text-lg font-bold text-gray-800">
                  Total ({cartItems.length} produk):{" "}
                  {formatRupiah(calculateTotalPrice(cartItems))}
                </span>
              </div>
              <button className="bg-blue-400 text-white px-8 py-3 rounded-lg hover:bg-blue-500 font-medium">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
