"use client";

import { useState } from "react";
import { Search, Eye, Edit, Trash2 } from "lucide-react";

export default function PesananPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [orders, setOrders] = useState([
    {
      id: 1,
      tanggal: "2025-07-15",
      penerima: "Siti Nurhaliza",
      total: 75000,
      status: "Selesai",
      alamat: "Jl. Merdeka No. 123, Jakarta Pusat",
      produk: [
        { nama: "Keripik Pisang Original", jumlah: 2, harga: 15000 },
        { nama: "Nastar Premium", jumlah: 1, harga: 45000 },
      ],
    },
    {
      id: 2,
      tanggal: "2025-07-16",
      penerima: "Ahmad Rizky",
      total: 67000,
      status: "Diproses",
      alamat: "Jl. Sudirman No. 456, Jakarta Selatan",
      produk: [
        { nama: "Kacang Telur Pedas", jumlah: 3, harga: 12000 },
        { nama: "Kastengel Keju", jumlah: 1, harga: 55000 },
      ],
    },
    {
      id: 3,
      tanggal: "2025-07-17",
      penerima: "Maria Dewi",
      total: 93000,
      status: "Pending",
      alamat: "Jl. Thamrin No. 789, Jakarta Pusat",
      produk: [
        { nama: "Keripik Singkong Balado", jumlah: 2, harga: 18000 },
        { nama: "Putri Salju", jumlah: 1, harga: 40000 },
        { nama: "Semprit Coklat", jumlah: 1, harga: 35000 },
      ],
    },
    {
      id: 4,
      tanggal: "2025-07-18",
      penerima: "Budi Santoso",
      total: 50000,
      status: "Pending",
      alamat: "Jl. Gatot Subroto No. 321, Jakarta Barat",
      produk: [{ nama: "Emping Melinjo", jumlah: 2, harga: 25000 }],
    },
    {
      id: 5,
      tanggal: "2025-07-19",
      penerima: "Indah Permata",
      total: 105000,
      status: "Pending",
      alamat: "Jl. Kemang Raya No. 654, Jakarta Selatan",
      produk: [
        { nama: "Nastar Premium", jumlah: 1, harga: 45000 },
        { nama: "Kastengel Keju", jumlah: 1, harga: 55000 },
      ],
    },
    {
      id: 6,
      tanggal: "2025-07-20",
      penerima: "Rudi Hermawan",
      total: 42000,
      status: "Pending",
      alamat: "Jl. Mangga Besar No. 987, Jakarta Barat",
      produk: [
        { nama: "Keripik Pisang Original", jumlah: 1, harga: 15000 },
        { nama: "Keripik Singkong Balado", jumlah: 1, harga: 18000 },
      ],
    },
  ]);

  const filteredOrders = orders.filter(
    (order) =>
      order.penerima.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm)
  );

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Selesai":
        return "bg-green-100 text-green-800";
      case "Diproses":
        return "bg-yellow-100 text-yellow-800";
      case "Dikirim":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Kelola Pesanan</h1>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Menampilkan :</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-96">
          <table className="w-full min-w-max">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32">
                  Tanggal Dipesan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-40">
                  Penerima
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32">
                  Total Pesanan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-64">
                  Alamat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.slice(0, itemsPerPage).map((order, index) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(order.tanggal)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.penerima}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatRupiah(order.total)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="max-w-xs truncate" title={order.alamat}>
                      {order.alamat}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-800"
                        title="Edit Status"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Menampilkan {Math.min(itemsPerPage, filteredOrders.length)} dari{" "}
          {filteredOrders.length} pesanan
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
            &lt;
          </button>
          <button className="px-3 py-1 text-sm bg-white border border-gray-500 text-black rounded">
            1
          </button>
          <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
