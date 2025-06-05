'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircleIcon, TruckIcon, EnvelopeIcon, PrinterIcon } from '@heroicons/react/24/solid';

export default function CheckoutSuccessPage() {
  // In a real app, you would get order details from URL params or API
  const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
  const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Đặt hàng thành công!</h1>
              <p className="text-gray-600">
                Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi. Đơn hàng của bạn đã được xác nhận và đang được xử lý.
              </p>
            </div>

            {/* Order Details */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Mã đơn hàng</h3>
                  <p className="text-lg font-semibold text-gray-900">{orderNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Ngày đặt hàng</h3>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date().toLocaleDateString('vi-VN')}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Dự kiến giao hàng</h3>
                  <p className="text-lg font-semibold text-gray-900">{estimatedDelivery}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Phương thức thanh toán</h3>
                  <p className="text-lg font-semibold text-gray-900">Thẻ tín dụng</p>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="space-y-4 mb-8">
              <h2 className="text-xl font-bold text-gray-900">Bước tiếp theo</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                  <EnvelopeIcon className="w-8 h-8 text-blue-600 mb-2" />
                  <h3 className="font-medium text-gray-900 mb-1">Email xác nhận</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Chúng tôi đã gửi email xác nhận đơn hàng đến địa chỉ email của bạn
                  </p>
                </div>
                
                <div className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg">
                  <TruckIcon className="w-8 h-8 text-yellow-600 mb-2" />
                  <h3 className="font-medium text-gray-900 mb-1">Chuẩn bị hàng</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Đơn hàng sẽ được chuẩn bị và giao trong vòng 1-3 ngày làm việc
                  </p>
                </div>
                
                <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                  <CheckCircleIcon className="w-8 h-8 text-green-600 mb-2" />
                  <h3 className="font-medium text-gray-900 mb-1">Theo dõi đơn hàng</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Bạn có thể theo dõi tình trạng đơn hàng trong tài khoản của mình
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/account/orders"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Theo dõi đơn hàng
              </Link>
              
              <button className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                <PrinterIcon className="w-4 h-4 mr-2" />
                In hóa đơn
              </button>
              
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Thông tin hữu ích</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium text-gray-900">Chính sách đổi trả</h3>
                  <p className="text-sm text-gray-600">
                    Bạn có thể đổi trả sản phẩm trong vòng 30 ngày kể từ ngày nhận hàng.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium text-gray-900">Bảo hành sản phẩm</h3>
                  <p className="text-sm text-gray-600">
                    Tất cả sản phẩm đều được bảo hành chính hãng theo quy định của nhà sản xuất.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium text-gray-900">Hỗ trợ khách hàng</h3>
                  <p className="text-sm text-gray-600">
                    Liên hệ hotline 1900-xxxx hoặc email support@example.com nếu bạn cần hỗ trợ.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white text-center">
            <h2 className="text-xl font-bold mb-2">Đăng ký nhận tin khuyến mãi</h2>
            <p className="mb-4 opacity-90">
              Nhận thông tin về các sản phẩm mới và ưu đãi đặc biệt
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}