"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { axiosInstance } from "@/lib/axios";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const products = [
    {
      id: 1,
      name: "Keripik Singkong Original",
      price: "25.000",
      category: "Makanan Ringan",
      image:
        "https://res.cloudinary.com/dtscrzs6m/image/upload/v1752109691/keripik-og_gaorgv.jpg",
    },
    {
      id: 2,
      name: "Kue Kering Putri Salju",
      price: "35.000",
      category: "Kue Kering",
      image:
        "https://res.cloudinary.com/dtscrzs6m/image/upload/v1752563153/putri_salju_ff6u4q.jpg",
    },
    {
      id: 3,
      name: "Kue Kering Nastar",
      price: "35.000",
      category: "Kue Kering",
      image:
        "https://res.cloudinary.com/dtscrzs6m/image/upload/v1752563152/kue_nastar_pvxbhg.jpg",
    },
    {
      id: 4,
      name: "Keripik Tempe Original",
      price: "25.000",
      category: "Makanan Ringan",
      image:
        "https://res.cloudinary.com/dtscrzs6m/image/upload/v1752563151/keripik_tempe_wamefc.jpg",
    },
  ];

  // const fetchProducts = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axiosInstance.get("/api/products", {
  //       params: {
  //         limit: 4,
  //       },
  //     });

  //     setProducts(response.data.data);
  //     setPaginations(response.data.pagination);
  //   } catch (error) {
  //     console.error("Gagal memuat produk:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section with Carousel */}
      <section className="my-8">
        <div className="relative bg-gray-300 rounded-lg h-96 overflow-hidden">
          {/* Hero Image */}
          <img
            src="https://res.cloudinary.com/dtscrzs6m/image/upload/v1752554744/hero-images_abvpsm.png"
            alt="Barokah Mukti Snack - Makanan Ringan Berkualitas"
            className="w-full h-full object-cover"
          />

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-4 drop-shadow-lg">
                Selamat Datang di Barokah Mukti Snack
              </h2>
              <p className="text-xl drop-shadow-md">
                Temukan berbagai makanan ringan berkualitas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="my-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Produk</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </p>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 capitalize">
                  {product.name}
                </h3>
                <p className="font-bold text-gray-900 mb-3">
                  Rp{product.price.toLocaleString("id-ID")}
                </p>

                {/* Order Button */}
                <button className="w-full bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Pesan Sekarang
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-8">
          <Link href="/products">
            <button className="bg-white border border-blue-300 hover:bg-blue-50 text-gray-700 font-medium py-3 px-8 rounded-lg transition-colors">
              Lihat lebih banyak
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
