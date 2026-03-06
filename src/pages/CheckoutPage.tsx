import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

function CheckoutPage() {
  const { clearCart } = useCart();

  // 1. Automatically clear the cart when the user reaches this page
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="grow flex flex-col items-center justify-center min-h-[60vh] text-center gap-8">
      
      {/* Success Icon using a simple Grid stack */}
      <div className="grid place-items-center w-24 h-24 bg-green-100 rounded-full border-4 border-green-500 animate-bounce">
        <span className="text-4xl text-green-600 font-black">✓</span>
      </div>

      <div className="flex flex-col gap-4 max-w-lg">
        <h1 className="text-5xl font-black text-indigo-950 tracking-tight">
          Order Successful!
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Thank you for shopping with <span className="font-bold text-indigo-900">Aurora Shop.</span> Your items are being prepared for shipping and will be with you shortly.
        </p>
      </div>

      {/* Decorative Divider */}
      <div className="w-24 h-1 bg-indigo-200 rounded-full"></div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/" 
          className="bg-indigo-900 text-[#f8f5e6] px-10 py-4 rounded-xl text-lg font-bold hover:bg-orange-500 transition-all shadow-md hover:shadow-xl active:scale-95"
        >
          Back to Shop
        </Link>
      </div>
      
      <p className="text-sm text-gray-400 italic">
        An order confirmation has been sent to your email.
      </p>
    </div>
  );
}

export default CheckoutPage;