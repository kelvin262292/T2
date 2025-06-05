'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon, SparklesIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';

interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  backgroundColor: string;
  textColor: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  badge?: string;
}

const Banner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides: BannerSlide[] = [
    {
      id: 1,
      title: "Trải nghiệm mua sắm 3D",
      subtitle: "Công nghệ tương lai",
      description: "Xem, xoay và tùy chỉnh sản phẩm trong không gian 3D trước khi mua. Trải nghiệm mua sắm chưa từng có!",
      backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      backgroundColor: "from-blue-600 to-purple-600",
      textColor: "text-white",
      ctaText: "Khám phá ngay",
      ctaLink: "/products",
      secondaryCtaText: "Xem demo",
      secondaryCtaLink: "/demo",
      badge: "Mới"
    },
    {
      id: 2,
      title: "Giảm giá lên đến 50%",
      subtitle: "Khuyến mãi đặc biệt",
      description: "Hàng ngàn sản phẩm chất lượng cao với giá ưu đãi. Cơ hội mua sắm tuyệt vời chỉ có trong tháng này!",
      backgroundImage: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      backgroundColor: "from-pink-500 to-red-500",
      textColor: "text-white",
      ctaText: "Mua ngay",
      ctaLink: "/sale",
      secondaryCtaText: "Xem tất cả",
      secondaryCtaLink: "/products?sale=true",
      badge: "Hot"
    },
    {
      id: 3,
      title: "Bộ sưu tập mới 2024",
      subtitle: "Xu hướng thời trang",
      description: "Khám phá những thiết kế độc đáo và phong cách hiện đại. Làm mới phong cách của bạn với bộ sưu tập mới nhất.",
      backgroundImage: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      backgroundColor: "from-cyan-500 to-blue-500",
      textColor: "text-white",
      ctaText: "Xem bộ sưu tập",
      ctaLink: "/collections/2024",
      secondaryCtaText: "Tìm hiểu thêm",
      secondaryCtaLink: "/about",
      badge: "Mới"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentSlideData = slides[currentSlide];
  if (!currentSlideData) return null;

  return (
    <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-in-out"
        style={{ background: currentSlideData.backgroundImage } as React.CSSProperties}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className={`space-y-6 ${currentSlideData.textColor} animate-fade-in`}>
              {/* Badge */}
              {currentSlideData.badge && (
                <div className="inline-flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2">
                  <SparklesIcon className="h-4 w-4" />
                  <span className="text-sm font-medium">{currentSlideData.badge}</span>
                </div>
              )}

              {/* Subtitle */}
              <p className="text-lg md:text-xl font-medium opacity-90">
                {currentSlideData.subtitle}
              </p>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {currentSlideData.title}
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl opacity-90 max-w-2xl leading-relaxed">
                {currentSlideData.description}
              </p>

              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <Link
                  href={currentSlideData.ctaLink}
                  className="inline-flex items-center justify-center space-x-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <ShoppingBagIcon className="h-5 w-5" />
                  <span>{currentSlideData.ctaText}</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>

                {currentSlideData.secondaryCtaText && (
                  <Link
                    href={currentSlideData.secondaryCtaLink!}
                    className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-200 transform hover:scale-105"
                  >
                    <PlayIcon className="h-5 w-5" />
                    <span>{currentSlideData.secondaryCtaText}</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Visual Element */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl transform rotate-6"></div>
                <div className="relative bg-white bg-opacity-20 backdrop-blur-sm rounded-3xl p-8 transform -rotate-3">
                  <div className="w-64 h-64 bg-gradient-to-br from-white to-gray-200 rounded-2xl flex items-center justify-center">
                    <div className="text-6xl font-bold text-gray-600">3D</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-opacity-30 transition-all duration-200 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-opacity-30 transition-all duration-200 z-10"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="bg-white bg-opacity-20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-opacity-30 transition-all duration-200"
          aria-label={isAutoPlaying ? 'Pause auto-play' : 'Resume auto-play'}
        >
          {isAutoPlaying ? (
            <div className="w-4 h-4 flex space-x-1">
              <div className="w-1 h-4 bg-white"></div>
              <div className="w-1 h-4 bg-white"></div>
            </div>
          ) : (
            <PlayIcon className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Banner;