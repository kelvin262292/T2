'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        {/* Home Link */}
        <li>
          <Link 
            href="/" 
            className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
            aria-label="Trang chủ"
          >
            <HomeIcon className="h-4 w-4" />
          </Link>
        </li>
        
        {/* Breadcrumb Items */}
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRightIcon className="flex-shrink-0 h-4 w-4 text-gray-300 mx-2" />
            {item.href && !item.current ? (
              <Link 
                href={item.href}
                className="text-gray-400 hover:text-gray-500 transition-colors duration-200 truncate max-w-xs"
              >
                {item.label}
              </Link>
            ) : (
              <span 
                className={`truncate max-w-xs ${
                  item.current 
                    ? 'text-gray-700 font-medium' 
                    : 'text-gray-500'
                }`}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Utility function to generate breadcrumb items from pathname
export function generateBreadcrumbs(pathname: string, customLabels?: Record<string, string>): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const items: BreadcrumbItem[] = [];
  
  // Default labels for common paths
  const defaultLabels: Record<string, string> = {
    'products': 'Sản phẩm',
    'categories': 'Danh mục',
    'about': 'Về chúng tôi',
    'contact': 'Liên hệ',
    'cart': 'Giỏ hàng',
    'checkout': 'Thanh toán',
    'account': 'Tài khoản',
    'orders': 'Đơn hàng',
    'wishlist': 'Yêu thích',
    'search': 'Tìm kiếm',
    'help': 'Trợ giúp',
    'privacy': 'Chính sách bảo mật',
    'terms': 'Điều khoản sử dụng',
    ...customLabels
  };
  
  segments.forEach((segment, index) => {
    const isLast = index === segments.length - 1;
    const href = '/' + segments.slice(0, index + 1).join('/');
    
    // Try to get a friendly label, fallback to segment
    const label = defaultLabels[segment] || decodeURIComponent(segment).replace(/-/g, ' ');
    
    items.push({
      label: label.charAt(0).toUpperCase() + label.slice(1),
      href: isLast ? undefined : href,
      current: isLast
    });
  });
  
  return items;
}

// Hook for automatic breadcrumb generation
export function useBreadcrumbs(customLabels?: Record<string, string>) {
  if (typeof window === 'undefined') {
    return [];
  }
  
  const pathname = window.location.pathname;
  return generateBreadcrumbs(pathname, customLabels);
}