import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { Product, ApiResponse } from '../types'; 

const apiUrl = 'https://v2.api.noroff.dev/online-shop';

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('default');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const json = (await response.json()) as ApiResponse;
        setProducts(json.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    switch (sortOption) {
      case 'price-asc':
        result = result.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case 'price-desc':
        result = result.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case 'rating':
        result = result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [products, searchQuery, sortOption]);

  if (isLoading) {
    return (
      <div className="grow flex items-center justify-center min-h-96">
        <p className="text-2xl font-bold animate-pulse text-indigo-900">Loading shop...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grow flex items-center justify-center min-h-96">
        <p className="text-xl font-bold text-red-600 bg-red-100 p-6 rounded-xl border-2 border-red-300">
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      
      {/* Header & Controls Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-4xl font-black text-indigo-950 tracking-tight">
          Products
        </h1>
        
        {/* Search and Sort Inputs */}
        <div className="flex flex-col sm:flex-row gap-4 ">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-xl border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2 rounded-xl border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all bg-white cursor-pointer"
          >
            <option value="default">Default</option>
            <option value="price-asc">Low to High</option>
            <option value="price-desc"> High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>
      
      {/* Results Count */}
      <p className="text-gray-600 font-medium">
        Showing {filteredAndSortedProducts.length} products
      </p>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedProducts.map((product) => {
          const hasDiscount = product.discountedPrice < product.price;
          const discountPercentage = hasDiscount 
            ? Math.round(((product.price - product.discountedPrice) / product.price) * 100) 
            : 0;

          return (
            <div 
              key={product.id} 
              className="flex flex-col bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-indigo-400 hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container using Grid to stack elements */}
              <div className="grid aspect-square w-full bg-gray-50 overflow-hidden">
                
                {/* The Image (Layer 1) */}
                <img 
                  src={product.image.url} 
                  alt={product.image.alt} 
                  className="col-start-1 row-start-1 w-full h-full object-contain hover:scale-110 transition-transform duration-500"
                />

                {/* Assignment Requirement: Discount percentage sticker (Layer 2) */}
                {/* Pushed to the top right using justify-self-end, self-start, and margins */}
                {hasDiscount && (
                  <div className="col-start-1 row-start-1 justify-self-end self-start mt-3 mr-3 bg-red-500 text-white text-sm font-black uppercase px-3 py-1 rounded-full shadow-md z-10">
                    -{discountPercentage}%
                  </div>
                )}
              </div>
              
              {/* Content Container */}
              <div className="p-5 flex flex-col grow gap-3">
                <div className="flex justify-between items-start gap-2">
                  <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
                    {product.title}
                  </h2>
                  <div className="flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-sm font-bold shrink-0">
                    ⭐ {product.rating}
                  </div>
                </div>
                
                {/* Pricing Logic: Showing both prices and strike-through */}
                <div className="flex items-end gap-2 mt-auto pt-4">
                  {hasDiscount ? (
                    <>
                      <span className="text-2xl font-black text-red-600">
                        ${product.discountedPrice.toFixed(2)}
                      </span>
                      <span className="text-gray-400 line-through text-sm mb-1">
                        ${product.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-black text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>
                
                {/* Action Button */}
                <Link 
                  to={`/product/${product.id}`}
                  className="mt-4 block w-full bg-indigo-900 text-[#f8f5e6] text-center font-bold py-3 rounded-xl hover:bg-orange-500 hover:text-white transition-colors"
                >
                  View Product
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAndSortedProducts.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 font-medium">No products found matching your search.</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;