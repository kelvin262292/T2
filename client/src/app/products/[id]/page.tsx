'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon, StarIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { api } from '~/trpc/react';
import { useCart } from '~/contexts/CartContext';
import LoadingStates from '~/components/LoadingStates';

interface ProductDetailProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage() {
  const params = useParams();
  const productId = parseInt(params.id as string);
  const { addItem } = useCart();
  
  const { data: product, isLoading, error } = api.product.getById.useQuery(
    { id: productId },
    { enabled: !isNaN(productId) }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <LoadingStates />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Sản phẩm không tìm thấy</h1>
            <p className="text-gray-600 mb-8">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <Link 
              href="/products" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Quay lại danh sách sản phẩm
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarIconSolid key={i} className="w-5 h-5 text-yellow-400" />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <StarIcon className="w-5 h-5 text-yellow-400" />
          <StarIconSolid className="w-5 h-5 text-yellow-400 absolute top-0 left-0" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </div>
      );
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <StarIcon key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      );
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-blue-600">Sản phẩm</Link>
          <span>/</span>
          <Link href={`/categories?category=${product.category}`} className="hover:text-blue-600">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Back button */}
        <Link 
          href="/products" 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Quay lại danh sách sản phẩm
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Thumbnail images - placeholder for future implementation */}
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded border-2 border-transparent hover:border-blue-500 cursor-pointer">
                    <img
                      src={product.image}
                      alt={`${product.name} view ${index}`}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {renderStars(product.rating)}
                    <span className="text-sm text-gray-600 ml-2">({product.reviews} đánh giá)</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.inStock 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                  </span>
                </div>
              </div>

              <div className="border-t border-b py-4">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  ${product.price.toFixed(2)}
                </div>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tính năng nổi bật</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors ${
                      product.inStock
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCartIcon className="w-5 h-5 mr-2" />
                    {product.inStock ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
                  </button>
                  
                  <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <HeartIcon className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                
                {product.inStock && (
                  <button className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                    Mua ngay
                  </button>
                )}
              </div>

              {/* Additional Info */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Danh mục:</span>
                  <Link href={`/categories?category=${product.category}`} className="text-blue-600 hover:underline">
                    {product.category}
                  </Link>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mã sản phẩm:</span>
                  <span className="text-gray-900">SP{product.id.toString().padStart(6, '0')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vận chuyển:</span>
                  <span className="text-green-600 font-medium">Miễn phí</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bảo hành:</span>
                  <span className="text-gray-900">12 tháng</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section - placeholder for future implementation */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sản phẩm liên quan</h2>
          <div className="bg-white rounded-lg p-8 text-center text-gray-500">
            <p>Sản phẩm liên quan sẽ được hiển thị ở đây</p>
          </div>
        </div>
      </div>
    </div>
  );
}