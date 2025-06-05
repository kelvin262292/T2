'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  UserIcon,
  ShoppingBagIcon,
  CogIcon,
  HeartIcon,
  MapPinIcon,
  CreditCardIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
}

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isWelcome = searchParams.get('welcome') === 'true';
  
  const [activeTab, setActiveTab] = useState('overview');
  const [showWelcome, setShowWelcome] = useState(isWelcome);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: 'Nguyễn',
    lastName: 'Văn A',
    email: 'user@example.com',
    phone: '+84 123 456 789',
    dateOfBirth: '1990-01-01',
    gender: 'male',
  });

  // Mock recent orders data
  const [recentOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 1250000,
      items: 3,
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 850000,
      items: 2,
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'processing',
      total: 2100000,
      items: 5,
    },
  ]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      setUserProfile(prev => ({
        ...prev,
        email: session.user.email || prev.email,
        firstName: session.user.name?.split(' ')[0] || prev.firstName,
        lastName: session.user.name?.split(' ').slice(1).join(' ') || prev.lastName,
      }));
    }
  }, [session]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'shipped':
        return 'text-blue-600 bg-blue-100';
      case 'processing':
        return 'text-yellow-600 bg-yellow-100';
      case 'pending':
        return 'text-gray-600 bg-gray-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'Đã giao';
      case 'shipped':
        return 'Đang giao';
      case 'processing':
        return 'Đang xử lý';
      case 'pending':
        return 'Chờ xử lý';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const menuItems = [
    {
      id: 'overview',
      name: 'Tổng quan',
      icon: UserIcon,
      description: 'Thông tin tài khoản và hoạt động gần đây',
    },
    {
      id: 'orders',
      name: 'Đơn hàng',
      icon: ShoppingBagIcon,
      description: 'Lịch sử và trạng thái đơn hàng',
    },
    {
      id: 'wishlist',
      name: 'Yêu thích',
      icon: HeartIcon,
      description: 'Sản phẩm đã lưu',
    },
    {
      id: 'addresses',
      name: 'Địa chỉ',
      icon: MapPinIcon,
      description: 'Quản lý địa chỉ giao hàng',
    },
    {
      id: 'payment',
      name: 'Thanh toán',
      icon: CreditCardIcon,
      description: 'Phương thức thanh toán',
    },
    {
      id: 'notifications',
      name: 'Thông báo',
      icon: BellIcon,
      description: 'Cài đặt thông báo',
    },
    {
      id: 'settings',
      name: 'Cài đặt',
      icon: CogIcon,
      description: 'Cài đặt tài khoản',
    },
  ];

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Message */}
      {showWelcome && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
          <div className="flex items-center">
            <CheckCircleIcon className="h-6 w-6 text-green-400 mr-3" />
            <div className="flex-1">
              <p className="text-green-700">
                Chào mừng bạn đến với E-commerce 3D Store! Tài khoản của bạn đã được tạo thành công.
              </p>
            </div>
            <button
              onClick={() => setShowWelcome(false)}
              className="text-green-400 hover:text-green-600"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                <UserIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {userProfile.firstName} {userProfile.lastName}
                </h1>
                <p className="text-gray-600">{userProfile.email}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Tổng quan tài khoản</h2>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <ShoppingBagIcon className="h-8 w-8 text-blue-600 mr-3" />
                        <div>
                          <p className="text-sm text-blue-600">Tổng đơn hàng</p>
                          <p className="text-2xl font-bold text-blue-900">{recentOrders.length}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <HeartIcon className="h-8 w-8 text-green-600 mr-3" />
                        <div>
                          <p className="text-sm text-green-600">Yêu thích</p>
                          <p className="text-2xl font-bold text-green-900">12</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <CreditCardIcon className="h-8 w-8 text-purple-600 mr-3" />
                        <div>
                          <p className="text-sm text-purple-600">Tổng chi tiêu</p>
                          <p className="text-2xl font-bold text-purple-900">
                            {formatCurrency(recentOrders.reduce((sum, order) => sum + order.total, 0))}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Orders */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Đơn hàng gần đây</h3>
                      <button
                        onClick={() => setActiveTab('orders')}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Xem tất cả →
                      </button>
                    </div>
                    <div className="space-y-4">
                      {recentOrders.slice(0, 3).map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">Đơn hàng #{order.id}</p>
                              <p className="text-sm text-gray-600">
                                {new Date(order.date).toLocaleDateString('vi-VN')} • {order.items} sản phẩm
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-900">{formatCurrency(order.total)}</p>
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                                {getStatusText(order.status)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Đơn hàng của tôi</h2>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-medium text-gray-900">Đơn hàng #{order.id}</h3>
                            <p className="text-sm text-gray-600">
                              Đặt ngày {new Date(order.date).toLocaleDateString('vi-VN')}
                            </p>
                          </div>
                          <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-600">{order.items} sản phẩm</p>
                          <div className="flex items-center space-x-4">
                            <p className="font-medium text-gray-900">{formatCurrency(order.total)}</p>
                            <Link
                              href={`/account/orders/${order.id}`}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              Xem chi tiết
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab !== 'overview' && activeTab !== 'orders' && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <CogIcon className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {menuItems.find(item => item.id === activeTab)?.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {menuItems.find(item => item.id === activeTab)?.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    Tính năng này đang được phát triển và sẽ sớm có mặt.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}