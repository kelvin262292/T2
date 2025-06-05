'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ExclamationTriangleIcon, ArrowPathIcon, HomeIcon } from '@heroicons/react/24/outline';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Error Illustration */}
        <div className="text-center">
          <div className="mx-auto h-32 w-32 text-red-600 mb-8">
            <ExclamationTriangleIcon className="w-full h-full" />
          </div>
          
          {/* Error Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Đã xảy ra lỗi
          </h1>
          
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Xin lỗi, đã có lỗi xảy ra khi tải trang này. 
            Chúng tôi đã ghi nhận sự cố và sẽ khắc phục sớm nhất có thể.
          </p>

          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
              <h3 className="text-sm font-medium text-red-800 mb-2">Chi tiết lỗi (Development):</h3>
              <p className="text-xs text-red-700 font-mono break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-red-600 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {/* Try Again Button */}
          <button
            onClick={reset}
            className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <ArrowPathIcon className="h-5 w-5 mr-2" />
            Thử lại
          </button>

          {/* Go Home Button */}
          <Link
            href="/"
            className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Về trang chủ
          </Link>

          {/* Reload Page Button */}
          <button
            onClick={() => window.location.reload()}
            className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Tải lại trang
          </button>
        </div>

        {/* Help Information */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Nếu lỗi vẫn tiếp tục xảy ra, vui lòng liên hệ với chúng tôi:
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <Link
              href="/contact"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Báo cáo lỗi
            </Link>
            <Link
              href="/help"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Trung tâm hỗ trợ
            </Link>
            <a
              href="mailto:support@example.com"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Email hỗ trợ
            </a>
          </div>
        </div>

        {/* Error Code */}
        {error.digest && (
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Mã lỗi: {error.digest}
            </p>
          </div>
        )}

        {/* Common Solutions */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
            Một số giải pháp thường gặp:
          </h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">1</span>
              <p>Kiểm tra kết nối internet của bạn</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">2</span>
              <p>Xóa cache và cookies của trình duyệt</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">3</span>
              <p>Thử sử dụng trình duyệt khác</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">4</span>
              <p>Đợi một vài phút rồi thử lại</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}