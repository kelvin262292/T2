export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      {/* Main Loading Spinner */}
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-20 h-20 border-4 border-gray-200 rounded-full animate-spin">
          <div className="w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        
        {/* Inner Ring */}
        <div className="absolute top-2 left-2 w-16 h-16 border-4 border-blue-300 rounded-full animate-pulse"></div>
        
        {/* Center Dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
      </div>

      {/* Loading Text */}
      <div className="mt-8 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Đang tải...
        </h2>
        <p className="text-gray-600 animate-pulse">
          Vui lòng đợi trong giây lát
        </p>
      </div>

      {/* Loading Dots Animation */}
      <div className="mt-6 flex space-x-2">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>

      {/* Progress Bar */}
      <div className="mt-8 w-64">
        <div className="bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
        </div>
      </div>

      {/* Brand */}
      <div className="mt-12 text-center">
        <h3 className="text-lg font-bold text-blue-600">
          E-commerce 3D Store
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Trải nghiệm mua sắm tuyệt vời
        </p>
      </div>

      {/* Loading Tips */}
      <div className="mt-8 max-w-md text-center">
        <p className="text-xs text-gray-500">
          💡 Mẹo: Bạn có thể sử dụng tính năng tìm kiếm để nhanh chóng tìm thấy sản phẩm mong muốn
        </p>
      </div>
    </div>
  );
}

// Alternative minimal loading component
export function MinimalLoading() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <span className="ml-3 text-gray-600">Đang tải...</span>
    </div>
  );
}

// Loading skeleton for product cards
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
}

// Loading skeleton for product list
export function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

// Loading skeleton for product detail
export function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
        {/* Image Skeleton */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-200 rounded-lg"></div>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="aspect-square bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}