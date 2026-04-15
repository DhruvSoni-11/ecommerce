import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={48} className="text-purple-300" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-center max-w-sm">
          Looks like you haven't added anything to your cart yet. Let's get you started!
        </p>
        <Link
          to="/"
          className="bg-purple-600 text-white px-8 py-4 rounded-full font-medium hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 hover:-translate-y-0.5"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Bag</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
        <div className="lg:col-span-8">
          <div className="border-t border-gray-100 divide-y divide-gray-100">
            {cartItems.map((item) => (
              <div key={item.id} className="flex py-8 items-center gap-6">
                <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover object-center p-2"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-center">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <Link to={`/product/${item.id}`} className="hover:text-purple-600 transition-colors">
                        {item.name}
                      </Link>
                    </h3>
                    <p className="ml-4 text-xl font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-1">{item.description}</p>
                  
                  <div className="mt-4 flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-purple-600 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center font-medium text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-purple-600 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="font-medium text-red-500 hover:text-red-600 flex items-center p-2 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 mt-16 lg:mt-0">
          <div className="bg-gray-50 rounded-3xl p-8 sticky top-24 border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-purple-100 rounded-full opacity-50 blur-2xl"></div>
            <h2 className="text-xl font-bold text-gray-900 relative z-10">Order summary</h2>
            
            <dl className="mt-6 space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">${cartTotal.toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-sm text-gray-600">Shipping estimate</dt>
                <dd className="text-sm font-medium text-gray-900">Free</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-bold text-gray-900">Order total</dt>
                <dd className="text-2xl font-black text-purple-600">${cartTotal.toFixed(2)}</dd>
              </div>
            </dl>

            <div className="mt-8 relative z-10">
              <button
                onClick={() => isAuthenticated ? navigate('/checkout') : navigate('/login')}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 border border-transparent rounded-2xl py-4 px-4 text-base font-medium text-white shadow-xl shadow-purple-200 hover:bg-purple-700 hover:shadow-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-50 transition-all active:scale-95 group"
              >
                {isAuthenticated ? "Proceed to Checkout" : "Login to Checkout"}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-500 relative z-10">
              <p>
                or{' '}
                <Link to="/" className="font-medium text-purple-600 hover:text-purple-500 hover:underline">
                  Continue Shopping
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
