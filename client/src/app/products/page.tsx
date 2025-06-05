'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  inStock: boolean;
}

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Premium 3D Chair",
    price: 299.99,
    image: "/api/placeholder/300/300",
    description: "Ergonomic design with 3D visualization",
    category: "Furniture",
    inStock: true
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 399.99,
    image: "/api/placeholder/300/300",
    description: "Advanced smartwatch with health monitoring",
    category: "Electronics",
    inStock: true
  },
  {
    id: 3,
    name: "3D Gaming Headset",
    price: 199.99,
    image: "/api/placeholder/300/300",
    description: "Immersive 3D audio experience",
    category: "Electronics",
    inStock: false
  },
  {
    id: 4,
    name: "Designer Lamp",
    price: 149.99,
    image: "/api/placeholder/300/300",
    description: "Modern LED lamp with customizable colors",
    category: "Home & Garden",
    inStock: true
  },
  {
    id: 5,
    name: "Wireless Speaker",
    price: 89.99,
    image: "/api/placeholder/300/300",
    description: "High-quality wireless audio",
    category: "Electronics",
    inStock: true
  },
  {
    id: 6,
    name: "Office Desk",
    price: 449.99,
    image: "/api/placeholder/300/300",
    description: "Adjustable height standing desk",
    category: "Furniture",
    inStock: true
  }
];

const categories = ["All", "Electronics", "Furniture", "Home & Garden"];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const filteredProducts = sampleProducts
    .filter(product => selectedCategory === "All" || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-3xl font-bold text-gray-900">3D E-Commerce</Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/products" className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">
                Products
              </Link>
              <Link href="/categories" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Categories
              </Link>
              <Link href="/about" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Sign In
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium">
                Cart (0)
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
          <p className="text-lg text-gray-600">Discover our amazing collection of 3D products</p>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Category Filter */}
            <div className="flex items-center space-x-4">
              <span className="font-semibold text-gray-700">Category:</span>
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-4">
              <span className="font-semibold text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Product Image */}
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <div className="text-gray-500 text-center">
                  <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm">Product Image</p>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    product.inStock 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                  <span className="text-sm text-gray-500">{product.category}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button 
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                      product.inStock
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!product.inStock}
                  >
                    Add to Cart
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Products Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM10 12a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p>Try adjusting your filters to see more products.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}