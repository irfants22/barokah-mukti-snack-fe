import { Calendar, Package, Truck, MapPin } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Tentang Kami</h1>
        <div className="w-24 h-1 bg-blue-400 mx-auto"></div>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Selamat Datang di Barokah Mukti Snack
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Barokah Mukti Snack, sebuah usaha rumahan yang telah memproduksi
              dan menjual berbagai produk makanan ringan sejak tahun 2016. Usaha
              ini menawarkan dua kategori utama produk, yaitu makanan ringan dan
              kue kering.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="https://res.cloudinary.com/dtscrzs6m/image/upload/v1752108376/BMS_qwhbcc.jpg"
              alt="Barokah Mukti Snack"
              className="w-64 h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-400 rounded-full mb-4">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">2016</h3>
          <p className="text-gray-600">Tahun Berdiri</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-400 rounded-full mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">2</h3>
          <p className="text-gray-600">Kategori Produk</p>
        </div>
        <div className="bg-orange-50 p-6 rounded-lg text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-400 rounded-full mb-4">
            <Truck className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">2-3</h3>
          <p className="text-gray-600">Hari Pengiriman</p>
        </div>
      </div>

      {/* Product Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Makanan Ringan */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Makanan Ringan
          </h3>
          <p className="text-gray-600 mb-4">
            Makanan ringan mencakup berbagai jenis camilan seperti keripik
            singkong, keripik bayam, keripik tempe, keripik bawang, peyek,
            londo, kembang goyang, dan stik.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Kemasan:</h4>
            <p className="text-gray-600">
              Bal dengan pilihan berat 1kg atau 2kg
            </p>
          </div>
        </div>

        {/* Kue Kering */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Kue Kering
          </h3>
          <p className="text-gray-600 mb-4">
            Kategori kue kering meliputi pilihan seperti nastar, putri salju,
            dan kastangel yang diproduksi dengan resep tradisional dan bahan
            berkualitas.
          </p>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Kemasan:</h4>
            <p className="text-gray-600">
              Toples berukuran 250gram atau 500gram
            </p>
          </div>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-400 rounded-full mb-4">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Jangkauan Pengiriman
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Proses pengiriman produk memakan waktu sekitar 2-3 hari setelah
              produksi, dengan cakupan wilayah yang meliputi JABODETABEK dan
              berpotensi mencakup wilayah yang lebih luas.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">
              Wilayah Pengiriman:
            </h4>
            <ul className="space-y-2 text-gray-600">
              <li>• Jakarta</li>
              <li>• Bogor</li>
              <li>• Depok</li>
              <li>• Tangerang</li>
              <li>• Bekasi</li>
              <li>• Wilayah lainnya (coming soon)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Vision Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Visi Kami
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Menjadi produsen makanan ringan terpercaya yang menghadirkan cita
            rasa autentik dan kualitas terbaik untuk keluarga Indonesia.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Misi Kami
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Memproduksi makanan ringan berkualitas tinggi dengan bahan-bahan
            pilihan, menjaga tradisi cita rasa, dan memberikan pelayanan terbaik
            kepada pelanggan.
          </p>
        </div>
      </div>
    </div>
  );
}
