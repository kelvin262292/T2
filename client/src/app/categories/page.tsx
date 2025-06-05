'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, FunnelIcon, Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import Breadcrumb from '../../components/Breadcrumb';

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  productCount: number;
  featured: boolean;
}

const categories: Category[] = [
  {
    id: 1,
    name: 'Điện tử',
    description: 'Thiết bị điện tử hiện đại với công nghệ 3D',
    image: '/api/placeholder/300/200',
    productCount: 156,
    featured: true
  },
  {
    id: 2,
    name: 'Nội thất',
    description: 'Đồ nội thất cao cấp cho ngôi nhà của bạn',
    image: '/api/placeholder/300/200',
    productCount: 89,
    featured: true
  },
  {
    id: 3,
    name: 'Thời trang',
    description: 'Quần áo và phụ kiện thời trang',
    image: '/api/placeholder/300/200',
    productCount: 234,
    featured: false
  },
  {
    id: 4,
    name: 'Gia dụng',
    description: 'Đồ gia dụng thông minh cho cuộc sống',
    image: '/api/placeholder/300/200',
    productCount: 67,
    featured: true
  },
  {
    id: 5,
    name: 'Thể thao',
    description: 'Dụng cụ và trang phục thể thao',
    image: '/api/placeholder/300/200',
    productCount: 123,
    featured: false
  },
  {
    id: 6,
    name: 'Sách & Văn phòng phẩm',
    description: 'Sách và đồ dùng văn phòng',
    image: '/api/placeholder/300/200',
    productCount: 45,
    featured: false
  },
  {
    id: 7,
    name: 'Làm đẹp',
    description: 'Mỹ phẩm và sản phẩm chăm sóc sắc đẹp',
    image: '/api/placeholder/300/200',
    productCount: 78,
    featured: false
  },
  {
    id: 8,
    name: 'Xe cộ',
    description: 'Phụ kiện và đồ chơi xe hơi',
    image: '/api/placeholder/300/200',
    productCount: 92,
    featured: false
  }
];

const sortOptions = [
  { name: 'Tên A-Z', value: 'name-asc' },
  { name: 'Tên Z-A', value: 'name-desc' },
  { name: 'Nhiều sản phẩm nhất', value: 'products-desc' },
  { name: 'Ít sản phẩm nhất', value: 'products-asc' }
];

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Filter and sort categories
  const filteredCategories = categories
    .filter(category => {
      const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           category.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFeatured = !showFeaturedOnly || category.featured;
      return matchesSearch && matchesFeatured;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'products-desc':
          return b.productCount - a.productCount;
        case 'products-asc':
          return a.productCount - b.productCount;
        default:
          return 0;
      }
    });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb 
            items={[{ label: 'Danh mục', current: true }]} 
            className="mb-4"
          />
        </div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Danh mục sản phẩm
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Khám phá các danh mục sản phẩm đa dạng với công nghệ 3D tiên tiến
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search */}
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Tìm kiếm danh mục..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Filters and Controls */}
            <div className="flex items-center space-x-4">
              {/* Featured Filter */}
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showFeaturedOnly}
                  onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Chỉ danh mục nổi bật</span>
              </label>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FunnelIcon className="h-4 w-4 mr-2" />
                  Sắp xếp
                  <ChevronDownIcon className="h-4 w-4 ml-2" />
                </button>
                {showSortDropdown && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setShowSortDropdown(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                            sortBy === option.value ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                          }`}
                        >
                          {option.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-md">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${
                    viewMode === 'grid'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-400 hover:text-gray-500'
                  }`}
                >
                  <Squares2X2Icon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${
                    viewMode === 'list'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-400 hover:text-gray-500'
                  }`}
                >
                  <ListBulletIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Hiển thị {filteredCategories.length} trong tổng số {categories.length} danh mục
          </p>
        </div>

        {/* Categories Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  {category.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
                        Nổi bật
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{category.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-blue-600 font-medium text-sm">
                      {category.productCount} sản phẩm
                    </span>
                    <span className="text-blue-600 group-hover:text-blue-700 text-sm font-medium">
                      Xem tất cả →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCategories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-24 h-24 object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {category.name}
                        </h3>
                        {category.featured && (
                          <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
                            Nổi bật
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{category.description}</p>
                      <span className="text-blue-600 font-medium text-sm mt-2 inline-block">
                        {category.productCount} sản phẩm
                      </span>
                    </div>
                    <div className="text-blue-600 group-hover:text-blue-700">
                      <span className="text-sm font-medium">Xem tất cả →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy danh mục</h3>
            <p className="text-gray-600">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc của bạn.</p>
          </div>
        )}
      </div>
    </div>
  );
}