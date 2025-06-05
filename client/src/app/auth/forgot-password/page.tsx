'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface ForgotPasswordForm {
  email: string;
}

export default function ForgotPasswordPage() {
  const [formData, setFormData] = useState<ForgotPasswordForm>({
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      setError('Email là bắt buộc');
      setIsLoading(false);
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setError('Email không hợp lệ');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call to send reset password email
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      });

      if (response.ok) {
        setIsEmailSent(true);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại.');
      }
    } catch (error) {
      setError('Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call to resend reset password email
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Không thể gửi lại email. Vui lòng thử lại.');
      }
    } catch (error) {
      setError('Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Logo */}
          <div className="flex justify-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              E-commerce 3D Store
            </Link>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <CheckCircleIcon className="h-16 w-16 text-green-500" />
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Email đã được gửi!
              </h2>
              <p className="text-gray-600 mb-6">
                Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email:
              </p>
              <p className="font-medium text-gray-900 mb-6">
                {formData.email}
              </p>
              <p className="text-sm text-gray-500 mb-8">
                Vui lòng kiểm tra hộp thư đến (và cả thư mục spam) để tìm email từ chúng tôi.
                Link đặt lại mật khẩu sẽ hết hạn sau 24 giờ.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Resend Email Button */}
            <div className="space-y-4">
              <button
                onClick={handleResendEmail}
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isLoading
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {isLoading ? 'Đang gửi...' : 'Gửi lại email'}
              </button>

              <Link
                href="/auth/signin"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Quay lại đăng nhập
              </Link>
            </div>

            {/* Additional Help */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                Không nhận được email?{' '}
                <Link href="/contact" className="text-blue-600 hover:text-blue-500">
                  Liên hệ hỗ trợ
                </Link>
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
              ← Quay về trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            E-commerce 3D Store
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Quên mật khẩu?
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập email của bạn"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Chúng tôi sẽ gửi link đặt lại mật khẩu đến email này
              </p>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isLoading ? 'Đang gửi...' : 'Gửi hướng dẫn đặt lại'}
              </button>
            </div>
          </form>

          {/* Back to Sign In */}
          <div className="mt-6">
            <Link
              href="/auth/signin"
              className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Quay lại đăng nhập
            </Link>
          </div>

          {/* Additional Help */}
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Cần hỗ trợ?{' '}
              <Link href="/contact" className="font-medium text-blue-600 hover:text-blue-500">
                Liên hệ với chúng tôi
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}