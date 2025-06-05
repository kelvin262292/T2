'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { api } from '~/trpc/react';
import { useCart } from '~/contexts/CartContext';
import LoadingStates from '~/components/LoadingStates';

interface FilterState {
  category: string;
  priceRange: string;
  inStock: boolean | null;
  sortBy: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    priceRange: '',
    inStock: null,
    sortBy: 'relevance'
  });
  
  const { addItem } = useCart();
  
  // Search products using tRPC
  const { data: searchResults, isLoading, refetch } = api.product.search.useQuery(
    { query: searchTerm },
    { enabled: searchTerm.length > 0 }
  );
  
  // Get all products for filtering
  const { data: allProducts } = api.product.getAll.useQuery({
    category: filters.category || undefined,
    inStock: filters.inStock ?? undefined
  });
  
  // Get categories for filter
  const { data: categories } = api.product.getCategories.useQuery();

  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      refetch();
    }
  };

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      inStock: null,
      sortBy: 'relevance'
    });
  };

  // Filter and sort results
  const getFilteredResults = () => {
    let results = searchResults || [];
    
    // Apply category filter
    if (filters.category) {
      results = results.filter(product => product.category === filters.category);
    }
    
    // Apply stock filter
    if (filters.inStock !== null) {
      results = results.filter(product => product.inStock === filters.inStock);
    }
    
    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      results = results.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max;
        } else {
          return product.price >= min;
        }
      });
    }
    
    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Keep relevance order (default from search)
        break;
    }
    
    return results;
  };

  const filteredResults = getFilteredResults();
  const hasActiveFilters = filters.category || filters.priceRange || filters.inStock !== null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
          <span>/</span>
          <span className="text-gray-900">Tìm kiếm</span>
          {query && (
            <>
              <span>/</span>
              <span className="text-gray-900">"{query}"</span>
            </>
          )}
        </nav>

        {/* Search Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {query ? `Kết quả tìm kiếm cho "${query}"` : 'Tìm kiếm sản phẩm'}
          </h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Tìm kiếm
            </button>
          </form>
          
          {/* Results Count */}
          {searchTerm && (
            <p className="text-gray-600">
              {isLoading ? 'Đang tìm kiếm...' : `Tìm thấy ${filteredResults.length} sản phẩm`}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Bộ lọc</h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
                >
                  <AdjustmentsHorizontalIcon className="w-5 h-5" />
                </button>
              </div>
              
              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Category Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Danh mục</h3>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Tất cả danh mục</option>
                    {categories?.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                {/* Price Range Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Khoảng giá</h3>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Tất cả giá</option>
                    <option value="0-100">Dưới $100</option>
                    <option value="100-300">$100 - $300</option>
                    <option value="300-500">$300 - $500</option>
                    <option value="500">Trên $500</option>
                  </select>
                </div>
                
                {/* Stock Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Tình trạng</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="stock"
                        checked={filters.inStock === null}
                        onChange={() => handleFilterChange('inStock', null)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Tất cả</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="stock"
                        checked={filters.inStock === true}
                        onChange={() => handleFilterChange('inStock', true)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Còn hàng</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="stock"
                        checked={filters.inStock === false}
                        onChange={() => handleFilterChange('inStock', false)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Hết hàng</span>
                    </label>
                  </div>
                </div>
                
                {/* Sort By */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Sắp xếp theo</h3>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="relevance">Liên quan nhất</option>
                    <option value="name">Tên A-Z</option>
                    <option value="price-low">Giá thấp đến cao</option>
                    <option value="price-high">Giá cao đến thấp</option>
                    <option value="rating">Đánh giá cao nhất</option>
                  </select>
                </div>
                
                {/* Clear Filters */}
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="w-full flex items-center justify-center px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4 mr-2" />
                    Xóa bộ lọc
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <LoadingStates />
            ) : searchTerm && filteredResults.length === 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <MagnifyingGlassIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-600 mb-6">
                  Không có sản phẩm nào phù hợp với từ khóa "{searchTerm}". Hãy thử tìm kiếm với từ khóa khác.
                </p>
                <Link 
                  href="/products" 
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Xem tất cả sản phẩm
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredResults.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <Link href={`/products/${product.id}`}>
                      <div className="aspect-square bg-gray-100 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                    
                    <div className="p-4">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xl font-bold text-blue-600">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.inStock 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'
                                }`}
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-1">({product.reviews})</span>
                        </div>
                        
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.inStock}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            product.inStock
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {product.inStock ? 'Thêm vào giỏ' : 'Hết hàng'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {!searchTerm && (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <MagnifyingGlassIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Tìm kiếm sản phẩm</h3>
                <p className="text-gray-600 mb-6">
                  Nhập từ khóa vào ô tìm kiếm để tìm sản phẩm bạn muốn.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}