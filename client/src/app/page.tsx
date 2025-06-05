'use client';
import React from 'react';
import Link from 'next/link';
import ProductViewer3D from '../components/ProductViewer3D';
import Banner from '../components/Banner';
import { HeroBannerSlider, DiscountBanner, ProductPromoPoster, SeasonalBanner } from '../components/PromotionalBanners';
import { SkeletonGrid, LoadingButton } from '../components/LoadingStates';
import { useCart } from '../contexts/CartContext';
import { StarIcon, TruckIcon, ShieldCheckIcon, CreditCardIcon, EyeIcon, CubeIcon, SparklesIcon } from '@heroicons/react/24/solid';

export default function HomePage() {
  const { addItem } = useCart();
  
  const handleColorChange = (color: string) => {
    console.log('Color changed to:', color);
  };

  const handleMaterialChange = (material: string) => {
    console.log('Material changed to:', material);
  };
  
  const handleAddToCart = () => {
    addItem({
      id: 1,
      name: 'Sản phẩm Premium 3D',
      price: 299000,
      image: '/api/placeholder/300/300'
    });
  };

  const features = [
    {
      icon: EyeIcon,
      title: 'Xem mọi chi tiết',
      description: 'Khám phá sản phẩm từ mọi góc độ với mô hình 3D chất lượng cao hiển thị chi tiết chân thực.'
    },
    {
      icon: CubeIcon,
      title: 'Tương tác thực tế',
      description: 'Xoay, phóng to và tùy chỉnh sản phẩm theo thời gian thực như thể bạn đang cầm trên tay.'
    },
    {
      icon: SparklesIcon,
      title: 'Tùy chỉnh không giới hạn',
      description: 'Thay đổi màu sắc, chất liệu và các tùy chọn khác để tạo ra sản phẩm hoàn hảo cho bạn.'
    }
  ];

  const benefits = [
    {
      icon: TruckIcon,
      title: 'Miễn phí vận chuyển',
      description: 'Giao hàng miễn phí toàn quốc cho đơn hàng trên 500.000₫'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Bảo hành 2 năm',
      description: 'Bảo hành chính hãng và hỗ trợ kỹ thuật 24/7'
    },
    {
      icon: CreditCardIcon,
      title: 'Thanh toán an toàn',
      description: 'Hỗ trợ nhiều phương thức thanh toán bảo mật'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Banner Slider */}
      <HeroBannerSlider className="mb-8" />

      {/* Discount Banner */}
      <DiscountBanner
        title="Ưu đãi đặc biệt cuối năm"
        discount="30% OFF"
        description="Giảm giá cho tất cả sản phẩm điện tử"
        ctaText="Mua ngay"
        ctaLink="/categories"
        validUntil="2024-12-31"
        className="mb-8"
      />

      {/* Featured Product Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Sản phẩm nổi bật
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Trải nghiệm sản phẩm với công nghệ 3D tiên tiến. Xoay, phóng to và tùy chỉnh theo thời gian thực.
            </p>
          </div>

          {/* Featured Product */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* 3D Viewer */}
              <div className="flex justify-center">
                <ProductViewer3D
                  width={600}
                  height={400}
                  onColorChange={handleColorChange}
                  onMaterialChange={handleMaterialChange}
                />
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Sản phẩm Premium 3D</h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-2xl font-bold text-blue-600">299.000₫</span>
                    <span className="text-lg text-gray-500 line-through">399.000₫</span>
                    <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">-25%</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">(128 đánh giá)</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Mô tả sản phẩm</h4>
                  <p className="text-gray-600">
                    Trải nghiệm sản phẩm cao cấp với khả năng hiển thị 3D đầy đủ. Tùy chỉnh màu sắc và chất liệu 
                    để xem chính xác sản phẩm sẽ như thế nào trước khi mua. Trải nghiệm tương tác này đưa 
                    mua sắm trực tuyến lên một tầm cao mới.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Tính năng nổi bật</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      Xem 360° tương tác
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      Tùy chỉnh màu sắc theo thời gian thực
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      Lựa chọn chất liệu
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      Điều khiển phóng to & di chuyển
                    </li>
                  </ul>
                </div>

                <div className="flex space-x-4">
                  <LoadingButton 
                    onClick={handleAddToCart}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                    variant="primary"
                  >
                    Thêm vào giỏ
                  </LoadingButton>
                  <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors duration-200">
                    ♡
                  </button>
                </div>

                <div className="border-t pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                    {benefits.map((benefit, index) => {
                      const IconComponent = benefit.icon;
                      return (
                        <div key={index} className="flex items-center space-x-2">
                          <IconComponent className="h-4 w-4 text-blue-600" />
                          <span>{benefit.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Promotion Posters */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Khuyến Mãi Đặc Biệt
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductPromoPoster
              title="Laptop Gaming"
              subtitle="Hiệu năng vượt trội"
              image="/api/placeholder/400/300"
              ctaText="Xem ngay"
              ctaLink="/categories"
              badge="HOT"
            />
            <ProductPromoPoster
              title="Smartphone 5G"
              subtitle="Công nghệ tương lai"
              image="/api/placeholder/400/300"
              ctaText="Khám phá"
              ctaLink="/categories"
              badge="NEW"
            />
            <ProductPromoPoster
              title="Phụ kiện Tech"
              subtitle="Hoàn thiện trải nghiệm"
              image="/api/placeholder/400/300"
              ctaText="Mua sắm"
              ctaLink="/categories"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Tại sao chọn mua sắm 3D?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Công nghệ cách mạng kết hợp với trải nghiệm người dùng đặc biệt
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Seasonal Campaign */}
      <SeasonalBanner
        season="Mùa Đông 2024"
        title="Bộ Sưu Tập Mùa Đông"
        description="Khám phá những sản phẩm công nghệ mới nhất cho mùa đông ấm áp và đầy cảm hứng"
        ctaText="Khám phá ngay"
        ctaLink="/categories"
        backgroundColor="bg-gradient-to-r from-blue-600 to-purple-700"
        className="mx-4 sm:mx-6 lg:mx-8 mb-16"
      />

      {/* Benefits Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Cam kết của chúng tôi
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Mang đến trải nghiệm mua sắm tốt nhất cho khách hàng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 rounded-lg p-3">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Sẵn sàng khám phá?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Tham gia cùng hàng nghìn khách hàng đã trải nghiệm mua sắm 3D
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/products"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Xem tất cả sản phẩm
            </Link>
            <LoadingButton
              onClick={() => window.location.href = '/categories'}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600"
            >
              Duyệt danh mục
            </LoadingButton>
          </div>
        </div>
      </section>
    </div>
  );
}
