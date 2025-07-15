"use client";

import React, { useState } from "react";
import {
  CheckCircle,
  Package,
  CreditCard,
  Truck,
  UserCheck,
  FileText,
  MessageCircle,
  Bell,
} from "lucide-react";

const HelpPage = () => {
  const orderSteps = [
    {
      icon: <UserCheck className="w-8 h-8 text-blue-500" />,
      title: "1. Login ke Akun",
      description:
        "Masuk ke akun Anda untuk memulai proses pemesanan. Jika belum memiliki akun, silakan daftar terlebih dahulu.",
      color: "bg-blue-50",
    },
    {
      icon: <Package className="w-8 h-8 text-green-500" />,
      title: "2. Pilih Produk",
      description:
        "Jelajahi katalog produk kami dan pilih makanan ringan atau kue kering yang Anda inginkan.",
      color: "bg-green-50",
    },
    {
      icon: <Package className="w-8 h-8 text-purple-500" />,
      title: "3. Tentukan Kuantitas",
      description:
        "Atur jumlah produk yang ingin Anda beli sesuai dengan kebutuhan Anda.",
      color: "bg-purple-50",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-orange-500" />,
      title: "4. Checkout",
      description:
        "Lakukan checkout dengan mengisi informasi pengiriman dan memilih metode pembayaran.",
      color: "bg-orange-50",
    },
    {
      icon: <CreditCard className="w-8 h-8 text-red-500" />,
      title: "5. Pembayaran",
      description:
        "Lakukan pembayaran melalui sistem yang tersedia. Pesanan akan diproses setelah pembayaran dikonfirmasi.",
      color: "bg-red-50",
    },
    {
      icon: <FileText className="w-8 h-8 text-indigo-500" />,
      title: "6. Konfirmasi Pesanan",
      description:
        "Sistem akan memproses pesanan Anda dan mengubah status menjadi 'DIKIRIM' setelah dikemas.",
      color: "bg-indigo-50",
    },
    {
      icon: <Truck className="w-8 h-8 text-teal-500" />,
      title: "7. Pengiriman",
      description:
        "Pesanan akan dikirim ke alamat yang Anda berikan. Status akan berubah menjadi 'DITERIMA' setelah sampai.",
      color: "bg-teal-50",
    },
  ];

  const faqItems = [
    {
      question: "Bagaimana cara memesan produk?",
      answer:
        "Anda dapat memesan produk dengan mengikuti langkah-langkah di atas. Pastikan Anda sudah memiliki akun terlebih dahulu.",
    },
    {
      question: "Berapa lama proses pengiriman?",
      answer:
        "Proses pengiriman membutuhkan waktu 2-3 hari kerja tergantung lokasi pengiriman.",
    },
    {
      question: "Apakah bisa pesan dalam jumlah besar?",
      answer:
        "Ya, kami melayani pemesanan dalam jumlah besar. Silakan hubungi kami untuk penawaran khusus.",
    },
    {
      question: "Bagaimana cara pembayaran?",
      answer: "Kami menerima metode pembayaran melalui virtual account BCA.",
    },
    {
      question: "Apakah ada garansi untuk produk?",
      answer:
        "Kami menjamin kualitas produk. Jika ada masalah dengan produk yang diterima, silakan hubungi customer service kami.",
    },
  ];

  const [expandedFaq, setExpandedFaq] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Bantuan</h1>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Temukan panduan lengkap cara memesan produk dan jawaban atas
              pertanyaan yang sering diajukan.
            </p>
          </div>
        </div>
      </div>

      {/* Order Process Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Cara Memesan
            </h2>
            <p className="text-gray-600">
              Ikuti langkah-langkah mudah berikut untuk memesan produk kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {orderSteps.map((step, index) => (
              <div
                key={index}
                className={`${step.color} p-6 rounded-lg hover:shadow-lg transition-shadow`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{step.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Process Flow */}
          <div className="mt-12 bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Alur Pemesanan
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {[
                "Login",
                "Pilih Produk",
                "Tentukan Kuantitas",
                "Checkout",
                "Pembayaran",
                "Proses Pesanan",
                "Pengiriman",
              ].map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
                    {step}
                  </div>
                  {index < 6 && (
                    <div className="w-8 h-px bg-gray-300 mx-2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-gray-600">
              Temukan jawaban untuk pertanyaan umum tentang layanan kami
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqItems.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">
                      {faq.question}
                    </h3>
                    <div
                      className={`transform transition-transform ${
                        expandedFaq === index ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
                {expandedFaq === index && (
                  <div className="p-4 bg-white border-l-4 border-blue-400">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Masih Butuh Bantuan?
            </h2>
            <p className="text-gray-600 mb-8">
              Hubungi tim customer service kami untuk mendapatkan bantuan lebih
              lanjut
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <MessageCircle className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">Live Chat</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Chat langsung dengan customer service kami
                </p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Mulai Chat
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Bell className="w-8 h-8 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">WhatsApp</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Hubungi kami melalui WhatsApp
                </p>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                  Chat WhatsApp
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <FileText className="w-8 h-8 text-purple-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Kirim email untuk pertanyaan detail
                </p>
                <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                  Kirim Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
