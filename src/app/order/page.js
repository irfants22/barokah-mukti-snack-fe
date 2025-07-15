"use client";

import { axiosInstance } from "@/lib/axios";
import {
  calculateTotalPrice,
  formatRupiah,
  formatWeight,
  getShippingCost,
} from "@/utils/helper";
import { useEffect, useState } from "react";

export default function OrderPage() {
  const [formData, setFormData] = useState({
    address: "",
    notes: "",
    city: "Bogor", // Default city
  });

  const [user, setUser] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [serviceFee, setServiceFee] = useState(2000);
  const [shippingCost, setShippingCost] = useState(0);
  const [payload, setPayload] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Anda harus login terlebih dahulu.");
        return;
      }
      const { data } = await axiosInstance.get("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data.data);
    } catch (error) {
      console.error("Gagal memuat data pengguna:", error);
      console.log("Terjadi kesalahan saat mengambil data pengguna.");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Anda harus login terlebih dahulu.");
        return;
      }
      const { data } = await axiosInstance.get("/api/carts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(data.data);
      console.log(data.data);
    } catch (error) {
      console.error("Gagal memuat keranjang belanja:", error);
      console.log("Terjadi kesalahan saat mengambil data keranjang.");
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const orderData = {
    product: {
      name: "Nama Produk",
      weight: "250gram",
      price: 25000,
      quantity: 1,
      image:
        "https://res.cloudinary.com/dtscrzs6m/image/upload/v1752109691/keripik-og_gaorgv.jpg", // Placeholder image
    },
    subtotal: 25000,
    shippingCost: 6000,
    serviceFee: 2000,
    total: 33000,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    if (name === "city") {
      setPayload((prev) => ({
        ...prev,
        other_costs: serviceFee + getShippingCost(value),
      }));
      setShippingCost(getShippingCost(value));
      return;
    }
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchCreateOrder = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Anda harus login terlebih dahulu.");
        setLoading(false);
        return;
      }
      const { address, notes, other_costs } = payload;
      if (
        !address ||
        !notes ||
        other_costs === undefined ||
        other_costs === null
      ) {
        alert("Mohon lengkapi semua data sebelum mengirim.");
        return;
      }
      const { data } = await axiosInstance.post("/api/orders", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("pesanan", data.data);
    } catch (error) {
      console.error("Gagal membuat pesanan:", error);
      console.log("Terjadi kesalahan saat membuat pesanan.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    // Logika untuk membuat pesanan
    console.log(payload);
    fetchCreateOrder();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Buat Pesanan</h1>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Informasi Penerima
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="block text-sm font-medium text-gray-700 mb-2 capitalize">
              {user.name}
            </p>
            <p className="text-sm text-gray-600">{user.phone}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Alamat
            </label>
            <textarea
              id="address"
              name="address"
              rows="3"
              value={payload.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              placeholder="Masukkan alamat lengkap"
            />
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Catatan
            </label>
            <textarea
              id="notes"
              name="notes"
              rows="3"
              value={payload.notes}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              placeholder="Catatan tambahan (opsional)"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Informasi Produk
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-500"></th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-500"></th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-500"></th>
                <th className="text-center py-3 px-2 text-sm font-medium text-gray-500">
                  Harga Satuan
                </th>
                <th className="text-center py-3 px-2 text-sm font-medium text-gray-500">
                  Kuantitas
                </th>
                <th className="text-right py-3 px-2 text-sm font-medium text-gray-500">
                  Subtotal Produk
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Cart Items */}
              {cartItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-4 px-2">
                    <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                      <img
                        src={item.product?.image}
                        className="w-full h-full bg-cover"
                      ></img>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <div className="font-medium text-gray-800 capitalize">
                      {item.product?.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatWeight(item.product?.weight)}
                    </div>
                  </td>
                  <td className="py-4 px-2"></td>
                  <td className="py-4 px-2 text-center">
                    {formatRupiah(item.price)}
                  </td>
                  <td className="py-4 px-2 text-center">{item.quantity}</td>
                  <td className="py-4 px-2 text-right font-medium">
                    {formatRupiah(item.price * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Pembayaran</h2>

        <div className="mb-6">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Kota Pengiriman
          </label>
          <select
            id="city"
            name="city"
            value={payload.city}
            onChange={handleInputChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="Jakarta">Jakarta</option>
            <option value="Bogor">Bogor</option>
            <option value="Depok">Depok</option>
            <option value="Tangerang">Tangerang</option>
            <option value="Bekasi">Bekasi</option>
            <option value="Diluar Jabodetabek">Diluar Jabodetabek</option>
          </select>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Subtotal Pesanan</span>
            <span className="font-medium">
              {formatRupiah(calculateTotalPrice(cartItems))}
            </span>
          </div>

          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Subtotal Pengiriman</span>
            <span className="font-medium">{formatRupiah(shippingCost)}</span>
          </div>

          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Biaya Pelayanan</span>
            <span className="font-medium">{formatRupiah(serviceFee)}</span>
          </div>

          <hr className="border-gray-300 my-4" />

          <div className="flex justify-between items-center py-2">
            <span className="text-lg font-semibold text-gray-800">
              Total Pembayaran
            </span>
            <span className="text-xl font-bold text-gray-800">
              {formatRupiah(
                calculateTotalPrice(cartItems) + shippingCost + serviceFee
              )}
            </span>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Buat Pesanan
          </button>
        </div>
      </div>
    </div>
  );
}
