import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

function CartPage() {
  // 1. Pull everything we need from our global cart memory
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  // 2. Handle the Empty Cart State
  if (cart.length === 0) {
    return (
      <div className="grow flex flex-col items-center justify-center min-h-96 gap-6 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-4xl font-black text-indigo-950 tracking-tight">Your cart is empty</h1>
        <p className="text-gray-600 text-lg">Looks like you haven't added anything to your cart yet.</p>
        <Link 
          to="/" 
          className="mt-4 bg-orange-500 text-white px-8 py-3 rounded-xl text-lg font-bold hover:bg-indigo-900 transition-colors shadow-md"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  // 3. Handle the Populated Cart State
  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
      <h1 className="text-4xl font-black text-indigo-950 tracking-tight">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Side: The List of Items */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row bg-white rounded-2xl border-2 border-gray-200 p-4 gap-6 items-center shadow-sm">
              
              {/* Product Thumbnail */}
              <div className="w-32 h-32 shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center p-2">
                <img 
                  src={item.image.url} 
                  alt={item.image.alt} 
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Product Info & Controls */}
              <div className="flex flex-col grow gap-4 w-full">
                
                {/* Title & Remove Button */}
                <div className="flex justify-between items-start">
                  <Link to={`/product/${item.id}`} className="text-xl font-bold text-indigo-950 hover:text-orange-500 transition-colors line-clamp-1">
                    {item.title}
                  </Link>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 font-bold px-2 py-1 transition-colors text-sm"
                  >
                    Remove
                  </button>
                </div>

                {/* Price & Quantity Controls */}
                <div className="flex justify-between items-center mt-auto">
                  
                  {/* Quantity Wrapper */}
                  <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center font-bold text-indigo-900 hover:bg-indigo-100 rounded transition-colors"
                    >
                      -
                    </button>
                    <span className="font-bold w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center font-bold text-indigo-900 hover:bg-indigo-100 rounded transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Individual Item Total */}
                  <div className="text-xl font-black text-gray-900">
                    ${(item.discountedPrice * item.quantity).toFixed(2)}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 sticky top-8 shadow-sm">
            <h2 className="text-2xl font-black text-indigo-950 mb-6">Order Summary</h2>
            
            <div className="flex justify-between items-center mb-4 text-gray-600">
              <span>Subtotal</span>
              <span className="font-bold text-gray-900">${cartTotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center mb-6 text-gray-600">
              <span>Shipping</span>
              <span className="text-green-600 font-bold">Free</span>
            </div>

            <hr className="border-gray-200 mb-6" />

            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold text-indigo-950">Total</span>
              <span className="text-3xl font-black text-indigo-950">${cartTotal.toFixed(2)}</span>
            </div>

            <Link 
              to="/checkout"
              className="block w-full text-center bg-orange-500 text-white px-6 py-4 rounded-xl text-lg font-black hover:bg-indigo-900 transition-colors shadow-md hover:shadow-xl"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CartPage;