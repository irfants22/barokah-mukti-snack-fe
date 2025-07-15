"use client";

import { useState } from "react";
import { Plus, X, Search } from "lucide-react";

export default function ProdukPage() {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [products, setProducts] = useState([
    {
      id: 1,
      nama: "Keripik Pisang Original",
      harga: 15000,
      stok: 50,
      kategori: "Makanan Ringan",
      kemasan: "Toples",
      berat: "250gram",
      deskripsi: "Keripik pisang renyah dengan rasa original",
    },
    {
      id: 2,
      nama: "Nastar Premium",
      harga: 45000,
      stok: 25,
      kategori: "Kue Kering",
      kemasan: "Toples",
      berat: "500gram",
      deskripsi: "Nastar dengan selai nanas pilihan",
    },
    {
      id: 3,
      nama: "Kacang Telur Pedas",
      harga: 12000,
      stok: 75,
      kategori: "Makanan Ringan",
      kemasan: "Bal",
      berat: "250gram",
      deskripsi: "Kacang telur dengan bumbu pedas",
    },
    {
      id: 4,
      nama: "Kastengel Keju",
      harga: 55000,
      stok: 30,
      kategori: "Kue Kering",
      kemasan: "Toples",
      berat: "500gram",
      deskripsi: "Kastengel dengan taburan keju melimpah",
    },
    {
      id: 5,
      nama: "Keripik Singkong Balado",
      harga: 18000,
      stok: 40,
      kategori: "Makanan Ringan",
      kemasan: "Bal",
      berat: "250gram",
      deskripsi: "Keripik singkong dengan bumbu balado",
    },
    {
      id: 6,
      nama: "Putri Salju",
      harga: 40000,
      stok: 20,
      kategori: "Kue Kering",
      kemasan: "Toples",
      berat: "500gram",
      deskripsi: "Kue putri salju yang lembut dan manis",
    },
    {
      id: 7,
      nama: "Emping Melinjo",
      harga: 25000,
      stok: 35,
      kategori: "Makanan Ringan",
      kemasan: "Bal",
      berat: "500gram",
      deskripsi: "Emping melinjo gurih dan renyah",
    },
    {
      id: 8,
      nama: "Semprit Coklat",
      harga: 35000,
      stok: 45,
      kategori: "Kue Kering",
      kemasan: "Toples",
      berat: "500gram",
      deskripsi: "Kue semprit dengan rasa coklat",
    },
  ]);

  const [formData, setFormData] = useState({
    nama: "",
    harga: "",
    stok: "",
    kategori: "",
    kemasan: "",
    berat: "",
    deskripsi: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: products.length + 1,
      ...formData,
      harga: parseInt(formData.harga),
      stok: parseInt(formData.stok),
    };
    setProducts((prev) => [...prev, newProduct]);
    setFormData({
      nama: "",
      harga: "",
      stok: "",
      kategori: "",
      kemasan: "",
      berat: "",
      deskripsi: "",
    });
    setShowModal(false);
  };

  const filteredProducts = products.filter((product) =>
    product.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Kelola Produk</h1>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
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
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tambah baru
          </button>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-48">
                  Nama Produk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32">
                  Harga
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stok
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kemasan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Berat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-64">
                  Deskripsi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.slice(0, itemsPerPage).map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.nama}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatRupiah(product.harga)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.stok}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.kategori}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.kemasan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.berat}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div
                      className="max-w-xs truncate"
                      title={product.deskripsi}
                    >
                      {product.deskripsi}
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
          Menampilkan {Math.min(itemsPerPage, filteredProducts.length)} dari{" "}
          {filteredProducts.length} produk
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Tambah Produk</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori
                  </label>
                  <select
                    name="kategori"
                    value={formData.kategori}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Pilih Kategori</option>
                    <option value="Makanan Ringan">Makanan Ringan</option>
                    <option value="Kue Kering">Kue Kering</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Harga
                  </label>
                  <input
                    type="number"
                    name="harga"
                    value={formData.harga}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kemasan
                  </label>
                  <select
                    name="kemasan"
                    value={formData.kemasan}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Pilih Kemasan</option>
                    <option value="Toples">Toples</option>
                    <option value="Bal">Bal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stok
                  </label>
                  <input
                    type="number"
                    name="stok"
                    value={formData.stok}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Berat
                  </label>
                  <select
                    name="berat"
                    value={formData.berat}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Pilih Berat</option>
                    <option value="250gram">250gram</option>
                    <option value="500gram">500gram</option>
                    <option value="1kg">1kg</option>
                    <option value="2kg">2kg</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deskripsi
                </label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Tambah
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
