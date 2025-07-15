'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Bell,
  User,
  LayoutDashboard,
  Package,
  FileText,
  Users,
  MessageSquare,
  LogOut,
  X,
  Clock,
  CheckCircle,
  AlertCircle,
  ShoppingBag,
  UserPlus,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'Pesanan Baru',
      message: 'Pesanan #12345 dari Ahmad Rizky telah diterima',
      time: '2 menit yang lalu',
      isRead: false,
      icon: ShoppingBag,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      type: 'order',
      title: 'Pesanan Selesai',
      message: 'Pesanan #12344 dari Siti Nurhaliza telah selesai',
      time: '15 menit yang lalu',
      isRead: false,
      icon: CheckCircle,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      id: 3,
      type: 'stock',
      title: 'Stok Menipis',
      message: 'Stok Keripik Pisang Original tersisa 5 buah',
      time: '30 menit yang lalu',
      isRead: true,
      icon: AlertCircle,
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      id: 4,
      type: 'user',
      title: 'Pengguna Baru',
      message: 'Maria Dewi telah mendaftar sebagai pelanggan baru',
      time: '1 jam yang lalu',
      isRead: true,
      icon: UserPlus,
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      id: 5,
      type: 'order',
      title: 'Pembayaran Berhasil',
      message: 'Pembayaran pesanan #12343 dari Budi Santoso telah dikonfirmasi',
      time: '2 jam yang lalu',
      isRead: true,
      icon: CheckCircle,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50'
    }
  ]);

  const notificationRef = useRef(null);

  // Close notification when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-400 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left side - Menu button */}
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Barokah</h1>
            <p className="text-sm text-white">Mukti Snack</p>
          </div>

          {/* Right side - User info */}
          <div className="flex items-center space-x-4">
            {/* Notification Button */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg hover:bg-blue-500 transition-colors relative"
              >
                <Bell className="w-6 h-6 text-white" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-gray-900">Notifikasi</h3>
                      {unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Tandai semua dibaca
                        </button>
                      )}
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Notification List */}
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-gray-500">
                        <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>Tidak ada notifikasi</p>
                      </div>
                    ) : (
                      notifications.map((notification) => {
                        const IconComponent = notification.icon;
                        return (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                              !notification.isRead ? 'bg-blue-50' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`flex-shrink-0 w-10 h-10 rounded-full ${notification.bgColor} flex items-center justify-center`}>
                                <IconComponent className={`w-5 h-5 ${notification.iconColor}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <p className={`text-sm font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                                    {notification.title}
                                  </p>
                                  <button
                                    onClick={() => deleteNotification(notification.id)}
                                    className="text-gray-400 hover:text-gray-600 ml-2"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  {notification.message}
                                </p>
                                <div className="flex items-center justify-between mt-2">
                                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                                    <Clock className="w-3 h-3" />
                                    <span>{notification.time}</span>
                                  </div>
                                  {!notification.isRead && (
                                    <button
                                      onClick={() => markAsRead(notification.id)}
                                      className="text-xs text-blue-600 hover:text-blue-800"
                                    >
                                      Tandai dibaca
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Footer */}
                  {notifications.length > 0 && (
                    <div className="p-4 border-t border-gray-200">
                      {/* <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800">
                        Lihat semua notifikasi
                      </button> */}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-800" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Irfan Tu..
                </p>
                <p className="text-xs text-white">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-6">
            <div className="border-b-2 border-blue-400 py-4 text-center">
              <h2 className="text-xl font-medium text-gray-900">MENU</h2>
            </div>
            <nav className="space-y-2">
              <a
                href="/admin/dashboard"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </a>
              <a
                href="/admin/products"
                className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-gray-100 rounded-lg"
              >
                <Package className="w-5 h-5" />
                <span>Produk</span>
              </a>
              <a
                href="/admin/orders"
                className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-gray-100 rounded-lg"
              >
                <FileText className="w-5 h-5" />
                <span>Pesanan</span>
              </a>
              <a
                href="/admin/pengguna"
                className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-gray-100 rounded-lg"
              >
                <Users className="w-5 h-5" />
                <span>Pengguna</span>
              </a>
              <a
                href="/logout"
                className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-gray-100 rounded-lg"
              >
                <LogOut className="w-5 h-5" />
                <span>Keluar</span>
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}