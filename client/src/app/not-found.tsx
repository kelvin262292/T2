import Link from 'next/link';
import { HomeIcon, MagnifyingGlassIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* 404 Illustration */}
        <div className="text-center">
          <div className="mx-auto h-32 w-32 text-blue-600 mb-8">
            <svg
              className="w-full h-full"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.691-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
          
          {/* Error Code */}
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          
          {/* Error Message */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Trang không tồn tại
          </h2>
          
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm. 
            Có thể trang đã được di chuyển, xóa hoặc bạn đã nhập sai địa chỉ.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {/* Go Home Button */}
          <Link
            href="/"
            className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Về trang chủ
          </Link>

          {/* Search Button */}
          <Link
            href="/search"
            className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
            Tìm kiếm sản phẩm
          </Link>

          {/* Go Back Button */}
          <button
            onClick={() => window.history.back()}
            className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Quay lại trang trước
          </button>
        </div>

        {/* Help Links */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Cần hỗ trợ? Hãy liên hệ với chúng tôi:
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <Link
              href="/contact"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Liên hệ hỗ trợ
            </Link>
            <Link
              href="/products"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Xem sản phẩm
            </Link>
            <Link
              href="/about"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Về chúng tôi
            </Link>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
            Danh mục phổ biến
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/products?category=electronics"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">📱</div>
              <p className="text-sm font-medium text-gray-900">Điện tử</p>
            </Link>
            <Link
              href="/products?category=fashion"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">👕</div>
              <p className="text-sm font-medium text-gray-900">Thời trang</p>
            </Link>
            <Link
              href="/products?category=home"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">🏠</div>
              <p className="text-sm font-medium text-gray-900">Gia dụng</p>
            </Link>
            <Link
              href="/products?category=sports"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">⚽</div>
              <p className="text-sm font-medium text-gray-900">Thể thao</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}