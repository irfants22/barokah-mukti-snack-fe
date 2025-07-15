"use client";

import { useState } from "react";
import { Package, Eye, Truck, CheckCircle, XCircle } from "lucide-react";

export default function MyOrderPage() {
  const [activeTab, setActiveTab] = useState("DIKIRIM");

  // Data dummy pesanan
  const dummyOrders = [
    {
      id: 1,
      productName: "Keripik Pisang Original",
      productImage: "/api/placeholder/80/80",
      quantity: 2,
      price: 25000,
      totalPrice: 50000,
      status: "DIPROSES",
      orderDate: "2024-01-15",
      estimatedDelivery: "2024-01-20",
    },
    {
      id: 2,
      productName: "Kue Kering Lebaran",
      productImage: "/api/placeholder/80/80",
      quantity: 1,
      price: 75000,
      totalPrice: 75000,
      status: "DIBAYAR",
      orderDate: "2024-01-14",
      estimatedDelivery: "2024-01-19",
    },
    {
      id: 3,
      productName: "Nama Produk",
      productImage: "/api/placeholder/80/80",
      quantity: 1,
      price: 25000,
      totalPrice: 25000,
      status: "DIKIRIM",
      orderDate: "2024-01-13",
      estimatedDelivery: "2024-01-18",
    },
    {
      id: 4,
      productName: "Keripik Singkong Balado",
      productImage: "/api/placeholder/80/80",
      quantity: 3,
      price: 20000,
      totalPrice: 60000,
      status: "SELESAI",
      orderDate: "2024-01-12",
      estimatedDelivery: "2024-01-17",
    },
    {
      id: 5,
      productName: "Kacang Mete Premium",
      productImage: "/api/placeholder/80/80",
      quantity: 1,
      price: 45000,
      totalPrice: 45000,
      status: "DIBATALKAN",
      orderDate: "2024-01-11",
      estimatedDelivery: null,
    },
  ];

  const tabs = [
    { id: "DIPROSES", label: "DIPROSES", icon: Package },
    { id: "DIBAYAR", label: "DIBAYAR", icon: CheckCircle },
    { id: "DIKIRIM", label: "DIKIRIM", icon: Truck },
    { id: "SELESAI", label: "SELESAI", icon: CheckCircle },
    { id: "DIBATALKAN", label: "DIBATALKAN", icon: XCircle },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "DIPROSES":
        return "text-orange-600";
      case "DIBAYAR":
        return "text-blue-600";
      case "DIKIRIM":
        return "text-blue-500";
      case "SELESAI":
        return "text-green-600";
      case "DIBATALKAN":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getActionButton = (status, orderId) => {
    switch (status) {
      case "DIPROSES":
        return (
          <button className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50">
            Batalkan
          </button>
        );
      case "DIBAYAR":
        return (
          <button className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
            Lacak Pesanan
          </button>
        );
      case "DIKIRIM":
        return (
          <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
            Lihat Pesanan
          </button>
        );
      case "SELESAI":
        return (
          <button className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
            Beli Lagi
          </button>
        );
      case "DIBATALKAN":
        return (
          <button className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
            Beli Lagi
          </button>
        );
      default:
        return null;
    }
  };

  const filteredOrders = dummyOrders.filter(
    (order) => order.status === activeTab
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Pesanan Saya</h1>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-4 text-center font-medium transition-colors ${
                    activeTab === tab.id
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Order List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                Tidak ada pesanan dengan status {activeTab.toLowerCase()}
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-sm border"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        Pesanan #{order.id} • {order.orderDate}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`text-sm font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                      {activeTab === "DIKIRIM" && (
                        <button className="text-blue-600 hover:text-blue-800">
                          <span className="text-sm">DIKIRIM</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800 mb-1">
                          {order.productName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          x{order.quantity}
                        </p>
                        {order.estimatedDelivery && (
                          <p className="text-sm text-gray-500 mt-1">
                            Estimasi tiba: {order.estimatedDelivery}
                          </p>
                        )}
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">
                          Rp {order.totalPrice.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Total Pesanan</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-lg">
                          Rp {order.totalPrice.toLocaleString("id-ID")}
                        </span>
                        {getActionButton(order.status, order.id)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
