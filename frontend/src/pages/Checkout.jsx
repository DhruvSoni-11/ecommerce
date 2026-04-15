import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { processPayment } from '../services/api';
import { Lock, CreditCard, Wallet, CheckCircle2 } from 'lucide-react';

export const Checkout = () => {
  const { cartItems, cartTotal, placeOrder } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
      return null;
  }

  if (cartItems.length === 0 && !showSuccess) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await processPayment(cartTotal);
      placeOrder(formData);
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/tracking');
      }, 2000);
    } catch (err) {
      alert('Payment failed: ' + (err.response?.data?.message || err.message));
    }
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
          <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.4)] animate-bounce mb-6">
            <CheckCircle2 size={72} strokeWidth={3} className="text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Payment Successful</h2>
          <p className="text-gray-500">Redirecting to order tracking...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900">Checkout</h1>
        <p className="mt-2 text-gray-500">Complete your secure payment</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 overflow-hidden border border-gray-100">
        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 text-sm">1</span>
                Contact Information
              </h2>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-gray-50 border p-3 outline-none transition-colors focus:bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-gray-50 border p-3 outline-none transition-colors focus:bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-gray-50 border p-3 outline-none transition-colors focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="pt-8 border-t border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 text-sm">2</span>
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Street address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-gray-50 border p-3 outline-none transition-colors focus:bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-gray-50 border p-3 outline-none transition-colors focus:bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">ZIP / Postal code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    required
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-gray-50 border p-3 outline-none transition-colors focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="pt-8 border-t border-gray-100">
               <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 text-sm">3</span>
                Payment Method
              </h2>
              <fieldset>
                <legend className="sr-only">Payment type</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-4">
                  <label className={`relative flex cursor-pointer rounded-xl border p-4 focus:outline-none flex-1 overflow-hidden transition-all duration-300 ${formData.paymentMethod === 'card' ? 'bg-purple-50 border-purple-600 ring-1 ring-purple-600' : 'bg-white border-gray-300 hover:bg-gray-50'}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      className="sr-only"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                    />
                    <div className="flex w-full items-center justify-center gap-3">
                      <CreditCard className={formData.paymentMethod === 'card' ? 'text-purple-600' : 'text-gray-400'} size={24} />
                      <span className={`font-medium ${formData.paymentMethod === 'card' ? 'text-purple-900' : 'text-gray-900'}`}>Credit Card</span>
                    </div>
                  </label>

                  <label className={`relative flex cursor-pointer rounded-xl border p-4 focus:outline-none flex-1 overflow-hidden transition-all duration-300 ${formData.paymentMethod === 'paypal' ? 'bg-purple-50 border-purple-600 ring-1 ring-purple-600' : 'bg-white border-gray-300 hover:bg-gray-50'}`}>
                     <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      className="sr-only"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleChange}
                    />
                    <div className="flex w-full items-center justify-center gap-3">
                      <Wallet className={formData.paymentMethod === 'paypal' ? 'text-purple-600' : 'text-gray-400'} size={24} />
                      <span className={`font-medium ${formData.paymentMethod === 'paypal' ? 'text-purple-900' : 'text-gray-900'}`}>PayPal</span>
                    </div>
                  </label>
                </div>
              </fieldset>
            </div>
          </div>

          <div className="mt-12 bg-gray-50 -mx-8 -mb-8 p-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Total amount to pay</span>
              <span className="text-3xl font-black text-gray-900">${cartTotal.toFixed(2)}</span>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-purple-600 border border-transparent rounded-2xl py-4 px-10 text-base font-medium text-white shadow-xl shadow-purple-200 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all active:scale-95"
            >
              <Lock size={18} className="opacity-80" />
              Place Order securely
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
