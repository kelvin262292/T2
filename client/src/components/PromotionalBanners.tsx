'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

// Types
interface PromoBanner {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  backgroundColor?: string;
  textColor?: string;
  discount?: string;
  validUntil?: string;
  type: 'hero' | 'discount' | 'seasonal' | 'product';
}

// Sample promotional banners data
const promoBanners: PromoBanner[] = [
  {
    id: '1',
    title: 'Giảm Giá Khủng 50%',
    subtitle: 'Black Friday Sale',
    description: 'Cơ hội vàng sở hữu sản phẩm yêu thích với giá không thể tốt hơn!',
    image: '/api/placeholder/1200/400',
    ctaText: 'Mua Ngay',
    ctaLink: '/categories',
    backgroundColor: 'bg-gradient-to-r from-red-600 to-pink-600',
    textColor: 'text-white',
    discount: '50%',
    validUntil: '2024-12-31',
    type: 'discount'
  },
  {
    id: '2',
    title: 'Bộ Sưu Tập Mùa Đông 2024',
    subtitle: 'Winter Collection',
    description: 'Khám phá những sản phẩm mới nhất cho mùa đông ấm áp',
    image: '/api/placeholder/1200/400',
    ctaText: 'Khám Phá',
    ctaLink: '/categories',
    backgroundColor: 'bg-gradient-to-r from-blue-600 to-indigo-600',
    textColor: 'text-white',
    type: 'seasonal'
  },
  {
    id: '3',
    title: 'Miễn Phí Vận Chuyển',
    subtitle: 'Free Shipping',
    description: 'Cho đơn hàng từ 500.000đ trên toàn quốc',
    image: '/api/placeholder/1200/400',
    ctaText: 'Mua Sắm Ngay',
    ctaLink: '/categories',
    backgroundColor: 'bg-gradient-to-r from-green-600 to-teal-600',
    textColor: 'text-white',
    type: 'hero'
  }
];

// Hero Banner Slider Component
interface HeroBannerSliderProps {
  banners?: PromoBanner[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

export function HeroBannerSlider({ 
  banners = promoBanners,
  autoPlay = true,
  interval = 5000,
  className = ''
}: HeroBannerSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, interval, banners.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  if (banners.length === 0) return null;

  const currentBanner = banners[currentSlide];
  if (!currentBanner) return null;

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      {/* Banner Content */}
      <div className={`relative h-96 md:h-[500px] ${currentBanner.backgroundColor || 'bg-gray-900'}`}>
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${currentBanner.image})` } as React.CSSProperties}
        />
        
        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              {currentBanner.subtitle && (
                <p className={`text-sm md:text-base font-medium mb-2 ${currentBanner.textColor || 'text-white'} opacity-90`}>
                  {currentBanner.subtitle}
                </p>
              )}
              
              <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-4 ${currentBanner.textColor || 'text-white'}`}>
                {currentBanner.title}
                {currentBanner.discount && (
                  <span className="block text-yellow-300 text-4xl md:text-6xl lg:text-7xl">
                    {currentBanner.discount}
                  </span>
                )}
              </h1>
              
              {currentBanner.description && (
                <p className={`text-lg md:text-xl mb-8 ${currentBanner.textColor || 'text-white'} opacity-90 max-w-2xl`}>
                  {currentBanner.description}
                </p>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={currentBanner.ctaLink}
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-100 transition-colors duration-200"
                >
                  {currentBanner.ctaText}
                </Link>
                
                {currentBanner.validUntil && (
                  <div className={`flex items-center text-sm ${currentBanner.textColor || 'text-white'} opacity-75`}>
                    <span>Có hiệu lực đến: {new Date(currentBanner.validUntil).toLocaleDateString('vi-VN')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Arrows */}
        {banners.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-all duration-200"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-all duration-200"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </>
        )}
      </div>
      
      {/* Slide Indicators */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? 'bg-white'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      )}
      
      {/* Play/Pause Control */}
      {banners.length > 1 && (
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-all duration-200 text-xs"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      )}
    </div>
  );
}

// Discount Banner Component
interface DiscountBannerProps {
  title: string;
  discount: string;
  description?: string;
  ctaText: string;
  ctaLink: string;
  validUntil?: string;
  onClose?: () => void;
  className?: string;
}

export function DiscountBanner({
  title,
  discount,
  description,
  ctaText,
  ctaLink,
  validUntil,
  onClose,
  className = ''
}: DiscountBannerProps) {
  return (
    <div className={`relative bg-gradient-to-r from-red-500 to-pink-600 text-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-2xl md:text-3xl font-bold">
              {discount}
            </div>
            <div>
              <h3 className="font-bold text-lg">{title}</h3>
              {description && (
                <p className="text-sm opacity-90">{description}</p>
              )}
              {validUntil && (
                <p className="text-xs opacity-75">
                  Có hiệu lực đến: {new Date(validUntil).toLocaleDateString('vi-VN')}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              href={ctaLink}
              className="bg-white text-red-600 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              {ctaText}
            </Link>
            
            {onClose && (
              <button
                onClick={onClose}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors duration-200"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Product Promotion Poster
interface ProductPromoPosterProps {
  title: string;
  subtitle?: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  badge?: string;
  className?: string;
}

export function ProductPromoPoster({
  title,
  subtitle,
  image,
  ctaText,
  ctaLink,
  badge,
  className = ''
}: ProductPromoPosterProps) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-gray-900 ${className}`}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})` } as React.CSSProperties}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      {/* Badge */}
      {badge && (
        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          {badge}
        </div>
      )}
      
      {/* Content */}
      <div className="relative h-64 md:h-80 flex items-end">
        <div className="p-6 text-white">
          {subtitle && (
            <p className="text-sm font-medium mb-2 opacity-90">{subtitle}</p>
          )}
          <h3 className="text-xl md:text-2xl font-bold mb-4">{title}</h3>
          <Link
            href={ctaLink}
            className="inline-flex items-center px-6 py-2 bg-white text-gray-900 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </div>
  );
}

// Seasonal Campaign Banner
interface SeasonalBannerProps {
  season: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundColor?: string;
  className?: string;
}

export function SeasonalBanner({
  season,
  title,
  description,
  ctaText,
  ctaLink,
  backgroundColor = 'bg-gradient-to-r from-orange-500 to-red-600',
  className = ''
}: SeasonalBannerProps) {
  return (
    <div className={`${backgroundColor} text-white rounded-lg overflow-hidden ${className}`}>
      <div className="px-6 py-8 md:px-8 md:py-12">
        <div className="text-center">
          <p className="text-sm font-medium mb-2 opacity-90">{season}</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">{description}</p>
          <Link
            href={ctaLink}
            className="inline-flex items-center px-8 py-3 bg-white text-gray-900 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </div>
  );
}