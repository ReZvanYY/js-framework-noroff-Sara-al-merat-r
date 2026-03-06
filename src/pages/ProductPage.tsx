import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Product, SingleProductResponse } from '../types';

import { useCart } from '../hooks/useCart'; 

const API_BASE_URL = 'https://v2.api.noroff.dev/online-shop';

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  

  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function fetchSingleProduct() {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/${id}`);
        
        if (!response.ok) {
          throw new Error('Could not fetch product details.');
        }

        const json = (await response.json()) as SingleProductResponse;
        setProduct(json.data);
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

    if (id) {
      fetchSingleProduct();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="grow flex items-center justify-center min-h-96">
        <p className="text-2xl font-bold animate-pulse text-indigo-900">Loading details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="grow flex flex-col items-center justify-center min-h-96 gap-6">
        <p className="text-xl font-bold text-red-600 bg-red-100 p-6 rounded-xl border-2 border-red-300">
          {error || 'Product not found.'}
        </p>
        <Link to="/" className="text-indigo-900 font-bold underline hover:text-orange-500">
          &larr; Back to Shop
        </Link>
      </div>
    );
  }

  const hasDiscount = product.discountedPrice < product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100) 
    : 0;


  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-12 w-full max-w-6xl mx-auto">
      
      <Link to="/" className="text-indigo-900 font-bold hover:text-orange-500 transition-colors w-fit px-4 py-2 bg-indigo-100 rounded-lg">
        &larr; Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        
        <div className="grid place-items-center bg-gray-50 rounded-3xl border-2 border-gray-200 overflow-hidden aspect-square p-8">
           <img 
              src={product.image.url} 
              alt={product.image.alt} 
              className="col-start-1 row-start-1 w-full h-full object-contain"
            />
            {hasDiscount && (
              <div className="col-start-1 row-start-1 justify-self-end self-start mt-4 mr-4 bg-red-500 text-white text-lg font-black uppercase px-4 py-2 rounded-full shadow-md z-10">
                -{discountPercentage}%
              </div>
            )}
        </div>

        <div className="flex flex-col gap-6 justify-center">
          
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map(tag => (
                <span key={tag} className="bg-indigo-100 text-indigo-900 px-3 py-1 rounded-full text-sm font-bold capitalize">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div>
            <h1 className="text-4xl lg:text-5xl font-black text-indigo-950 tracking-tight mb-4">
              {product.title}
            </h1>
            <div className="flex items-center gap-2 text-lg font-bold text-amber-600">
              ⭐ {product.rating} / 5
            </div>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            {product.description}
          </p>

          <hr className="border-gray-200" />

          <div className="flex items-end gap-4">
            {hasDiscount ? (
              <>
                <span className="text-4xl font-black text-red-600">
                  ${product.discountedPrice.toFixed(2)}
                </span>
                <div className="flex flex-col">
                  <span className="bg-red-500 text-white text-xs font-black uppercase px-2 py-0.5 rounded shadow-sm w-fit mb-1">
                    Save {discountPercentage}%
                  </span>
                  <span className="text-gray-400 line-through text-lg">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </>
            ) : (
              <span className="text-4xl font-black text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>


          <button 
            onClick={handleAddToCart}
            className={`mt-4 w-full md:w-auto px-10 py-4 rounded-xl text-xl font-black transition-colors shadow-md hover:shadow-xl ${
              added 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-orange-500 text-white hover:bg-indigo-900'
            }`}
          >
            {added ? '✓ Added to Cart!' : 'Add to Cart'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 md:p-12 mt-8">
        <h2 className="text-2xl font-black text-indigo-950 mb-8">Customer Reviews</h2>
        
        {product.reviews && product.reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviews.map(review => (
              <div key={review.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900 text-lg">{review.username}</span>
                  <span className="text-amber-500 font-bold bg-amber-50 px-2 py-1 rounded">⭐ {review.rating}</span>
                </div>
                <p className="text-gray-600 italic">"{review.description}"</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic text-lg">No reviews yet for this product.</p>
        )}
      </div>

    </div>
  );
}

export default ProductPage;