import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Search, Filter, ShoppingCart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shop | Multipurpose Platform',
  description: 'Browse and shop for the latest products',
};

export default function ShopPage() {
  // This would come from the database in a real implementation
  const products = [
    {
      id: 1,
      name: "Bluetooth Earbuds",
      price: 79.99,
      image: "/images/products/earbuds.jpg",
      category: "Electronics",
      rating: 4.5,
      reviews: 128,
      slug: "bluetooth-earbuds"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 149.99,
      image: "/images/products/smartwatch.jpg",
      category: "Electronics",
      rating: 4.3,
      reviews: 95,
      slug: "smart-watch"
    },
    {
      id: 3,
      name: "Laptop Backpack",
      price: 59.99,
      image: "/images/products/backpack.jpg",
      category: "Accessories",
      rating: 4.7,
      reviews: 210,
      slug: "laptop-backpack"
    },
    {
      id: 4,
      name: "Wireless Phone Charger",
      price: 34.99,
      image: "/images/products/charger.jpg",
      category: "Electronics",
      rating: 4.2,
      reviews: 78,
      slug: "wireless-phone-charger"
    },
    {
      id: 5,
      name: "Ergonomic Keyboard",
      price: 89.99,
      image: "/images/products/keyboard.jpg",
      category: "Computer Accessories",
      rating: 4.6,
      reviews: 156,
      slug: "ergonomic-keyboard"
    },
    {
      id: 6,
      name: "Portable Power Bank",
      price: 49.99,
      image: "/images/products/powerbank.jpg",
      category: "Electronics",
      rating: 4.4,
      reviews: 132,
      slug: "portable-power-bank"
    },
    {
      id: 7,
      name: "Noise Cancelling Headphones",
      price: 129.99,
      image: "/images/products/headphones.jpg",
      category: "Audio",
      rating: 4.8,
      reviews: 245,
      slug: "noise-cancelling-headphones"
    },
    {
      id: 8,
      name: "Minimalist Desk Lamp",
      price: 45.99,
      image: "/images/products/lamp.jpg",
      category: "Home Office",
      rating: 4.3,
      reviews: 87,
      slug: "minimalist-desk-lamp"
    }
  ];

  // Get unique categories for filter
  const categories = [...new Set(products.map(product => product.category))];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop Our Products</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse our selection of quality products with fast shipping and excellent customer service
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="w-full md:w-2/3 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search products..."
              />
            </div>
            <div className="w-full md:w-1/3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden">
                <div className="h-full flex items-center justify-center bg-purple-100">
                  <span className="text-purple-800 font-medium">Product Image</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    <Link href={`/shop/${product.slug}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                  <div className="mt-1 flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <svg 
                          key={rating} 
                          className={`h-4 w-4 ${
                            product.rating > rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="ml-2 text-sm text-gray-500">({product.reviews})</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">${product.price}</p>
              </div>
              <div className="mt-4">
                <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <a href="#" className="inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Previous
            </a>
            <a href="#" className="inline-flex items-center px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-indigo-600">
              1
            </a>
            <a href="#" className="inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              2
            </a>
            <a href="#" className="inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Next
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
} 