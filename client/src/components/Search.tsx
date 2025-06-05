'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, XMarkIcon, ClockIcon } from '@heroicons/react/24/outline';

interface SearchResult {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  url: string;
}

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock search data
const mockResults: SearchResult[] = [
  {
    id: 1,
    title: 'Sản phẩm Premium 3D',
    category: 'Điện tử',
    price: 299000,
    image: '/api/placeholder/60/60',
    url: '/products/1'
  },
  {
    id: 2,
    title: 'Ghế văn phòng ergonomic',
    category: 'Nội thất',
    price: 1500000,
    image: '/api/placeholder/60/60',
    url: '/products/2'
  },
  {
    id: 3,
    title: 'Laptop gaming cao cấp',
    category: 'Điện tử',
    price: 25000000,
    image: '/api/placeholder/60/60',
    url: '/products/3'
  },
  {
    id: 4,
    title: 'Áo thun cotton premium',
    category: 'Thời trang',
    price: 350000,
    image: '/api/placeholder/60/60',
    url: '/products/4'
  },
  {
    id: 5,
    title: 'Máy pha cà phê tự động',
    category: 'Gia dụng',
    price: 8500000,
    image: '/api/placeholder/60/60',
    url: '/products/5'
  }
];

const popularSearches = [
  'Điện thoại',
  'Laptop',
  'Ghế văn phòng',
  'Áo thun',
  'Máy pha cà phê',
  'Tai nghe',
  'Bàn làm việc',
  'Giày thể thao'
];

export default function Search({ isOpen, onClose }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Load search history from localStorage
  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Simulate search API call
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const filteredResults = mockResults.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setResults(filteredResults);
    setIsLoading(false);
  };

  // Handle input change with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    // Add to search history
    const newHistory = [searchQuery, ...searchHistory.filter(item => item !== searchQuery)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    
    // Perform search
    performSearch(searchQuery);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
      
      {/* Search Modal */}
      <div className="flex min-h-full items-start justify-center p-4 pt-16">
        <div 
          ref={searchRef}
          className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden"
        >
          {/* Search Header */}
          <div className="border-b border-gray-200 p-4">
            <form onSubmit={handleSubmit} className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      setResults([]);
                      setShowSuggestions(false);
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </form>
          </div>

          {/* Search Content */}
          <div className="max-h-96 overflow-y-auto">
            {/* Loading State */}
            {isLoading && (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-500">Đang tìm kiếm...</p>
              </div>
            )}

            {/* Search Results */}
            {!isLoading && results.length > 0 && (
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Kết quả tìm kiếm ({results.length})
                </h3>
                <div className="space-y-2">
                  {results.map((result) => (
                    <Link
                      key={result.id}
                      href={result.url}
                      onClick={onClose}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <img
                        src={result.image}
                        alt={result.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {result.title}
                        </p>
                        <p className="text-sm text-gray-500">{result.category}</p>
                        <p className="text-sm font-semibold text-blue-600">
                          {formatPrice(result.price)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {!isLoading && query && results.length === 0 && (
              <div className="p-8 text-center">
                <MagnifyingGlassIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Không tìm thấy kết quả
                </h3>
                <p className="text-gray-500">
                  Thử tìm kiếm với từ khóa khác hoặc kiểm tra chính tả
                </p>
              </div>
            )}

            {/* Search Suggestions */}
            {!query && (
              <div className="p-4 space-y-6">
                {/* Search History */}
                {searchHistory.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-900 flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        Tìm kiếm gần đây
                      </h3>
                      <button
                        onClick={clearHistory}
                        className="text-xs text-blue-600 hover:text-blue-700"
                      >
                        Xóa tất cả
                      </button>
                    </div>
                    <div className="space-y-1">
                      {searchHistory.slice(0, 5).map((item, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setQuery(item);
                            handleSearch(item);
                          }}
                          className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Tìm kiếm phổ biến
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setQuery(item);
                          handleSearch(item);
                        }}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Search Footer */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Nhấn Enter để tìm kiếm</span>
              <span>ESC để đóng</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}