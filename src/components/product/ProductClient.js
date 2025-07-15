"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ProductClient() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [paginations, setPaginations] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchQuery = searchParams.get("query");
  const selectedCategory = searchParams.get("category");
  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("sortOrder");
  const [sortingValue, setSortingValue] = useState("asc");
  const [page, setPage] = useState(1);

  const categories = [
    { id: "1", name: "Semua Kategori", value: "ALL" },
    { id: "2", name: "Makanan Ringan", value: "MAKANAN_RINGAN" },
    { id: "3", name: "Kue Kering", value: "KUE_KERING" },
  ];

  const sortOptions = [
    { id: "1", value: "asc", label: "Nama A-Z" },
    { id: "2", value: "desc", label: "Nama Z-A" },
    { id: "3", value: "price-low", label: "Harga Terendah" },
    { id: "4", value: "price-high", label: "Harga Tertinggi" },
  ];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/products", {
        params: {
          query: searchQuery || null,
          category: selectedCategory || null,
          sortBy: sortOrder || "name",
          sortOrder: sortOrder || "asc",
        },
      });

      setProducts(response.data.data);
      setPaginations(response.data.pagination);
    } catch (error) {
      console.error("Gagal memuat produk:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCategory = (category) => {
    const params = new URLSearchParams(searchParams);
    if (category) params.set("category", category);
    if (category === "ALL") params.delete("category");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleSortOption = () => {
    const params = new URLSearchParams(searchParams);
    if (sortingValue === "desc") {
      params.set("sortOrder", sortingValue);
      params.set("sortBy", "name");
    } else if (sortingValue === "price-low") {
      params.set("sortOrder", "asc");
      params.set("sortBy", "price");
    } else if (sortingValue === "price-high") {
      params.set("sortOrder", "desc");
      params.set("sortBy", "price");
    } else {
      params.delete("sortOrder");
      params.delete("sortBy");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    handleSortOption();
  }, [sortingValue]);

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, selectedCategory, sortBy, sortOrder]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Kategori
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleSelectCategory(category.value)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? "bg-blue-50 text-blue-400 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
              Produk
            </h1>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortingValue}
                onChange={(e) => setSortingValue(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-20 text-gray-500">
              Memuat produk...
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              Produk tidak ditemukan
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Product Image */}
                  <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden rounded-md">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/fallback-image.png"; // fallback jika gambar gagal dimuat
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-1">
                      {product.category
                        .toLowerCase()
                        .split("_")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </p>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 capitalize">
                      {product.name}
                    </h3>
                    <p className="font-bold text-gray-900 mb-3">
                      Rp{product.price.toLocaleString("id-ID")}
                    </p>

                    {/* Order Button */}
                    <Link href={`/products/${product.id}`}>
                      <button className="w-full bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        Pesan Sekarang
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={page === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex space-x-1">
              <button className="px-3 py-2 rounded-lg bg-blue-400 text-white font-medium">
                {page}
              </button>
            </div>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={page === paginations.total_page}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
