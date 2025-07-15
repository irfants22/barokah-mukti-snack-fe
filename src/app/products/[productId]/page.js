"use client";

import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { formatWeight } from "@/utils/helper";

export default function ProductDetailPage({ params }) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState(false);
  const productId = params?.productId;
  const router = useRouter();

  const fetchProductDetail = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(`/api/products/${productId}`);
      setProduct(data.data);
    } catch (error) {
      console.error("Gagal memuat produk:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Anda harus login terlebih dahulu.");
        return;
      }

      const payload = {
        product_id: product?.id,
        quantity,
        price: product?.price * quantity,
      };

      if (payload.product_id && payload.quantity && payload.price) {
        if (selectedPackage === false) {
          return alert("Pilih kemasan produk yang ingin dipesan");
        }
        await axiosInstance.post("/api/carts", payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      router.push("/cart");
    } catch (err) {
      console.error("Gagal menambahkan ke keranjang:", err);
      alert("Gagal menambahkan produk ke keranjang");
    }
  };

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, [productId]);

  return loading ? (
    <div className="text-center py-20 text-gray-500">Memuat produk...</div>
  ) : (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center lg:justify-start">
          <div className="w-full max-w-md">
            <img
              className="w-full h-full bg-cover aspect-square"
              src={product?.image}
            ></img>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Product Name */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 capitalize">
              {product?.name}
            </h1>
            <p className="text-gray-600">
              {product?.category
                ?.toLowerCase()
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </p>
          </div>

          {/* Price */}
          <div>
            <span className="text-3xl font-bold text-gray-900">
              Rp{product?.price?.toLocaleString("id-ID")}
            </span>
          </div>

          {/* Stock */}
          <div className="flex items-center space-x-3">
            <span className="text-gray-700 font-medium">Stok</span>
            <span className="text-gray-900 font-semibold">
              {product?.stock}
            </span>
            <span className="text-gray-500">Tersedia</span>
          </div>

          {/* Quantity */}
          <div className="flex items-center space-x-3">
            <span className="text-gray-700 font-medium">Kuantitas</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => handleQuantityChange("decrement")}
                className="p-2 hover:bg-gray-100 rounded-l-lg"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="px-4 py-2 min-w-[60px] text-center text-gray-900 font-medium">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange("increment")}
                className="p-2 hover:bg-gray-100 rounded-r-lg"
                disabled={quantity === product?.stock}
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Package Options */}
          <div className="space-y-3">
            <span className="text-gray-700 font-medium">Kemasan</span>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSelectedPackage(!selectedPackage)}
                className={`px-4 py-2 rounded-lg border font-medium transition-colors ${
                  selectedPackage === true
                    ? "bg-blue-400 text-white border-blue-400"
                    : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
                }`}
              >
                {formatWeight(product?.weight)}
              </button>
              <span className="text-gray-500">{product?.packaging}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="pt-4">
            <button
              className="bg-blue-400 text-white px-8 py-3 rounded-lg font-medium hover:text-blue-400 hover:bg-white hover:ring-1 hover:ring-blue-400 transition-colors"
              onClick={() => handleCheckout()}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Deskripsi Produk
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed">
            {product?.description}
          </p>
        </div>
      </div>
    </div>
  );
}
